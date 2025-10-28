"use client";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectCardSkeleton } from "@/components/skeleton-loader";
import Image from "next/image";
import { toast } from "sonner";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string | string[];
  thumbnail?: string;
  published: boolean;
  liveLink?: string;
  githubLink?: string;
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const featuredProjects = projects.filter((project) => project.published);

  const getTechnologies = (techStringOrArray: string | string[]): string[] => {
    if (Array.isArray(techStringOrArray)) {
      return techStringOrArray;
    }
    if (typeof techStringOrArray === "string") {
      return techStringOrArray
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);
    }
    return [];
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchProjects}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Featured Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty leading-relaxed">
            A collection of projects I've built to solve real-world problems.
            Each project showcases different aspects of full-stack development,
            from user interface design to backend architecture.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {loading ? (
              <>
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
              </>
            ) : (
              featuredProjects.map((project, index) => {
                const technologies = getTechnologies(project.technologies);
                return (
                  <Card
                    key={project._id}
                    className="group hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg -mt-6">
                      <Image
                        width={400}
                        height={400}
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description.length > 200
                          ? project.description.substring(0, 200) + "..."
                          : project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-2">
                        {project.liveLink && (
                          <Button size="sm" asChild>
                            <Link
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Interested in Working Together?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                I'm always open to discussing new projects and opportunities.
                Let's create something amazing together.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
