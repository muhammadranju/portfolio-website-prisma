import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogCardSkeleton } from "@/components/skeleton-loader"
import Link from "next/link"
import { Calendar, Clock, Search, User } from "lucide-react"
import { Suspense } from "react"

// Mock blog data - in a real app, this would come from your database
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, best practices for component architecture, and advanced patterns for maintainable code.",
    content: "Full blog content here...",
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture"],
    featured: true,
  },
  {
    id: 2,
    title: "The Complete Guide to Next.js App Router",
    excerpt:
      "Explore the new App Router in Next.js 13+, including server components, streaming, and advanced routing patterns for modern web applications.",
    content: "Full blog content here...",
    author: "John Doe",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["Next.js", "React", "Web Development"],
    featured: true,
  },
  {
    id: 3,
    title: "Database Design Patterns for Modern Applications",
    excerpt:
      "Understanding database design patterns, normalization, indexing strategies, and how to choose the right database for your project requirements.",
    content: "Full blog content here...",
    author: "John Doe",
    publishedAt: "2024-01-05",
    readTime: "10 min read",
    tags: ["Database", "PostgreSQL", "Design Patterns"],
    featured: false,
  },
  {
    id: 4,
    title: "Implementing Authentication in Next.js with JWT",
    excerpt:
      "Step-by-step guide to implementing secure authentication in Next.js applications using JWT tokens, middleware, and best security practices.",
    content: "Full blog content here...",
    author: "John Doe",
    publishedAt: "2023-12-28",
    readTime: "15 min read",
    tags: ["Authentication", "Security", "Next.js"],
    featured: false,
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use Each",
    excerpt:
      "A comprehensive comparison of CSS Grid and Flexbox, with practical examples and guidelines for choosing the right layout method for your designs.",
    content: "Full blog content here...",
    author: "John Doe",
    publishedAt: "2023-12-20",
    readTime: "6 min read",
    tags: ["CSS", "Layout", "Web Design"],
    featured: false,
  },
  {
    id: 6,
    title: "Optimizing Web Performance with Modern Tools",
    excerpt:
      "Learn about modern web performance optimization techniques, tools for measuring performance, and strategies for improving user experience.",
    content: "Full blog content here...",
    author: "John Doe",
    publishedAt: "2023-12-15",
    readTime: "11 min read",
    tags: ["Performance", "Optimization", "Web Development"],
    featured: false,
  },
]

function BlogCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{post.readTime}</span>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.id}`} className="text-balance">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary">
            <Link href={`/blog/${post.id}`}>Read More →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BlogList() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <>
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Posts</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-8">All Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + featuredPosts.length} />
          ))}
        </div>
      </section>
    </>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty leading-relaxed">
            Thoughts on web development, programming best practices, and the latest technologies. I share what I learn
            and discover in my journey as a developer.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 animate-fade-in animation-delay-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Blog Posts */}
        <Suspense
          fallback={
            <div className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-8">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
            </div>
          }
        >
          <BlogList />
        </Suspense>

        {/* Newsletter Signup */}
        <section className="mt-20">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Get notified when I publish new posts about web development, programming tips, and technology insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-background border-border focus:border-primary"
                />
                <Button size="lg">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
