import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import { generateDeviceLinkCode } from "@/lib/device-tokens"

// Use service role key for device linking (doesn't require auth)
const supabaseAdmin = createClient(
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
 * Device Link Initialization Endpoint
 *
 * This endpoint initiates the device linking flow by generating a short code
 * that the user will enter in their browser to authorize the desktop app.
 *
 * POST /api/device/link-init
 *
 * Request Body:
 * {
 *   "deviceName": "John's Laptop",
 *   "platform": "windows" | "macos" | "linux",
 *   "appVersion": "1.3.0",
 *   "deviceFingerprint": "unique-device-id" // optional
 * }
 *
 * Response (200 OK):
 * {
 *   "deviceLinkId": "link_abc123xyz",
 *   "code": "XYZABC",
 *   "expiresAt": "2025-11-26T15:30:00Z",
 *   "verificationUrl": "https://agiworkforce.com/link-device?code=XYZABC"
 * }
 *
 * Flow:
 * 1. Desktop app calls this endpoint
 * 2. Backend generates a 6-character code (valid for 10 minutes)
 * 3. Desktop app displays: "Go to agiworkforce.com/link-device and enter: XYZABC"
 * 4. User enters code in browser (while logged in)
 * 5. Desktop app polls /api/device/status/{deviceLinkId} until approved
 * 6. Backend returns access token to desktop app
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.deviceName || !body.platform) {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: "deviceName and platform are required",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      )
    }

    // Validate platform
    const validPlatforms = ["windows", "macos", "linux"]
    if (!validPlatforms.includes(body.platform)) {
      return NextResponse.json(
        {
          error: "Invalid platform",
          message: `platform must be one of: ${validPlatforms.join(", ")}`,
          code: "INVALID_PLATFORM",
        },
        { status: 400 }
      )
    }

    // Generate secure code and expiration
    const code = generateDeviceLinkCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Create device link request in database
    const { data: deviceLink, error: insertError } = await supabaseAdmin
      .from('device_links')
      .insert({
        code: code,
        device_name: body.deviceName,
        platform: body.platform,
        app_version: body.appVersion,
        fingerprint: body.deviceFingerprint,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (insertError || !deviceLink) {
      console.error('Failed to create device link:', insertError)
      return NextResponse.json(
        {
          error: "Database error",
          message: "Failed to create device link request",
          code: "DB_ERROR",
        },
        { status: 500 }
      )
    }

    const response = {
      deviceLinkId: deviceLink.id,
      code: code,
      expiresAt: expiresAt.toISOString(),
      verificationUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://agiworkforce.com"}/link-device?code=${code}`,
    }

    console.log("Device link initiated:", {
      deviceLinkId: deviceLink.id,
      deviceName: body.deviceName,
      platform: body.platform,
      code: code,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Device link init error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to initiate device linking",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    )
  }
}
