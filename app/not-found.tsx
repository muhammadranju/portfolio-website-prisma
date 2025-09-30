import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12">
              <div className="mb-8">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                  Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered
                  the wrong URL.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/blog">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
