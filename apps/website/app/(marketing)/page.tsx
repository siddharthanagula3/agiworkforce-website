import { HeroSection } from "@/components/marketing/hero-section"
import { AIEmployeesSection } from "@/components/marketing/ai-employees-section"
import { MarketplaceSection } from "@/components/marketing/marketplace-section"
import { WhatsNewSection } from "@/components/marketing/whats-new-section"
import { SocialProofSection } from "@/components/marketing/social-proof-section"
import { CoreValuesSection } from "@/components/marketing/core-values-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { IntegrationsSection } from "@/components/marketing/integrations-section"
import { UseCasesSection } from "@/components/marketing/use-cases-section"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { ComparisonSection } from "@/components/marketing/comparison-section"
import { ROICalculator } from "@/components/marketing/roi-calculator"
import { PricingSection } from "@/components/marketing/pricing-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { TrustBadgesSection } from "@/components/marketing/trust-badges-section"
import { FAQSection } from "@/components/marketing/faq-section"
import { FinalCTASection } from "@/components/marketing/final-cta-section"
import Script from "next/script"
import { getOrganizationSchema, getSoftwareApplicationSchema, getFAQSchema } from "@/lib/structured-data"

export default function HomePage() {
  const organizationSchema = getOrganizationSchema()
  const softwareSchema = getSoftwareApplicationSchema()
  const faqSchema = getFAQSchema([
    {
      question: "What are AI Employees and how do they work?",
      answer: "AI Employees are pre-trained autonomous agents ready to deploy in under 60 seconds. We offer 20+ specialized roles like Customer Support Agent, Code Review Agent, Lead Qualifier, and more. Each employee comes with an instant demo showing real-world ROI (time and cost savings). Simply select an employee, try the demo, and deploy - no configuration needed. They work 24/7 across Slack, Teams, and WhatsApp.",
    },
    {
      question: "How does the Workflow Marketplace work?",
      answer: "The Marketplace features 50+ community-created workflows with 10M+ downloads. You can install any workflow with one click, fork and customize it for your needs, or share your own workflows. Viral sharing is built-in - share to Twitter, LinkedIn, Slack, Discord, Reddit, and Hacker News with one click. Top contributors earn rewards.",
    },
    {
      question: "What is outcome-based pricing?",
      answer: "You only pay for successful automations - failed ones are completely free. Pay-per-result tier costs $0.50 per successful automation. We also offer a Free tier (10 hours/month) and Pro tier ($39/month unlimited). Real-time usage tracking shows exactly what you're being charged for, with transparent itemized invoices. Enterprise customers get an ROI guarantee with automatic refunds if targets aren't met.",
    },
    {
      question: "How does the Real-Time ROI Dashboard work?",
      answer: "Our dashboard tracks every automation and displays live metrics: time saved, cost saved, automations run, success rates, and more. Updates appear in under 250ms. Beautiful charts show 30-day trends, and the system celebrates milestones (like saving 100 hours or $10K). You can compare manual vs. automated performance, view period-over-period changes, and export detailed reports to PDF/CSV for stakeholders.",
    },
    {
      question: "What operating systems are supported?",
      answer: "AGI Workforce currently supports Windows 10/11 (64-bit). Built with Tauri 2.0 + Rust for maximum performance. macOS and Linux support are planned for Q2 2025.",
    },
    {
      question: "Do I need coding experience?",
      answer: "No! AGI Workforce uses natural language - just describe what you want in plain English and it executes automatically. It features 19 integrated tools for automation. Power users can write custom scripts if desired, but it's completely optional.",
    },
    {
      question: "Is AGI Workforce really free?",
      answer: "Yes, 100% free forever! The desktop application is free to download with no subscriptions or usage limits. If you use Ollama (local LLMs), it costs nothing. If you bring your own API keys for cloud LLMs (OpenAI, Anthropic, Google), you pay those providers directly - averaging ~$0.04 per task.",
    },
    {
      question: "Can I use my own LLM API keys?",
      answer: "Yes! Bring your own API keys for OpenAI, Anthropic, and Google. You pay providers directly with no markup. Or use local Ollama models completely free with zero API costs.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. AGI Workforce is a desktop application - all data stays local on your computer. API keys are stored in Windows Credential Manager using DPAPI encryption. We're SOC 2 compliant and privacy-first by design.",
    },
    {
      question: "What is MCP and why does it matter?",
      answer: "MCP (Model Context Protocol) is a revolutionary architecture that reduces token usage by 98.7% compared to traditional approaches. This means dramatically lower costs (~$0.04 vs $5+ per task) and faster execution. AGI Workforce implements MCP with code execution for maximum efficiency.",
    },
    {
      question: "How is this different from cloud automation tools like Zapier?",
      answer: "AGI Workforce runs on YOUR computer, enabling full desktop control (files, applications, UI automation) that cloud tools can't access. It's also 125x cheaper ($0.04 vs $5+ per task), works offline with Ollama, and gives you complete data privacy.",
    },
    {
      question: "What's included in the download?",
      answer: "Everything! 19 automation tools, multi-LLM support (OpenAI, Anthropic, Google, Ollama), browser automation, database integrations, file operations, OCR, natural language control, and more. No feature gates or paywalls.",
    },
    {
      question: "Can AGI Workforce run automations while I'm away?",
      answer: "Yes! Schedule automations to run 24/7 in the background or trigger them via API. The autonomous agent mode handles tasks even when you're not at your computer.",
    },
    {
      question: "Why is it faster than Electron-based tools?",
      answer: "Built with Tauri 2.0 and Rust instead of Electron. Results: 6x faster startup (~450ms vs ~2.8s), 5-6x lower memory usage (87-143MB vs 500-1000MB), and 13x smaller app size (~15MB vs ~200MB).",
    },
  ])

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col">
        <HeroSection />
        <AIEmployeesSection />
        <MarketplaceSection />
        <WhatsNewSection />
        <SocialProofSection />
        <CoreValuesSection />
        <FeaturesSection />
        <IntegrationsSection />
        <UseCasesSection />
        <HowItWorksSection />
        <ROICalculator />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        <TrustBadgesSection />
        <FAQSection />
        <FinalCTASection />
      </div>
    </>
  )
}
