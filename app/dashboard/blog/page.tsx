"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { Edit, Eye, MoreHorizontal, PlusCircle, Search, Trash2 } from "lucide-react"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    status: "published",
    publishedAt: "2024-01-15",
    views: 1247,
    author: "John Doe",
  },
  {
    id: 2,
    title: "The Complete Guide to Next.js App Router",
    status: "published",
    publishedAt: "2024-01-10",
    views: 892,
    author: "John Doe",
  },
  {
    id: 3,
    title: "Database Design Patterns for Modern Applications",
    status: "draft",
    publishedAt: null,
    views: 0,
    author: "John Doe",
  },
  {
    id: 4,
    title: "Implementing Authentication in Next.js with JWT",
    status: "published",
    publishedAt: "2023-12-28",
    views: 654,
    author: "John Doe",
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use Each",
    status: "published",
    publishedAt: "2023-12-20",
    views: 423,
    author: "John Doe",
  },
]

export default function BlogManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the post
    console.log("Delete post:", id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Blog Post
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="animate-fade-in animation-delay-200">
        <CardHeader>
          <CardTitle className="text-lg">Filter Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "published" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("published")}
              >
                Published
              </Button>
              <Button
                variant={statusFilter === "draft" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("draft")}
              >
                Drafts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card className="animate-fade-in animation-delay-400">
        <CardHeader>
          <CardTitle>All Posts ({filteredPosts.length})</CardTitle>
          <CardDescription>Manage your blog posts and their publication status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{post.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{post.views.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{post.author}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.id}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/blog/${post.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
