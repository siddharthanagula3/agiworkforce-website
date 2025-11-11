import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // TODO: Implement actual email sending logic here
    // For now, just log the data
    console.log("Contact form submission:", {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      company: body.company,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    // In production, you would:
    // 1. Send email via SendGrid, Resend, or similar service
    // 2. Store in database
    // 3. Send to CRM system
    // Example with SendGrid:
    // await sendEmail({
    //   to: "support@agiworkforce.com",
    //   from: body.email,
    //   subject: `Contact Form: ${body.firstName} ${body.lastName}`,
    //   text: body.message,
    // })

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
