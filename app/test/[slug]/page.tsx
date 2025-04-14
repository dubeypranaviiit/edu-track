"use client";
import { useState, useEffect } from "react";
import { mockQuestions } from "@/components/exam/mockQuestion";
import { FooterStats } from "@/components/exam/FooterStats";
import { QuestionNavigation } from "@/components/exam/QuestionNavigation";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { Question } from "@/types/question";
const ExamInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [questionStatus, setQuestionStatus] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(180 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "attempted" }));
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestion(index);
    const questionId = mockQuestions[index].id;
    if (!questionStatus[questionId]) {
      setQuestionStatus((prev) => ({ ...prev, [questionId]: "viewed" }));
    }
  };

  const handleMarkForReview = (questionId: number) => {
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "review" }));
  };

  const handleClearResponse = (questionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: null }));
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center shadow z-10">
        <h1 className="text-2xl font-bold">JEE Main Online Examination</h1>
        <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white border-r overflow-y-auto p-4">
          <QuestionNavigation
            questions={mockQuestions}
            currentQuestion={currentQuestion}
            questionStatus={questionStatus}
            onQuestionChange={handleQuestionChange}
          />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5 p-4 overflow-y-auto">
          <QuestionCard
            question={mockQuestions[currentQuestion]}
            answer={answers[mockQuestions[currentQuestion].id]}
            onAnswerSelect={handleAnswerSelect}
            onClearResponse={handleClearResponse}
            onMarkForReview={handleMarkForReview}
            currentQuestion={currentQuestion}
            totalQuestions={mockQuestions.length}
            onNavigate={handleQuestionChange}
          />
        </div>
      </div>
      <FooterStats
        total={mockQuestions.length}
        attempted={Object.values(answers).filter((v) => v !== null).length}
        onSubmit={() => alert("Exam Submitted")}
      />
    </div>
  );
};

export default ExamInterface;
