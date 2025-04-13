"use client";

import { useState } from "react";
import { mockQuestions } from "./mockQuestion";
import { FiCheck, FiEye, FiFlag } from "react-icons/fi";
import { Question } from "@/types/question";

interface QuestionCardProps {
  question: Question;
  answer: number | null;
  onAnswerSelect: (questionId: number, optionIndex: number) => void;
  onClearResponse: (questionId: number) => void;
  onMarkForReview: (questionId: number) => void;
  currentQuestion: number;
  totalQuestions: number;
  onNavigate: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswerSelect,
  onClearResponse,
  onMarkForReview,
  currentQuestion,
  totalQuestions,
  onNavigate,
}) => {
  return (
    <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
        <p className="mt-2 text-gray-700">{question.text}</p>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`block p-4 rounded-lg border cursor-pointer transition-colors ${answer === index ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50"}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answer === index}
              onChange={() => onAnswerSelect(question.id, index)}
              className="mr-3"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => currentQuestion > 0 && onNavigate(currentQuestion - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <div className="space-x-2">
          <button
            onClick={() => onMarkForReview(question.id)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Mark for Review
          </button>
          <button
            onClick={() => onClearResponse(question.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Response
          </button>
        </div>

        <button
          onClick={() => currentQuestion < totalQuestions - 1 && onNavigate(currentQuestion + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={currentQuestion === totalQuestions - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
