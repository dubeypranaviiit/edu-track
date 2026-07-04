import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Submission from "@/models/Quiz/submission";
import Quiz from "@/models/Quiz/quiz"; // Import to ensure schema registration for populate
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { userId } = await params;

    const submissions = await Submission.find({ user: userId })
      .populate("quiz", "title slug totalMarks passingMarks duration")
      .sort({ attemptedAt: -1 })
      .lean();

    return NextResponse.json({ submissions });
  } catch (err) {
    console.error("Error fetching results:", err);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
