import { HeroSection } from "@/components/marketing/hero-section"
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
      question: "What operating systems are supported?",
      answer: "AGI Workforce currently supports Windows 10/11. macOS and Linux support are planned for Q2 2025.",
    },
    {
      question: "Do I need coding experience?",
      answer: "No! AGI Workforce features a visual workflow builder and natural language chat interface. Power users can write custom scripts if desired, but it's not required.",
    },
    {
      question: "How does the 50% discount work?",
      answer: "All new users get 50% off their first month on any paid plan. Your subscription automatically renews at the regular price ($20/month for Pro) after the first month unless you cancel.",
    },
    {
      question: "Can I use my own LLM API keys?",
      answer: "Yes! Bring your own API keys for OpenAI, Anthropic, and Google. You can also use local Ollama models completely free.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. API keys are stored in Windows Credential Manager using DPAPI encryption. All data stays local unless you opt into cloud sync. We're SOC 2 compliant.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, cancel anytime from your account settings. No questions asked, no cancellation fees.",
    },
    {
      question: "What's included in the free trial?",
      answer: "The 14-day Pro trial includes all Pro features with no credit card required. After the trial, you can downgrade to the free Community plan or continue with Pro.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee on all paid plans.",
    },
    {
      question: "Can AGI Workforce run automations while I'm away?",
      answer: "Yes! Schedule automations to run 24/7 in the background or trigger them via API. The autonomous agent mode handles tasks even when you're not at your computer.",
    },
    {
      question: "How is this different from browser extensions?",
      answer: "Browser extensions can only control web pages. AGI Workforce controls your entire desktop - applications, files, system settings, and more. It also includes LLM reasoning that browser extensions lack.",
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
