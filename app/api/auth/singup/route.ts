import connectDB from "@/lib/db";
import AboutMe from "@/models/AboutMe";
import User from "@/models/User";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const admin = new User({
      username: "admin",
      email: "admin@portfolio.com",
      password: "admin123",
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully");

    const existingAbout = await AboutMe.findOne();
    if (!existingAbout) {
      const aboutMe = new AboutMe({
        bio: "Welcome to my portfolio! I am a passionate developer.",
        workExperience: [],
        skills: [],
      });
      await aboutMe.save();
      console.log("AboutMe document created");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}
