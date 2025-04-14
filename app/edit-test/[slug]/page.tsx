'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PreviewModal } from '@/components/examCreate/PreviewModal';
interface QuestionInput {
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks: number;
  explanation?: string;
}

export default function page() {
     const [showPreview, setShowPreview] = useState(false);
     const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionInput[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
        if (!slug) return;
        console.log(`Slug aaya hua hai :${slug}`);
      try {
        const res = await axios.get(`/test-create/${slug}`);
        console.log(res);
        setQuiz(res.data.quiz);
        setQuestions(res.data.quiz.questions || []);
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      } finally {
        setLoading(false);
      }
    };

     fetchQuiz();
  }, [slug]);

  const handleQuizChange = (field: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [field]: value }));
  };

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

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

      await axios.put(`/test-create/${slug}`, {
        ...quiz,
        totalMarks,
        TotalQuestion: questions.length,
        questions,
      });

      alert('✅ Quiz updated successfully!');
    } catch (err) {
      console.error('❌ Error updating quiz:', err);
      alert('Error updating quiz');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>No quiz found.</p>;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Edit Quiz</h2>

      <Input value={quiz.title} onChange={(e) => handleQuizChange('title', e.target.value)} placeholder="Title" />
      <Input value={quiz.slug} onChange={(e) => handleQuizChange('slug', e.target.value)} placeholder="Slug" />
      <Textarea
        value={quiz.description}
        onChange={(e) => handleQuizChange('description', e.target.value)}
        placeholder="Description"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Total Marks</Label>
          <Input
            type="number"
            value={quiz.totalMarks}
            onChange={(e) => handleQuizChange('totalMarks', +e.target.value)}
          />
        </div>
        <div>
          <Label>Total Questions</Label>
          <Input
            type="number"
            value={questions.length}
            readOnly
          />
        </div>
        <div>
          <Label>Duration (mins)</Label>
          <Input
            type="number"
            value={quiz.duration}
            onChange={(e) => handleQuizChange('duration', +e.target.value)}
          />
        </div>
        <div>
          <Label>Max Attempts</Label>
          <Input
            type="number"
            value={quiz.maxAttempts}
            onChange={(e) => handleQuizChange('maxAttempts', +e.target.value)}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold">Questions</h3>
      {questions.map((q, i) => (
        <Card key={i} className="p-4 space-y-2 relative">
          <h4 className="font-semibold">Question {i + 1}</h4>
          <Textarea
            placeholder="Question Text"
            value={q.text}
            onChange={(e) => handleQuestionChange(i, 'text', e.target.value)}
          />

          <RadioGroup
            value={String(q.correctOptionIndex)}
            onValueChange={(val) => handleQuestionChange(i, 'correctOptionIndex', parseInt(val))}
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
            <div className="w-full">
              <Label>Positive Marks</Label>
              <Input
                type="number"
                value={q.marks}
                onChange={(e) => handleQuestionChange(i, 'marks', +e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label>Negative Marks</Label>
              <Input
                type="number"
                value={q.negativeMarks}
                onChange={(e) => handleQuestionChange(i, 'negativeMarks', +e.target.value)}
              />
            </div>
          </div>
          <Button variant="destructive" onClick={() => removeQuestion(i)}>Remove Question</Button>
        </Card>
      ))}

      <Button onClick={addQuestion} className="bg-purple-600 text-white">
        + Add Question
      </Button>

      <Button onClick={handleSubmit} className="bg-green-600 text-white">
        Save Changes
      </Button>
            <PreviewModal
              open={showPreview}
              onClose={() => setShowPreview(false)}
              questions={questions.map((q) => ({
                questionText: q.text,
                options: q.options,
                correctAnswerIndex: q.correctOptionIndex,
              })
            
            
            )}
            />
    </div>
    
  );
}
