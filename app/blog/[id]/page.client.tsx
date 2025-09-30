"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blogData" // Assuming blogPosts are moved to a separate file

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPageClient({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12 animate-fade-in animation-delay-200">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <Separator className="mt-8" />
        </header>

        {/* Article Content */}
        <div className="animate-fade-in animation-delay-400">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-pre:border-border">
                {/* In a real app, you would render the markdown content here */}
                <div
                  className="whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>')
                      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-4 mt-8">$2</h2>')
                      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mb-3 mt-6">$3</h3>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
                      .replace(
                        /```(\w+)?\n([\s\S]*?)```/g,
                        '<pre class="bg-muted border border-border rounded-lg p-4 overflow-x-auto my-4"><code>$2</code></pre>',
                      )
                      .replace(/\n\n/g, '</p><p class="mb-4">'),
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-border animate-fade-in animation-delay-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Enjoyed this article?</h3>
              <p className="text-muted-foreground">Share it with others who might find it useful.</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        <section className="mt-16 animate-fade-in animation-delay-800">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={relatedPost.publishedAt}>
                        {new Date(relatedPost.publishedAt).toLocaleDateString()}
                      </time>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      <Link href={`/blog/${relatedPost.id}`} className="text-balance">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty">{relatedPost.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </article>
    </div>
  )
}
