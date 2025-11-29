import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://agiworkforce.com'

  return {
    rules: [
      // AI Training Bots - Allow with crawl delay
      {
        userAgent: [
          'GPTBot',           // OpenAI training
          'ChatGPT-User',     // OpenAI ChatGPT browsing
          'ClaudeBot',        // Anthropic training
          'Claude-Web',       // Anthropic browsing
          'Google-Extended',  // Google Bard/Gemini training
          'GoogleOther',      // Google other AI services
          'PerplexityBot',    // Perplexity AI search
          'Applebot-Extended', // Apple AI training
          'CCBot',            // Common Crawl (used for AI training)
          'Diffbot',          // Diffbot knowledge graph
          'FacebookBot',      // Meta AI training
          'ImagesiftBot',     // Image analysis bot
          'Omgilibot',        // Discussion forum crawler
          'YouBot',           // You.com AI search
        ],
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 2, // 2 seconds between requests
      },
      // AI Search Bots - Allow with less restrictive delay
      {
        userAgent: [
          'OAI-SearchBot',    // OpenAI search
          'SearchGPT',        // OpenAI SearchGPT
          'PerplexityBot',    // Perplexity search
        ],
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1, // 1 second between requests
      },
      // All other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
