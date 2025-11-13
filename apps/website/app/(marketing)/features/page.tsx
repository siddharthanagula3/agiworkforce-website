import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Workflow,
  Globe,
  Monitor,
  Brain,
  Database,
  Eye,
  Calendar,
  Shield,
  Zap,
  Code,
  GitBranch,
  MessageSquare,
  Check,
  Users,
  Share2,
  TrendingUp,
  DollarSign
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features - Powerful Automation Tools",
  description: "Explore all the powerful features of AGI Workforce. Visual automation builder, browser control, desktop automation, multi-LLM orchestration, and more.",
  openGraph: {
    title: "AGI Workforce Features - Powerful Automation Tools",
    description: "Visual workflow builder, multi-LLM orchestration, browser automation, desktop control, and more. Automate anything.",
    url: "https://agiworkforce.com/features",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Workforce Features - Powerful Automation Tools",
    description: "Visual workflow builder, multi-LLM orchestration, browser automation, and more.",
  },
}

export default function FeaturesPage() {
  const features = [
    {
      icon: Users,
      title: "👥 AI Employee Library (NEW 2026)",
      description: "20+ pre-trained AI employees ready to deploy in under 60 seconds.",
      details: [
        "Instant deployment with zero configuration",
        "20+ specialized roles (Support, Sales, Engineering, etc.)",
        "Interactive demos showing ROI in 45-55 seconds",
        "Each employee saves 4-12 hours/day on average",
        "Annual cost savings of $18K-$48K per employee",
        "Works 24/7 across Slack, Teams, WhatsApp"
      ]
    },
    {
      icon: Share2,
      title: "🛒 Workflow Marketplace (NEW 2026)",
      description: "50+ community workflows with viral sharing to 6+ social platforms.",
      details: [
        "One-click install from 50+ curated templates",
        "10M+ total workflow downloads",
        "Share to Twitter, LinkedIn, Slack, Discord, Reddit, HN",
        "Fork and customize any workflow instantly",
        "Rate and review community contributions",
        "Earn contributor rewards for popular workflows"
      ]
    },
    {
      icon: TrendingUp,
      title: "📊 Real-Time ROI Dashboard (NEW 2026)",
      description: "Live metrics proving value with <250ms update latency.",
      details: [
        "Real-time tracking of time saved, cost saved, automations run",
        "Beautiful charts showing 30-day trends",
        "Milestone celebrations (100 hours saved, $10K saved, etc.)",
        "Period-over-period comparisons",
        "Manual vs. automated efficiency metrics",
        "One-click export to PDF/CSV for stakeholders"
      ]
    },
    {
      icon: DollarSign,
      title: "💰 Outcome-Based Pricing (NEW 2026)",
      description: "Pay only for successful results - failed automations are free.",
      details: [
        "$0.50 per successful automation (failures free)",
        "Real-time usage tracking and cost calculator",
        "Transparent invoicing with itemized breakdowns",
        "ROI guarantee for Enterprise (refund if not met)",
        "Free tier: 10 hours/month at no cost",
        "Pro tier: Unlimited for $39/month"
      ]
    },
    {
      icon: MessageSquare,
      title: "💬 Messaging Platform Integration (NEW 2026)",
      description: "Work where your team works - Slack, Teams, WhatsApp support.",
      details: [
        "Slack: Commands, interactive buttons, threaded replies",
        "Microsoft Teams: Cards, adaptive actions, bot mentions",
        "WhatsApp Business API for customer support",
        "Real-time notifications and alerts",
        "Bidirectional sync with desktop app",
        "Secure OAuth2 authentication for all platforms"
      ]
    },
    {
      icon: Zap,
      title: "⚡ Parallel Agent Execution",
      description: "8+ agents run simultaneously with Cursor 2.0-style result comparison.",
      details: [
        "8 agents execute with different strategies in parallel",
        "Isolated sandboxes using Git worktrees",
        "Automatic result scoring and ranking",
        "Best solution auto-selected and applied",
        "Tasks complete in under 30 seconds",
        "4-5x faster than sequential execution"
      ]
    },
    {
      icon: Brain,
      title: "🧠 Hybrid LLM Strategy (NEW 2026)",
      description: "Claude 4.5 Sonnet for planning, Haiku 4.5 for execution - best of both worlds.",
      details: [
        "Sonnet 4.5: 77.2% SWE-bench for complex planning",
        "Haiku 4.5: 4-5x faster for rapid execution",
        "66% cost reduction without quality loss",
        "Support for GPT-5, O3, Gemini 2.5 Pro",
        "Automatic model selection per task",
        "Smart fallback to ensure reliability"
      ]
    },
    {
      icon: Database,
      title: "💾 3-Tier Caching System (NEW 2026)",
      description: "Response, tool, and codebase caching for instant results.",
      details: [
        "Response cache: Instant answers for repeated queries",
        "Tool cache: Pre-computed tool outputs saved",
        "Codebase cache: Fast code analysis with incremental updates",
        "Configurable TTL per cache layer",
        "Automatic cache invalidation on changes",
        "Reduces API calls by up to 80%"
      ]
    },
    {
      icon: Workflow,
      title: "Visual Automation Builder",
      description: "Build complex workflows without writing a single line of code.",
      details: [
        "Drag-and-drop interface with 19+ integrated tools",
        "Node-based flow editor for visual workflow design",
        "50+ pre-built agent templates for common tasks",
        "Real-time testing and debugging capabilities",
        "Export and share workflows with your team",
        "Version control for workflow iterations"
      ]
    },
    {
      icon: Globe,
      title: "Browser Automation",
      description: "Control any website with Playwright-powered automation.",
      details: [
        "Headless and visible browser modes",
        "Handle dynamic content and AJAX requests",
        "Cookie and session management",
        "JavaScript execution support",
        "Multi-tab and multi-window support",
        "Screenshot and PDF generation"
      ]
    },
    {
      icon: Monitor,
      title: "Desktop UI Automation",
      description: "Automate any Windows application, even without APIs.",
      details: [
        "Native UI Automation API integration",
        "Click buttons and fill forms automatically",
        "Extract text from any application",
        "Element caching for improved performance",
        "Retry logic for reliability",
        "Support for legacy applications"
      ]
    },
    {
      icon: Brain,
      title: "Multi-LLM Intelligence",
      description: "Route tasks to the best AI model for optimal results.",
      details: [
        "Support for OpenAI, Anthropic, Google, Ollama",
        "Automatic model selection based on task type",
        "Cost tracking and optimization",
        "Quality-based fallback logic",
        "Local LLM support for privacy",
        "Custom model configuration"
      ]
    },
    {
      icon: Database,
      title: "Database & API Integration",
      description: "Connect to any data source or REST API.",
      details: [
        "SQLite, PostgreSQL, MySQL, MongoDB support",
        "REST API calls with authentication",
        "OAuth2 and API key management",
        "GraphQL query support",
        "Webhook triggers",
        "Data transformation and mapping"
      ]
    },
    {
      icon: Eye,
      title: "Vision & OCR",
      description: "See and understand your screen like a human.",
      details: [
        "Full screen and region capture",
        "High-accuracy OCR text extraction",
        "Image-based element location",
        "Visual testing and validation",
        "Screenshot comparison",
        "PDF text extraction"
      ]
    },
    {
      icon: Calendar,
      title: "Scheduling & Triggers",
      description: "Run automations on your schedule or based on events.",
      details: [
        "Cron-based scheduling",
        "File watcher triggers",
        "Email triggers",
        "Webhook triggers",
        "System event triggers",
        "Time-based conditions"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security for your automation workflows.",
      details: [
        "Windows Credential Manager integration",
        "DPAPI encryption for API keys",
        "SOC 2 compliance",
        "Audit logs",
        "Role-based access control",
        "On-premise deployment option"
      ]
    },
    {
      icon: Zap,
      title: "Performance & Scale",
      description: "Fast execution with enterprise-grade reliability.",
      details: [
        "Parallel workflow execution",
        "Resource optimization",
        "99.9% uptime SLA",
        "Auto-retry on failures",
        "Error handling and recovery",
        "Performance monitoring"
      ]
    },
    {
      icon: Code,
      title: "Developer Tools",
      description: "Advanced features for power users and developers.",
      details: [
        "Python and JavaScript scripting",
        "CLI for automation management",
        "REST API for integrations",
        "SDK for custom tools",
        "Git integration for workflows",
        "CI/CD pipeline support"
      ]
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Track changes and collaborate on workflows.",
      details: [
        "Workflow version history",
        "Rollback to previous versions",
        "Branch and merge workflows",
        "Team collaboration features",
        "Change tracking and audit",
        "Export and import capabilities"
      ]
    },
    {
      icon: MessageSquare,
      title: "Natural Language Interface",
      description: "Describe what you want in plain English.",
      details: [
        "Chat-based workflow creation",
        "Natural language commands",
        "Intent understanding",
        "Conversational debugging",
        "Workflow suggestions",
        "Context-aware assistance"
      ]
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-background" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Every Feature You Need to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Automate Anything
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From visual workflow builders to enterprise-grade security, AGI Workforce has everything you need to automate your most complex processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild>
                <Link href="/download">Start Free Trial</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-success-400 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Try AGI Workforce free for 14 days. No credit card required.
            </p>
            <Button size="lg" asChild>
              <Link href="/download">Download for Windows</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
