import connectDB from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import Contact from "@/models/Contact";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const contact = await Contact.find();
    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error("Get contact error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    console.log(validation);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error },
        { status: 400 }
      );
    }

    const contact = new Contact({
      ...validation.data,
    });

    await contact.save();
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Create contact error:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
