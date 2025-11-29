"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, GitBranch, Database, Sparkles, TrendingUp, Shield } from "lucide-react"

export function WhatsNewSection() {
  const updates = [
    {
      icon: Zap,
      badge: "Performance",
      title: "Claude 4.5 Haiku Integration",
      description: "4-5x faster execution with Claude Haiku 4.5 for rapid task completion. 66% cost reduction while maintaining quality.",
      highlights: [
        "Tasks complete in under 30 seconds",
        "Hybrid strategy: Sonnet for planning, Haiku for execution",
        "Best-in-class 77.2% SWE-bench score"
      ]
    },
    {
      icon: GitBranch,
      badge: "Parallel Execution",
      title: "8+ Agent Parallelization",
      description: "Cursor 2.0-style parallel agent execution with automatic result comparison and ranking.",
      highlights: [
        "8 agents run simultaneously with different strategies",
        "Isolated sandboxes with Git worktrees",
        "Best result auto-selected and applied"
      ]
    },
    {
      icon: Database,
      badge: "Caching",
      title: "3-Tier Caching System",
      description: "Multi-level caching for responses, tools, and codebase analysis. Reduces latency and costs dramatically.",
      highlights: [
        "Response cache: Instant answers for repeated queries",
        "Tool cache: Pre-computed tool outputs",
        "Codebase cache: Fast code analysis and search"
      ]
    },
    {
      icon: Sparkles,
      badge: "Enterprise",
      title: "2026 Enterprise Features",
      description: "Agent templates, browser visualization, enhanced input composer, and visual workflow editor.",
      highlights: [
        "50+ pre-built agent templates",
        "Real-time browser automation visualization",
        "Advanced governance & compliance"
      ]
    },
    {
      icon: TrendingUp,
      badge: "LLMs",
      title: "Latest AI Models (Nov 2025)",
      description: "Support for GPT-5, Claude 4.5 (Sonnet & Opus), Gemini 2.5 Pro, O3, and more cutting-edge models.",
      highlights: [
        "GPT-5 for advanced reasoning",
        "Gemini 2.5 Pro with 1M context window",
        "DeepSeek V3 for specialized coding"
      ]
    },
    {
      icon: Shield,
      badge: "Security",
      title: "Security & Governance",
      description: "Enterprise-grade security with audit trails, compliance reporting, and advanced permission management.",
      highlights: [
        "Complete action audit logs",
        "SOC 2 Type II compliance",
        "Role-based access control (RBAC)"
      ]
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="px-3 py-1">
              November 2025 Update
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What&apos;s New in AGI Workforce
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Major improvements based on competitive analysis and 2026 enterprise requirements. Production-ready features delivered ahead of schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <update.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{update.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{update.title}</CardTitle>
                  <CardDescription>{update.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {update.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              🚀 <strong>All features are live and production-ready</strong> • View complete changelog in{" "}
              <a
                href="https://github.com/siddharthanagula3/agiworkforce-desktop-app/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
