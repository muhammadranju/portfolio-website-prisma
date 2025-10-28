"use client";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCardSkeleton } from "@/components/skeleton-loader";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

function BlogCard({ post, index }: { post: any; index: number }) {
  const readTime = `${Math.ceil(post.excerpt?.length / 200 || 0)} min read`;

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          <Link href={`/blog/${post._id}`} className="text-balance">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-pretty">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{"Md. Ranju "}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-primary hover:text-primary"
          >
            <Link href={`/blog/${post._id}`}>Read More →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blogs?published=true");
      const data = await response.json();
      const postsArray = Array.isArray(data) ? data : [];
      setPosts(postsArray as any);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return null; // Suspense will handle fallback
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-8">All Posts</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any, index: number) => (
          <BlogCard key={post._id} post={post} index={index} />
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No posts available.</p>
        </div>
      )}
    </section>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <title>Blog - Portfolio - Full Stack Developer</title>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty leading-relaxed">
            Thoughts on web development, programming best practices, and the
            latest technologies. I share what I learn and discover in my journey
            as a developer.
          </p>
        </div>

        {/* Blog Posts */}
        <Suspense
          fallback={
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          }
        >
          <BlogList />
        </Suspense>

        {/* Newsletter Signup */}
        <section className="mt-20">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Get notified when I publish new posts about web development,
                programming tips, and technology insights.
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
  );
}
