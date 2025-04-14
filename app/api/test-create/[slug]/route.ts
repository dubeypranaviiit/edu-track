import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from "@/lib/mongoose"; 
import Quiz from "@/models/Quiz/quiz"; 
import Question from '@/models/Quiz/question';
export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const { slug } = params;
    const body = await request.json();
    const { isPublished } = body;

    const updatedQuiz = await Quiz.findOneAndUpdate(
      { slug },
      { isPublished },
      { new: true }
    );

    if (!updatedQuiz) {
        console.log(`Quiz not found in this code`);
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Publish status updated",
      isPublished: updatedQuiz.isPublished,
    });
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(
    req: NextRequest,
  { params }: { params: { slug: string } }
  ) {
    try {
      await connectDB();
      const { slug } = params;
     if(!slug){
        return NextResponse.json(
            { message: "Slug not found" },
            { status: 404 }
          );
     }
     const deletedQuiz = await Quiz.findOneAndDelete({ slug });

     if (!deletedQuiz) {
       return NextResponse.json(
         { message: "Quiz not found" },
         { status: 404 }
       );
     }
  
      return NextResponse.json({
        message: "Quiz deleted successfully",
        
      });
    } catch (error) {
      console.error("Error deleting quiz:", error);
      return NextResponse.json(
        { message: "Server error" },
        { status: 500 }
      );
    }
}
// export async function GET(
//   req: NextRequest,
//   context: { params: { slug: string }  }
// ) {
//   console.log(`Get request aaya`);
//   try {
    
//     await connectDB();
// console.log(`request aaya get mein`);
// const { slug } =   context.params;
// console.log(slug);


//     const quiz = await Quiz.findOne({ slug: params.slug })
//       .populate('questions')
//       .exec();
//        console.log(quiz);
//     if (!quiz) {
//       return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
//     }

//     return NextResponse.json({ quiz });
//   } catch (error) {
//     console.error('Error fetching quiz by slug:', error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }
export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  try {
    await connectDB();
    console.log('request aaya get mein');

    // Correctly await the context params before accessing slug
    const { slug } =await context.params;
    console.log(`Slug: ${slug}`);

    // Fetch the quiz from the database using the slug
    const quiz = await Quiz.findOne({ slug: slug }) // Use slug here
      .populate('questions')
      .exec();

    if (!quiz) {
      console.log(`Quiz nahi mila yaha`);
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error('Error fetching quiz by slug:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { slug: string } }) {
  try {
    await connectDB();

    const { slug } = context.params;
    const body = await req.json();
    const { title, description, duration, totalMarks, maxAttempts, questions } = body;

    const quiz = await Quiz.findOneAndUpdate(
      { slug },
      { title, description, duration, totalMarks, maxAttempts },
      { new: true }
    );

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Delete all previous questions linked to this quiz
    await Question.deleteMany({ quiz: quiz._id });

    // Re-create questions and update reference
    const questionIds = await Promise.all(
      questions.map(async (q: any) => {
        // Remove any _id if present to avoid duplication
        const { _id, ...cleanedQ } = q;
        const createdQuestion = await Question.create({ ...cleanedQ, quiz: quiz._id });
        return createdQuestion._id;
      })
    );

    quiz.questions = questionIds;
    quiz.TotalQuestion = questionIds.length;
    await quiz.save();

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error('Failed to update quiz:', error);
    return NextResponse.json({ error: 'Failed to update quiz' }, { status: 500 });
  }
}