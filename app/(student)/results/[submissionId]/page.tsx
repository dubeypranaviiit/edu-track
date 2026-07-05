"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Loader2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Clock,
  Award,
  HelpCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionDetail {
  _id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks?: number;
  explanation?: string;
}

interface AnswerDetail {
  question: QuestionDetail;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
  markedForReview: boolean;
  timeSpent: number;
}

interface Submission {
  _id: string;
  score: number;
  timeTaken: number;
  attemptedAt: string;
  answers: AnswerDetail[];
  quiz: {
    title: string;
    totalMarks: number;
    passingMarks: number;
    duration: number;
  };
}

export default function ResultDetailPage() {
  const { submissionId } = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "correct" | "wrong" | "skipped">("all");

  useEffect(() => {
    if (!submissionId) return;
    axios
      .get(`/api/quiz/result/${submissionId}`)
      .then((res) => setSubmission(res.data.submission))
      .catch((err) => console.error("Failed to load submission details", err))
      .finally(() => setLoading(false));
  }, [submissionId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-medium">Analyzing your quiz submission...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Assessment results could not be located.
      </div>
    );
  }

  const { quiz, answers, score, timeTaken, attemptedAt } = submission;
  const passingScore = (quiz.passingMarks / 100) * quiz.totalMarks;
  const passed = score >= passingScore;
  const correct = answers.filter((a) => a.isCorrect).length;
  const wrong = answers.filter(
    (a) => !a.isCorrect && a.selectedOptionIndex !== null
  ).length;
  const skipped = answers.filter((a) => a.selectedOptionIndex === null).length;
  const pct = Math.round((score / quiz.totalMarks) * 100);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}m ${sec}s`;
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filteredAnswers = answers.filter((a) => {
    if (filter === "correct") return a.isCorrect;
    if (filter === "wrong") return !a.isCorrect && a.selectedOptionIndex !== null;
    if (filter === "skipped") return a.selectedOptionIndex === null;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white mb-6 text-sm font-semibold transition"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </motion.button>

      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg relative overflow-hidden ${
          passed
            ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600"
            : "bg-gradient-to-r from-red-500 via-rose-500 to-pink-600"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <Award size={32} className="text-white/90" />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{quiz.title}</h1>
        </div>
        <p className="text-white/80 text-sm mb-6 font-medium">{formatDate(attemptedAt)}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-black">{score}</p>
            <p className="text-xs text-white/80 font-bold uppercase mt-1">Score / {quiz.totalMarks}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-black">{pct}%</p>
            <p className="text-xs text-white/80 font-bold uppercase mt-1">Percentage</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-1">
              <Clock size={20} /> {formatTime(timeTaken)}
            </p>
            <p className="text-xs text-white/80 font-bold uppercase mt-1">Time Spent</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl md:text-3xl font-black">{passed ? "PASS" : "FAIL"}</p>
            <p className="text-xs text-white/80 font-bold uppercase mt-1">
              Required: {quiz.passingMarks}% ({passingScore.toFixed(1)} Marks)
            </p>
          </div>
        </div>
      </motion.div>

      {}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/40 rounded-2xl p-4 text-center shadow-sm"
        >
          <CheckCircle className="mx-auto text-green-500 dark:text-green-400 mb-1" size={24} />
          <p className="text-2xl font-black text-green-600 dark:text-green-400">{correct}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mt-0.5">Correct</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/40 rounded-2xl p-4 text-center shadow-sm"
        >
          <XCircle className="mx-auto text-red-500 dark:text-red-400 mb-1" size={24} />
          <p className="text-2xl font-black text-red-600 dark:text-red-400">{wrong}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mt-0.5">Wrong</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-2xl p-4 text-center shadow-sm"
        >
          <HelpCircle className="mx-auto text-gray-400 dark:text-gray-300 mb-1" size={24} />
          <p className="text-2xl font-black text-gray-600 dark:text-gray-300">{skipped}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mt-0.5">Skipped</p>
        </motion.div>
      </div>

      {}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6 overflow-x-auto">
        {(["all", "correct", "wrong", "skipped"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 min-w-[70px] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              filter === f
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            }`}
          >
            <span className="capitalize">{f}</span>
            <span className="text-xs opacity-60 ml-1">
              ({f === "all" && answers.length}
              {f === "correct" && correct}
              {f === "wrong" && wrong}
              {f === "skipped" && skipped})
            </span>
          </button>
        ))}
      </div>

      {}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredAnswers.map((a, idx) => {
            const q = a.question || { text: "Deleted Question", options: [], correctOptionIndex: 0, marks: 1 };
            const isAnswered = a.selectedOptionIndex !== null;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                key={q._id || idx}
                className={`border rounded-2xl p-5 md:p-6 bg-white dark:bg-gray-800 transition ${
                  a.isCorrect
                    ? "border-green-200/80 dark:border-green-900/50 bg-green-50/10"
                    : !isAnswered
                    ? "border-gray-200 dark:border-gray-700 bg-gray-50/10"
                    : "border-red-200/80 dark:border-red-900/50 bg-red-50/10"
                }`}
              >
                {}
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${
                      a.isCorrect
                        ? "bg-green-500"
                        : !isAnswered
                        ? "bg-gray-400"
                        : "bg-red-500"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-white text-base md:text-lg leading-relaxed">{q.text}</h3>
                    <div className="flex flex-wrap gap-2.5 mt-2 text-xs font-semibold">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                        +{q.marks} Marks
                      </span>
                      {q.negativeMarks ? (
                        <span className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-md">
                          -{q.negativeMarks} Negative
                        </span>
                      ) : null}
                      {a.timeSpent ? (
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
                          Spent: {a.timeSpent}s
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-0.5">
                    {a.isCorrect ? (
                      <CheckCircle size={22} className="text-green-500" />
                    ) : !isAnswered ? (
                      <HelpCircle size={22} className="text-gray-400" />
                    ) : (
                      <XCircle size={22} className="text-red-500" />
                    )}
                  </div>
                </div>

                {}
                <div className="space-y-3 ml-0 md:ml-12 mt-4">
                  {q.options.map((opt, i) => {
                    const isCorrectOpt = i === q.correctOptionIndex;
                    const isSelected = i === a.selectedOptionIndex;

                    let optionStyle = "px-4 py-3 rounded-xl border text-sm flex items-center gap-3 transition-colors duration-200 ";
                    if (isCorrectOpt) {
                      optionStyle += "border-green-400 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300 font-semibold";
                    } else if (isSelected && !isCorrectOpt) {
                      optionStyle += "border-red-400 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 font-semibold";
                    } else {
                      optionStyle += "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600";
                    }

                    return (
                      <div key={i} className={optionStyle}>
                        <span className="font-extrabold text-xs opacity-75">{String.fromCharCode(65 + i)}</span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectOpt && (
                          <span className="text-xs bg-green-200 dark:bg-green-800/60 text-green-800 dark:text-green-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            Correct
                          </span>
                        )}
                        {isSelected && !isCorrectOpt && (
                          <span className="text-xs bg-red-200 dark:bg-red-800/60 text-red-800 dark:text-red-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {}
                {q.explanation && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-0 md:ml-12 mt-5 p-4 bg-blue-50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 rounded-xl text-sm text-blue-900 dark:text-blue-300"
                  >
                    <strong className="block text-blue-800 dark:text-blue-400 mb-1">Explanation:</strong> 
                    {q.explanation}
                  </motion.div>
                )}

                {!isAnswered && (
                  <p className="ml-0 md:ml-12 mt-4 text-sm text-gray-400 dark:text-gray-500 italic">
                    — This question was skipped.
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
