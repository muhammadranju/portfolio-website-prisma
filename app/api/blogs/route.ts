import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { blogSchema } from "@/lib/validation";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const query = published === "true" ? { published: true } : {};
    const blogs = await Blog.find(query)
      .populate("author", "username")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Get blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const validation = blogSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error },
        { status: 400 }
      );
    }

    const existingBlog = await Blog.findOne({ slug: validation.data.slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const blog = new Blog({
      ...validation.data,
      author: payload.userId,
    });

    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
