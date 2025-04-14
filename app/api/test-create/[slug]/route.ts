import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from "@/lib/mongoose"; 
import Quiz from "@/models/Quiz/quiz"; 

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
