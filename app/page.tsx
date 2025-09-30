import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Code } from "lucide-react"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Git",
  "Docker",
  "AWS",
]

const experiences = [
  {
    period: "2024 — PRESENT",
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Inc",
    description:
      "Lead development of scalable web applications using modern technologies. Collaborate with cross-functional teams to deliver high-quality software solutions.",
  },
  {
    period: "2022 — 2024",
    role: "Full Stack Developer",
    company: "Digital Agency",
    description:
      "Developed and maintained multiple client projects using React, Node.js, and cloud technologies. Improved application performance by 40%.",
  },
  {
    period: "2020 — 2022",
    role: "Frontend Developer",
    company: "Startup Co",
    description:
      "Built responsive user interfaces and implemented modern design systems. Worked closely with designers to create pixel-perfect implementations.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">Full Stack Developer</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              I build accessible, pixel-perfect digital experiences for the web. My favorite work lies at the
              intersection of design and development, creating experiences that not only look great but are meticulously
              built for performance and usability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <Card className="relative bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                      <Code className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Currently Building</h3>
                      <p className="text-sm text-muted-foreground">Portfolio Dashboard</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive content management system for portfolio websites with authentication, blog
                    management, and project showcases.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Prisma</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate full stack developer with over 4 years of experience building web applications. I
                specialize in creating scalable, user-friendly solutions using modern technologies.
              </p>
              <p>
                Currently, I'm focused on building accessible, performant web applications that solve real-world
                problems. I enjoy working with teams that value clean code, good design, and continuous learning.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-foreground mb-6">Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                    <span className="hidden sm:block text-muted-foreground">—</span>
                    <h4 className="font-semibold text-foreground">{exp.role}</h4>
                    <span className="text-primary">@ {exp.company}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-sm py-2 px-4 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your
              ideas to life.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
