import { NextRequest, NextResponse } from "next/server"

/**
 * Current User Profile & Plan Endpoint
 *
 * This endpoint returns the authenticated user's profile and subscription plan.
 * The desktop app calls this endpoint to determine what features to enable.
 *
 * GET /api/me
 *
 * Authentication:
 * - Requires session cookie or Bearer token
 * - TODO: Integrate with actual auth system (NextAuth, Supabase, Clerk, etc.)
 *
 * Response (200 OK):
 * {
 *   "id": "user_123abc",
 *   "email": "user@example.com",
 *   "displayName": "John Doe",
 *   "plan": "free" | "pay-per-result" | "pro" | "enterprise",
 *   "planStatus": "active" | "trial" | "cancelled" | "past_due",
 *   "trialEndsAt": "2025-12-01T00:00:00Z",
 *   "featureFlags": {
 *     "automation_hours_limit": 10,
 *     "cloud_llms_enabled": false,
 *     "browser_automation_enabled": false,
 *     "database_integrations_enabled": false,
 *     "api_integrations_enabled": false,
 *     "workspace_limit": 1,
 *     "priority_support": false
 *   },
 *   "linkedDevices": [
 *     {
 *       "id": "device_xyz",
 *       "name": "Work Laptop",
 *       "platform": "windows",
 *       "linkedAt": "2025-11-15T10:30:00Z",
 *       "lastSeenAt": "2025-11-26T08:45:00Z"
 *     }
 *   ]
 * }
 *
 * Response (401 Unauthorized):
 * {
 *   "error": "Unauthorized",
 *   "message": "Authentication required",
 *   "code": "AUTH_REQUIRED"
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Replace this with actual authentication
    // Example integrations:
    //
    // NextAuth.js:
    // const session = await getServerSession(authOptions)
    // if (!session?.user) return unauthorized()
    //
    // Supabase:
    // const { data: { session } } = await supabase.auth.getSession()
    // if (!session) return unauthorized()
    //
    // Clerk:
    // const { userId } = auth()
    // if (!userId) return unauthorized()
    //
    // Custom JWT:
    // const token = request.headers.get("authorization")?.replace("Bearer ", "")
    // const user = await verifyToken(token)

    const authHeader = request.headers.get("authorization")
    const hasSessionCookie = request.cookies.has("session")

    // Check for authentication
    if (!authHeader && !hasSessionCookie) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Authentication required. Please sign in first.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 }
      )
    }

    // TODO: Get actual user data from database
    // This is a mock response for development/testing
    // Replace with actual database query once auth is integrated
    const mockUser = {
      id: "user_demo_123",
      email: "demo@example.com",
      displayName: "Demo User",
      plan: "free" as const,
      planStatus: "active" as const,
      trialEndsAt: null,
      featureFlags: getPlanFeatureFlags("free"),
      linkedDevices: [
        {
          id: "device_mock_1",
          name: "Demo Windows PC",
          platform: "windows",
          linkedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          lastSeenAt: new Date().toISOString(),
        },
      ],
    }

    console.log("User profile requested:", {
      userId: mockUser.id,
      plan: mockUser.plan,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(mockUser, { status: 200 })
  } catch (error) {
    console.error("User profile endpoint error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve user profile",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    )
  }
}

/**
 * Helper function to map plan names to feature flags
 * This should eventually come from a database or configuration
 */
function getPlanFeatureFlags(plan: "free" | "pay-per-result" | "pro" | "enterprise") {
  const featureFlagsByPlan = {
    free: {
      automation_hours_limit: 10,
      cloud_llms_enabled: false,
      browser_automation_enabled: false,
      database_integrations_enabled: false,
      api_integrations_enabled: false,
      workspace_limit: 1,
      priority_support: false,
      advanced_analytics: false,
      custom_ai_training: false,
      sso_enabled: false,
      on_premise_deployment: false,
    },
    "pay-per-result": {
      automation_hours_limit: -1, // unlimited
      cloud_llms_enabled: true,
      browser_automation_enabled: true,
      database_integrations_enabled: true,
      api_integrations_enabled: true,
      workspace_limit: 5,
      priority_support: true,
      advanced_analytics: true,
      custom_ai_training: false,
      sso_enabled: false,
      on_premise_deployment: false,
    },
    pro: {
      automation_hours_limit: -1, // unlimited
      cloud_llms_enabled: true,
      browser_automation_enabled: true,
      database_integrations_enabled: true,
      api_integrations_enabled: true,
      workspace_limit: 5,
      priority_support: true,
      advanced_analytics: true,
      custom_ai_training: true,
      sso_enabled: false,
      on_premise_deployment: false,
    },
    enterprise: {
      automation_hours_limit: -1, // unlimited
      cloud_llms_enabled: true,
      browser_automation_enabled: true,
      database_integrations_enabled: true,
      api_integrations_enabled: true,
      workspace_limit: -1, // unlimited
      priority_support: true,
      advanced_analytics: true,
      custom_ai_training: true,
      sso_enabled: true,
      on_premise_deployment: true,
    },
  }

  return featureFlagsByPlan[plan]
}
