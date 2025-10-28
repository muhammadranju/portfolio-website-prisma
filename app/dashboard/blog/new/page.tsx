"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Eye, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
}

interface FormErrors {
  title?: string;
  excerpt?: string;
  content?: string;
  general?: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    published: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    } else if (formData.excerpt.length > 500) {
      newErrors.excerpt = "Excerpt must be less than 500 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setErrors({});

    const updatedFormData = { ...formData, published: publish };

    if (publish && !validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const result = await res.json();
      console.log("Blog post saved:", result);

      if (res.ok) {
        toast.success(
          publish
            ? "Blog post published successfully!"
            : "Draft saved successfully!"
        );
        router.push("/dashboard/blog");
      } else {
        throw new Error(result.message || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      setErrors({
        general: "Failed to save blog post. Please try again.",
      });
      toast.error("Failed to save blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newValue = value;
      const updated = { ...prev, [name]: newValue };
      if (name === "title") {
        updated.slug = generateSlug(newValue);
      }
      return updated;
    });

    // Clear field-specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4 animate-fade-in flex-col">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Create New Blog Post
          </h1>
          <p className="text-muted-foreground">
            Write and publish a new blog post
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* General Error */}
        {errors.general && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in animation-delay-200">
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>
                  The main content of your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your blog post title"
                    className={
                      errors.title
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Auto-generated from title (editable)"
                    className="font-mono text-sm"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Write a brief excerpt that summarizes your post"
                    rows={3}
                    className={
                      errors.excerpt
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">{errors.excerpt}</p>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your blog post content here. You can use Markdown formatting."
                    rows={20}
                    className={`resize-none ${
                      errors.content
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Tip: You can use Markdown syntax for formatting (e.g.,
                    **bold**, *italic*, # headings)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Actions */}
            <Card className="animate-fade-in animation-delay-400">
              <CardHeader>
                <CardTitle>Publish</CardTitle>
                <CardDescription>
                  Save or publish your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    onClick={(e) => handleSubmit(e, false)}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Publish Post
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="animate-fade-in animation-delay-600">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to categorize your post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Add a tag"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
