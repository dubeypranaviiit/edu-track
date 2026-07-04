import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Submission from "@/models/Quiz/submission";
import Quiz from "@/models/Quiz/quiz"; // Import to ensure schema registration for populate
import Question from "@/models/Quiz/question"; // Import to ensure schema registration for populate
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { submissionId } = await params;

    const submission = await Submission.findById(submissionId)
      .populate("quiz", "title slug totalMarks passingMarks duration maxAttempts")
      .populate("answers.question", "text options correctOptionIndex marks negativeMarks explanation")
      .lean();

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ submission });
  } catch (err) {
    console.error("Error fetching submission:", err);
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 });
  }
}
