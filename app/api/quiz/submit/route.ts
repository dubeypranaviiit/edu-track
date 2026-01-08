import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Submission from "@/models/Quiz/submission";

import Question from "@/models/Quiz/question";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { quizId, userId, answers, timeTaken } = await req.json();

    if (!quizId || !userId) {
      return NextResponse.json({ error: "Missing quizId or userId" }, { status: 400 });
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid format: 'answers' must be an array" },
        { status: 400 }
      );
    }

  
    const questionDocs = await Question.find({ quiz: quizId }).lean();

    let score = 0;

    const processedAnswers = answers.map((a: any) => {
      const q = questionDocs.find((q) => q._id.toString() === a.question);
      if (!q) return a;

      const isCorrect = q.correctOptionIndex === a.selectedOptionIndex;
      const marks = isCorrect ? q.marks : -(q.negativeMarks || 0);
      score += marks;

      return {
        ...a,
        isCorrect,
      };
    });
    const submission = await Submission.create({
      quiz: quizId,
      user: userId,
      answers: processedAnswers,
      score,
      timeTaken,
      attemptedAt: new Date(),
      completedAt: new Date(),
    });

    return NextResponse.json(submission);
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
