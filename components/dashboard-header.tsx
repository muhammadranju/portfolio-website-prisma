"use client"

import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"
import { useAuth } from "@/hooks/use-auth"
import { Bell, Settings, User } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            Portfolio Admin
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">{user?.email}</span>
            </div>

            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
