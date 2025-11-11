import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Monitor, Shield } from "lucide-react"

export function CoreValuesSection() {
  const values = [
    {
      icon: Brain,
      title: "Multi-LLM Intelligence",
      description:
        "Seamlessly routes tasks across OpenAI, Anthropic, Google, and local Ollama models to deliver optimal results while minimizing costs. Your automation is smart enough to choose the right tool for every job.",
    },
    {
      icon: Monitor,
      title: "Native Desktop Control",
      description:
        "True desktop automation with UI Automation API, mouse/keyboard control, screen capture, and OCR. Automate Windows applications, file systems, and workflows that browser extensions can't reach.",
    },
    {
      icon: Shield,
      title: "Your Data Stays Yours",
      description:
        "Local-first architecture with optional cloud sync. API keys stored in Windows Credential Manager, never in plaintext. SOC 2 compliant with enterprise-grade security.",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Why AGI Workforce?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
