import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Quiz from '@/models/Quiz/quiz';
import Question from '@/models/Quiz/question';
// export async function GET(req: Request, context: any
// ) {
//   await connectDB();
// console.log(`req came`);
//   try {
   
//     const quiz = await Quiz.findOne({ slug:context.params
    
//     })
//       .populate({
//         path: "questions",
//         model: Question,
//         select: "text options correctOptionIndex marks negativeMarks explanation",
//       })
//       .lean();

//     if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

//     return NextResponse.json(quiz);
//   } catch (err) {
//     console.error("Error fetching quiz:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  console.log("req came", params.slug);

  try {
    const quiz = await Quiz.findOne({ slug: params.slug })
      .populate({
        path: "questions",
        model: Question,
        select: "text options correctOptionIndex marks negativeMarks explanation",
      })
      .lean();

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(quiz);
  } catch (err) {
    console.error("Error fetching quiz:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: any
) {
  try {
    await connectDB();

    const { slug } = context.params;

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
    if (!updatedQuiz) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });

    return NextResponse.json({ quiz: updatedQuiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update quiz', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request,context: any

  ) {
  try {
    await connectDB();
    const { slug } = context.params;

    const quiz = await Quiz.findOneAndDelete({ slug });
    if (!quiz) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });

    return NextResponse.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete quiz', error: (error as Error).message }, { status: 500 });
  }
}
