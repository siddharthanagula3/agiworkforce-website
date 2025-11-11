import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { pricingTiers } from "@/config/pricing"
import { Check, Sparkles, TrendingDown, Shield, Clock, Zap } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-6 mb-4">
          {/* Urgency banner */}
          <div className="inline-flex">
            <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold animate-pulse">
              <Sparkles className="h-3.5 w-3.5 mr-2 inline" />
              <span>Limited Time: 50% OFF First Month - 127 Spots Left</span>
            </Badge>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Start Automating for{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              $10/month
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 10,000+ users saving an average of <span className="font-semibold text-foreground">20 hours per week</span>.
            Try risk-free for 14 days.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-success-400" />
              <span>Average 60% cost reduction vs competitors</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4 text-purple-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.id}
              className={`relative group hover:scale-105 transition-transform duration-300 ${
                tier.popular
                  ? "border-2 border-blue-500 shadow-2xl scale-105 z-10"
                  : "border-2 hover:border-blue-300"
              }`}
            >
              {tier.popular && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5" />
                      {tier.badge}
                    </span>
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 -z-10 bg-blue-500/10 rounded-lg blur-xl"></div>
                </>
              )}

              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-base font-medium">
                  {tier.subtitle}
                </CardDescription>

                <div className="mt-6">
                  {tier.price !== null ? (
                    <>
                      <div className="flex items-baseline justify-center gap-2">
                        {tier.originalPrice && (
                          <span className="text-2xl text-muted-foreground line-through decoration-2">
                            ${tier.originalPrice}
                          </span>
                        )}
                        <span className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${tier.price}
                        </span>
                        <span className="text-muted-foreground font-semibold">/mo</span>
                      </div>
                      {tier.originalPrice && (
                        <>
                          <p className="text-sm text-muted-foreground mt-2">
                            ${tier.priceMonthly}/month after first month
                          </p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            Save ${(tier.originalPrice - tier.price) * 12}/year
                          </Badge>
                        </>
                      )}
                      {tier.id === "free" && (
                        <p className="text-sm font-semibold text-success-400 mt-2">
                          Forever free • No credit card
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-bold mb-2">Custom</div>
                      <p className="text-sm text-muted-foreground">Volume pricing available</p>
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-center text-muted-foreground font-medium border-b pb-4">
                  {tier.description}
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 shrink-0 mt-0.5 ${
                        tier.popular ? 'text-blue-500' : 'text-success-400'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex-col gap-3">
                <Button
                  asChild
                  className="w-full group-hover:shadow-lg transition-shadow"
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  <Link href={tier.ctaHref}>
                    {tier.cta}
                    {tier.popular && <Sparkles className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
                {index === 1 && (
                  <p className="text-xs text-center text-muted-foreground">
                    ⚡ Most popular choice - 73% of users
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success-400" />
              <span className="font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success-400" />
              <span className="font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success-400" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success-400" />
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Compare all features & FAQ
              <span>→</span>
            </Link>
          </div>

          {/* Social proof */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">8,547 users</span> upgraded this month •
              <span className="font-semibold text-foreground"> 4.9/5</span> average rating
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
