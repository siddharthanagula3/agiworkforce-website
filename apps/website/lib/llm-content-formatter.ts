/**
 * LLM Content Formatter
 * Formats content for optimal LLM consumption
 */

export interface ContentMetadata {
  title: string
  description: string
  url: string
  published?: string
  modified?: string
  author?: string
  tags?: string[]
  category?: string
}

export interface FormattedContent {
  markdown: string
  json: Record<string, any>
  metadata: ContentMetadata
}

/**
 * Clean and format text for LLM consumption
 */
export function cleanTextForLLM(text: string): string {
  return text
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Normalize line breaks
    .replace(/\r\n/g, '\n')
    // Remove excessive line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Trim
    .trim()
}

/**
 * Convert HTML to clean markdown
 */
export function htmlToMarkdown(html: string): string {
  // Basic HTML to Markdown conversion
  let markdown = html
    // Headers
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    // Bold and italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Lists
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, '$1')
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, '$1')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    // Paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove remaining HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")

  return cleanTextForLLM(markdown)
}

/**
 * Format content as structured markdown for LLMs
 */
export function formatAsMarkdown(
  content: string,
  metadata: ContentMetadata
): string {
  const sections: string[] = []

  // Title
  sections.push(`# ${metadata.title}`)
  sections.push('')

  // Metadata
  if (metadata.description) {
    sections.push(`> ${metadata.description}`)
    sections.push('')
  }

  // Info block
  const info: string[] = []
  if (metadata.url) info.push(`**URL**: ${metadata.url}`)
  if (metadata.author) info.push(`**Author**: ${metadata.author}`)
  if (metadata.published) info.push(`**Published**: ${metadata.published}`)
  if (metadata.modified) info.push(`**Last Modified**: ${metadata.modified}`)
  if (metadata.category) info.push(`**Category**: ${metadata.category}`)

  if (info.length > 0) {
    sections.push(info.join('  \n'))
    sections.push('')
  }

  // Tags
  if (metadata.tags && metadata.tags.length > 0) {
    sections.push(`**Tags**: ${metadata.tags.join(', ')}`)
    sections.push('')
  }

  // Separator
  sections.push('---')
  sections.push('')

  // Main content
  sections.push(content)

  return sections.join('\n')
}

/**
 * Format content as structured JSON for LLMs
 */
export function formatAsJSON(
  content: string,
  metadata: ContentMetadata
): Record<string, any> {
  return {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    content: cleanTextForLLM(content),
    metadata: {
      published: metadata.published,
      modified: metadata.modified,
      author: metadata.author,
      tags: metadata.tags || [],
      category: metadata.category,
    },
    // Additional LLM-friendly fields
    wordCount: content.split(/\s+/).length,
    readingTimeMinutes: Math.ceil(content.split(/\s+/).length / 200),
  }
}

/**
 * Format content in both markdown and JSON formats
 */
export function formatContent(
  content: string,
  metadata: ContentMetadata
): FormattedContent {
  const cleanContent = cleanTextForLLM(content)

  return {
    markdown: formatAsMarkdown(cleanContent, metadata),
    json: formatAsJSON(cleanContent, metadata),
    metadata,
  }
}

/**
 * Extract key information from content
 */
export function extractKeyInfo(content: string): {
  summary: string
  keyPoints: string[]
  questions: string[]
} {
  // Simple extraction - in production, could use NLP
  const lines = content.split('\n').filter(line => line.trim())

  // First paragraph as summary
  const summary = lines.find(line => line.length > 50) || lines[0] || ''

  // Headers and list items as key points
  const keyPoints = lines
    .filter(line =>
      line.startsWith('#') ||
      line.startsWith('-') ||
      line.startsWith('*') ||
      line.startsWith('•')
    )
    .slice(0, 5)
    .map(line => line.replace(/^[#\-*•\s]+/, '').trim())

  // Lines ending with ? as questions
  const questions = lines
    .filter(line => line.trim().endsWith('?'))
    .slice(0, 3)
    .map(line => line.trim())

  return {
    summary,
    keyPoints,
    questions,
  }
}

/**
 * Format content with table of contents
 */
export function formatWithTOC(content: string, metadata: ContentMetadata): string {
  const lines = content.split('\n')
  const headers: Array<{ level: number; text: string; id: string }> = []

  // Extract headers
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      headers.push({ level, text, id })
    }
  })

  if (headers.length === 0) {
    return formatAsMarkdown(content, metadata)
  }

  // Build table of contents
  const toc = ['## Table of Contents', '']
  headers.forEach(header => {
    const indent = '  '.repeat(header.level - 1)
    toc.push(`${indent}- [${header.text}](#${header.id})`)
  })
  toc.push('')

  // Add TOC to content
  const sections = [
    `# ${metadata.title}`,
    '',
    ...(metadata.description ? [`> ${metadata.description}`, ''] : []),
    '---',
    '',
    ...toc,
    '---',
    '',
    content,
  ]

  return sections.join('\n')
}

/**
 * Create a concise version for LLM context windows
 */
export function createConciseVersion(content: string, maxWords: number = 500): string {
  const words = content.split(/\s+/)

  if (words.length <= maxWords) {
    return content
  }

  // Take first maxWords words and add ellipsis
  const concise = words.slice(0, maxWords).join(' ')
  return `${concise}... [Content truncated. Full version has ${words.length} words]`
}
