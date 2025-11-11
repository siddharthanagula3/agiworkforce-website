import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-background to-background" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Autonomous Workforce,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automate desktop tasks, browser workflows, and complex processes
              with intelligent multi-LLM orchestration. Built for professionals
              who demand both power and simplicity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link href="/download">Download for Windows</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Watch Demo</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Free trial • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder for more sections */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Website Under Construction</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Phase 2 Complete: Core layout components (Header, Footer, Mobile Menu) are now implemented.
              Next phase will add the full homepage sections from the PRD.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
