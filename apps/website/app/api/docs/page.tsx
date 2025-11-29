'use client'

/**
 * Swagger UI Documentation Page
 * Interactive API documentation with live testing
 */

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">AGI Workforce API Documentation</h1>
          <p className="text-muted-foreground">
            Interactive API documentation with live testing capabilities
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href="/api/openapi.json"
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              View OpenAPI Spec →
            </a>
            <a
              href="/api/feed.json"
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              View JSON Feed →
            </a>
            <a
              href="/api/structured-data"
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Structured Data →
            </a>
          </div>
        </div>
      </div>

      {/* Swagger UI */}
      <div className="container py-8">
        <SwaggerUI url="/api/openapi.json" />
      </div>

      {/* Footer Info */}
      <div className="border-t bg-muted/30 mt-12">
        <div className="container py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                All public endpoints are accessible without authentication. Rate limits apply to prevent abuse.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rate Limits</h3>
              <p className="text-sm text-muted-foreground">
                AI agents: 30-60 requests/min. Standard users: 120 requests/min. Check response headers for limits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">
                Questions? Open an issue on{' '}
                <a
                  href="https://github.com/siddharthanagula3/agiworkforce-desktop/issues"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
