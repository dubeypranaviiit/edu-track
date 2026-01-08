'use client';
import { useState } from 'react';
import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import useInstructorId from '@/lib/hooks/useInstructorId';
import { useQuizStore } from '@/store/useQuizStore';
import axios from '@/lib/axios';
import slugify from 'slugify';
export default function CreateQuiz() {
  const instructorId = useInstructorId();
  const [slug, setSlug] = useState('');
  const {
    title,
    description,
    duration,
    maxAttempts,
    passingMarks,
    questions,
    setTitle,
    setDescription,
    setDuration,
    setMaxAttempts,
    setPassingMarks,
    addQuestion,
    removeQuestion,
    updateQuestion,
    updateOption,
    resetQuiz,
  } = useQuizStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      const totalQuestions = questions.length;

    
      const quizRes = await axios.post('/quiz', {
        title,
        slug: slugify(title, { lower: true, strict: true }),
        description,
        duration,
        maxAttempts,
        passingMarks,
        totalMarks,
        totalQuestions,
        createdBy: instructorId,
      });

      const quizId = quizRes.data.quiz._id;
      const slug = quizRes.data.quiz.slug;

    
      const createdQuestions = await Promise.all(
        questions.map(async (q) => {
          const res = await axios.post('/quiz/questions', { ...q, quiz: quizId });
          return res.data.question._id;
        })
      );

     
      await axios.put('/quiz', { slug, questions: createdQuestions });

      alert('Quiz created successfully!');
      resetQuiz();
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Error creating quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="w-full max-w-4xl p-8 rounded-2xl shadow-lg space-y-6 bg-white">
        <h1 className="text-3xl font-bold text-center">Create Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input 
  placeholder="Slug"
  value={slug}
  onChange={(e) => setSlug(e.target.value)}
  required
/>
          <Textarea placeholder="Quiz Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="grid grid-cols-3 gap-4">
            <label >Duration:
            <Input type="number" placeholder="Duration (minutes)" value={duration} onChange={(e) => setDuration(+e.target.value)} required />
            </label>
            <label>Max Attempts:
            <Input type="number" placeholder="Max Attempts" value={maxAttempts} onChange={(e) => setMaxAttempts(+e.target.value)} required />
              </label>
                 <label>Passing Marks:
            <Input type="number" placeholder="Passing Marks" value={passingMarks} onChange={(e) => setPassingMarks(+e.target.value)} />
               </label>
          </div>

          <h2 className="text-xl font-semibold mt-4">Questions</h2>
          {questions.map((q, idx) => (
            <Card key={idx} className="p-4 space-y-2 relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Question {idx + 1}</h3>
                {questions.length > 1 && (
                  <button type="button" onClick={() => removeQuestion(idx)} className="text-red-500 hover:text-red-600">
                    <FaTrash />
                  </button>
                )}
              </div>

              <Input
                placeholder="Question Text"
                value={q.text}
                onChange={(e) => updateQuestion(idx, 'text', e.target.value)}
                required
              />

              <RadioGroup
                value={String(q.correctOptionIndex)}
                onValueChange={(val) => updateQuestion(idx, 'correctOptionIndex', parseInt(val))}
                className="space-y-2"
              >
                {q.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <RadioGroupItem value={String(i)} />
                    <Input
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(idx, i, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </RadioGroup>

              <div className="flex gap-2">
                   <label>Marks:
              
               <Input type="number" placeholder="Marks" value={q.marks} onChange={(e) => updateQuestion(idx, 'marks', +e.target.value)} />
                  </label>
                   <label>Negative Marks:
                <Input type="number" placeholder="Negative Marks" value={q.negativeMarks} onChange={(e) => updateQuestion(idx, 'negativeMarks', +e.target.value)} />
                 </label>
              </div>

              <Textarea placeholder="Explanation (optional)" value={q.explanation} onChange={(e) => updateQuestion(idx, 'explanation', e.target.value)} />
            </Card>
          ))}

          <Button type="button" className="flex items-center gap-2 bg-green-600 hover:bg-green-700" onClick={() => addQuestion()}>
            <FaPlus /> Add Question
          </Button>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
            Create Quiz
          </Button>
        </form>
      </div>
    </div>
  );
}
