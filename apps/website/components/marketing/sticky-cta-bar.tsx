"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Download, Sparkles } from "lucide-react"
import Link from "next/link"

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 300) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-fade-in-down bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-xl">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3 px-4">
          {/* Left side - Message */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm shrink-0">
              <Sparkles className="h-3 w-3 mr-1" />
              50% OFF
            </Badge>
            <p className="text-sm md:text-base font-semibold text-white truncate">
              <span className="hidden sm:inline">Start your 14-day free trial today and save 20 hours/week</span>
              <span className="sm:hidden">Save 20 hours/week - Try free!</span>
            </p>
          </div>

          {/* Right side - CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              size="sm"
              variant="secondary"
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href="/download">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Start Free Trial</span>
                <span className="sm:hidden">Try Free</span>
              </Link>
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
