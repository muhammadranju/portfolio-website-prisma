"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    shortDescription: "",
    thumbnail: "",
    liveLink: "",
    githubLink: "",
    features: "",
    status: "planned",
    technologies: "",
    featured: false,
    published: false,
  });
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    const value = e.target.value;
    const type = e.target.type;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
      ...(name === "title" && {
        slug: value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          shortDescription: formData.shortDescription,
          thumbnail: formData.thumbnail,
          liveLink: formData.liveLink,
          githubLink: formData.githubLink,
          features: formData.features,
          status: formData.status,
          technologies: formData.technologies,
          // ?.split(",")
          // .map((t: any) => t.trim()),

          featured: formData.featured,
          published: formData.published,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Project created successfully");
        router.push("/dashboard/projects");
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("An error occurred while creating the project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Projects
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Create New Project
        </h1>
        <p className="text-muted-foreground mt-2">
          Add a new project to your portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Fill in the information about your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Title *
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Slug *
              </label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="project-slug (auto-generated from title)"
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Short Description *
              </label>
              <Input
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief one-line description"
                required
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Description *
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed project description"
                rows={5}
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Features
              </label>
              <Textarea
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="List key features, one per line or with bullet points"
                rows={4}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Thumbnail *
              </label>
              <Input
                name="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Technologies
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={formData.technologies}
                  id="technologies"
                  name="technologies"
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="Add technology (e.g., React, Node.js)"
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Live Link
                </label>
                <Input
                  name="liveLink"
                  type="url"
                  value={formData.liveLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  GitHub Link
                </label>
                <Input
                  name="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={handleInputChange}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-input"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Mark as featured project
              </label>
            </div>

            {/* Published */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-input"
              />
              <label
                htmlFor="published"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Publish this project
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
              <Link href="/dashboard/projects">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
