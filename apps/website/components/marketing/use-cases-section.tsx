import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Keyboard,
  FileText,
  Globe,
  Bug,
  Mail,
  FolderOpen,
  Network,
  Settings,
} from "lucide-react"

export function UseCasesSection() {
  const useCases = [
    {
      icon: Keyboard,
      title: "Data Entry Automation",
      description: "Eliminate manual data entry across multiple systems",
    },
    {
      icon: FileText,
      title: "Report Generation",
      description: "Automatically generate and distribute reports",
    },
    {
      icon: Globe,
      title: "Web Scraping",
      description: "Extract data from websites at scale",
    },
    {
      icon: Bug,
      title: "Testing & QA",
      description: "Automate UI testing and regression checks",
    },
    {
      icon: Mail,
      title: "Email & Calendar Management",
      description: "Organize inbox, schedule meetings, send follow-ups",
    },
    {
      icon: FolderOpen,
      title: "File Organization",
      description: "Sort, rename, and organize files automatically",
    },
    {
      icon: Network,
      title: "API Workflow Orchestration",
      description: "Chain multiple API calls into complex workflows",
    },
    {
      icon: Settings,
      title: "Legacy System Integration",
      description: "Bridge old software with modern tools",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Built for Every Workflow
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
