// // app/api/questions/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import { connectDB } from '@/lib/mongoose';
// import Question from '@/models/Quiz/question';

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectDB();

//     const body = await req.json();
//     const {
//       text,
//       options,
//       correctOptionIndex,
//       marks,
//       negativeMarks = 0,
//       explanation,
//     } = body;

//     // Validation
//     if (!text || !Array.isArray(options) || options.length < 2 || correctOptionIndex == null || marks == null) {
//       return NextResponse.json({ error: 'Missing or invalid question fields' }, { status: 400 });
//     }

//     if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
//       return NextResponse.json({ error: 'Correct option index is out of bounds' }, { status: 400 });
//     }

//     const question = await Question.create({
//       text,
//       options,
//       correctOptionIndex,
//       marks,
//       negativeMarks,
//       explanation,
//       createdBy: userId,
//     });

//     return NextResponse.json({ message: 'Question created successfully', question }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating question:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongoose';
import Question from '@/models/Quiz/question';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { text, options, correctOptionIndex, marks,  quizId } = body;

    // Validation
    // if (!text || !Array.isArray(options) || options.length < 2 || correctOptionIndex == null || marks == null) {
    //   console.log(`option m error`);
    //   return NextResponse.json({ error: 'Missing or invalid question fields' }, { status: 400 });
    // }

    // if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
    //   console.log(`Qn m error`);
    //   return NextResponse.json({ error: 'Correct option index is out of bounds' }, { status: 400 });
    // }

    const question = await Question.create({
      text,
      options,
      correctOptionIndex,
      marks,
     
      quiz: quizId,
    
    });

    return NextResponse.json({ message: 'Question created successfully', question }, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
