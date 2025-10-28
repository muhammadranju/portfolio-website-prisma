import { z } from "zod";

export const loginSchema = z.object({
  // username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  email: z.string().min(1, "Email is required"),
});

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().min(1, "Email is required").max(200),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(500),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  liveLink: z.string().url("Invalid URL"),
  githubLink: z.string().url("Invalid URL").optional(),
  features: z.string().min(1, "Features are required").max(500),
  technologies: z.string().min(1, "Technologies are required").max(500),
  published: z.boolean().optional(),
});

export const aboutMeSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  workExperience: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        duration: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  skills: z.array(z.string()).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type AboutMeInput = z.infer<typeof aboutMeSchema>;
