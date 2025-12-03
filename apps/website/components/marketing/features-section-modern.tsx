"use client"

import * as React from "react"
import {
  Zap,
  Shield,
  Code2,
  Workflow,
  Database,
  Globe,
  Bot,
  Sparkles,
  Gauge,
  Lock,
  Boxes,
  Network,
} from "lucide-react"
import { BentoGrid, BentoCard, type BentoCardProps } from "@/components/ui/bento-grid"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function FeaturesSectionModern() {
  const features: BentoCardProps[] = [
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: "Lightning Fast",
      description:
        "Built with Tauri and Rust for maximum performance. 6x faster startup and 5-6x less memory than Electron apps.",
      colSpan: 2,
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
      ),
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Secure by Design",
      description:
        "API keys encrypted with AES-256, sandboxed MCP servers, and SOC 2 compliant infrastructure.",
      colSpan: 1,
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
      ),
    },
    {
      icon: <Code2 className="h-6 w-6 text-pink-500" />,
      title: "Multi-LLM Support",
      description:
        "OpenAI, Anthropic, Google, or run local models with Ollama. Switch models mid-conversation.",
      colSpan: 1,
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent" />
      ),
    },
    {
      icon: <Workflow className="h-6 w-6 text-indigo-500" />,
      title: "Visual Workflow Builder",
      description:
        "Drag-and-drop interface to create complex automations. No coding required.",
      colSpan: 2,
      rowSpan: 2,
      background: (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-500/10 to-transparent" />
      ),
    },
    {
      icon: <Database className="h-6 w-6 text-emerald-500" />,
      title: "MCP Integration",
      description:
        "Connect to GitHub, databases, file systems, and more using Model Context Protocol.",
      colSpan: 1,
    },
    {
      icon: <Globe className="h-6 w-6 text-cyan-500" />,
      title: "Browser Automation",
      description:
        "Automate web tasks with headless Chrome integration and smart selectors.",
      colSpan: 1,
    },
    {
      icon: <Bot className="h-6 w-6 text-violet-500" />,
      title: "AI Employees",
      description:
        "20+ pre-trained autonomous agents ready to deploy in under 60 seconds.",
      colSpan: 1,
    },
    {
      icon: <Gauge className="h-6 w-6 text-orange-500" />,
      title: "Real-Time Analytics",
      description:
        "Live ROI tracking dashboard with cost savings, time saved, and success rates.",
      colSpan: 1,
    },
    {
      icon: <Lock className="h-6 w-6 text-red-500" />,
      title: "Privacy First",
      description:
        "All data stays local on your machine. No cloud storage, no telemetry.",
      colSpan: 1,
    },
    {
      icon: <Boxes className="h-6 w-6 text-teal-500" />,
      title: "Workflow Marketplace",
      description:
        "50+ community workflows with 10M+ downloads. One-click install and customize.",
      colSpan: 2,
    },
    {
      icon: <Network className="h-6 w-6 text-blue-500" />,
      title: "API & Integrations",
      description:
        "19 integrated tools including Slack, Teams, WhatsApp, and custom API support.",
      colSpan: 1,
    },
    {
      icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
      title: "Natural Language",
      description:
        "Describe what you want in plain English. No code, no complexity.",
      colSpan: 3,
      background: (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-transparent" />
      ),
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Automate Your Workflow
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete desktop automation platform with cutting-edge features,
            powered by Rust and designed for performance.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <BentoGrid>
            {features.map((feature, index) => (
              <BentoCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                colSpan={feature.colSpan}
                rowSpan={feature.rowSpan}
                background={feature.background}
              />
            ))}
          </BentoGrid>
        </ScrollReveal>
      </div>
    </section>
  )
}
