import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { getArticleSchema } from '@/lib/structured-data'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Sparkles } from 'lucide-react'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | AGI Workforce Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  // Article structured data for SEO
  const articleSchema = getArticleSchema(
    post.title,
    post.description,
    post.date,
    new Date().toISOString().split('T')[0],
    post.image
  )

  return (
    <>
      {/* JSON-LD for Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen">
        {/* Header */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(244,114,182,0.14),transparent_35%)]" />
          <div className="container relative py-10 md:py-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Article
                </Badge>
                <Badge>{post.category}</Badge>
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="border-b">
            <div className="container py-8">
              <div className="relative max-w-4xl mx-auto overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {!post.image && (
          <div className="border-b bg-muted/30">
            <div className="container py-8">
              <div className="max-w-4xl mx-auto rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-6">
                <p className="text-sm text-muted-foreground mb-2">In this article</p>
                <p className="text-lg font-semibold">{post.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-pre:bg-muted/60 prose-li:marker:text-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t bg-muted/30">
            <div className="container py-12">
              <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{relatedPost.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(relatedPost.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {relatedPost.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="text-sm text-primary flex items-center gap-1">
                          Read more <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-t">
          <div className="container py-12">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold">Ready to Automate?</h2>
              <p className="text-lg text-muted-foreground">
                Download AGI Workforce and start building automated workflows today
              </p>
              <Link
                href="/download"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Download Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
