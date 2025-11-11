import { Download, Link2, Workflow, Play } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Download,
      title: "Download & Install",
      description:
        "Download AGI Workforce for Windows. One-click installer with no dependencies.",
    },
    {
      icon: Link2,
      title: "Connect Your Tools",
      description:
        "Add API keys for LLMs, connect databases, authenticate cloud services. All credentials stored securely.",
    },
    {
      icon: Workflow,
      title: "Build Your Workflow",
      description:
        "Use our visual builder or chat interface to describe what you want to automate. AGI Workforce translates your goals into actions.",
    },
    {
      icon: Play,
      title: "Run & Monitor",
      description:
        "Execute workflows on-demand or on schedule. Monitor progress, review logs, and refine over time.",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            From Download to Automation in Minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-full h-0.5 bg-border" />
                )}

                <div className="relative space-y-4 text-center">
                  {/* Step number and icon */}
                  <div className="inline-flex flex-col items-center">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-blue-500/10 border-2 border-blue-500 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
