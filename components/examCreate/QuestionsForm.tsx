
// 'use client';

// import { useState } from 'react';
// import axios from '@/lib/axios';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Card } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { PreviewModal } from './PreviewModal';

// interface QuestionInput {
//   text: string;
//   options: string[];
//   correctOptionIndex: number;
//   marks: number;
//   negativeMarks: number;
//   explanation?: string;
// }

// export default function QuestionsForm() {
//   const [quiz, setQuiz] = useState({
//     title: '',
//     slug: '',
//     description: '',
//     duration: 30,
//     totalMarks: 0,
//     maxAttempts: 1,
//     isPublished: false,
//   });

//   const [questions, setQuestions] = useState<QuestionInput[]>([
//     {
//       text: '',
//       options: ['', '', '', ''],
//       correctOptionIndex: 0,
//       marks: 1,
//       negativeMarks: 0,
//     },
//   ]);

//   const [showPreview, setShowPreview] = useState(false);

//   const handleQuestionChange = (index: number, field: keyof QuestionInput, value: any) => {
//     const updated = [...questions];
//     (updated[index] as any)[field] = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         text: '',
//         options: ['', '', '', ''],
//         correctOptionIndex: 0,
//         marks: 1,
//         negativeMarks: 0,
//       },
//     ]);
//   };

// //   const handleSubmit = async () => {
// //     try {
// //       const createdQuestions = await Promise.all(
// //         questions.map(async (q) => {
// //           const res = await axios.post('/questions', q);
// //           return res.data.question._id;
// //         })
// //       );

// //       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

// //       await axios.post('/test-create', {
// //         ...quiz,
// //         totalMarks,
// //         questions: createdQuestions,
// //       });

// //       alert('Quiz created successfully!');
// //     } catch (err) {
// //       console.error(err);
// //       alert('Error creating quiz');
// //     }
// //   };


// const handleSubmit = async () => {
//   try {
//     // 1. Calculate total marks from all questions
//     const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//     // 2. Create the quiz first (without questions)
//     const quizRes = await axios.post('/create-test', {
//       ...quiz,
//       totalMarks,
//       questions: [], // We'll update later
//     });

//     const quizId = quizRes.data.quiz._id;

//     // 3. Create questions with quiz reference
//     const createdQuestions = await Promise.all(
//       questions.map(async (q) => {
//         const res = await axios.post('/questions', {
//           ...q,
//           quiz: quizId,
//         });
//         return res.data.question._id;
//       })
//     );

//     // 4. Update the quiz with question IDs (optional but good practice)
//     await axios.patch(`/api/test-update/${quizId}`, {
//       questions: createdQuestions,
//     });

//     alert('✅ Quiz created successfully!');
//   } catch (err) {
//     console.error('❌ Error creating quiz:', err);
//     alert('Error creating quiz');
//   }
// };


//   return (
//     <div className="space-y-6 p-4">
//       <h2 className="text-xl font-bold">Create Quiz</h2>

//       <Input
//         placeholder="Title"
//         value={quiz.title}
//         onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
//       />
//       <Input
//         placeholder="Slug"
//         value={quiz.slug}
//         onChange={(e) => setQuiz({ ...quiz, slug: e.target.value })}
//       />
//       <Textarea
//         placeholder="Description"
//         value={quiz.description}
//         onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
//       />

//       <div>
//         <Label htmlFor="duration">Duration (min)</Label>
//         <Input
//           id="duration"
//           type="number"
//           value={quiz.duration}
//           onChange={(e) => setQuiz({ ...quiz, duration: +e.target.value })}
//         />
//       </div>

//       <div>
//         <Label htmlFor="attempts">Max Attempts</Label>
//         <Input
//           id="attempts"
//           type="number"
//           value={quiz.maxAttempts}
//           onChange={(e) => setQuiz({ ...quiz, maxAttempts: +e.target.value })}
//         />
//       </div>

//       <h3 className="text-lg font-semibold">Questions</h3>

//       {questions.map((q, i) => (
//         <Card key={i} className="p-4 space-y-2">
//           <h4 className="font-semibold">Question {i + 1}</h4>
//           <Textarea
//             placeholder="Question Text"
//             value={q.text}
//             onChange={(e) => handleQuestionChange(i, 'text', e.target.value)}
//           />

//           <RadioGroup
//             value={String(q.correctOptionIndex)}
//             onValueChange={(val) => handleQuestionChange(i, 'correctOptionIndex', parseInt(val))}
//             className="space-y-2"
//           >
//             {q.options.map((opt, j) => (
//               <div key={j} className="flex items-center gap-2">
//                 <RadioGroupItem value={String(j)} id={`q-${i}-opt-${j}`} />
//                 <Label htmlFor={`q-${i}-opt-${j}`} className="flex-1">
//                   <Input
//                     value={opt}
//                     onChange={(e) => handleOptionChange(i, j, e.target.value)}
//                     placeholder={`Option ${j + 1}`}
//                   />
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>

//           <div className="flex gap-4">
//           <Label htmlFor="PositiveMarks">Positive Marks</Label>
//             <Input
//             id='PositiveMarks'
//               type="number"
//               value={q.marks}
//               onChange={(e) => handleQuestionChange(i, 'marks', +e.target.value)}
//               placeholder="Marks"
//             />
//             <Label htmlFor="NegativeMarks">NegativeMarks</Label>
//             <Input
//             id='NegativeMarks'
//               type="number"
//               value={q.negativeMarks}
//               onChange={(e) => handleQuestionChange(i, 'negativeMarks', +e.target.value)}
//               placeholder="Negative Marks"
//             />
//           </div>
//         </Card>
//       ))}

//       <Button onClick={addQuestion} className="bg-purple-600 text-white">
//         + Add Question
//       </Button>

//       <div className="flex gap-4">
//         <Button onClick={() => setShowPreview(true)} variant="outline">
//           Preview
//         </Button>
//         <Button onClick={handleSubmit} className="bg-green-600 text-white">
//           Submit Quiz
//         </Button>
//       </div>

//       <PreviewModal
//         open={showPreview}
//         onClose={() => setShowPreview(false)}
//         questions={questions.map((q) => ({
//           questionText: q.text,
//           options: q.options,
//           correctAnswerIndex: q.correctOptionIndex,
//         }))}
//       />
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PreviewModal } from './PreviewModal';

interface QuestionInput {
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks: number;
  explanation?: string;
}

export default function QuestionsForm() {
  const [quiz, setQuiz] = useState({
    title: '',
    slug: '',
    description: '',
    TotalQuestion:0,
    duration: 30,
    totalMarks: 0,
    maxAttempts: 1,
    isPublished: false,

  });

  const [questions, setQuestions] = useState<QuestionInput[]>([
    {
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      marks: 1,
      negativeMarks: 0,
    },
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const handleQuestionChange = (index: number, field: keyof QuestionInput, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        marks: 1,
        negativeMarks: 0,
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      // 1. Calculate total marks from all questions
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

      // 2. Create the quiz first (without questions)
      const quizRes = await axios.post('/test-create', {
        ...quiz,
        totalMarks,
        questions: [], // We'll update later
      });
      console.log(quizRes);
      const slug = quizRes.data.quiz.slug;
if(!slug){
  console.log(`Slug nhi ayaa phir se ui pr`);
}
      const quizId = quizRes.data.quiz._id;

      // 3. Create questions with quiz reference
      const createdQuestions = await Promise.all(
        questions.map(async (q) => {
          const res = await axios.post('/questions', {
            ...q,
            quiz: quizId,
          });
          return res.data.question._id;
        })
      );

      // 4. Update the quiz with question IDs (optional but good practice)
      await axios.put(`/test-create`, {
        slug,
        questions: createdQuestions,
      });

      alert('✅ Quiz created successfully!');
    } catch (err) {
      console.error('❌ Error creating quiz:', err);
      alert('Error creating quiz');
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Create Quiz</h2>

      <Input
        placeholder="Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <Input
        placeholder="Slug"
        value={quiz.slug}
        onChange={(e) => setQuiz({ ...quiz, slug: e.target.value })}
      />
      <Textarea
        placeholder="Description"
        value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
      />
      <div>
        <Label htmlFor="total">Total Marks</Label>
        <Input
          id="total"
          type="number"
          value={quiz.totalMarks}
          onChange={(e) => setQuiz({ ...quiz, totalMarks: +e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="totalQ">Total Question</Label>
        <Input
          id="totalQ"
          type="number"
          value={quiz.TotalQuestion}
          onChange={(e) => setQuiz({ ...quiz, TotalQuestion: +e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (min)</Label>
        <Input
          id="duration"
          type="number"
          value={quiz.duration}
          onChange={(e) => setQuiz({ ...quiz, duration: +e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="attempts">Max Attempts</Label>
        <Input
          id="attempts"
          type="number"
          value={quiz.maxAttempts}
          onChange={(e) => setQuiz({ ...quiz, maxAttempts: +e.target.value })}
        />
      </div>

      <h3 className="text-lg font-semibold">Questions</h3>

      {questions.map((q, i) => (
        <Card key={i} className="p-4 space-y-2">
          <h4 className="font-semibold">Question {i + 1}</h4>
          <Textarea
            placeholder="Question Text"
            value={q.text}
            onChange={(e) => handleQuestionChange(i, 'text', e.target.value)}
          />

          <RadioGroup
            value={String(q.correctOptionIndex)}
            onValueChange={(val) => handleQuestionChange(i, 'correctOptionIndex', parseInt(val))}
            className="space-y-2"
          >
            {q.options.map((opt, j) => (
              <div key={j} className="flex items-center gap-2">
                <RadioGroupItem value={String(j)} id={`q-${i}-opt-${j}`} />
                <Label htmlFor={`q-${i}-opt-${j}`} className="flex-1">
                  <Input
                    value={opt}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                    placeholder={`Option ${j + 1}`}
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex gap-4">
            <Label htmlFor="PositiveMarks">Positive Marks</Label>
            <Input
              id="PositiveMarks"
              type="number"
              value={q.marks}
              onChange={(e) => handleQuestionChange(i, 'marks', +e.target.value)}
              placeholder="Marks"
            />
            <Label htmlFor="NegativeMarks">Negative Marks</Label>
            <Input
              id="NegativeMarks"
              type="number"
              value={q.negativeMarks}
              onChange={(e) => handleQuestionChange(i, 'negativeMarks', +e.target.value)}
              placeholder="Negative Marks"
            />
          </div>
        </Card>
      ))}

      <Button onClick={addQuestion} className="bg-purple-600 text-white">
        + Add Question
      </Button>

      <div className="flex gap-4">
        <Button onClick={() => setShowPreview(true)} variant="outline">
          Preview
        </Button>
        <Button onClick={handleSubmit} className="bg-green-600 text-white">
          Submit Quiz
        </Button>
      </div>

      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        questions={questions.map((q) => ({
          questionText: q.text,
          options: q.options,
          correctAnswerIndex: q.correctOptionIndex,
        }))}
      />
    </div>
  );
}
