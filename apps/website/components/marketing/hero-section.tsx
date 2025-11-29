"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, Download, Play, CheckCircle2, TrendingUp, Clock, Shield } from "lucide-react"
import { DemoVideoModal } from "@/components/marketing/demo-video-modal"

export function HeroSection() {
  const [showDemoModal, setShowDemoModal] = React.useState(false)

  return (
    <>
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Enhanced Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl text-center space-y-8">
            {/* Announcement Badge */}
            <div className="inline-flex animate-fade-in">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
                <Sparkles className="h-3.5 w-3.5 mr-2 inline" />
                <span>🚀 Early Access: Desktop Automation Platform • Built with Tauri + Rust • Open Source</span>
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up">
              Build Your{" "}
              <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Workforce
              </span>
              {" "}with Desktop Automation
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-100">
              Free, open-source desktop automation platform built with Tauri and Rust. Create powerful workflows with visual builders, browser automation, and multi-LLM support.
              <span className="block mt-2 font-semibold text-foreground">Early access alpha. Use with free Ollama or your own API keys. Active development.</span>
            </p>

            {/* Key benefits pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                <span>Built with Tauri + Rust</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                <span>Visual Workflow Builder</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                <span>Multi-LLM Support</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up animation-delay-300">
              <Button size="xl" asChild className="text-base group">
                <Link href="/download">
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  <span>Download Free</span>
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-base group"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                <span>Watch 2-min Demo</span>
              </Button>
            </div>

            {/* Below button text */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground animate-fade-in-up animation-delay-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                Free desktop application
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                No subscriptions ever
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                Open source on GitHub
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 animate-fade-in-up animation-delay-500">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div className="text-3xl font-bold">100%</div>
                </div>
                <p className="text-sm text-muted-foreground">Free & Open Source</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div className="text-3xl font-bold">Alpha</div>
                </div>
                <p className="text-sm text-muted-foreground">Early Access</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div className="text-3xl font-bold">MIT</div>
                </div>
                <p className="text-sm text-muted-foreground">License</p>
              </div>
            </div>

            {/* Solo Founder Notice */}
            <div className="pt-12 space-y-4 animate-fade-in-up animation-delay-600">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Solo Founder Project • Alpha Software • Use at Your Own Risk
              </p>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Built by one developer. Expect bugs. No support team. No guarantees. Contributions welcome on GitHub.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DemoVideoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </>
  )
}
