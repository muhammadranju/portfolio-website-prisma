"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Check } from "lucide-react";

interface ProfileFormData {
  fullName: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer passionate about creating beautiful web experiences",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof ProfileFormData]: value,
    }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        {["profile", "social", "preferences", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <Button variant="outline">Change Avatar</Button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Website
              </label>
              <Input
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleSave}>Save Changes</Button>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} />
                  <span className="text-sm">Changes saved successfully</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Tab */}
      {activeTab === "social" && (
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Connect your social media profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "github" as const, label: "GitHub", icon: "🐙" },
              { name: "twitter" as const, label: "Twitter", icon: "𝕏" },
              { name: "linkedin" as const, label: "LinkedIn", icon: "💼" },
            ].map((social) => (
              <div key={social.name}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {social.icon} {social.label}
                </label>
                <Input
                  name={social.name}
                  type="url"
                  value={formData[social.name]}
                  onChange={handleInputChange}
                  placeholder={`https://${social.name}.com/...`}
                />
              </div>
            ))}

            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleSave}>Save Changes</Button>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} />
                  <span className="text-sm">Changes saved successfully</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your portfolio settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Email Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your portfolio
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Newsletter</p>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to our weekly newsletter
                  </p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded" />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Public Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Make your portfolio visible to everyone
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Analytics Tracking
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Allow us to track your portfolio analytics
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleSave}>Save Preferences</Button>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} />
                  <span className="text-sm">
                    Preferences saved successfully
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Password
              </label>
              <Input
                type="password"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <Input type="password" placeholder="Enter new password" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <Input type="password" placeholder="Confirm new password" />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Password Requirements
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains numbers and special characters</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleSave}>Update Password</Button>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} />
                  <span className="text-sm">Password updated successfully</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
