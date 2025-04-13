import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Quiz from "@/models/Quiz/quiz";
import Submission from "@/models/Quiz/submission";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { quizId, userId, answers } = body;

    if (!quizId || !userId || !answers) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    let totalScore = 0;
    const evaluatedAnswers = [];

    for (const ans of answers) {
      const question = quiz.questions.find(
        (q: any) => q._id.toString() === ans.question
      );

      if (!question) continue;

      const isCorrect = ans.selectedOptionIndex === question.correctAnswer;

      if (isCorrect) {
        totalScore += question.marks;
      } else if (ans.selectedOptionIndex !== null) {
        totalScore -= question.negativeMarks || 0;
      }

      evaluatedAnswers.push({
        question: question._id,
        selectedOptionIndex: ans.selectedOptionIndex ?? null,
        isCorrect,
        markedForReview: ans.markedForReview ?? false,
        timeSpent: ans.timeSpent ?? 0,
      });
    }

    const timeTaken = evaluatedAnswers.reduce(
      (acc, q) => acc + (q.timeSpent || 0),
      0
    );

    const submission = await Submission.create({
      quiz: quizId,
      user: userId,
      answers: evaluatedAnswers,
      score: totalScore,
      timeTaken,
      completedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Submitted successfully",
        submission,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("[SUBMIT_QUIZ_ERROR]:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
