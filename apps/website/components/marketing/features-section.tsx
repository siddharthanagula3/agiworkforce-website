import { Check } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Build Workflows Without Code",
      description:
        "Drag-and-drop automation builder with 15+ pre-built tools. Connect file operations, UI automation, browser control, database queries, and API calls into powerful workflows. No programming required.",
      bullets: [
        "Visual flow editor with node-based interface",
        "Pre-built templates for common tasks",
        "Real-time testing and debugging",
      ],
    },
    {
      title: "Control Any Website",
      description:
        "Playwright-powered browser automation that handles dynamic content, waits for elements, and navigates multi-step processes. Extract data, fill forms, or orchestrate complex web workflows.",
      bullets: [
        "Headless and visible browser modes",
        "Cookie/session management",
        "JavaScript execution support",
      ],
    },
    {
      title: "Automate Any Windows Application",
      description:
        "Native UI Automation support for Windows applications. Click buttons, fill forms, extract text, and control legacy software that doesn't have APIs.",
      bullets: [
        "Element caching for performance",
        "Retry logic for reliability",
        "OCR for image-based workflows",
      ],
    },
    {
      title: "Intelligent LLM Routing",
      description:
        "Automatically route tasks to the best LLM for the job. Prioritize local Ollama models for cost savings, fall back to cloud providers for quality. Track costs and optimize spend.",
      bullets: [
        "Support for OpenAI, Anthropic, Google, Ollama",
        "Cost tracking and analytics",
        "Quality-based fallback logic",
      ],
    },
    {
      title: "Connect to Everything",
      description:
        "Read/write files, watch directories, query SQL/NoSQL databases, call REST APIs, send emails, and integrate with cloud storage. Your automation can touch any system.",
      bullets: [
        "SQLite, PostgreSQL, MySQL, MongoDB support",
        "OAuth2 for API authentication",
        "Cloud storage integrations (Drive, Dropbox, OneDrive)",
      ],
    },
    {
      title: "See and Understand Your Screen",
      description:
        "Built-in vision capabilities with screenshot capture, OCR text extraction, and image matching. Automate visual workflows and legacy applications.",
      bullets: [
        "Full screen and region capture",
        "High-accuracy OCR",
        "Image-based element location",
      ],
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Everything You Need to Automate Anything
          </h2>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Visual placeholder */}
              <div
                className={`${
                  index % 2 === 1 ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border-2 border-border flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Feature Screenshot
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "md:order-1" : "md:order-2"
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
