import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Question from '@/models/Quiz/question';
import Quiz from '@/models/Quiz/quiz';

export async function POST(req: Request) {
  try {
    await connectDB();
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
