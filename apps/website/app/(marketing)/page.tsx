import { HeroSection } from "@/components/marketing/hero-section"
import { SocialProofSection } from "@/components/marketing/social-proof-section"
import { CoreValuesSection } from "@/components/marketing/core-values-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { UseCasesSection } from "@/components/marketing/use-cases-section"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { ComparisonSection } from "@/components/marketing/comparison-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { FAQSection } from "@/components/marketing/faq-section"
import { FinalCTASection } from "@/components/marketing/final-cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <SocialProofSection />
      <CoreValuesSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}
