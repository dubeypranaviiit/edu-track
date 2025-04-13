export interface Option {
    id: number;
    text: string;
  }
  
  export interface Question {
    id: number;
    text: string;
    options: Option[];
    correctOption: number | null;
    marks: number;
    negativeMarks: number;
  }
  
  export interface Quiz {
    title: string;
    description: string;
    duration: number;
    totalMarks: number;
    questions: Question[];
  }
  