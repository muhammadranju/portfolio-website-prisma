import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AboutMe from "@/models/AboutMe";
import { aboutMeSchema } from "@/lib/validation";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    let aboutMe = await AboutMe.findOne();
    if (!aboutMe) {
      aboutMe = new AboutMe({
        bio: "Welcome to my portfolio!",
        workExperience: [],
        skills: [],
      });
      await aboutMe.save();
    }

    return NextResponse.json(aboutMe, { status: 200 });
  } catch (error) {
    console.error("Get about error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = aboutMeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error },
        { status: 400 }
      );
    }

    let aboutMe = await AboutMe.findOne();
    if (!aboutMe) {
      aboutMe = new AboutMe(validation.data);
    } else {
      Object.assign(aboutMe, validation.data);
    }

    await aboutMe.save();
    return NextResponse.json(aboutMe, { status: 200 });
  } catch (error) {
    console.error("Update about error:", error);
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 }
    );
  }
}
