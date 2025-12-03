/**
 * Blog RSS Feed
 * Provides RSS 2.0 feed for blog posts
 */

import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const posts = getAllPosts().slice(0, 50) // Latest 50 posts
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agiworkforce.com'

  const toAbsolute = (url?: string) => {
    if (!url) return undefined
    if (url.startsWith('http')) return url
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AGI Workforce Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert insights on desktop automation, AI workflows, and productivity</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>AGI Workforce</title>
      <link>${baseUrl}</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>contact@agiworkforce.com (${post.author})</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
      ${toAbsolute(post.image) ? `<enclosure url="${toAbsolute(post.image)}" type="image/jpeg"/>` : ''}
      <content:encoded><![CDATA[
        ${post.content}
      ]]></content:encoded>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
