import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 px-8 py-16 md:px-16 md:py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center space-y-8">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Ready to Automate Everything?
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-blue-100">
              Join 10,000+ professionals who&apos;ve automated their workflows with
              AGI Workforce
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="xl"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50 text-base"
              >
                <Link href="/download">Download for Windows</Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white/10 text-base"
              >
                <Link href="/contact">Schedule a Demo</Link>
              </Button>
            </div>

            {/* Below buttons */}
            <p className="text-sm text-blue-100">
              Free 14-day trial • No credit card required • 50% off first month
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
