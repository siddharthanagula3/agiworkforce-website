import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * Current User Profile & Plan Endpoint
 *
 * This endpoint returns the authenticated user's profile and subscription plan.
 * The desktop app calls this endpoint to determine what features to enable.
 *
 * GET /api/me
 *
 * Authentication:
 * - Requires Supabase session cookie or Bearer token (device token)
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
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Authentication required. Please sign in first.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 }
      )
    }

    // Get user profile from database
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError || !userProfile) {
      return NextResponse.json(
        {
          error: "User not found",
          message: "Could not find user profile",
          code: "USER_NOT_FOUND",
        },
        { status: 404 }
      )
    }

    // Get linked devices
    const { data: devices } = await supabase
      .from("devices")
      .select("id, name, platform, linked_at, last_seen_at")
      .eq("user_id", user.id)
      .order("linked_at", { ascending: false })

    const response = {
      id: userProfile.id,
      email: userProfile.email,
      displayName: userProfile.display_name || userProfile.email,
      plan: userProfile.plan as "free" | "pay-per-result" | "pro" | "enterprise",
      planStatus: userProfile.plan_status as "active" | "trial" | "cancelled" | "past_due",
      trialEndsAt: userProfile.trial_ends_at,
      featureFlags: getPlanFeatureFlags(userProfile.plan),
      linkedDevices: (devices || []).map((device) => ({
        id: device.id,
        name: device.name,
        platform: device.platform,
        linkedAt: device.linked_at,
        lastSeenAt: device.last_seen_at,
      })),
    }

    console.log("User profile requested:", {
      userId: user.id,
      plan: userProfile.plan,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(response, { status: 200 })
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
