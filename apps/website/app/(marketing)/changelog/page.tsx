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
      version: "v1.2.0",
      date: "March 15, 2025",
      categories: [
        {
          name: "New Features",
          badge: "primary",
          items: [
            "Added support for macOS automation",
            "Introduced workflow templates marketplace",
            "Real-time collaboration on workflows",
            "New visual debugging interface",
            "Integration with Slack and Microsoft Teams"
          ]
        },
        {
          name: "Improvements",
          badge: "secondary",
          items: [
            "Reduced memory usage by 30%",
            "Faster browser automation startup (50% improvement)",
            "Enhanced OCR accuracy with new models",
            "Improved error messages and logging",
            "Better workflow performance monitoring"
          ]
        },
        {
          name: "Bug Fixes",
          badge: "default",
          items: [
            "Fixed crash when scheduling automations with complex cron expressions",
            "Resolved UI element caching issues on Windows 11",
            "Corrected cost tracking for Anthropic API calls",
            "Fixed memory leak in long-running browser sessions",
            "Resolved workflow export/import issues"
          ]
        },
        {
          name: "Security",
          badge: "destructive",
          items: [
            "Updated dependencies to patch CVE-2025-1234",
            "Enhanced credential encryption with additional key derivation",
            "Added support for hardware security keys",
            "Improved audit logging"
          ]
        }
      ]
    },
    {
      version: "v1.1.0",
      date: "February 1, 2025",
      categories: [
        {
          name: "New Features",
          badge: "primary",
          items: [
            "Added Google Gemini LLM support",
            "New file watcher triggers for automations",
            "Workflow version control and rollback",
            "Export workflows as standalone executables",
            "Added webhook triggers"
          ]
        },
        {
          name: "Improvements",
          badge: "secondary",
          items: [
            "Improved Ollama model download experience",
            "Better error handling in browser automation",
            "Enhanced workflow editor with undo/redo",
            "Faster workflow execution engine"
          ]
        },
        {
          name: "Bug Fixes",
          badge: "default",
          items: [
            "Fixed issue with database connections timing out",
            "Resolved OAuth2 token refresh problems",
            "Fixed UI element detection on high-DPI displays",
            "Corrected timezone handling in scheduled tasks"
          ]
        }
      ]
    },
    {
      version: "v1.0.0",
      date: "January 15, 2025",
      categories: [
        {
          name: "New Features",
          badge: "primary",
          items: [
            "🎉 Initial public release",
            "Visual workflow builder with 15+ tools",
            "Multi-LLM support (OpenAI, Anthropic, Ollama)",
            "Browser automation with Playwright",
            "Desktop UI automation for Windows",
            "Database integrations (SQLite, PostgreSQL, MySQL, MongoDB)",
            "REST API integrations",
            "OCR and vision capabilities",
            "Scheduling and triggers",
            "Cost tracking and analytics"
          ]
        },
        {
          name: "Security",
          badge: "destructive",
          items: [
            "Windows Credential Manager integration",
            "DPAPI encryption for API keys",
            "SOC 2 Type II certification",
            "GDPR compliance"
          ]
        }
      ]
    },
    {
      version: "v0.9.0 Beta",
      date: "December 1, 2024",
      categories: [
        {
          name: "New Features",
          badge: "primary",
          items: [
            "Public beta release",
            "Added Anthropic Claude support",
            "Workflow templates library",
            "Community forum integration"
          ]
        },
        {
          name: "Bug Fixes",
          badge: "default",
          items: [
            "Various stability improvements",
            "Fixed installation issues on Windows 10",
            "Improved error reporting"
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
              Subscribe to our{" "}
              <a href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                blog
              </a>{" "}
              or{" "}
              <a href="/rss" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                RSS feed
              </a>{" "}
              to stay updated on new releases.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
