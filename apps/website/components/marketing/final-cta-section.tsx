import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Download, Play, CheckCircle2, TrendingUp, Users, Sparkles } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 px-8 py-16 md:px-16 md:py-24 shadow-2xl">
          {/* Enhanced background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center space-y-8">
            {/* Urgency badge */}
            <div className="inline-flex">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-bold bg-white/20 text-white border-white/30 backdrop-blur-sm animate-pulse">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                <span>Limited Offer: 50% OFF ends in 48 hours!</span>
              </Badge>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Start Saving 20 Hours Per Week
              <span className="block mt-2 text-2xl md:text-4xl text-blue-100">
                Beginning Today
              </span>
            </h2>

            {/* Social proof stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto py-6">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Users className="h-5 w-5" />
                  <div className="text-3xl font-bold">10,000+</div>
                </div>
                <p className="text-sm text-blue-100">Active users</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  <div className="text-3xl font-bold">$2.4M</div>
                </div>
                <p className="text-sm text-blue-100">Saved in costs</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                  <div className="text-3xl font-bold">4.9/5</div>
                </div>
                <p className="text-sm text-blue-100">User rating</p>
              </div>
            </div>

            {/* Value proposition */}
            <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto font-medium">
              Join thousands of professionals who automated their workflows and reclaimed their time.
              <span className="block mt-2 text-white font-semibold">
                Setup in 5 minutes. Results in 1 hour.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="xl"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50 text-base font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
              >
                <Link href="/download">
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Start Free Trial Now
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white/20 text-base font-semibold backdrop-blur-sm group"
              >
                <Link href="#demo">
                  <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm pt-4">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>

            {/* Final urgency message */}
            <p className="text-sm text-blue-100 pt-4">
              <span className="font-semibold text-white">243 people</span> started their free trial in the last 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
