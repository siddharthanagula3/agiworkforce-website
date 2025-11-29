import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Changelog - What's New",
  description: "See what's new in AGI Workforce. Track new features, improvements, bug fixes, and security updates.",
  openGraph: {
    title: "AGI Workforce Changelog - What's New",
    description: "Track new features, improvements, bug fixes, and security updates for AGI Workforce.",
    url: "https://agiworkforce.com/changelog",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Workforce Changelog - What's New",
    description: "Track new features, improvements, bug fixes, and security updates.",
  },
}

export default function ChangelogPage() {
  const releases = [
    {
      version: "v0.1.0-alpha",
      date: "November 2025",
      categories: [
        {
          name: "Current Features",
          badge: "primary",
          items: [
            "🚀 Early access alpha release",
            "Desktop automation framework (Windows only)",
            "Visual workflow builder (basic)",
            "Browser automation with Playwright",
            "Desktop UI automation for Windows apps",
            "Multi-LLM support (OpenAI, Anthropic, Google, Ollama)",
            "Free local LLM support via Ollama",
            "Built with Tauri + Rust for performance",
            "MIT licensed - 100% free and open source"
          ]
        },
        {
          name: "Known Issues",
          badge: "destructive",
          items: [
            "Alpha software - expect bugs",
            "Windows 10/11 only (macOS/Linux in development)",
            "Limited documentation",
            "No official support - community only",
            "Features are actively being developed"
          ]
        },
        {
          name: "Coming Soon",
          badge: "secondary",
          items: [
            "AI employee library (in development)",
            "Workflow marketplace (planned)",
            "ROI dashboard (planned)",
            "macOS and Linux support (Q2 2026)",
            "Slack/Teams integration (planned)",
            "Better documentation and tutorials"
          ]
        }
      ]
    }
  ]

  const getBadgeVariant = (badge: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (badge) {
      case "primary":
        return "default"
      case "destructive":
        return "destructive"
      case "secondary":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Changelog
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Track new features, improvements, bug fixes, and security updates for AGI Workforce.
            </p>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {releases.map((release, releaseIndex) => (
              <Card key={releaseIndex} className="border-2">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{release.version}</CardTitle>
                    <time className="text-sm text-muted-foreground">
                      {release.date}
                    </time>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    {release.categories.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant={getBadgeVariant(category.badge)}>
                            {category.name}
                          </Badge>
                        </div>
                        <ul className="space-y-2 ml-4">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Follow development on{" "}
              <a href="https://github.com/siddharthanagula3/agiworkforce-desktop-app" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                GitHub
              </a>{" "}
              to stay updated on new releases.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
