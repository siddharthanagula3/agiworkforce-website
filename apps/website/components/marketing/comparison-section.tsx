import { Check, X } from "lucide-react"

export function ComparisonSection() {
  const comparisons = [
    {
      feature: "Setup Time",
      traditional: "Weeks/Months",
      agiWorkforce: "Minutes",
    },
    {
      feature: "Coding Required",
      traditional: "Yes",
      agiWorkforce: "No (optional)",
    },
    {
      feature: "LLM Support",
      traditional: "External only",
      agiWorkforce: "Built-in multi-LLM",
    },
    {
      feature: "Desktop Control",
      traditional: "Limited",
      agiWorkforce: "Full UI Automation",
    },
    {
      feature: "Cost",
      traditional: "$$$$",
      agiWorkforce: "$ (starts at $20/mo)",
    },
    {
      feature: "Local LLM Support",
      traditional: false,
      agiWorkforce: true,
    },
    {
      feature: "Maintenance",
      traditional: "High",
      agiWorkforce: "Low (self-healing)",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            AGI Workforce vs. Traditional Automation
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-6 font-bold">Feature</th>
                  <th className="text-center py-4 px-6 font-bold">
                    Traditional RPA
                  </th>
                  <th className="text-center py-4 px-6 font-bold bg-blue-500/5">
                    AGI Workforce
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">
                      {typeof row.traditional === "boolean" ? (
                        row.traditional ? (
                          <Check className="h-5 w-5 text-success-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-danger-400 mx-auto" />
                        )
                      ) : (
                        row.traditional
                      )}
                    </td>
                    <td className="py-4 px-6 text-center font-medium bg-blue-500/5">
                      {typeof row.agiWorkforce === "boolean" ? (
                        row.agiWorkforce ? (
                          <Check className="h-5 w-5 text-success-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-danger-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400">
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
      </div>
    </section>
  )
}
