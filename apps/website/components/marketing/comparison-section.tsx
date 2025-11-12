import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export function ComparisonSection() {
  const comparisons = [
    {
      feature: "Setup Time",
      uipath: "2-4 weeks",
      zapier: "1-2 hours",
      make: "1-2 hours",
      agiWorkforce: "5 minutes",
    },
    {
      feature: "Monthly Cost (5 users)",
      uipath: "$420+",
      zapier: "$100",
      make: "$90",
      agiWorkforce: "$100",
    },
    {
      feature: "Desktop Automation",
      uipath: true,
      zapier: false,
      make: false,
      agiWorkforce: true,
    },
    {
      feature: "AI/LLM Integration",
      uipath: "Add-on",
      zapier: "Limited",
      make: "Limited",
      agiWorkforce: "Built-in multi-LLM",
    },
    {
      feature: "Local/Offline Mode",
      uipath: "Partial",
      zapier: false,
      make: false,
      agiWorkforce: true,
    },
    {
      feature: "Coding Required",
      uipath: "Advanced",
      zapier: false,
      make: false,
      agiWorkforce: "Optional",
    },
    {
      feature: "Browser Control",
      uipath: true,
      zapier: false,
      make: false,
      agiWorkforce: true,
    },
    {
      feature: "Self-Healing Workflows",
      uipath: false,
      zapier: false,
      make: false,
      agiWorkforce: true,
    },
    {
      feature: "Natural Language Control",
      uipath: false,
      zapier: false,
      make: false,
      agiWorkforce: true,
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="h-3 w-3 mr-1" />
            Competitive Analysis
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            How We Compare to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Leading Solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how AGI Workforce stacks up against UiPath, Zapier, and Make.com
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-bold min-w-[180px]">Feature</th>
                  <th className="text-center py-4 px-4 font-bold min-w-[120px]">
                    <div className="text-sm">UiPath</div>
                    <div className="text-xs text-muted-foreground font-normal">Enterprise RPA</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold min-w-[120px]">
                    <div className="text-sm">Zapier</div>
                    <div className="text-xs text-muted-foreground font-normal">Cloud iPaaS</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold min-w-[120px]">
                    <div className="text-sm">Make.com</div>
                    <div className="text-xs text-muted-foreground font-normal">Cloud iPaaS</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold bg-gradient-to-br from-blue-500/10 to-purple-500/10 min-w-[120px]">
                    <div className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      AGI Workforce
                    </div>
                    <div className="text-xs text-muted-foreground font-normal">AI-Powered RPA</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                      {typeof row.uipath === "boolean" ? (
                        row.uipath ? (
                          <Check className="h-5 w-5 text-success-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-danger-400 mx-auto" />
                        )
                      ) : (
                        row.uipath
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                      {typeof row.zapier === "boolean" ? (
                        row.zapier ? (
                          <Check className="h-5 w-5 text-success-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-danger-400 mx-auto" />
                        )
                      ) : (
                        row.zapier
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                      {typeof row.make === "boolean" ? (
                        row.make ? (
                          <Check className="h-5 w-5 text-success-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-danger-400 mx-auto" />
                        )
                      ) : (
                        row.make
                      )}
                    </td>
                    <td className="py-4 px-4 text-center font-medium bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-sm">
                      {typeof row.agiWorkforce === "boolean" ? (
                        row.agiWorkforce ? (
                          <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-danger-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {row.agiWorkforce}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">60% lower cost</span> than UiPath,{" "}
            <span className="font-semibold text-foreground">10x faster</span> setup than competitors
          </p>
        </div>
      </div>
    </section>
  )
}
