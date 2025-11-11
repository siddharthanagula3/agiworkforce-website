export const siteConfig = {
  name: "AGI Workforce",
  description: "Automate desktop tasks, browser workflows, and APIs with intelligent multi-LLM orchestration. Windows-first automation platform.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://agiworkforce.com",
  ogImage: "/images/og/og-image.png",
  links: {
    twitter: "https://twitter.com/agiworkforce",
    github: "https://github.com/agiworkforce",
    linkedin: "https://linkedin.com/company/agiworkforce",
    discord: "https://discord.gg/agiworkforce",
    youtube: "https://youtube.com/@agiworkforce",
  },
  mainNav: [
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Enterprise",
      href: "/enterprise",
    },
    {
      title: "Changelog",
      href: "/changelog",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  footerNav: {
    company: [
      { title: "About Us", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Press Kit", href: "/press" },
      { title: "Blog", href: "/blog" },
    ],
    product: [
      { title: "Features", href: "/features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Enterprise", href: "/enterprise" },
      { title: "Changelog", href: "/changelog" },
      { title: "Roadmap", href: "/roadmap" },
      { title: "Status Page", href: "/status" },
    ],
    resources: [
      { title: "Documentation", href: "/docs" },
      { title: "API Reference", href: "/docs/api" },
      { title: "Community Forum", href: "/community" },
      { title: "Discord", href: "https://discord.gg/agiworkforce" },
      { title: "Tutorials", href: "/tutorials" },
      { title: "Video Guides", href: "/videos" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Security", href: "/security" },
      { title: "GDPR Compliance", href: "/gdpr" },
      { title: "Cookie Policy", href: "/cookies" },
    ],
    support: [
      { title: "Help Center", href: "/help" },
      { title: "Contact Support", href: "/support" },
      { title: "Feature Requests", href: "/features/request" },
      { title: "Bug Reports", href: "/bugs" },
      { title: "System Status", href: "/status" },
    ],
  },
}

export type SiteConfig = typeof siteConfig
