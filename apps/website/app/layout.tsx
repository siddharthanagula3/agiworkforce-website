import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/layout/cookie-consent"

export const metadata: Metadata = {
  title: {
    default: "AGI Workforce - Autonomous Desktop Automation with AI",
    template: "%s | AGI Workforce",
  },
  description: "Automate desktop tasks, browser workflows, and APIs with intelligent multi-LLM orchestration. Windows-first automation platform. Start free today.",
  keywords: ["desktop automation", "AI automation", "workflow automation", "RPA alternative", "multi-LLM", "Windows automation"],
  authors: [{ name: "AGI Workforce" }],
  creator: "AGI Workforce",
  publisher: "AGI Workforce",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agiworkforce.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agiworkforce.com",
    siteName: "AGI Workforce",
    title: "AGI Workforce - Autonomous Desktop Automation with AI",
    description: "Automate desktop tasks, browser workflows, and APIs with intelligent multi-LLM orchestration. Windows-first automation platform. Start free today.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AGI Workforce - Autonomous Desktop Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@agiworkforce",
    creator: "@agiworkforce",
    title: "AGI Workforce - Autonomous Desktop Automation with AI",
    description: "Automate desktop tasks, browser workflows, and APIs with intelligent multi-LLM orchestration. Start free today.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
