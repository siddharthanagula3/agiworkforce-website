"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Code,
  Search,
  BarChart3,
  UserCheck,
  FileText,
  Clock,
  DollarSign,
  Sparkles
} from "lucide-react"

interface AIEmployee {
  name: string
  icon: React.ElementType
  category: string
  description: string
  timeSaved: string
  costSaved: string
  highlights: string[]
  demoTime: string
}

const aiEmployees: AIEmployee[] = [
  {
    name: "Customer Support Agent",
    icon: MessageSquare,
    category: "Customer Service",
    description: "Handles customer inquiries, troubleshoots issues, and escalates complex cases. Works 24/7 across Slack, Teams, and WhatsApp.",
    timeSaved: "8 hours/day",
    costSaved: "$48,000/year",
    highlights: [
      "24/7 instant responses",
      "95% resolution rate",
      "Multi-channel support"
    ],
    demoTime: "45s"
  },
  {
    name: "Code Review Agent",
    icon: Code,
    category: "Engineering",
    description: "Automated code reviews for pull requests. Checks style, security vulnerabilities, and suggests optimizations.",
    timeSaved: "4 hours/day",
    costSaved: "$36,000/year",
    highlights: [
      "Security vulnerability scanning",
      "Style consistency checks",
      "Performance optimization tips"
    ],
    demoTime: "30s"
  },
  {
    name: "Lead Qualifier",
    icon: UserCheck,
    category: "Sales",
    description: "Qualifies inbound leads via email/Slack, scores them using BANT framework, and routes to appropriate sales rep.",
    timeSaved: "6 hours/day",
    costSaved: "$42,000/year",
    highlights: [
      "BANT framework scoring",
      "Automatic lead routing",
      "CRM integration"
    ],
    demoTime: "50s"
  },
  {
    name: "Data Analyst",
    icon: BarChart3,
    category: "Analytics",
    description: "Generates weekly reports, analyzes trends, and creates visualizations. Connects to SQL databases and data warehouses.",
    timeSaved: "10 hours/week",
    costSaved: "$28,000/year",
    highlights: [
      "SQL query generation",
      "Automated reporting",
      "Trend analysis"
    ],
    demoTime: "55s"
  },
  {
    name: "SEO Researcher",
    icon: Search,
    category: "Marketing",
    description: "Finds keywords, analyzes competitors, and suggests content topics. Monitors rankings and provides optimization recommendations.",
    timeSaved: "5 hours/week",
    costSaved: "$18,000/year",
    highlights: [
      "Keyword research",
      "Competitor analysis",
      "Content recommendations"
    ],
    demoTime: "40s"
  },
  {
    name: "Document Processor",
    icon: FileText,
    category: "Operations",
    description: "Extracts data from PDFs, invoices, and forms. Validates information and updates databases automatically.",
    timeSaved: "12 hours/week",
    costSaved: "$32,000/year",
    highlights: [
      "OCR data extraction",
      "Invoice processing",
      "Database auto-update"
    ],
    demoTime: "35s"
  }
]

export function AIEmployeesSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            20+ Pre-Built AI Employees
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Hire Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI Workforce
            </span>
            {" "}Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Pre-trained specialists ready to work in under 60 seconds. No training required, no onboarding delays.
          </p>
        </div>

        {/* AI Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aiEmployees.map((employee) => (
            <Card key={employee.name} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <employee.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {employee.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{employee.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {employee.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ROI Metrics */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Saves</span>
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {employee.timeSaved}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <span>Value</span>
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {employee.costSaved}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {employee.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Demo Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:border-blue-500 group-hover:text-blue-500 transition-colors"
                >
                  Try Demo ({employee.demoTime})
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Plus 14 more specialized employees including QA Tester, Social Media Manager, HR Assistant, and more.
          </p>
          <Button size="lg" className="group">
            View All 20+ AI Employees
            <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
