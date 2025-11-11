export function SocialProofSection() {
  const stats = [
    { label: "Tasks Automated", value: "1M+" },
    { label: "Active Users", value: "10,000+" },
    { label: "Uptime", value: "99.9%" },
    { label: "User Rating", value: "4.9/5" },
  ]

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-12">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for the World&apos;s Most Productive Teams
          </h2>

          {/* Logo Wall - Placeholder */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-32 bg-foreground/10 rounded grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
