
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
export async function GET(
  req: NextRequest,context: any
  // { params }: { params: { clerkId: string } }
) {
  try {
    await connectDB();
    const user = await User.findOne({ clerkId: context.params.clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,context: any
  // { params }: { params: { clerkId: string } }
) {
  try {
    await connectDB();
    const data = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: context.params.clerkId },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
