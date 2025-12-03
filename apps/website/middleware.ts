import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { detectAIAgent, getRateLimit } from '@/lib/ai-agent-detector'
import { rateLimitAIAgent } from '@/lib/rate-limiter'

export async function middleware(request: NextRequest) {
  // Get user agent
  const userAgent = request.headers.get('user-agent')

  // Detect AI agents
  const aiAgent = detectAIAgent(userAgent)

  if (aiAgent) {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    const identifier = `${aiAgent.name}:${ip}`

    // Apply rate limiting for AI agents
    const rateLimit = rateLimitAIAgent(identifier, getRateLimit(userAgent))

    if (!rateLimit.allowed) {
      // Rate limit exceeded
      return new NextResponse('Rate limit exceeded', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain',
          'Retry-After': String(rateLimit.retryAfter || 60),
          'X-RateLimit-Limit': String(getRateLimit(userAgent)),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(rateLimit.resetAt / 1000)),
        },
      })
    }

    // Continue with request and add AI agent headers
    const response = await updateSession(request)

    // Add custom headers for AI agents
    response.headers.set('X-AI-Agent-Detected', aiAgent.name)
    response.headers.set('X-AI-Agent-Type', aiAgent.type)
    response.headers.set('X-RateLimit-Limit', String(getRateLimit(userAgent)))
    response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining))
    response.headers.set('X-RateLimit-Reset', String(Math.floor(rateLimit.resetAt / 1000)))
    response.headers.set('X-Crawl-Delay', String(aiAgent.crawlDelay))

    return response
  }

  // For non-AI agents, just update session normally
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// Supabase SSR helpers rely on Node APIs; ensure the middleware runs in the Node.js runtime.
export const runtime = 'nodejs'
