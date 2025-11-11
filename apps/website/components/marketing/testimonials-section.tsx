import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "AGI Workforce eliminated 20 hours of manual data entry per week. The multi-LLM routing is incredibly smart - it saves us hundreds in API costs.",
      author: "Sarah Chen",
      role: "Operations Manager at TechCorp",
      avatar: "SC",
    },
    {
      quote:
        "Finally, desktop automation that actually works. I've tried UiPath and Automation Anywhere, but AGI Workforce is faster and easier to use.",
      author: "Michael Torres",
      role: "Developer",
      avatar: "MT",
    },
    {
      quote:
        "The local Ollama support is a game-changer. We run sensitive workflows completely offline while falling back to cloud LLMs when we need higher quality.",
      author: "Dr. Emily Rodriguez",
      role: "Research Lead",
      avatar: "ER",
    },
    {
      quote:
        "I automated my entire morning routine in 10 minutes. Email sorting, calendar scheduling, and report generation all happen before I even start work.",
      author: "James Park",
      role: "Consultant",
      avatar: "JP",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Loved by Automation Enthusiasts
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-warning-400 text-warning-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-base leading-relaxed mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-600">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
