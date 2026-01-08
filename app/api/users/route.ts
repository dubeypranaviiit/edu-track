import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    
    let user = await User.findOne({ clerkId: data.clerkId });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    }

  
    user = await User.create({
      clerkId: data.clerkId,
      name: data.name,
      email: data.email,
      avatar: data.avatar || "",
      role: "student",
      isActive: true,
      enrolledCourses: [],
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
