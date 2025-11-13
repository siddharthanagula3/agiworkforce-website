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
                <span>🚀 NEW: Claude 4.5 + Parallel Agent Execution • 4x Faster • Enterprise-Ready 2026</span>
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up">
              Your{" "}
              <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Autonomous Software Engineer
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-100">
              The world's first autonomous AI agent with parallel execution. Powered by Claude 4.5 Sonnet (77.2% SWE-bench), GPT-5, and Gemini 2.5 Pro.
              <span className="block mt-2 font-semibold text-foreground">4x faster than traditional tools. 98.7% lower token costs via MCP.</span>
            </p>

            {/* Key benefits pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                <span>8+ Parallel Agents (Cursor 2.0 Style)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                <span>Claude 4.5 Haiku (4-5x Faster)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success-400" />
                <span>3-Tier Caching System</span>
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
                  <div className="text-3xl font-bold">4-5x</div>
                </div>
                <p className="text-sm text-muted-foreground">Faster Execution</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div className="text-3xl font-bold">&lt;30s</div>
                </div>
                <p className="text-sm text-muted-foreground">Task Completion</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div className="text-3xl font-bold">66%</div>
                </div>
                <p className="text-sm text-muted-foreground">Cost Reduction</p>
              </div>
            </div>

            {/* Social Proof - Company logos */}
            <div className="pt-12 space-y-4 animate-fade-in-up animation-delay-600">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Trusted by teams at leading companies
              </p>
              {/* Placeholder for company logos */}
              <div className="flex justify-center items-center gap-8 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="h-10 w-24 bg-foreground/10 rounded flex items-center justify-center text-xs font-semibold">
                  Company A
                </div>
                <div className="h-10 w-24 bg-foreground/10 rounded flex items-center justify-center text-xs font-semibold">
                  Company B
                </div>
                <div className="h-10 w-24 bg-foreground/10 rounded flex items-center justify-center text-xs font-semibold">
                  Company C
                </div>
                <div className="h-10 w-24 bg-foreground/10 rounded flex items-center justify-center text-xs font-semibold">
                  Company D
                </div>
                <div className="h-10 w-24 bg-foreground/10 rounded flex items-center justify-center text-xs font-semibold">
                  Company E
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoVideoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </>
  )
}
