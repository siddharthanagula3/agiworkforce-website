import { NextRequest, NextResponse } from "next/server"

/**
 * Windows Desktop App Download Endpoint
 *
 * This endpoint redirects to the latest Windows installer for AGI Workforce.
 * The actual installer URL is configured via environment variable to allow
 * easy updates without code changes.
 *
 * GET /api/download/windows/latest
 *
 * Environment Variables:
 * - AGI_WORKFORCE_WIN_DOWNLOAD_URL: Full URL to the latest .exe or .msi installer
 *
 * Example URLs:
 * - GitHub Release: https://github.com/org/repo/releases/download/v1.3.0/AGIWorkforceSetup.exe
 * - S3/R2/GCS: https://downloads.agiworkforce.com/windows/AGIWorkforceSetup-1.3.0.exe
 * - Direct file: https://agiworkforce.com/downloads/AGIWorkforceSetup.exe
 *
 * Responses:
 * - 302: Redirects to the installer download URL
 * - 503: Service unavailable if download URL is not configured
 */
export async function GET(request: NextRequest) {
  try {
    const downloadUrl = process.env.AGI_WORKFORCE_WIN_DOWNLOAD_URL

    // Check if download URL is configured
    if (!downloadUrl || downloadUrl.trim() === "") {
      console.error("AGI_WORKFORCE_WIN_DOWNLOAD_URL environment variable is not set")

      return NextResponse.json(
        {
          error: "Download temporarily unavailable",
          message: "The Windows installer download is not configured. Please contact support.",
          code: "DOWNLOAD_NOT_CONFIGURED",
        },
        { status: 503 }
      )
    }

    // Validate URL format
    try {
      new URL(downloadUrl)
    } catch {
      console.error("AGI_WORKFORCE_WIN_DOWNLOAD_URL is not a valid URL:", downloadUrl)

      return NextResponse.json(
        {
          error: "Download configuration error",
          message: "The download URL is misconfigured. Please contact support.",
          code: "INVALID_DOWNLOAD_URL",
        },
        { status: 503 }
      )
    }

    // Log download attempt for analytics (optional)
    console.log("Windows download redirect:", {
      url: downloadUrl,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    })

    // Redirect to the installer download URL
    return NextResponse.redirect(downloadUrl, 302)
  } catch (error) {
    console.error("Download endpoint error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again later.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 * Allows the download endpoint to be called from any origin
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
