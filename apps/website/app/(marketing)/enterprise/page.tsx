import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Users,
  Headphones,
  Puzzle,
  Lock,
  BarChart,
  Clock,
  Globe,
  Check
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/contact-form"

export const metadata: Metadata = {
  title: "Enterprise - Scalable Team Automation",
  description: "Enterprise-grade automation for teams of any size. Deploy securely, manage centrally, automate confidently. SOC 2 compliant with dedicated support.",
  openGraph: {
    title: "AGI Workforce Enterprise - Scalable Team Automation",
    description: "Enterprise-grade automation with advanced security, centralized management, and dedicated support. SOC 2 compliant.",
    url: "https://agiworkforce.com/enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Workforce Enterprise - Scalable Team Automation",
    description: "Enterprise-grade automation with advanced security and dedicated support. SOC 2 compliant.",
  },
}

export default function EnterprisePage() {
  const enterpriseFeatures = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "SOC 2 compliant with enterprise-grade security features.",
      details: [
        "SOC 2 Type II certification",
        "GDPR and CCPA compliance",
        "On-premise deployment option",
        "Custom data residency",
        "Advanced encryption",
        "Security audit logs"
      ]
    },
    {
      icon: Users,
      title: "Centralized Management",
      description: "Manage your entire team from a single dashboard.",
      details: [
        "User provisioning and deprovisioning",
        "Role-based access control (RBAC)",
        "Team workspaces",
        "Usage analytics and reporting",
        "Workflow sharing and templates",
        "Centralized billing"
      ]
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Get help when you need it with priority support.",
      details: [
        "24/7 priority support",
        "Dedicated account manager",
        "Custom onboarding program",
        "Training sessions for teams",
        "Direct engineering escalation",
        "Quarterly business reviews"
      ]
    },
    {
      icon: Puzzle,
      title: "Custom Integrations",
      description: "Build custom integrations for your unique workflows.",
      details: [
        "REST API access",
        "Webhook support",
        "Custom tool development",
        "SDK and libraries",
        "Integration consulting",
        "Private marketplace"
      ]
    },
    {
      icon: Lock,
      title: "SSO & Authentication",
      description: "Integrate with your existing identity provider.",
      details: [
        "SAML 2.0 support",
        "OAuth2 integration",
        "Active Directory sync",
        "Azure AD integration",
        "Okta integration",
        "Multi-factor authentication"
      ]
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Deep insights into automation usage and ROI.",
      details: [
        "Custom dashboards",
        "Cost analytics",
        "Performance metrics",
        "Usage trends",
        "ROI calculations",
        "Export capabilities"
      ]
    },
    {
      icon: Clock,
      title: "SLA Guarantees",
      description: "99.9% uptime with guaranteed response times.",
      details: [
        "99.9% uptime SLA",
        "Priority incident response",
        "Scheduled maintenance windows",
        "Proactive monitoring",
        "Disaster recovery",
        "Performance guarantees"
      ]
    },
    {
      icon: Globe,
      title: "Global Deployment",
      description: "Deploy in your preferred regions worldwide.",
      details: [
        "Multi-region support",
        "Data residency options",
        "Edge deployment",
        "Private cloud hosting",
        "Hybrid deployment",
        "Air-gapped environments"
      ]
    }
  ]

  const benefits = [
    "Unlimited workspaces for your entire organization",
    "Volume discounts for large teams",
    "Custom contract terms and annual billing",
    "Migration assistance from existing tools",
    "Dedicated success team",
    "Priority feature requests",
    "White-glove implementation",
    "Compliance and security certifications"
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-background" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              AGI Workforce for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Enterprise
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Scalable automation for teams of any size. Deploy securely, manage centrally, automate confidently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild>
                <Link href="#contact">Schedule Enterprise Demo</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/pricing">View All Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Enterprise Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything in Pro, plus enterprise-grade features for large teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-success-400 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Enterprise Teams Choose AGI Workforce
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-success-400 shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Custom Pricing for Your Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Enterprise pricing is customized based on your needs including number of seats, support level, deployment requirements, and custom integrations.
            </p>

            <Card className="border-2 max-w-xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Contact Sales</CardTitle>
                <CardDescription className="text-base">
                  Get a custom quote tailored to your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Custom pricing based on your needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Volume discounts for large teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Flexible payment terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                    <span>Annual contracts available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Schedule Your Enterprise Demo
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and our enterprise team will contact you within 24 hours.
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="pt-6">
                <ContactForm />
                <div className="mt-8 pt-8 border-t text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    For immediate assistance, contact our enterprise team:
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">enterprise@agiworkforce.com</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
