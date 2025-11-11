"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
    // Initialize analytics here if needed
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto border-2 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">We use cookies</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to improve your experience. By continuing, you agree to our{" "}
                <Link href="/cookies" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
              <Button variant="outline" onClick={handleReject} className="flex-1 md:flex-none">
                Reject All
              </Button>
              <Button onClick={handleAccept} className="flex-1 md:flex-none">
                Accept All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
