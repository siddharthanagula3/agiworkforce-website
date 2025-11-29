import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Users,
  Headphones,
  Puzzle,
  Lock,
  BarChart,
  Clock,
  Globe,
  Check
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/contact-form"

export const metadata: Metadata = {
  title: "Roadmap - Future Enterprise Plans",
  description: "Future enterprise features being considered. Currently in alpha - free for everyone. Built by solo founder.",
  openGraph: {
    title: "AGI Workforce Roadmap - Future Plans",
    description: "Future enterprise features under consideration. Currently 100% free alpha software.",
    url: "https://agiworkforce.com/enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Workforce Roadmap - Future Plans",
    description: "Future enterprise features under consideration.",
  },
}

export default function EnterprisePage() {
  const enterpriseFeatures = [
    {
      icon: Shield,
      title: "Advanced Security (Idea)",
      description: "Potential future security features - not currently available.",
      details: [
        "Security certifications (not yet obtained)",
        "Compliance features (future consideration)",
        "On-premise deployment (under research)",
        "Enhanced encryption (planned)",
        "Audit logging (in development)",
        "Note: Currently basic desktop app security only"
      ]
    },
    {
      icon: Users,
      title: "Team Features (Idea)",
      description: "Multi-user features under consideration - not available yet.",
      details: [
        "Team management (planned)",
        "Access control (future)",
        "Shared workspaces (under consideration)",
        "Analytics (in development)",
        "Workflow sharing (planned)",
        "Note: Solo founder - no team features yet"
      ]
    },
    {
      icon: Headphones,
      title: "Support (Future)",
      description: "Currently community support only via GitHub Issues.",
      details: [
        "Solo founder - no dedicated support team",
        "GitHub Issues for bug reports",
        "Community discussions planned",
        "Documentation in progress",
        "No SLAs or guarantees",
        "Best-effort support when available"
      ]
    },
    {
      icon: Puzzle,
      title: "API & Integrations (Idea)",
      description: "Future API access under consideration.",
      details: [
        "REST API (planned)",
        "Webhook support (future)",
        "SDK development (under consideration)",
        "Plugin system (researching)",
        "Note: Desktop app only currently",
        "No timeline for API access"
      ]
    },
    {
      icon: Lock,
      title: "SSO & Auth (Future)",
      description: "Enterprise authentication - far future consideration.",
      details: [
        "Currently: local desktop app only",
        "SAML (not planned yet)",
        "OAuth2 (under research)",
        "Directory sync (distant future)",
        "MFA (basic only)",
        "Note: Solo founder - no timeline"
      ]
    },
    {
      icon: BarChart,
      title: "Analytics (Planned)",
      description: "Usage analytics being considered.",
      details: [
        "Basic tracking (in development)",
        "Dashboards (future)",
        "Cost tracking (planned)",
        "Performance metrics (idea)",
        "ROI calculations (distant future)",
        "Note: No analytics currently"
      ]
    },
    {
      icon: Clock,
      title: "Reliability (No SLA)",
      description: "Alpha software - no guarantees.",
      details: [
        "No SLA - alpha software",
        "No uptime guarantees",
        "Desktop app - runs locally",
        "Best-effort stability",
        "Bugs expected",
        "Use at your own risk"
      ]
    },
    {
      icon: Globe,
      title: "Multi-Platform (Planned)",
      description: "macOS and Linux support in development.",
      details: [
        "Windows only currently",
        "macOS support (Q2 2026 target)",
        "Linux support (Q2 2026 target)",
        "Cloud deployment (distant future)",
        "No timeline confirmed",
        "Solo founder - slow progress"
      ]
    }
  ]

  const benefits = [
    "Unlimited workspaces for your entire organization",
    "Volume discounts for large teams",
    "Custom contract terms and annual billing",
    "Migration assistance from existing tools",
    "Dedicated success team",
    "Priority feature requests",
    "White-glove implementation",
    "Compliance and security certifications"
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-background" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Future{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Enterprise Plans
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Potential enterprise features under consideration. Currently in alpha - 100% free for everyone. Built by solo founder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild>
                <Link href="/download">Download Free Alpha</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="https://github.com/siddharthanagula3/agiworkforce-desktop-app">Star on GitHub</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Potential Future Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ideas being considered for future releases - no promises or timeline. Software is currently free and in alpha.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2">
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

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Current Reality: Solo Founder Project
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                <span className="text-lg">100% free alpha software</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                <span className="text-lg">Built by solo founder</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                <span className="text-lg">Open source on GitHub</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                <span className="text-lg">MIT licensed</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                <span className="text-lg">Community support via GitHub</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                <span className="text-lg">Early alpha - expect bugs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              No Pricing - It&apos;s Free
            </h2>
            <p className="text-lg text-muted-foreground">
              Currently in alpha. 100% free. Built by solo founder. No enterprise team, no sales team, no support team.
            </p>

            <Card className="border-2 max-w-xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Download & Contribute</CardTitle>
                <CardDescription className="text-base">
                  Free alpha software - try it, report bugs, contribute code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>100% free - no payment ever</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Open source MIT license</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Report bugs on GitHub</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Contributions welcome</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/download">Download Free Alpha</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
