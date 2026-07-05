import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Submission from "@/models/Quiz/submission";
import Question from "@/models/Quiz/question";
import Quiz from "@/models/Quiz/quiz";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";

type QuestionScoreDoc = {
  _id: { toString: () => string };
  correctOptionIndex: number;
  marks: number;
  negativeMarks?: number;
};

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  try {
    const { quizId, userId, answers, timeTaken } = await req.json();

    if (!quizId || !userId) {
      return NextResponse.json({ error: "Missing quizId or userId" }, { status: 400 });
    }

    
    const currentUser = await User.findOne({ clerkId });
    if (!currentUser || currentUser._id.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden: User identity mismatch" }, { status: 403 });
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid format: 'answers' must be an array" },
        { status: 400 }
      );
    }

    
    const quiz = await Quiz.findById(quizId).select("maxAttempts passingMarks");
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const existingAttempts = await Submission.countDocuments({ quiz: quizId, user: userId });
    if (existingAttempts >= (quiz.maxAttempts ?? 1)) {
      return NextResponse.json(
        { error: `Maximum attempts (${quiz.maxAttempts ?? 1}) reached for this quiz` },
        { status: 403 }
      );
    }

    const questionDocs = (await Question.find({ quiz: quizId }).lean()) as unknown as QuestionScoreDoc[];

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

