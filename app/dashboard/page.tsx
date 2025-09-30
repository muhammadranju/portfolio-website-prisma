import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart3, Eye, FileText, FolderOpen, PlusCircle, TrendingUp } from "lucide-react"

// Mock data - in a real app, this would come from your database
const stats = [
  {
    title: "Total Blog Posts",
    value: "12",
    change: "+2 this month",
    icon: FileText,
    trend: "up",
  },
  {
    title: "Total Projects",
    value: "8",
    change: "+1 this month",
    icon: FolderOpen,
    trend: "up",
  },
  {
    title: "Page Views",
    value: "2,847",
    change: "+12% from last month",
    icon: Eye,
    trend: "up",
  },
  {
    title: "Engagement Rate",
    value: "68%",
    change: "+5% from last month",
    icon: TrendingUp,
    trend: "up",
  },
]

const recentPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    status: "published",
    publishedAt: "2024-01-15",
    views: 1247,
  },
  {
    id: 2,
    title: "The Complete Guide to Next.js App Router",
    status: "published",
    publishedAt: "2024-01-10",
    views: 892,
  },
  {
    id: 3,
    title: "Database Design Patterns for Modern Applications",
    status: "draft",
    publishedAt: null,
    views: 0,
  },
]

const recentProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    status: "live",
    updatedAt: "2024-01-12",
    technologies: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: 2,
    title: "Task Management App",
    status: "live",
    updatedAt: "2024-01-08",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    status: "development",
    updatedAt: "2024-01-05",
    technologies: ["React", "API", "Charts"],
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animation-delay-200">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <Card className="animate-fade-in animation-delay-400">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Blog Posts</CardTitle>
              <CardDescription>Your latest blog posts and their performance</CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/dashboard/blog">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm mb-1">{post.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
                        {post.status}
                      </Badge>
                      {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                      <span>{post.views} views</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/blog/${post.id}`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="animate-fade-in animation-delay-600">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Projects</CardTitle>
              <CardDescription>Your latest projects and their status</CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/dashboard/projects">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm mb-1">{project.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <Badge variant={project.status === "live" ? "default" : "secondary"} className="text-xs">
                        {project.status}
                      </Badge>
                      <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in animation-delay-800">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/blog/new">
                <FileText className="h-6 w-6" />
                <span>Create Blog Post</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/projects/new">
                <FolderOpen className="h-6 w-6" />
                <span>Add Project</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/analytics">
                <BarChart3 className="h-6 w-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
