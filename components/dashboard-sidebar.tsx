"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, FolderOpen, Home, PlusCircle, Settings } from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Blog Posts", href: "/dashboard/blog", icon: FileText },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const quickActions = [
  { name: "New Blog Post", href: "/dashboard/blog/new", icon: PlusCircle },
  { name: "New Project", href: "/dashboard/projects/new", icon: PlusCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <nav className="space-y-8">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navigation</h3>
            <div className="space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {quickActions.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
