"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    status: "completed",
    technologies: ["Next.js", "TypeScript", "Stripe"],
    image: "/ecommerce-concept.png",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    status: "in-progress",
    technologies: ["React", "Firebase", "Tailwind"],
    image: "/task-management-board.png",
    date: "2024-02-20",
  },
  {
    id: 3,
    title: "AI Chat Application",
    description: "Real-time chat with AI-powered responses",
    status: "completed",
    technologies: ["Next.js", "OpenAI", "Socket.io"],
    image: "/chat-app.jpg",
    date: "2024-03-10",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Data visualization and analytics platform",
    status: "completed",
    technologies: ["React", "D3.js", "Node.js"],
    image: "/data-analytics-dashboard.png",
    date: "2024-01-05",
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleSearch = (e: any) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProjects(
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage and showcase your portfolio projects
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="gap-2">
            <Plus size={20} />
            New Project
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-3 top-3 text-muted-foreground"
          size={20}
        />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge className={`mt-2 ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Edit2 size={16} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600">
                      <Trash2 size={16} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {new Date(project.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No projects found</p>
            <Link href="/dashboard/projects/new">
              <Button>Create Your First Project</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
