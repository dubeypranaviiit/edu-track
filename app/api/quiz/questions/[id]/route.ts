import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Question from '@/models/Quiz/question';
import Quiz from '@/models/Quiz/quiz';

export async function PATCH(req: Request, context: any
) {
  try {
    await connectDB();
    const { id } = context.params;
    const data = await req.json();

    const question = await Question.findByIdAndUpdate(id, data, { new: true });
    if (!question) return NextResponse.json({ message: 'Question not found' }, { status: 404 });

    return NextResponse.json({ question });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update question', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request,context: any
  //  { params }: { params: { id: string } }
  ) {
  try {
    await connectDB();
    const { id } = context.params;

    const question = await Question.findByIdAndDelete(id);
    if (!question) return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    await Quiz.findByIdAndUpdate(question.quiz, { $pull: { questions: question._id } });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete question', error: (error as Error).message }, { status: 500 });
  }
}
