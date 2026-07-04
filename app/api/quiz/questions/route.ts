import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Question from '@/models/Quiz/question';
import Quiz from '@/models/Quiz/quiz';
import { auth } from '@clerk/nextjs/server';
import User from '@/models/user';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();

    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser || (currentUser.role !== 'instructor' && currentUser.role !== 'admin')) {
      return NextResponse.json({ error: 'Forbidden: Only instructors can create questions' }, { status: 403 });
    }

    const data = await req.json();
    const { quiz, text, options, correctOptionIndex, marks, negativeMarks, explanation } = data;

    const quizDoc = await Quiz.findById(quiz);
    if (!quizDoc) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });

    const question = await Question.create({
      quiz,
      text,
      options,
      correctOptionIndex,
      marks,
      negativeMarks,
      explanation,
    });

    quizDoc.questions.push(question._id);
    await quizDoc.save();

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create question', error: (error as Error).message }, { status: 500 });
  }
}
