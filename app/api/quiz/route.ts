import { NextResponse } from 'next/server';
import Quiz from '@/models/Quiz/quiz';
import { connectDB } from '@/lib/mongoose';

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
  try {
    await connectDB();
    const data = await req.json();
    const quiz = await Quiz.create(data);
    return NextResponse.json({ quiz });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to create quiz', error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { slug, questions } = await req.json();
    const quiz = await Quiz.findOneAndUpdate({ slug }, { questions }, { new: true });
    if (!quiz) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update quiz', error: (error as Error).message }, { status: 500 });
  }
}
