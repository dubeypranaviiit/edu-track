import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongoose";
import Quiz from "@/models/Quiz/quiz";
import Question from "@/models/Quiz/question";
import { z } from "zod";

// Schema validation using Zod
const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  duration: z.number().positive("Duration must be a positive number"),
  TotalQuestion: z.number().positive("Total qn must be a positive number"),
  totalMarks: z.number().nonnegative("Total marks must be non-negative"),
  // questions: z.array(z.string().length(24, "Invalid question ID")),
  questions: z.array(z.string().length(24, "Invalid question ID")).optional().default([]),

  maxAttempts: z.number().min(1, "Max attempts must be at least 1").default(1),
  isPublished: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  console.log(`req came here`);
  try {
    const { userId } = await auth();
  console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   console.log(`User id is obtained`);
    await connectDB();

    const body = await req.json();

    const parsed = quizSchema.safeParse(body);
    if (!parsed.success) {
      console.log(`parsing m eror inm test-create-post`);
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const {
      title,
      slug,
      description,
      duration,
      totalMarks,
      TotalQuestion,
      questions = [],
      maxAttempts,
      isPublished,
    } = parsed.data;
    
    const existingQuiz = await Quiz.findOne({ slug });
    if (existingQuiz) {
      console.log(`existing quiz test-create-post`);
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    
    let foundQuestions = [];
    let actualTotalMarks = 0;
    
    if (questions.length > 0) {
      // console.log(`parsing m eror inm test-create-post`);
      foundQuestions = await Question.find({ _id: { $in: questions } });
    
      if (foundQuestions.length !== questions.length) {
        console.log(`question k length m problem phir se`);
        return NextResponse.json({ error: "One or more questions are invalid" }, { status: 400 });
      }
    
      actualTotalMarks = foundQuestions.reduce((sum, q) => sum + (q.marks || 0), 0);
    
      if (actualTotalMarks !== totalMarks) {
        console.log(`actual or toatal marks ka lafda`);
        return NextResponse.json({
          error: `Total marks mismatch. Expected ${actualTotalMarks}, got ${totalMarks}`,
        }, { status: 400 });
      }
    }

    // Create the quiz
    const quiz = await Quiz.create({
      title,
      slug,
      description,
      duration,
      totalMarks,
      questions,
      TotalQuestion,
      createdBy: userId,
      isPublished,
      maxAttempts,
    });
   console.log(`Quiz crete ho gya`,quiz);
    return NextResponse.json({
      message: "Quiz created successfully",
      quiz,
      _id: quiz._id,
      slug: quiz.slug,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  console.log(`put m entry kr gye aaya`);
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log(`put m useId nhi aaya`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
      
    await connectDB();

    const body = await req.json();
    const { slug, questions } = body;
 console.log(`Slug:${slug},questions:${questions}`);
    if (!slug || !Array.isArray(questions)) {
      console.log(`Slug nhi mila`)
      return NextResponse.json({ error: "Slug and questions are required" }, { status: 400 });
    }

    const quiz = await Quiz.findOne({ slug });

    if (!quiz || quiz.createdBy.toString() !== userId) {
      console.log(`Quiz nhi mila put m`);
      return NextResponse.json({ error: "Quiz not found or unauthorized" }, { status: 404 });
    }

    const foundQuestions = await Question.find({ _id: { $in: questions } });

    if (foundQuestions.length !== questions.length) {
      console.log(`Found length is fir se problem`);
      return NextResponse.json({ error: "Some question IDs are invalid" }, { status: 400 });
    }

    const totalMarks = foundQuestions.reduce((sum, q) => sum + (q.marks || 0), 0);

    quiz.questions = questions;
    quiz.totalMarks = totalMarks;
    await quiz.save();

    return NextResponse.json({ message: "Quiz updated with questions", quiz });
  } catch (error) {
    console.error("Error updating quiz with questions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const quizzes = await Quiz.find({}).select('title slug description isPublished TotalQuestion totalMarks duration maxAttempts');
    console.log(quizzes);
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}