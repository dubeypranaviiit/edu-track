import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import SiteSetting from "@/models/siteSetting";

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();

    const setting = await SiteSetting.findOne({ key: "instructor_vacancy_open" });
    if (!setting || setting.value !== true) {
      return NextResponse.json(
        { error: "Applications are currently closed. Check back when vacancy opens." },
        { status: 403 }
      );
    }

    const user = await User.findOne({ clerkId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user.role !== "student") {
      return NextResponse.json({ error: "Already an instructor or admin" }, { status: 400 });
    }

    if (user.instructorStatus === "pending") {
      return NextResponse.json({ error: "You already have a pending application" }, { status: 400 });
    }

    if (user.instructorStatus === "approved") {
      return NextResponse.json({ error: "Your application was already approved" }, { status: 400 });
    }

    const { bio, expertise, experience, linkedinUrl } = await req.json();

    if (!bio?.trim() || !expertise?.trim() || !experience?.trim()) {
      return NextResponse.json(
        { error: "Bio, expertise, and experience are all required" },
        { status: 400 }
      );
    }

    user.instructorStatus = "pending";
    user.bio = bio;
    user.socialLinks = {
      ...user.socialLinks,
      linkedin: linkedinUrl || "",
      website: expertise,
      twitter: experience,
    };

    await user.save();

    return NextResponse.json({ success: true, status: "pending" }, { status: 201 });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const user = await User.findOne({ clerkId }).select("instructorStatus");
    return NextResponse.json({ status: user?.instructorStatus ?? "none" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
