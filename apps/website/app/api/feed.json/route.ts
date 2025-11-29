/**
 * JSON Feed API Endpoint
 * Implements JSON Feed Version 1.1 standard
 * https://jsonfeed.org/version/1.1
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

interface JSONFeedItem {
  id: string
  url: string
  title: string
  content_html?: string
  content_text?: string
  summary?: string
  date_published?: string
  date_modified?: string
  tags?: string[]
}

interface JSONFeed {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  description: string
  icon?: string
  favicon?: string
  language?: string
  items: JSONFeedItem[]
}

export async function GET() {
  const baseUrl = 'https://agiworkforce.com'

  const feed: JSONFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'AGI Workforce',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/api/feed.json`,
    description: 'Autonomous desktop automation platform powered by AI. Build powerful workflows with visual builders, browser automation, and multi-LLM support.',
    icon: `${baseUrl}/icon-512.png`,
    favicon: `${baseUrl}/favicon.ico`,
    language: 'en-US',
    items: [
      {
        id: `${baseUrl}/`,
        url: `${baseUrl}/`,
        title: 'AGI Workforce - Desktop Automation Platform',
        content_text: 'Free, open-source desktop automation platform built with Tauri and Rust. Create powerful workflows with visual builders, browser automation, and multi-LLM support. Early access alpha - use with free Ollama or your own API keys.',
        summary: 'Desktop automation platform with AI - currently in free alpha',
        date_published: '2025-11-01T00:00:00Z',
        date_modified: new Date().toISOString(),
        tags: ['desktop automation', 'AI', 'workflow', 'automation', 'alpha'],
      },
      {
        id: `${baseUrl}/features`,
        url: `${baseUrl}/features`,
        title: 'Features - Visual Workflow Builder, Browser Automation, Multi-LLM Support',
        content_text: 'Visual workflow builder for desktop automation, browser automation with Playwright, desktop UI automation, multi-LLM support (OpenAI, Anthropic, Google, Ollama), free local LLMs via Ollama, built with Tauri + Rust for performance.',
        summary: 'Key features of AGI Workforce automation platform',
        date_published: '2025-11-01T00:00:00Z',
        date_modified: new Date().toISOString(),
        tags: ['features', 'workflow builder', 'browser automation', 'LLM', 'Ollama'],
      },
      {
        id: `${baseUrl}/pricing`,
        url: `${baseUrl}/pricing`,
        title: 'Pricing - Currently 100% Free (Alpha)',
        content_text: 'Currently 100% free alpha release. Future subscription tiers planned for Q2 2026: Free Forever tier, Pay-Per-Result at $0.50 per success, Pro Unlimited at $39/month, and Enterprise custom pricing.',
        summary: 'Free alpha now, paid tiers planned for 2026',
        date_published: '2025-11-01T00:00:00Z',
        date_modified: new Date().toISOString(),
        tags: ['pricing', 'free', 'alpha', 'subscription'],
      },
      {
        id: `${baseUrl}/download`,
        url: `${baseUrl}/download`,
        title: 'Download - Windows 10/11 (macOS Q2 2026)',
        content_text: 'Download AGI Workforce for Windows 10/11. Version 0.1.0-alpha. Early access alpha software in active development. macOS support planned for Q2 2026.',
        summary: 'Download the alpha version for Windows',
        date_published: '2025-11-01T00:00:00Z',
        date_modified: new Date().toISOString(),
        tags: ['download', 'Windows', 'alpha', 'installation'],
      },
      {
        id: `${baseUrl}/changelog`,
        url: `${baseUrl}/changelog`,
        title: 'Changelog - Version 0.1.0-alpha',
        content_text: 'Version 0.1.0-alpha released November 2025. Initial alpha release with visual workflow builder, browser automation (Playwright), desktop UI automation, multi-LLM support (OpenAI, Anthropic, Google, Ollama), Windows 10/11 support.',
        summary: 'Latest version and release notes',
        date_published: '2025-11-01T00:00:00Z',
        date_modified: new Date().toISOString(),
        tags: ['changelog', 'release notes', 'version', 'updates'],
      },
    ],
  }

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/feed+json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
