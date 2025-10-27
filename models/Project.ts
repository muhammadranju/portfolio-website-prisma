import mongoose, { Schema, type Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  liveLink: string;
  githubLink: string;
  features: string[];
  technologies: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      required: true,
    },
    githubLink: String,
    features: String,
    technologies: String,
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", projectSchema);
