import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, CheckCircle2, Award, Globe, Eye, Server, FileCheck } from "lucide-react"

export function TrustBadgesSection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "SOC 2 Type II",
      description: "Certified secure data handling",
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "EU data protection ready",
    },
    {
      icon: FileCheck,
      title: "HIPAA Ready",
      description: "Healthcare data secure",
    },
    {
      icon: Server,
      title: "ISO 27001",
      description: "Information security standard",
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "Local-first architecture",
    },
    {
      icon: Globe,
      title: "SSL/TLS",
      description: "256-bit encryption",
    },
  ]

  const certifications = [
    {
      name: "Enterprise Ready",
      icon: Award,
      metrics: ["99.9% Uptime SLA", "24/7 Support", "SSO/SAML"],
    },
    {
      name: "Data Security",
      icon: Lock,
      metrics: ["End-to-end encryption", "Zero-knowledge architecture", "Local data storage"],
    },
    {
      name: "Compliance",
      icon: CheckCircle2,
      metrics: ["SOC 2 Type II", "GDPR", "CCPA", "HIPAA"],
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Enterprise-Grade Security
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              10,000+ Organizations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your security and compliance are our top priorities. We meet the highest industry standards.
          </p>
        </div>

        {/* Security badges grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-16">
          {securityFeatures.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="pt-6 pb-6 text-center space-y-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="font-bold text-sm">{feature.title}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed certifications */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <cert.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{cert.name}</h3>
                </div>
                <ul className="space-y-2">
                  {cert.metrics.map((metric, metricIndex) => (
                    <li key={metricIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{metric}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust footer */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Trusted by Fortune 500 companies</span> and startups worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-success-400" />
              <span>Penetration tested quarterly</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-success-400" />
              <span>Bug bounty program active</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-success-400" />
              <span>Security-first development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
