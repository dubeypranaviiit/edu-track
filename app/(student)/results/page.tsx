"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle, Clock, BookOpen, Award, BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface QuizInfo {
  _id: string;
  title: string;
  slug: string;
  totalMarks: number;
  passingMarks: number;
  duration: number;
}

interface Submission {
  _id: string;
  quiz: QuizInfo;
  score: number;
  timeTaken: number;
  attemptedAt: string;
  answers: { isCorrect: boolean }[];
}

export default function ResultsPage() {
  const { profile } = useUserStore();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?._id) return;
    axios
      .get(`/api/quiz/results/${profile._id}`)
      .then((res) => setSubmissions(res.data.submissions || []))
      .catch((err) => console.error("Failed to load results", err))
      .finally(() => setLoading(false));
  }, [profile]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-medium">Fetching your test records...</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto mt-8"
      >
        <BookOpen className="mx-auto mb-6 text-blue-500" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No attempts yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          Your quiz and test results will appear here once you take a test. Get started by taking your first assessment!
        </p>
        <Link 
          href="/test/free" 
          className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow transition-colors"
        >
          Browse Free Tests →
        </Link>
      </motion.div>
    );
  }

  const passedCount = submissions.filter((s) => s.score >= ((s.quiz?.passingMarks ?? 0) / 100) * (s.quiz?.totalMarks ?? 100)).length;
  const failedCount = submissions.length - passedCount;
  const passRate = Math.round((passedCount / submissions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Test Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Detailed performance summary and history of your attempts.</p>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-3xl font-extrabold">{submissions.length}</p>
              <p className="text-sm text-blue-100 font-medium mt-1">Total Attempts</p>
            </div>
            <Award size={28} className="text-blue-100 opacity-80" />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">{passedCount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Passed Assessments</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">{failedCount} failed attempts</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{passRate}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Success Rate</p>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${passRate}%` }} />
          </div>
        </motion.div>
      </div>

      {}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Attempt History</h2>

      {}
      <div className="space-y-4">
        {submissions.map((sub, index) => {
          const quiz = sub.quiz || { title: "Deleted Quiz", totalMarks: 100, passingMarks: 33 };
          const passed = sub.score >= (quiz.passingMarks / 100) * quiz.totalMarks;
          const correct = sub.answers ? sub.answers.filter((a) => a.isCorrect).length : 0;
          const totalQ = sub.answers ? sub.answers.length : 0;
          const pct = Math.round((sub.score / quiz.totalMarks) * 100);

          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={sub._id}
              className="border border-gray-100 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${passed ? "bg-green-500" : "bg-red-500"}`} />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {quiz.title}
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        passed
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200/40"
                          : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200/40"
                      }`}
                    >
                      {passed ? "PASSED" : "FAILED"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">SCORE</span>
                      <strong className={passed ? "text-green-600 dark:text-green-400 font-bold" : "text-red-500 font-bold"}>
                        {sub.score} / {quiz.totalMarks}
                      </strong>
                      <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">ACCURACY</span>
                      <strong>{correct} / {totalQ}</strong> correct
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-gray-400" />
                      <div>
                        <span className="block text-xs text-gray-400 font-medium">TIME TAKEN</span>
                        <strong>{formatTime(sub.timeTaken)}</strong>
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">ATTEMPTED ON</span>
                      <strong>{formatDate(sub.attemptedAt)}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 md:mt-0">
                  <Link
                    href={`/results/${sub._id}`}
                    className="w-full md:w-auto px-5 py-2.5 text-center text-sm font-semibold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white rounded-xl border border-gray-200/60 dark:border-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 shadow-sm transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
