import { NextRequest, NextResponse } from "next/server"

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
    // TODO: Check authentication
    // const session = await getServerSession(authOptions)
    // if (!session?.user) return unauthorized()

    const authHeader = request.headers.get("authorization")
    const hasSessionCookie = request.cookies.has("session")

    if (!authHeader && !hasSessionCookie) {
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

    // TODO: Lookup device link request in database
    // Example:
    //
    // const deviceLink = await db.deviceLinks.findUnique({
    //   where: { code: code }
    // })
    //
    // if (!deviceLink) {
    //   return NextResponse.json({
    //     error: "Invalid code",
    //     message: "The code you entered is invalid or has expired",
    //     code: "CODE_NOT_FOUND"
    //   }, { status: 404 })
    // }
    //
    // if (deviceLink.expiresAt < new Date()) {
    //   await db.deviceLinks.delete({ where: { id: deviceLink.id } })
    //   return NextResponse.json({
    //     error: "Code expired",
    //     message: "This code has expired. Please try again.",
    //     code: "CODE_EXPIRED"
    //   }, { status: 410 })
    // }
    //
    // if (deviceLink.status === "approved") {
    //   return NextResponse.json({
    //     error: "Code already used",
    //     message: "This code has already been used",
    //     code: "CODE_ALREADY_USED"
    //   }, { status: 409 })
    // }
    //
    // // Generate device access token
    // const deviceToken = generateSecureToken()
    //
    // // Update device link status
    // await db.deviceLinks.update({
    //   where: { id: deviceLink.id },
    //   data: {
    //     status: "approved",
    //     userId: session.user.id,
    //     deviceToken: deviceToken,
    //     approvedAt: new Date(),
    //   }
    // })
    //
    // // Create device record
    // await db.devices.create({
    //   data: {
    //     id: deviceLink.id,
    //     userId: session.user.id,
    //     name: deviceLink.deviceName,
    //     platform: deviceLink.platform,
    //     appVersion: deviceLink.appVersion,
    //     fingerprint: deviceLink.deviceFingerprint,
    //     token: deviceToken,
    //     linkedAt: new Date(),
    //     lastSeenAt: new Date(),
    //   }
    // })

    // Mock response for development
    const mockResponse = {
      success: true,
      deviceLinkId: `link_${Date.now()}_mock`,
      deviceName: "Demo Device",
      platform: "windows",
    }

    console.log("Device link completed:", {
      code: code,
      deviceLinkId: mockResponse.deviceLinkId,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(mockResponse, { status: 200 })
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
