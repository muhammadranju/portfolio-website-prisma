import BlogPostPageClient from "./page.client"
import { blogPosts } from "@/lib/blogData" // Assuming blogPosts are moved to a separate file

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default async function BlogPostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <BlogPostPageClient params={params} />
}
