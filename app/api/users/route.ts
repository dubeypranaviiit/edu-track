import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    
    let role = "student";
    let instructorStatus = "none";

    if (data.email === "admin.demo@mailinator.com") {
      role = "admin";
    } else if (data.email === "instructor.demo@mailinator.com") {
      role = "instructor";
      instructorStatus = "approved";
    }

    let user = await User.findOne({ clerkId: data.clerkId });
    if (user) {
      if ((data.email === "admin.demo@mailinator.com" && user.role !== "admin") || 
          (data.email === "instructor.demo@mailinator.com" && user.role !== "instructor")) {
        user.role = role;
        user.instructorStatus = instructorStatus;
        user.isActive = true;
        await user.save();
      }
      return NextResponse.json(user, { status: 200 });
    }

    user = await User.create({
      clerkId: data.clerkId,
      name: data.name,
      email: data.email,
      avatar: data.avatar || "",
      role,
      instructorStatus,
      isActive: true,
      enrolledCourses: [],
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
