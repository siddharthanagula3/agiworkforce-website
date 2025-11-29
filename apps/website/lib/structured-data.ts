import { Thing, WithContext, Organization, SoftwareApplication, FAQPage, BreadcrumbList, HowTo, Review, Article, Product } from 'schema-dts'

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AGI Workforce',
    url: 'https://agiworkforce.com',
    logo: 'https://agiworkforce.com/logo.png',
    description: 'Autonomous desktop and browser automation powered by AI. Automate complex workflows with multi-LLM orchestration.',
    sameAs: [
      'https://twitter.com/agiworkforce',
      'https://linkedin.com/company/agiworkforce',
      'https://github.com/agiworkforce',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'sales@agiworkforce.com',
      url: 'https://agiworkforce.com/enterprise',
    },
  }
}

export function getSoftwareApplicationSchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AGI Workforce',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier available with paid plans starting at $29/month',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    description: 'Autonomous desktop and browser automation powered by AI. Automate complex workflows with intelligent multi-LLM orchestration, visual workflow builder, and enterprise-grade security.',
    softwareVersion: '1.2.0',
    datePublished: '2025-01-15',
    author: {
      '@type': 'Organization',
      name: 'AGI Workforce',
    },
    screenshot: 'https://agiworkforce.com/screenshot.png',
    url: 'https://agiworkforce.com',
    downloadUrl: 'https://agiworkforce.com/download',
    featureList: [
      'Visual workflow builder',
      'Multi-LLM orchestration (OpenAI, Anthropic, Ollama)',
      'Browser automation with Playwright',
      'Desktop UI automation',
      'Database integrations (SQLite, PostgreSQL, MySQL, MongoDB)',
      'REST API integrations',
      'OCR and vision capabilities',
      'Scheduling and triggers',
      'Cost tracking and analytics',
    ],
  }
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>
): WithContext<HowTo> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  }
}

export function getProductSchema(
  name: string,
  description: string,
  price: string,
  priceCurrency: string = 'USD'
): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: 'AGI Workforce',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://agiworkforce.com/pricing',
      priceCurrency,
      price,
      availability: 'https://schema.org/InStock',
    },
  }
}

export function getReviewSchema(
  itemReviewed: string,
  reviewBody: string,
  rating: number,
  author: string
): WithContext<Review> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: itemReviewed,
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: author,
    },
  }
}

export function getArticleSchema(
  headline: string,
  description: string,
  datePublished: string,
  dateModified: string,
  imageUrl?: string
): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: 'AGI Workforce',
      url: 'https://agiworkforce.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AGI Workforce',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agiworkforce.com/logo.png',
      },
    },
    image: imageUrl ? {
      '@type': 'ImageObject',
      url: imageUrl,
    } : undefined,
  }
}
