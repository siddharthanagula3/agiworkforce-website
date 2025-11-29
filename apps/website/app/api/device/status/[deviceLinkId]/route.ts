import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

// Use service role key for device linking
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
 * Device Link Status Polling Endpoint
 *
 * The desktop app polls this endpoint to check if the user has approved
 * the device linking request in their browser.
 *
 * GET /api/device/status/{deviceLinkId}
 *
 * Response (200 OK - Pending):
 * {
 *   "status": "pending",
 *   "deviceLinkId": "link_abc123xyz",
 *   "expiresAt": "2025-11-26T15:30:00Z"
 * }
 *
 * Response (200 OK - Approved):
 * {
 *   "status": "approved",
 *   "deviceLinkId": "link_abc123xyz",
 *   "accessToken": "device_token_xyz123...",
 *   "user": {
 *     "id": "user_123",
 *     "email": "user@example.com",
 *     "displayName": "John Doe"
 *   }
 * }
 *
 * Response (410 Gone - Expired):
 * {
 *   "status": "expired",
 *   "message": "This device link request has expired"
 * }
 *
 * Response (404 Not Found):
 * {
 *   "error": "Not found",
 *   "message": "Device link request not found",
 *   "code": "NOT_FOUND"
 * }
 *
 * Desktop App Polling Strategy:
 * - Poll every 2 seconds
 * - Maximum 300 attempts (10 minutes)
 * - Exponential backoff after 60 seconds
 * - Stop polling when status is "approved" or "expired"
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deviceLinkId: string }> }
) {
  try {
    const { deviceLinkId } = await params

    if (!deviceLinkId) {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: "Invalid device link ID format",
          code: "INVALID_ID",
        },
        { status: 400 }
      )
    }

    // Lookup device link in database
    const { data: deviceLink, error: lookupError } = await supabaseAdmin
      .from('device_links')
      .select('*')
      .eq('id', deviceLinkId)
      .single()

    if (lookupError || !deviceLink) {
      return NextResponse.json(
        {
          error: "Not found",
          message: "Device link request not found",
          code: "NOT_FOUND",
        },
        { status: 404 }
      )
    }

    // Check if expired
    if (new Date(deviceLink.expires_at) < new Date()) {
      await supabaseAdmin
        .from('device_links')
        .update({ status: 'expired' })
        .eq('id', deviceLinkId)

      return NextResponse.json(
        {
          status: "expired",
          message: "This device link request has expired",
        },
        { status: 410 }
      )
    }

    // Check if approved
    if (deviceLink.status === 'approved' && deviceLink.user_id) {
      // Get user info
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('id, email, display_name')
        .eq('id', deviceLink.user_id)
        .single()

      const response = {
        status: "approved" as const,
        deviceLinkId: deviceLink.id,
        accessToken: deviceLink.device_token,
        user: user ? {
          id: user.id,
          email: user.email,
          displayName: user.display_name || user.email,
        } : undefined,
      }

      // Clear device token after first retrieval for security
      await supabaseAdmin
        .from('device_links')
        .update({ device_token: null })
        .eq('id', deviceLinkId)

      console.log("Device link approved - token retrieved:", {
        deviceLinkId: deviceLink.id,
        userId: deviceLink.user_id,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(response, { status: 200 })
    }

    // Still pending
    const response = {
      status: "pending" as const,
      deviceLinkId: deviceLink.id,
      expiresAt: deviceLink.expires_at,
      message: "Waiting for user approval. Go to agiworkforce.com/link-device and enter your code.",
    }

    console.log("Device status polled:", {
      deviceLinkId: deviceLinkId,
      status: response.status,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Device status error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve device link status",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    )
  }
}
