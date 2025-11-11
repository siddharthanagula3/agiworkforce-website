import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { pricingTiers } from "@/config/pricing"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. All plans include 50% off your
            first month.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
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
          All plans include: 14-day free trial • Cancel anytime • No credit card
          required for trial
        </p>
        <div className="text-center mt-4">
          <Link
            href="/pricing"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Have questions? View detailed pricing FAQ →
          </Link>
        </div>
      </div>
    </section>
  )
}
