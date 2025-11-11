import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "AGI Workforce - Autonomous Desktop Automation with AI",
  description: "Automate desktop tasks, browser workflows, and APIs with intelligent multi-LLM orchestration. Windows-first automation platform. Start free today.",
  keywords: ["desktop automation", "AI automation", "workflow automation", "RPA alternative", "multi-LLM", "Windows automation"],
  authors: [{ name: "AGI Workforce" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agiworkforce.com'),
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
        </ThemeProvider>
      </body>
    </html>
  )
}
