/**
 * Bot Detection Library
 * CAPTCHA-free bot prevention using multiple detection methods
 */

export interface BotDetectionResult {
  isBot: boolean
  confidence: number // 0-100
  reasons: string[]
  score: number // Lower is better (human-like)
}

export interface BotDetectionData {
  // Timing data
  formStartTime?: number
  formSubmitTime?: number

  // Mouse movement data
  mouseMovements?: number
  mouseMoveDistance?: number

  // Form interaction data
  fieldFocusCount?: number
  keypressCount?: number
  pasteEventCount?: number

  // Browser fingerprint
  userAgent?: string
  screenResolution?: string
  timezone?: number
  language?: string

  // Honeypot field
  honeypotValue?: string
}

/**
 * Analyze bot detection data and return result
 */
export function analyzeBotBehavior(data: BotDetectionData): BotDetectionResult {
  const reasons: string[] = []
  let score = 0

  // 1. Honeypot field detection
  if (data.honeypotValue && data.honeypotValue.trim() !== '') {
    reasons.push('Honeypot field filled')
    score += 100 // Definitive bot indicator
  }

  // 2. Timing analysis
  if (data.formStartTime && data.formSubmitTime) {
    const timeSpent = data.formSubmitTime - data.formStartTime

    // Too fast (< 3 seconds) - likely bot
    if (timeSpent < 3000) {
      reasons.push('Form submitted too quickly (< 3 seconds)')
      score += 50
    }

    // Suspiciously fast (< 5 seconds) - possible bot
    else if (timeSpent < 5000) {
      reasons.push('Form submitted very quickly (< 5 seconds)')
      score += 25
    }

    // Too slow (> 30 minutes) - likely abandoned/bot
    else if (timeSpent > 1800000) {
      reasons.push('Form took too long (> 30 minutes)')
      score += 30
    }
  }

  // 3. Mouse movement analysis
  if (data.mouseMovements !== undefined) {
    // No mouse movement at all - likely bot
    if (data.mouseMovements === 0) {
      reasons.push('No mouse movement detected')
      score += 40
    }

    // Very few movements - suspicious
    else if (data.mouseMovements < 5) {
      reasons.push('Very few mouse movements')
      score += 20
    }
  }

  // 4. Form interaction analysis
  if (data.fieldFocusCount !== undefined && data.fieldFocusCount === 0) {
    reasons.push('No field focus events')
    score += 30
  }

  if (data.keypressCount !== undefined && data.keypressCount === 0) {
    reasons.push('No keypress events detected')
    score += 25
  }

  // 5. Paste detection (high paste count is suspicious)
  if (data.pasteEventCount !== undefined && data.pasteEventCount > 3) {
    reasons.push('Excessive paste events')
    score += 15
  }

  // 6. User agent analysis
  if (data.userAgent) {
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /headless/i,
      /phantom/i,
      /selenium/i,
      /puppeteer/i,
      /playwright/i,
    ]

    if (botPatterns.some(pattern => pattern.test(data.userAgent!))) {
      reasons.push('Bot-like user agent detected')
      score += 60
    }
  }

  // 7. Screen resolution check (common bot resolutions)
  if (data.screenResolution) {
    const botResolutions = ['800x600', '1024x768', '1920x1080'] // Common headless defaults
    if (botResolutions.includes(data.screenResolution)) {
      // Not definitive, just slightly suspicious
      score += 5
    }
  }

  // Calculate confidence
  const confidence = Math.min(100, Math.max(0, score))
  const isBot = score >= 50 // Threshold for bot detection

  return {
    isBot,
    confidence,
    reasons,
    score,
  }
}

/**
 * Server-side bot detection based on request patterns
 */
export function detectBotFromRequest(headers: Headers): BotDetectionResult {
  const reasons: string[] = []
  let score = 0

  const userAgent = headers.get('user-agent') || ''
  const referer = headers.get('referer') || ''
  const acceptLanguage = headers.get('accept-language') || ''
  const acceptEncoding = headers.get('accept-encoding') || ''

  // 1. Missing or suspicious user agent
  if (!userAgent) {
    reasons.push('No user agent')
    score += 50
  } else {
    // Check for automation tools
    const automationTools = [
      /headless/i,
      /phantom/i,
      /selenium/i,
      /puppeteer/i,
      /playwright/i,
      /webdriver/i,
      /automation/i,
    ]

    if (automationTools.some(tool => tool.test(userAgent))) {
      reasons.push('Automation tool detected in user agent')
      score += 70
    }
  }

  // 2. Missing common browser headers
  if (!acceptLanguage) {
    reasons.push('Missing Accept-Language header')
    score += 15
  }

  if (!acceptEncoding) {
    reasons.push('Missing Accept-Encoding header')
    score += 15
  }

  // 3. Suspicious header combinations
  if (userAgent && !userAgent.includes('Mozilla') && !userAgent.includes('Chrome')) {
    reasons.push('Non-standard user agent')
    score += 20
  }

  const confidence = Math.min(100, Math.max(0, score))
  const isBot = score >= 50

  return {
    isBot,
    confidence,
    reasons,
    score,
  }
}

/**
 * Generate a unique session ID for tracking
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Client-side bot detection helper (to be used in React components)
 */
export class BotDetectionTracker {
  private data: BotDetectionData = {}

  constructor() {
    this.data.formStartTime = Date.now()
    this.data.mouseMovements = 0
    this.data.mouseMoveDistance = 0
    this.data.fieldFocusCount = 0
    this.data.keypressCount = 0
    this.data.pasteEventCount = 0

    // Capture browser fingerprint
    if (typeof window !== 'undefined') {
      this.data.userAgent = navigator.userAgent
      this.data.screenResolution = `${window.screen.width}x${window.screen.height}`
      this.data.timezone = new Date().getTimezoneOffset()
      this.data.language = navigator.language
    }
  }

  trackMouseMove(e: MouseEvent) {
    this.data.mouseMovements = (this.data.mouseMovements || 0) + 1

    // Calculate distance if we have a previous position
    if (this.data.mouseMoveDistance !== undefined) {
      // Simple distance calculation could be added here
    }
  }

  trackFieldFocus() {
    this.data.fieldFocusCount = (this.data.fieldFocusCount || 0) + 1
  }

  trackKeypress() {
    this.data.keypressCount = (this.data.keypressCount || 0) + 1
  }

  trackPaste() {
    this.data.pasteEventCount = (this.data.pasteEventCount || 0) + 1
  }

  setHoneypotValue(value: string) {
    this.data.honeypotValue = value
  }

  getDetectionData(): BotDetectionData {
    this.data.formSubmitTime = Date.now()
    return { ...this.data }
  }

  analyze(): BotDetectionResult {
    return analyzeBotBehavior(this.getDetectionData())
  }
}

/**
 * Validate that detection data meets minimum thresholds
 */
export function validateHumanBehavior(data: BotDetectionData): boolean {
  const result = analyzeBotBehavior(data)
  return !result.isBot
}

/**
 * Get a simple pass/fail for bot detection
 */
export function isLikelyBot(data: BotDetectionData): boolean {
  const result = analyzeBotBehavior(data)
  return result.isBot
}
