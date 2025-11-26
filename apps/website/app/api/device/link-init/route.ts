import { NextRequest, NextResponse } from "next/server"

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
 *
 * TODO: Integration Requirements:
 * - Store device link requests in database (Redis or PostgreSQL)
 * - Generate secure random codes
 * - Set expiration (10 minutes recommended)
 * - Rate limit this endpoint to prevent abuse
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

    // TODO: Generate actual device link ID and code
    // Example implementation:
    //
    // const deviceLinkId = generateId("link_")
    // const code = generateSecureCode(6) // e.g., "XYZABC"
    // const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    //
    // await db.deviceLinks.create({
    //   id: deviceLinkId,
    //   code: code,
    //   deviceName: body.deviceName,
    //   platform: body.platform,
    //   appVersion: body.appVersion,
    //   deviceFingerprint: body.deviceFingerprint,
    //   status: "pending",
    //   expiresAt: expiresAt,
    //   createdAt: new Date(),
    // })

    // Mock response for development
    const mockResponse = {
      deviceLinkId: `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      code: generateMockCode(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      verificationUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://agiworkforce.com"}/link-device?code=${generateMockCode()}`,
    }

    console.log("Device link initiated:", {
      deviceLinkId: mockResponse.deviceLinkId,
      deviceName: body.deviceName,
      platform: body.platform,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(mockResponse, { status: 200 })
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

/**
 * Generates a mock 6-character code for development
 * TODO: Replace with cryptographically secure random code generator
 */
function generateMockCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // Excluding ambiguous chars
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}
