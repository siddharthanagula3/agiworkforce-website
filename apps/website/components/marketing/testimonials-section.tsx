import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle2, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "We saved $47,000 in the first month by automating our data entry processes. AGI Workforce paid for itself in the first week. The ROI is absolutely insane.",
      author: "Sarah Chen",
      role: "Operations Director",
      company: "DataFlow Inc.",
      avatar: "SC",
      verified: true,
      metric: "$47K saved",
    },
    {
      quote:
        "I've tested every automation tool on the market. AGI Workforce is the only one that combines the power of enterprise RPA with the simplicity of consumer software. Game changer.",
      author: "Michael Torres",
      role: "Senior Developer",
      company: "AutoTech Solutions",
      avatar: "MT",
      verified: true,
      metric: "15+ tools tested",
    },
    {
      quote:
        "The local Ollama support lets us automate sensitive healthcare workflows offline. HIPAA compliance made easy. This wasn't possible before AGI Workforce.",
      author: "Dr. Emily Rodriguez",
      role: "CTO",
      company: "HealthTech Labs",
      avatar: "ER",
      verified: true,
      metric: "100% compliant",
    },
    {
      quote:
        "My team went from spending 4 hours a day on reports to 10 minutes. That's 20 hours per person per week. We redirected that time to strategic work that actually moves the needle.",
      author: "James Park",
      role: "Operations Lead",
      company: "Consultant Firm",
      avatar: "JP",
      verified: true,
      metric: "20hrs/week saved",
    },
    {
      quote:
        "Setup took literally 5 minutes. Within an hour I had my first automation running. Compare that to the 2 weeks it took to deploy our previous RPA solution. Night and day.",
      author: "Lisa Anderson",
      role: "IT Manager",
      company: "Enterprise Corp",
      avatar: "LA",
      verified: true,
      metric: "5min setup",
    },
    {
      quote:
        "The multi-LLM orchestration is brilliant. It automatically routes tasks to the cheapest model that can handle them. We cut our AI costs by 60% while improving quality.",
      author: "David Kim",
      role: "AI Engineer",
      company: "ML Startup",
      avatar: "DK",
      verified: true,
      metric: "60% cost reduction",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="h-3 w-3 mr-1 fill-current" />
            4.9/5 from 1,200+ reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Join Thousands of Happy Users
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what automation professionals are saying about AGI Workforce
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-2 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="pt-6 space-y-4">
                {/* Metric badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-semibold text-blue-600 border-blue-200">
                    {testimonial.metric}
                  </Badge>
                  {testimonial.verified && (
                    <div className="flex items-center gap-1 text-xs text-success-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="font-medium">Verified</span>
                    </div>
                  )}
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-warning-400 text-warning-400"
                    />
                  ))}
                </div>

                {/* Quote with icon */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-blue-500/20" />
                  <blockquote className="text-sm leading-relaxed pl-5">
                    {testimonial.quote}
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground truncate font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success-400" />
              <span>1,200+ 5-star reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success-400" />
              <span>10,000+ active users</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success-400" />
              <span>98% satisfaction rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
