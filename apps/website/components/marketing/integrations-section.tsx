import { Badge } from "@/components/ui/badge"
import { Database, Globe, Mail, FileText, Calendar, Code, Slack, Github, Cloud, Zap, type LucideIcon } from "lucide-react"

export function IntegrationsSection() {
  const integrations: Array<{name: string; emoji?: string; Icon?: LucideIcon; category: string}> = [
    { name: "OpenAI", emoji: "🤖", category: "AI" },
    { name: "Anthropic", emoji: "🧠", category: "AI" },
    { name: "Ollama", emoji: "🦙", category: "AI" },
    { name: "PostgreSQL", Icon: Database, category: "Database" },
    { name: "MySQL", Icon: Database, category: "Database" },
    { name: "MongoDB", Icon: Database, category: "Database" },
    { name: "SQLite", Icon: Database, category: "Database" },
    { name: "Chrome", Icon: Globe, category: "Browser" },
    { name: "Firefox", Icon: Globe, category: "Browser" },
    { name: "Edge", Icon: Globe, category: "Browser" },
    { name: "Gmail", Icon: Mail, category: "Email" },
    { name: "Outlook", Icon: Mail, category: "Email" },
    { name: "Excel", Icon: FileText, category: "Office" },
    { name: "Word", Icon: FileText, category: "Office" },
    { name: "Google Sheets", Icon: FileText, category: "Office" },
    { name: "Calendar", Icon: Calendar, category: "Productivity" },
    { name: "REST APIs", Icon: Code, category: "Developer" },
    { name: "Slack", Icon: Slack, category: "Communication" },
    { name: "GitHub", Icon: Github, category: "Developer" },
    { name: "Any Windows App", Icon: Cloud, category: "Desktop" },
  ]

  const categories = Array.from(new Set(integrations.map(i => i.category)))

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            200+ Integrations
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Works With Everything You Use
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect to databases, browsers, APIs, desktop apps, and AI models.
            If it runs on your computer, you can automate it.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
            {integrations.map((integration, index) => {
              const IconComponent = integration.Icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-lg border-2 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 bg-card group cursor-pointer"
                >
                  <div className="mb-3 text-3xl group-hover:scale-110 transition-transform">
                    {IconComponent ? <IconComponent className="h-8 w-8 text-blue-500" /> : integration.emoji}
                  </div>
                  <div className="text-sm font-semibold text-center">{integration.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{integration.category}</div>
                </div>
              )
            })}
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="px-4 py-2">
                {category}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Plus native support for any Windows desktop application
            </p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold inline-flex items-center gap-2"
            >
              View all 200+ integrations
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
