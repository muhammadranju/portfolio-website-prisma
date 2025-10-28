"use client";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectCardSkeleton } from "@/components/skeleton-loader";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");
    const data: Project[] = await response.json();
    setProjects(data);
  };

  useEffect(() => {
    setLoading(true);
    fetchProjects();
    setLoading(false);
  }, []);

  const featuredProjects = projects.filter((project) => project.published);
  const otherProjects = projects.filter((project) => !project.published);

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

  return (
    <div className="min-h-screen bg-background">
      <title>Projects - Portfolio - Full Stack Developer</title>
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
          <div className="grid lg:grid-cols-2 gap-8">
            {loading && <ProjectCardSkeleton />}
            {!loading &&
              featuredProjects.map((project, index) => {
                const technologies = getTechnologies(project.technologies);
                return (
                  <Card
                    key={project._id}
                    className="group hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
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
                        {project.description}
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
              })}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Other Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading &&
              otherProjects.map((project, index) => {
                const technologies = getTechnologies(project.technologies);
                return (
                  <Card
                    key={project._id}
                    className="group hover:shadow-md transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 pt-1">
                        {project.liveLink && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="flex-1 bg-transparent"
                          >
                            <Link
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Demo
                            </Link>
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="flex-1 bg-transparent"
                          >
                            <Link
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
