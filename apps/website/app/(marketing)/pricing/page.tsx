import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { pricingTiers } from "@/config/pricing"
import { Check, X } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Pricing - AGI Workforce | $10/month (50% Off First Month)",
  description: "Transparent pricing starting at $10/month with 50% off your first month. Free tier available. No credit card required for trial.",
}

export default function PricingPage() {
  const comparisonFeatures = [
    { name: "Automation Runs", free: "100/month", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Local Ollama LLMs", free: true, pro: true, enterprise: true },
    { name: "Cloud LLMs (OpenAI, Anthropic, Google)", free: false, pro: true, enterprise: true },
    { name: "Browser Automation", free: false, pro: true, enterprise: true },
    { name: "Desktop Automation", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
    { name: "Database Integrations", free: false, pro: true, enterprise: true },
    { name: "API Integrations", free: false, pro: true, enterprise: true },
    { name: "Workspaces", free: "1", pro: "5", enterprise: "Unlimited" },
    { name: "Support", free: "Community", pro: "Priority Email", enterprise: "Dedicated" },
    { name: "Cloud Sync", free: false, pro: "Optional", enterprise: "Optional" },
    { name: "Cost Analytics", free: false, pro: true, enterprise: true },
    { name: "SSO/SAML", free: false, pro: false, enterprise: true },
    { name: "On-Premise Deployment", free: false, pro: false, enterprise: true },
    { name: "SLA Guarantee", free: false, pro: false, enterprise: "99.9%" },
    { name: "Training & Onboarding", free: false, pro: false, enterprise: true },
  ]

  const pricingFAQ = [
    {
      question: "How does the 50% discount work?",
      answer: "All new users get 50% off their first month on any paid plan. For example, the Pro plan costs $10 for the first month, then $20/month after that. Your subscription automatically renews at the regular price unless you cancel."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll be charged the prorated difference immediately. When downgrading, the change takes effect at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal. Enterprise customers can also pay via invoice."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No! All plans are month-to-month with no long-term commitment. You can cancel anytime. Enterprise customers can optionally sign annual contracts for volume discounts."
    },
    {
      question: "What happens when I cancel?",
      answer: "You can continue using your paid features until the end of your current billing period. After that, you'll be downgraded to the free Community plan. Your workflows and data remain intact."
    },
    {
      question: "Do you offer discounts for nonprofits or education?",
      answer: "Yes! We offer 30% off Pro plans for verified nonprofits and educational institutions. Contact our sales team for verification and discount codes."
    },
    {
      question: "What's included in Enterprise pricing?",
      answer: "Enterprise pricing is customized based on your needs including number of seats, support level, on-premise requirements, and custom integrations. Contact our sales team for a quote."
    },
    {
      question: "Can I get a refund?",
      answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied for any reason, contact support for a full refund."
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Start free, upgrade when you&apos;re ready. All plans include 50% off your first month.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative ${
                  tier.popular
                    ? "border-2 border-blue-500 shadow-lg scale-105"
                    : "border-2"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-base">
                    {tier.subtitle}
                  </CardDescription>

                  <div className="mt-6">
                    {tier.price !== null ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2">
                          {tier.originalPrice && (
                            <span className="text-2xl text-muted-foreground line-through">
                              ${tier.originalPrice}
                            </span>
                          )}
                          <span className="text-5xl font-bold">${tier.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {tier.originalPrice && (
                          <p className="text-sm text-muted-foreground mt-2">
                            ${tier.priceMonthly}/month after first month
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-3xl font-bold">Custom Pricing</div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-center text-muted-foreground">
                    {tier.description}
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href={tier.ctaHref}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-12">
            All plans include: 14-day free trial • Cancel anytime • No credit card required for trial
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Detailed Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-6 font-bold">Feature</th>
                    <th className="text-center py-4 px-6 font-bold">Free</th>
                    <th className="text-center py-4 px-6 font-bold bg-blue-500/5">Pro</th>
                    <th className="text-center py-4 px-6 font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium">{feature.name}</td>
                      <td className="py-4 px-6 text-center text-muted-foreground">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="h-5 w-5 text-success-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-danger-400 mx-auto" />
                          )
                        ) : (
                          feature.free
                        )}
                      </td>
                      <td className="py-4 px-6 text-center font-medium bg-blue-500/5">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <Check className="h-5 w-5 text-success-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-danger-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-blue-600 dark:text-blue-400">
                            {feature.pro}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center text-muted-foreground">
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <Check className="h-5 w-5 text-success-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-danger-400 mx-auto" />
                          )
                        ) : (
                          feature.enterprise
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

      {/* Pricing FAQ */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Pricing FAQ
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {pricingFAQ.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start your 14-day free trial today. No credit card required.
            </p>
            <Button size="lg" asChild>
              <Link href="/download">Download for Windows</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
