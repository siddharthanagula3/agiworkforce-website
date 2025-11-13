"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Share2,
  Download,
  Star,
  TrendingUp,
  Heart,
  Users,
  Zap,
  Code,
  MessageSquare,
  FileText,
  BarChart3,
  Globe
} from "lucide-react"

interface Workflow {
  name: string
  icon: React.ElementType
  author: string
  description: string
  downloads: string
  rating: number
  category: string
  tags: string[]
  saves: string
  featured?: boolean
}

const workflows: Workflow[] = [
  {
    name: "Customer Support Auto-Reply",
    icon: MessageSquare,
    author: "TechCorp",
    description: "Automatically respond to common customer queries across Slack, email, and Teams. Routes complex issues to human agents.",
    downloads: "12.5K",
    rating: 4.9,
    category: "Customer Service",
    tags: ["Slack", "Email", "Auto-Response"],
    saves: "2.1K",
    featured: true
  },
  {
    name: "Weekly Analytics Report",
    icon: BarChart3,
    author: "DataWizard",
    description: "Generates comprehensive analytics reports every Monday. Pulls data from databases, creates charts, sends to stakeholders.",
    downloads: "8.3K",
    rating: 4.8,
    category: "Analytics",
    tags: ["SQL", "Reports", "Automation"],
    saves: "1.8K",
    featured: true
  },
  {
    name: "PR Code Review Bot",
    icon: Code,
    author: "DevTeam",
    description: "Reviews every pull request for code quality, security issues, and performance problems. Posts detailed feedback as comments.",
    downloads: "15.2K",
    rating: 5.0,
    category: "Engineering",
    tags: ["GitHub", "Code Review", "Security"],
    saves: "3.2K",
    featured: true
  },
  {
    name: "Lead Qualification Pipeline",
    icon: TrendingUp,
    author: "SalesOps",
    description: "Scores inbound leads, enriches with company data, and assigns to sales reps based on fit and availability.",
    downloads: "6.7K",
    rating: 4.7,
    category: "Sales",
    tags: ["CRM", "Lead Scoring", "Routing"],
    saves: "1.4K"
  },
  {
    name: "Invoice Data Extractor",
    icon: FileText,
    author: "FinanceAI",
    description: "Extracts data from PDF invoices, validates against purchase orders, and updates accounting systems automatically.",
    downloads: "9.1K",
    rating: 4.9,
    category: "Finance",
    tags: ["PDF", "OCR", "Accounting"],
    saves: "1.9K"
  },
  {
    name: "Social Media Publisher",
    icon: Globe,
    author: "MarketingHub",
    description: "Schedules and publishes content across Twitter, LinkedIn, and Facebook. Optimizes posting times based on engagement data.",
    downloads: "11.4K",
    rating: 4.6,
    category: "Marketing",
    tags: ["Social Media", "Scheduling", "Analytics"],
    saves: "2.3K"
  }
]

export function MarketplaceSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4">
            <Share2 className="h-3.5 w-3.5 mr-2" />
            50+ Workflow Templates
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Workflow{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover, share, and remix workflows created by the community. One-click deploy, viral sharing to 6+ platforms.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-500">50+</div>
            <p className="text-sm text-muted-foreground">Workflows</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-500">10M+</div>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-500">85K+</div>
            <p className="text-sm text-muted-foreground">Users</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-500">4.8★</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {workflows.map((workflow) => (
            <Card key={workflow.name} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <workflow.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  {workflow.featured && (
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-blue-500 transition-colors">
                  {workflow.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>by {workflow.author}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {workflow.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {workflow.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{workflow.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{workflow.saves}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{workflow.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" className="flex-1 group-hover:bg-blue-600 transition-colors">
                  <Download className="h-3 w-3 mr-1.5" />
                  Install
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Share2 className="h-3 w-3 mr-1.5" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="text-center space-y-2 p-6 rounded-lg bg-card">
            <Zap className="h-8 w-8 mx-auto text-blue-500" />
            <h3 className="font-semibold">One-Click Deploy</h3>
            <p className="text-sm text-muted-foreground">
              Install any workflow in seconds. No configuration required.
            </p>
          </div>
          <div className="text-center space-y-2 p-6 rounded-lg bg-card">
            <Share2 className="h-8 w-8 mx-auto text-blue-500" />
            <h3 className="font-semibold">Viral Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Share to Twitter, LinkedIn, Slack, Discord, and more.
            </p>
          </div>
          <div className="text-center space-y-2 p-6 rounded-lg bg-card">
            <Code className="h-8 w-8 mx-auto text-blue-500" />
            <h3 className="font-semibold">Fork & Customize</h3>
            <p className="text-sm text-muted-foreground">
              Remix workflows to fit your exact needs. Full version control.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button size="lg" className="group">
            Browse Marketplace
            <TrendingUp className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Or <span className="text-foreground font-medium">share your own workflow</span> and earn contributor rewards
          </p>
        </div>
      </div>
    </section>
  )
}
