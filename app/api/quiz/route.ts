import { NextResponse } from 'next/server';
import Quiz from '@/models/Quiz/quiz';
import { connectDB } from '@/lib/mongoose';
import { auth } from '@clerk/nextjs/server';
import User from '@/models/user';

export async function GET() {
  try {
    await connectDB();
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch quizzes', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();

    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser || (currentUser.role !== 'instructor' && currentUser.role !== 'admin')) {
      return NextResponse.json({ error: 'Forbidden: Only instructors can create quizzes' }, { status: 403 });
    }

    const data = await req.json();
    const quiz = await Quiz.create(data);
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create quiz', error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();

    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser || (currentUser.role !== 'instructor' && currentUser.role !== 'admin')) {
      return NextResponse.json({ error: 'Forbidden: Only instructors can update quizzes' }, { status: 403 });
    }

    const { slug, questions } = await req.json();
    const quiz = await Quiz.findOneAndUpdate({ slug }, { questions }, { new: true });
    if (!quiz) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update quiz', error: (error as Error).message }, { status: 500 });
  }
}
