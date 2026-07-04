import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Question from '@/models/Quiz/question';
import Quiz from '@/models/Quiz/quiz';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();

    const question = await Question.findByIdAndUpdate(id, data, { new: true });
    if (!question) return NextResponse.json({ message: 'Question not found' }, { status: 404 });

    return NextResponse.json({ question });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update question', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;

    const question = await Question.findByIdAndDelete(id);
    if (!question) return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    await Quiz.findByIdAndUpdate(question.quiz, { $pull: { questions: question._id } });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete question', error: (error as Error).message }, { status: 500 });
  }
}
