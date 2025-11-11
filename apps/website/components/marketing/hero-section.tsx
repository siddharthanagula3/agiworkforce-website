"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { DemoVideoModal } from "@/components/marketing/demo-video-modal"

export function HeroSection() {
  const [showDemoModal, setShowDemoModal] = React.useState(false)

  return (
    <>
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl text-center space-y-8">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Your Autonomous Workforce,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Automate desktop tasks, browser workflows, and complex processes
              with intelligent multi-LLM orchestration. Built for professionals
              who demand both power and simplicity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="xl" asChild className="text-base">
                <Link href="/download">
                  <span className="flex items-center gap-2">
                    Download for Windows
                  </span>
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-base"
                onClick={() => setShowDemoModal(true)}
              >
                Watch Demo
              </Button>
            </div>

            {/* Below button text */}
            <p className="text-sm text-muted-foreground">
              Free trial • No credit card required
            </p>

            {/* Social Proof */}
            <div className="pt-8 space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Trusted by 10,000+ professionals
              </p>
              {/* Placeholder for user logos/avatars */}
              <div className="flex justify-center items-center gap-4 opacity-50">
                <div className="h-8 w-20 bg-foreground/10 rounded" />
                <div className="h-8 w-20 bg-foreground/10 rounded" />
                <div className="h-8 w-20 bg-foreground/10 rounded" />
                <div className="h-8 w-20 bg-foreground/10 rounded" />
                <div className="h-8 w-20 bg-foreground/10 rounded" />
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="pt-12 animate-bounce">
              <ChevronDown className="h-6 w-6 mx-auto text-muted-foreground" />
              <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
            </div>
          </div>
        </div>
      </section>

      <DemoVideoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </>
  )
}
