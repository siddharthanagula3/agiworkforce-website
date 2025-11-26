import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  // Get linked devices
  const { data: devices } = await supabase
    .from("devices")
    .select("*")
    .eq("user_id", user.id)
    .order("linked_at", { ascending: false })

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Profile */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="text-base">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Display Name
            </label>
            <p className="text-base">{profile?.display_name || "Not set"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Current Plan
            </label>
            <p className="text-base capitalize font-medium">
              {profile?.plan || "Free"}
            </p>
            <p className="text-sm text-muted-foreground">
              Status: {profile?.plan_status || "active"}
            </p>
          </div>

          {profile?.plan === "free" ? (
            <div className="space-y-2">
              <Button asChild>
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            </div>
          ) : (
            <form action="/api/stripe/portal" method="POST">
              <Button type="submit" variant="outline">
                Manage Subscription
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Linked Devices */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Linked Devices</CardTitle>
          <CardDescription>Devices connected to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {devices && devices.length > 0 ? (
            <div className="space-y-3">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {device.platform} • Linked{" "}
                      {new Date(device.linked_at).toLocaleDateString()}
                    </p>
                  </div>
                  {/* Add revoke button here later */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No devices linked yet. Download the desktop app to get started.
            </p>
          )}

          <Button asChild className="mt-4" variant="outline">
            <Link href="/download">Download Desktop App</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardHeader>
          <CardTitle>Sign Out</CardTitle>
          <CardDescription>Sign out of your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/signout" method="POST">
            <Button type="submit" variant="destructive">
              Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
