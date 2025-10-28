"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface WorkExperience {
  _id?: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface FormData {
  bio: string;
  workExperience: WorkExperience[];
  skills: string[];
}

export default function AboutPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    bio: "",
    workExperience: [],
    skills: [],
  });

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setFormData({
            bio: data.bio || "",
            workExperience: data.workExperience || [],
            skills: data.skills || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
        toast.error("Failed to load about data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-32 bg-muted rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6 space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6 space-y-4">
            <div className="h-10 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const updatedExperience = [...formData.workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      workExperience: updatedExperience,
    }));
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      company: "",
      position: "",
      duration: "",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        toast.success("About section updated successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update about section");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">About Section</h1>
        <p className="text-muted-foreground mt-2">
          Manage your bio, work experience, and skills
        </p>
      </div>

      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            Write a brief introduction about yourself
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={formData.bio}
            onChange={handleBioChange}
            rows={5}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Tell us about yourself..."
          />
          <div className="flex items-center gap-3">
            <Button onClick={handleSave}>Save Changes</Button>
            {saveSuccess && (
              <div className="flex items-center gap-2 text-green-600">
                <Check size={20} />
                <span className="text-sm">Updated successfully</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Work Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>
            Add and manage your professional experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.workExperience.map((experience, index) => (
            <div
              key={experience._id || index}
              className="p-4 border border-border rounded-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-foreground">
                  Experience {index + 1}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 size={18} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <Input
                    value={experience.company}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Position
                  </label>
                  <Input
                    value={experience.position}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "position",
                        e.target.value
                      )
                    }
                    placeholder="Job title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duration
                  </label>
                  <Input
                    value={experience.duration}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        "duration",
                        e.target.value
                      )
                    }
                    placeholder="e.g., 2022 - Present"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          ))}

          <Button
            onClick={addWorkExperience}
            variant="outline"
            className="w-full bg-transparent"
          >
            <Plus size={18} className="mr-2" />
            Add Work Experience
          </Button>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            Add your technical and professional skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addSkill();
                }
              }}
              placeholder="Enter a skill and press Enter or click Add"
            />
            <Button onClick={addSkill}>
              <Plus size={18} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="hover:opacity-70 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {formData.skills.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No skills added yet. Add your first skill above.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Global Save Button */}
      <div className="pt-4">
        <Button onClick={handleSave} className="w-full md:w-auto">
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
