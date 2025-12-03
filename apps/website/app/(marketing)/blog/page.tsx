import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostsMetadata } from '@/lib/blog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Desktop Automation Insights & Tutorials | AGI Workforce',
  description: 'Learn about desktop automation, AI workflows, browser automation, and productivity tips. Expert guides, tutorials, and best practices for automating your work.',
  openGraph: {
    title: 'AGI Workforce Blog - Automation Insights & Tutorials',
    description: 'Expert guides on desktop automation, AI workflows, and productivity',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPostsMetadata()
  const featuredPosts = posts.filter(post => post.featured).slice(0, 2)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.12),transparent_35%)]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground bg-background/70 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Automation insights, shipped weekly
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Desktop Automation Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert tutorials, playbooks, and tooling breakdowns for AI-powered desktop workflows.
            </p>
            <div className="grid gap-3 md:grid-cols-3 mt-6">
              <div className="rounded-xl border bg-background/70 px-4 py-3 text-left shadow-sm">
                <p className="text-sm text-muted-foreground">Deep Dives</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Guides for builders
                </p>
              </div>
              <div className="rounded-xl border bg-background/70 px-4 py-3 text-left shadow-sm">
                <p className="text-sm text-muted-foreground">Real-World ROI</p>
                <p className="text-lg font-semibold">Benchmarks &amp; templates</p>
              </div>
              <div className="rounded-xl border bg-background/70 px-4 py-3 text-left shadow-sm">
                <p className="text-sm text-muted-foreground">Updated Weekly</p>
                <p className="text-lg font-semibold">Fresh tactics &amp; patterns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 border-b bg-muted/20">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="group h-full overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.18),transparent_45%)] blur-xl opacity-70 transition duration-500 group-hover:scale-110" />
                        <div className="relative flex h-full items-end bg-muted/60 px-6 pb-4">
                          <div className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold">
                            {post.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} min read
                        </span>
                        <span className="text-sm text-primary flex items-center gap-1">
                          Read more <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">All Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {regularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group h-full border-muted/60 bg-background/80 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min
                      </span>
                      <span className="text-primary flex items-center gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Automate Your Work?</h2>
            <p className="text-lg text-muted-foreground">
              Download AGI Workforce and start automating tasks in minutes
            </p>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Download Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
