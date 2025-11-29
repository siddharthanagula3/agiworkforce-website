/**
 * Rate Limiter
 * Token bucket and sliding window algorithms for AI crawler rate limiting
 */

export interface RateLimitConfig {
  maxRequests: number // Maximum requests allowed
  windowMs: number // Time window in milliseconds
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number // Timestamp when the limit resets
  retryAfter?: number // Seconds to wait before retrying
}

interface RequestLog {
  count: number
  resetAt: number
  requests: number[] // Timestamps of requests for sliding window
}

// In-memory storage for rate limits
// In production, consider using Redis for distributed systems
const rateLimitStore = new Map<string, RequestLog>()

// Cleanup interval (every 5 minutes)
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000

/**
 * Token Bucket Algorithm
 * Allows bursts but enforces average rate
 */
export function tokenBucketRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = `tb:${identifier}`

  // Get or create request log
  let log = rateLimitStore.get(key)

  if (!log || now >= log.resetAt) {
    // Reset the bucket
    log = {
      count: 0,
      resetAt: now + config.windowMs,
      requests: [],
    }
    rateLimitStore.set(key, log)
  }

  // Check if request is allowed
  if (log.count < config.maxRequests) {
    log.count++
    return {
      allowed: true,
      remaining: config.maxRequests - log.count,
      resetAt: log.resetAt,
    }
  }

  // Rate limit exceeded
  const retryAfter = Math.ceil((log.resetAt - now) / 1000)
  return {
    allowed: false,
    remaining: 0,
    resetAt: log.resetAt,
    retryAfter: retryAfter > 0 ? retryAfter : 1,
  }
}

/**
 * Sliding Window Algorithm
 * More accurate than token bucket, prevents bursts at window boundaries
 */
export function slidingWindowRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = `sw:${identifier}`
  const windowStart = now - config.windowMs

  // Get or create request log
  let log = rateLimitStore.get(key)

  if (!log) {
    log = {
      count: 0,
      resetAt: now + config.windowMs,
      requests: [],
    }
    rateLimitStore.set(key, log)
  }

  // Remove requests outside the sliding window
  log.requests = log.requests.filter((timestamp) => timestamp > windowStart)

  // Check if request is allowed
  if (log.requests.length < config.maxRequests) {
    log.requests.push(now)
    log.count = log.requests.length

    // Calculate when the oldest request will fall out of the window
    const oldestRequest = log.requests[0]
    const resetAt = oldestRequest + config.windowMs

    return {
      allowed: true,
      remaining: config.maxRequests - log.requests.length,
      resetAt,
    }
  }

  // Rate limit exceeded
  // Calculate retry after based on oldest request
  const oldestRequest = log.requests[0]
  const retryAfter = Math.ceil((oldestRequest + config.windowMs - now) / 1000)

  return {
    allowed: false,
    remaining: 0,
    resetAt: oldestRequest + config.windowMs,
    retryAfter: retryAfter > 0 ? retryAfter : 1,
  }
}

/**
 * Combined rate limiter that uses sliding window by default
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig,
  algorithm: 'token-bucket' | 'sliding-window' = 'sliding-window'
): RateLimitResult {
  if (algorithm === 'token-bucket') {
    return tokenBucketRateLimit(identifier, config)
  }
  return slidingWindowRateLimit(identifier, config)
}

/**
 * Rate limit for AI agents based on their type
 */
export function rateLimitAIAgent(
  identifier: string,
  requestsPerMinute: number
): RateLimitResult {
  return slidingWindowRateLimit(identifier, {
    maxRequests: requestsPerMinute,
    windowMs: 60 * 1000, // 1 minute
  })
}

/**
 * Check if a request is rate limited without incrementing the counter
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = `sw:${identifier}`
  const windowStart = now - config.windowMs

  const log = rateLimitStore.get(key)

  if (!log) {
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetAt: now + config.windowMs,
    }
  }

  // Count requests in current window
  const requestsInWindow = log.requests.filter(
    (timestamp) => timestamp > windowStart
  ).length

  if (requestsInWindow < config.maxRequests) {
    return {
      allowed: true,
      remaining: config.maxRequests - requestsInWindow,
      resetAt: log.requests[0] ? log.requests[0] + config.windowMs : now + config.windowMs,
    }
  }

  const oldestRequest = log.requests[0]
  const retryAfter = Math.ceil((oldestRequest + config.windowMs - now) / 1000)

  return {
    allowed: false,
    remaining: 0,
    resetAt: oldestRequest + config.windowMs,
    retryAfter: retryAfter > 0 ? retryAfter : 1,
  }
}

/**
 * Reset rate limit for an identifier
 */
export function resetRateLimit(identifier: string): void {
  const keys = Array.from(rateLimitStore.keys()).filter((key) =>
    key.includes(identifier)
  )
  keys.forEach((key) => rateLimitStore.delete(key))
}

/**
 * Clean up expired entries
 */
export function cleanupRateLimits(): void {
  const now = Date.now()
  const keysToDelete: string[] = []

  rateLimitStore.forEach((log, key) => {
    // If all requests are older than 2x the window, delete the entry
    const hasRecentRequests = log.requests.some(
      (timestamp) => timestamp > now - 120000 // 2 minutes
    )
    if (!hasRecentRequests && log.resetAt < now) {
      keysToDelete.push(key)
    }
  })

  keysToDelete.forEach((key) => rateLimitStore.delete(key))
}

/**
 * Get current stats for an identifier
 */
export function getRateLimitStats(identifier: string): {
  totalRequests: number
  remainingRequests: number
  resetAt: number | null
} {
  const keys = Array.from(rateLimitStore.keys()).filter((key) =>
    key.includes(identifier)
  )

  if (keys.length === 0) {
    return {
      totalRequests: 0,
      remainingRequests: 0,
      resetAt: null,
    }
  }

  const log = rateLimitStore.get(keys[0])
  if (!log) {
    return {
      totalRequests: 0,
      remainingRequests: 0,
      resetAt: null,
    }
  }

  return {
    totalRequests: log.requests.length,
    remainingRequests: 0, // Would need config to calculate
    resetAt: log.resetAt,
  }
}

// Start cleanup interval
if (typeof window === 'undefined') {
  // Only run in Node.js environment (server-side)
  setInterval(cleanupRateLimits, CLEANUP_INTERVAL_MS)
}
