import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { generateDeviceToken, hashDeviceToken } from "@/lib/device-tokens"

// Use service role key for admin operations
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

/**
 * Device Link Completion Endpoint
 *
 * This endpoint is called by the web browser when a logged-in user enters
 * the code displayed by their desktop app to authorize device linking.
 *
 * POST /api/device/link-complete
 *
 * Authentication: Requires active user session (cookie or token)
 *
 * Request Body:
 * {
 *   "code": "XYZABC"
 * }
 *
 * Response (200 OK):
 * {
 *   "success": true,
 *   "deviceLinkId": "link_abc123xyz",
 *   "deviceName": "John's Laptop",
 *   "platform": "windows"
 * }
 *
 * Response (404 Not Found):
 * {
 *   "error": "Invalid code",
 *   "message": "The code you entered is invalid or has expired",
 *   "code": "CODE_NOT_FOUND"
 * }
 *
 * Response (401 Unauthorized):
 * {
 *   "error": "Unauthorized",
 *   "message": "You must be logged in to link a device",
 *   "code": "AUTH_REQUIRED"
 * }
 *
 * Flow:
 * 1. User is logged in on web browser
 * 2. Desktop app displays code (from /api/device/link-init)
 * 3. User goes to /link-device page and enters code
 * 4. Frontend calls this endpoint with the code
 * 5. Backend validates code, links device to user account
 * 6. Desktop app detects approval via /api/device/status polling
 *
 * TODO: Integration Requirements:
 * - Check user authentication session
 * - Lookup device link request by code
 * - Verify code hasn't expired (10 minute TTL)
 * - Mark device link as "approved" and associate with user ID
 * - Generate device access token for desktop app
 * - Store device record in database
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to link a device",
          code: "AUTH_REQUIRED",
        },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate code
    if (!body.code || typeof body.code !== "string") {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: "code is required and must be a string",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      )
    }

    const code = body.code.toUpperCase().trim()

    // Lookup device link request
    const { data: deviceLink, error: lookupError } = await supabaseAdmin
      .from('device_links')
      .select('*')
      .eq('code', code)
      .single()

    if (lookupError || !deviceLink) {
      return NextResponse.json(
        {
          error: "Invalid code",
          message: "The code you entered is invalid or has expired",
          code: "CODE_NOT_FOUND",
        },
        { status: 404 }
      )
    }

    // Check if expired
    if (new Date(deviceLink.expires_at) < new Date()) {
      await supabaseAdmin
        .from('device_links')
        .update({ status: 'expired' })
        .eq('id', deviceLink.id)

      return NextResponse.json(
        {
          error: "Code expired",
          message: "This code has expired. Please try again.",
          code: "CODE_EXPIRED",
        },
        { status: 410 }
      )
    }

    // Check if already approved
    if (deviceLink.status === 'approved') {
      return NextResponse.json(
        {
          error: "Code already used",
          message: "This code has already been used",
          code: "CODE_ALREADY_USED",
        },
        { status: 409 }
      )
    }

    // Generate device access token
    const deviceToken = generateDeviceToken()
    const tokenHash = hashDeviceToken(deviceToken)

    // Create device record
    const { data: newDevice, error: deviceError } = await supabaseAdmin
      .from('devices')
      .insert({
        user_id: user.id,
        name: deviceLink.device_name,
        platform: deviceLink.platform,
        app_version: deviceLink.app_version,
        fingerprint: deviceLink.fingerprint,
        token_hash: tokenHash,
      })
      .select()
      .single()

    if (deviceError || !newDevice) {
      console.error('Failed to create device:', deviceError)
      return NextResponse.json(
        {
          error: "Database error",
          message: "Failed to create device record",
          code: "DB_ERROR",
        },
        { status: 500 }
      )
    }

    // Update device link status and temporarily store token for desktop app to retrieve
    // Token will be cleared after first retrieval by status endpoint
    await supabaseAdmin
      .from('device_links')
      .update({
        status: 'approved',
        user_id: user.id,
        device_id: newDevice.id,
        approved_at: new Date().toISOString(),
        // Store token temporarily - will be cleared after first status poll
        device_token: deviceToken,
      })
      .eq('id', deviceLink.id)

    const response = {
      success: true,
      deviceLinkId: deviceLink.id,
      deviceId: newDevice.id,
      deviceName: deviceLink.device_name,
      platform: deviceLink.platform,
    }

    console.log("Device link completed:", {
      code: code,
      deviceLinkId: deviceLink.id,
      deviceId: newDevice.id,
      userId: user.id,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Device link complete error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to complete device linking",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    )
  }
}
