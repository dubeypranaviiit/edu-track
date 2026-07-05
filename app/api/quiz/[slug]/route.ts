import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Quiz from '@/models/Quiz/quiz';
import Question from '@/models/Quiz/question';
import { auth } from '@clerk/nextjs/server';
import User from '@/models/user';

type QuizRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: QuizRouteContext) {
  await connectDB();
  const { slug } = await params;

  try {
    const quiz = await Quiz.findOne({ slug })
      .populate({
        path: 'questions',
        model: Question,
        select: 'text options correctOptionIndex marks negativeMarks explanation',
      })
      .lean();

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (err) {
    console.error('Error fetching quiz:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: QuizRouteContext) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser || (currentUser.role !== "instructor" && currentUser.role !== "admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { slug } = await params;

    let data: any;
    try {
      data = await req.json();
      if (!Object.keys(data).length) {
        return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }

    const updatedQuiz = await Quiz.findOneAndUpdate({ slug }, data, { new: true });
    if (!updatedQuiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ quiz: updatedQuiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to update quiz', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: QuizRouteContext) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser || (currentUser.role !== "instructor" && currentUser.role !== "admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { slug } = await params;

    const quiz = await Quiz.findOneAndDelete({ slug });
    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to delete quiz', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: QuizRouteContext) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser || (currentUser.role !== "instructor" && currentUser.role !== "admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { slug } = await params;
    const body = await req.json();
    const { title, description, duration, totalMarks, maxAttempts, passingMarks, questions } = body;

    if (passingMarks !== undefined && (passingMarks < 0 || passingMarks > 100)) {
      return NextResponse.json({ error: "Passing marks must be a percentage between 0 and 100" }, { status: 400 });
    }

    const quiz = await Quiz.findOneAndUpdate(
      { slug },
      { title, description, duration, totalMarks, maxAttempts, passingMarks },
      { new: true }
    );

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    
    await Question.deleteMany({ quiz: quiz._id });

    
    const questionIds = await Promise.all(
      questions.map(async (q: any) => {
        const { _id, ...cleanedQ } = q;
        const createdQuestion = await Question.create({ ...cleanedQ, quiz: quiz._id });
        return createdQuestion._id;
      })
    );

    quiz.questions = questionIds;
    quiz.totalQuestions = questionIds.length;
    await quiz.save();

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("Failed to update quiz:", error);
    return NextResponse.json({ error: "Failed to update quiz", details: (error as Error).message }, { status: 500 });
  }
}
