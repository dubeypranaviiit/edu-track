"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface Question {
  _id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks?: number;
}

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  totalQuestions: number;
  questions: Question[];
  createdBy: { name: string };
}

export default function ExamPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { profile } = useUserStore();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<
    Record<string, { selectedOptionIndex: number | null; markedForReview: boolean; timeSpent: number }>
  >({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  //  Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quiz/${slug}`);
        setQuiz(res.data);
        setTimeLeft(res.data.duration * 60);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchQuiz();
  }, [slug]);

  //  Timer
  useEffect(() => {
    if (!quiz || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz, submitted]);

  //  Track time spent per question
  const updateTimeSpent = (questionId: string) => {
    setAnswers((prev) => {
      const prevData = prev[questionId] || {};
      return {
        ...prev,
        [questionId]: {
          ...prevData,
          timeSpent: (prevData.timeSpent || 0) + Math.floor((Date.now() - questionStartTime) / 1000),
        },
      };
    });
  };

  //  Handle answer selection
  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    updateTimeSpent(questionId);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], selectedOptionIndex: optionIndex },
    }));
    setQuestionStartTime(Date.now());
  };

  //  Mark for review
  const toggleReview = (questionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], markedForReview: !prev[questionId]?.markedForReview },
    }));
  };

  //  Navigate
  const next = () => {
    updateTimeSpent(quiz!.questions[currentIndex]._id);
    setQuestionStartTime(Date.now());
    if (currentIndex < quiz!.questions.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prev = () => {
    updateTimeSpent(quiz!.questions[currentIndex]._id);
    setQuestionStartTime(Date.now());
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  //  Submit
  const handleSubmit = async () => {
    if (!quiz || !profile?._id || submitted) return;
    updateTimeSpent(quiz.questions[currentIndex]._id);
    setSubmitted(true);

    const totalTimeTaken = quiz.duration * 60 - timeLeft;

    const answerArray = Object.entries(answers).map(([questionId, data]) => ({
      question: questionId,
      selectedOptionIndex: data.selectedOptionIndex,
      markedForReview: data.markedForReview || false,
      timeSpent: data.timeSpent || 0,
    }));

    try {
      const res = await axios.post("/api/quiz/submit", {
        userId: profile._id,
        quizId: quiz._id,
        answers: answerArray,
        timeTaken: totalTimeTaken,
      });
      setScore(res.data.score);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin mr-2" /> Loading Quiz...
      </div>
    );

  if (!quiz)
    return (
      <div className="text-center py-20 text-red-600">
        Quiz not found 
      </div>
    );

  const currentQ = quiz.questions[currentIndex];
  const selected = answers[currentQ._id]?.selectedOptionIndex ?? null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="p-6 border shadow-md">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="text-green-600 font-semibold">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        <p className="text-gray-600 mb-4">{quiz.description}</p>

        <Progress value={((currentIndex + 1) / quiz.questions.length) * 100} className="mb-6" />

        <h3 className="font-medium mb-3">
          Q{currentIndex + 1}. {currentQ.text}
        </h3>

        <div className="grid gap-2">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(currentQ._id, idx)}
              disabled={submitted}
              className={`px-4 py-2 border rounded-md text-left transition
                ${selected === idx ? "border-green-500 bg-green-50" : "border-gray-300"}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={prev} disabled={currentIndex === 0}>
            Previous
          </Button>
          <Button variant="secondary" onClick={() => toggleReview(currentQ._id)}>
            {answers[currentQ._id]?.markedForReview ? "Unmark Review" : "Mark for Review"}
          </Button>
          <Button onClick={next} disabled={currentIndex === quiz.questions.length - 1}>
            Next
          </Button>
        </div>

        {/* Question navigation bullets */}
        <div className="flex flex-wrap gap-2 mt-6">
          {quiz.questions.map((q, i) => {
            const status = answers[q._id]?.markedForReview
              ? "bg-yellow-500"
              : answers[q._id]?.selectedOptionIndex != null
              ? "bg-green-500"
              : "bg-gray-300";
            return (
              <button
                key={q._id}
                className={`w-8 h-8 rounded-full ${status} text-white`}
                onClick={() => {
                  updateTimeSpent(currentQ._id);
                  setCurrentIndex(i);
                  setQuestionStartTime(Date.now());
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {currentIndex === quiz.questions.length - 1 && !submitted && (
          <Button
            className="w-full mt-6 bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        )}

        {submitted && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              Final Score:{" "}
              <span className={score! >= quiz.passingMarks ? "text-green-600" : "text-red-600"}>
                {score} / {quiz.totalMarks}
              </span>
            </h2>
            <Button className="mt-3" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
