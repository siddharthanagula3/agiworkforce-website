/**
 * Blog Post Management
 * Handles blog post loading, parsing, and metadata
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: number
  featured?: boolean
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: number
  featured?: boolean
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.(md|mdx)$/, ''))
  } catch (error) {
    return []
  }
}

/**
 * Get blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    let image: string | undefined = data.image

    // Avoid broken images by checking local assets before surfacing them
    if (image && !image.startsWith('http')) {
      const normalizedImagePath = image.startsWith('/')
        ? path.join(process.cwd(), 'public', image.replace(/^\//, ''))
        : path.join(process.cwd(), image)

      if (!fs.existsSync(normalizedImagePath)) {
        image = undefined
      }
    }

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      content,
      date: data.date || new Date().toISOString(),
      author: data.author || 'AGI Workforce Team',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      image,
      readingTime: calculateReadingTime(content),
      featured: data.featured || false,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog posts with metadata
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

/**
 * Get blog post metadata (without content)
 */
export function getPostMetadata(slug: string): BlogPostMetadata | null {
  const post = getPostBySlug(slug)
  if (!post) return null

  const { content, ...metadata } = post
  return metadata
}

/**
 * Get all posts metadata
 */
export function getAllPostsMetadata(): BlogPostMetadata[] {
  const posts = getAllPosts()
  return posts.map(({ content, ...metadata }) => metadata)
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => post.featured).slice(0, limit)
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(slug)
  if (!currentPost) return []

  const allPosts = getAllPosts().filter(post => post.slug !== slug)

  // Score posts by relevance
  const scoredPosts = allPosts.map(post => {
    let score = 0

    // Same category = +10 points
    if (post.category === currentPost.category) {
      score += 10
    }

    // Shared tags = +5 points per tag
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    score += sharedTags.length * 5

    return { post, score }
  })

  // Sort by score and return top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap(post => post.tags))
  return Array.from(tags)
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()

  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  )
}
