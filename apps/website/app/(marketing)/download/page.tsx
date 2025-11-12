"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Download, Monitor, Apple, Github } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DownloadPage() {
  const [detectedOS, setDetectedOS] = useState<"windows" | "macos" | "linux" | "unknown">("unknown")

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.indexOf("win") !== -1) {
      setDetectedOS("windows")
    } else if (userAgent.indexOf("mac") !== -1) {
      setDetectedOS("macos")
    } else if (userAgent.indexOf("linux") !== -1) {
      setDetectedOS("linux")
    }
  }, [])

  const versions = {
    windows: {
      version: "1.2.0",
      size: "125 MB",
      requirements: "Windows 10 or later (64-bit)",
      downloadUrl: "#",
      checksum: "sha256:abc123...",
      releaseDate: "March 15, 2025"
    },
    macos: {
      version: "Coming Q2 2025",
      size: "TBD",
      requirements: "macOS 12 (Monterey) or later",
      downloadUrl: "#",
      checksum: "",
      releaseDate: "Q2 2025"
    },
    linux: {
      version: "Coming Q2 2025",
      size: "TBD",
      requirements: "Ubuntu 20.04+ / Debian 11+ / Fedora 35+",
      downloadUrl: "#",
      checksum: "",
      releaseDate: "Q2 2025"
    }
  }

  const systemRequirements = {
    windows: [
      "Windows 10/11 (64-bit)",
      "4 GB RAM minimum (8 GB recommended)",
      "500 MB free disk space",
      "Internet connection (for cloud LLMs only)",
      "Node.js 20.11.0+ (optional, for development)",
      "Rust 1.90+ (auto-installed by Tauri)"
    ],
    recommended: [
      "Windows 11 (latest update)",
      "16 GB RAM or more",
      "SSD with 2 GB free space",
      "For Ollama (local free LLMs): 8GB+ RAM",
      "For advanced automation: Dedicated GPU (optional)",
      "Multiple monitors for workflow design"
    ]
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Download{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                AGI Workforce
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              100% free desktop application. Built with Tauri + Rust for maximum performance. Use with free Ollama or bring your own LLM API keys.
            </p>

            {/* Main Download Button */}
            {detectedOS === "windows" ? (
              <div className="space-y-4">
                <Button size="xl" className="text-lg" asChild>
                  <Link href={versions.windows.downloadUrl}>
                    <Download className="mr-2 h-5 w-5" />
                    Download for Windows
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Version {versions.windows.version} • {versions.windows.size} • 100% Free Forever
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {detectedOS === "macos" && "macOS support coming Q2 2025"}
                  {detectedOS === "linux" && "Linux support coming Q2 2025"}
                  {detectedOS === "unknown" && "Choose your platform below"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Platform Selection */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Choose Your Platform
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Windows */}
              <Card className={`border-2 ${detectedOS === "windows" ? "border-blue-500" : ""}`}>
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Monitor className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle>Windows</CardTitle>
                  <CardDescription>
                    {detectedOS === "windows" && (
                      <Badge className="mt-2">Detected</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <p><strong>Version:</strong> {versions.windows.version}</p>
                    <p><strong>Size:</strong> {versions.windows.size}</p>
                    <p><strong>Released:</strong> {versions.windows.releaseDate}</p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={versions.windows.downloadUrl}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {versions.windows.requirements}
                  </p>
                </CardContent>
              </Card>

              {/* macOS */}
              <Card className={`border-2 ${detectedOS === "macos" ? "border-blue-500" : ""}`}>
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
                    <Apple className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle>macOS</CardTitle>
                  <CardDescription>
                    {detectedOS === "macos" && (
                      <Badge className="mt-2">Detected</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <p><strong>Version:</strong> {versions.macos.version}</p>
                    <p><strong>Status:</strong> In Development</p>
                  </div>
                  <Button className="w-full" variant="outline" disabled>
                    Coming Q2 2025
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {versions.macos.requirements}
                  </p>
                </CardContent>
              </Card>

              {/* Linux */}
              <Card className={`border-2 ${detectedOS === "linux" ? "border-blue-500" : ""}`}>
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
                    <Github className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle>Linux</CardTitle>
                  <CardDescription>
                    {detectedOS === "linux" && (
                      <Badge className="mt-2">Detected</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <p><strong>Version:</strong> {versions.linux.version}</p>
                    <p><strong>Status:</strong> In Development</p>
                  </div>
                  <Button className="w-full" variant="outline" disabled>
                    Coming Q2 2025
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {versions.linux.requirements}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              System Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Minimum */}
              <Card>
                <CardHeader>
                  <CardTitle>Minimum Requirements</CardTitle>
                  <CardDescription>
                    Required to run AGI Workforce
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {systemRequirements.windows.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-success-400 shrink-0 mt-0.5" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommended */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Specifications</CardTitle>
                  <CardDescription>
                    For optimal performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {systemRequirements.recommended.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Installation Instructions
            </h2>

            <Card>
              <CardHeader>
                <CardTitle>Windows Installation</CardTitle>
                <CardDescription>
                  Follow these steps to install AGI Workforce on Windows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Download the installer</p>
                      <p className="text-sm text-muted-foreground">
                        Click the download button above to download AGIWorkforceSetup.exe
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Run the installer</p>
                      <p className="text-sm text-muted-foreground">
                        Double-click the downloaded file and follow the installation wizard
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Launch AGI Workforce</p>
                      <p className="text-sm text-muted-foreground">
                        The application will start automatically after installation
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold">
                      4
                    </span>
                    <div>
                      <p className="font-medium">Choose your LLM provider</p>
                      <p className="text-sm text-muted-foreground">
                        Option A: Install Ollama (100% free, runs locally) OR Option B: Add your API keys (OpenAI, Anthropic, Google)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold">
                      5
                    </span>
                    <div>
                      <p className="font-medium">Start automating!</p>
                      <p className="text-sm text-muted-foreground">
                        Describe your task in natural language and watch AGI Workforce handle it automatically
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Need help? Visit our{" "}
                    <Link href="/docs" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      documentation
                    </Link>{" "}
                    or{" "}
                    <Link href="/support" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      contact support
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Verify Your Download
            </h2>

            <Card>
              <CardHeader>
                <CardTitle>File Checksums</CardTitle>
                <CardDescription>
                  Verify the integrity of your download
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">SHA-256</p>
                  <code className="block bg-muted p-3 rounded text-xs break-all">
                    {versions.windows.checksum}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground">
                  To verify the checksum on Windows, open PowerShell and run:
                </p>
                <code className="block bg-muted p-3 rounded text-xs">
                  Get-FileHash AGIWorkforceSetup.exe -Algorithm SHA256
                </code>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
