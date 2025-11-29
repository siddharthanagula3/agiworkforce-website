/**
 * AI Agent Detector
 * Identifies AI crawlers and provides crawl delay recommendations
 */

export type AgentType = 'training' | 'inference' | 'search' | 'unknown'

export interface AIAgent {
  name: string
  type: AgentType
  crawlDelay: number // seconds
  rateLimit: number // requests per minute
}

// Comprehensive AI user-agent detection patterns
const AI_AGENTS: Record<string, AIAgent> = {
  // OpenAI
  'GPTBot': {
    name: 'GPTBot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'ChatGPT-User': {
    name: 'ChatGPT-User',
    type: 'inference',
    crawlDelay: 1,
    rateLimit: 60,
  },
  'OAI-SearchBot': {
    name: 'OAI-SearchBot',
    type: 'search',
    crawlDelay: 1,
    rateLimit: 60,
  },
  'SearchGPT': {
    name: 'SearchGPT',
    type: 'search',
    crawlDelay: 1,
    rateLimit: 60,
  },

  // Anthropic
  'ClaudeBot': {
    name: 'ClaudeBot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'Claude-Web': {
    name: 'Claude-Web',
    type: 'inference',
    crawlDelay: 1,
    rateLimit: 60,
  },

  // Google
  'Google-Extended': {
    name: 'Google-Extended',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'GoogleOther': {
    name: 'GoogleOther',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'Bard': {
    name: 'Bard',
    type: 'inference',
    crawlDelay: 1,
    rateLimit: 60,
  },

  // Perplexity
  'PerplexityBot': {
    name: 'PerplexityBot',
    type: 'search',
    crawlDelay: 1,
    rateLimit: 60,
  },

  // Apple
  'Applebot-Extended': {
    name: 'Applebot-Extended',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },

  // Common Crawl (used for AI training datasets)
  'CCBot': {
    name: 'CCBot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },

  // Other AI services
  'Diffbot': {
    name: 'Diffbot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'FacebookBot': {
    name: 'FacebookBot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'ImagesiftBot': {
    name: 'ImagesiftBot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'Omgilibot': {
    name: 'Omgilibot',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'YouBot': {
    name: 'YouBot',
    type: 'search',
    crawlDelay: 1,
    rateLimit: 60,
  },
  'anthropic-ai': {
    name: 'anthropic-ai',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
  'cohere-ai': {
    name: 'cohere-ai',
    type: 'training',
    crawlDelay: 2,
    rateLimit: 30,
  },
}

/**
 * Detects if a user agent is an AI crawler
 */
export function detectAIAgent(userAgent: string | null | undefined): AIAgent | null {
  if (!userAgent) return null

  const userAgentLower = userAgent.toLowerCase()

  // Check each known AI agent
  for (const [pattern, agent] of Object.entries(AI_AGENTS)) {
    if (userAgentLower.includes(pattern.toLowerCase())) {
      return agent
    }
  }

  return null
}

/**
 * Checks if the user agent is an AI training bot
 */
export function isAITrainingBot(userAgent: string | null | undefined): boolean {
  const agent = detectAIAgent(userAgent)
  return agent?.type === 'training'
}

/**
 * Checks if the user agent is an AI inference bot
 */
export function isAIInferenceBot(userAgent: string | null | undefined): boolean {
  const agent = detectAIAgent(userAgent)
  return agent?.type === 'inference'
}

/**
 * Checks if the user agent is an AI search bot
 */
export function isAISearchBot(userAgent: string | null | undefined): boolean {
  const agent = detectAIAgent(userAgent)
  return agent?.type === 'search'
}

/**
 * Checks if the user agent is any kind of AI bot
 */
export function isAIBot(userAgent: string | null | undefined): boolean {
  return detectAIAgent(userAgent) !== null
}

/**
 * Gets the recommended crawl delay for the agent
 */
export function getCrawlDelay(userAgent: string | null | undefined): number {
  const agent = detectAIAgent(userAgent)
  return agent?.crawlDelay ?? 0
}

/**
 * Gets the recommended rate limit for the agent (requests per minute)
 */
export function getRateLimit(userAgent: string | null | undefined): number {
  const agent = detectAIAgent(userAgent)
  return agent?.rateLimit ?? 120 // Default for unknown agents
}

/**
 * Gets a list of all known AI agents
 */
export function getAllAIAgents(): AIAgent[] {
  return Object.values(AI_AGENTS)
}

/**
 * Gets AI agents by type
 */
export function getAIAgentsByType(type: AgentType): AIAgent[] {
  return Object.values(AI_AGENTS).filter((agent) => agent.type === type)
}
