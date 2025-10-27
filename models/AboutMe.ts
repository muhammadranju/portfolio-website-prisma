import mongoose, { Schema, type Document } from "mongoose"

export interface IAboutMe extends Document {
  bio: string
  workExperience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  skills: string[]
  updatedAt: Date
}

const aboutMeSchema = new Schema<IAboutMe>(
  {
    bio: {
      type: String,
      required: true,
    },
    workExperience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    skills: [String],
  },
  { timestamps: true },
)

export default mongoose.models.AboutMe || mongoose.model<IAboutMe>("AboutMe", aboutMeSchema)
