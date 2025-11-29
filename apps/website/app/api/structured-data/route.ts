/**
 * Structured Data API Endpoint
 * Provides combined JSON-LD graphs for AI agents
 * Single endpoint for all schema types
 */

import { NextResponse } from 'next/server'
import { getOrganizationSchema, getSoftwareApplicationSchema } from '@/lib/structured-data'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  // Create a combined JSON-LD graph with all schemas
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization Schema
      {
        '@type': 'Organization',
        '@id': 'https://agiworkforce.com/#organization',
        name: 'AGI Workforce',
        url: 'https://agiworkforce.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://agiworkforce.com/logo.png',
        },
        description: 'Autonomous desktop automation platform powered by AI',
        foundingDate: '2025',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'contact@agiworkforce.com',
          url: 'https://agiworkforce.com/contact',
        },
        sameAs: [
          'https://github.com/siddharthanagula3/agiworkforce-desktop',
        ],
      },

      // Software Application Schema
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://agiworkforce.com/#software',
        name: 'AGI Workforce',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows 10, Windows 11',
        softwareVersion: '0.1.0-alpha',
        datePublished: '2025-11-01',
        dateModified: new Date().toISOString().split('T')[0],
        description: 'Free, open-source desktop automation platform built with Tauri and Rust. Create powerful workflows with visual builders, browser automation, and multi-LLM support.',
        url: 'https://agiworkforce.com',
        downloadUrl: 'https://agiworkforce.com/download',
        license: 'https://opensource.org/licenses/MIT',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'Currently 100% free (alpha). Future paid tiers planned for Q2 2026.',
        },
        featureList: [
          'Visual workflow builder',
          'Browser automation with Playwright',
          'Desktop UI automation',
          'Multi-LLM support (OpenAI, Anthropic, Google, Ollama)',
          'Free local LLMs via Ollama',
          'Built with Tauri + Rust',
          'MIT licensed and open source',
        ],
        author: {
          '@type': 'Organization',
          name: 'AGI Workforce',
        },
        softwareRequirements: 'Windows 10 or Windows 11',
        permissions: 'Desktop automation, browser automation',
      },

      // Product Schema
      {
        '@type': 'Product',
        '@id': 'https://agiworkforce.com/#product',
        name: 'AGI Workforce Desktop Automation Platform',
        description: 'Autonomous desktop automation platform powered by AI. Create workflows, automate tasks, and integrate with multiple LLMs.',
        brand: {
          '@type': 'Brand',
          name: 'AGI Workforce',
        },
        offers: {
          '@type': 'Offer',
          url: 'https://agiworkforce.com/pricing',
          priceCurrency: 'USD',
          price: '0',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-06-30',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '1',
          bestRating: '5',
          worstRating: '1',
        },
      },

      // WebSite Schema
      {
        '@type': 'WebSite',
        '@id': 'https://agiworkforce.com/#website',
        url: 'https://agiworkforce.com',
        name: 'AGI Workforce',
        description: 'Desktop automation platform powered by AI',
        publisher: {
          '@id': 'https://agiworkforce.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://agiworkforce.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },

      // BreadcrumbList for main navigation
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://agiworkforce.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://agiworkforce.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Features',
            item: 'https://agiworkforce.com/features',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Pricing',
            item: 'https://agiworkforce.com/pricing',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Download',
            item: 'https://agiworkforce.com/download',
          },
        ],
      },
    ],
  }

  return NextResponse.json(structuredData, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
