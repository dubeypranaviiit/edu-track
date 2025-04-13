"use client";

interface QuestionNavigationProps {
  questions: { id: number; text: string; options: string[] }[];
  currentQuestion: number;
  questionStatus: Record<number, string>;
  onQuestionChange: (index: number) => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentQuestion,
  questionStatus,
  onQuestionChange,
}) => {
  const getStatusColor = (questionId: number): string => {
    const status = questionStatus[questionId];
    switch (status) {
      case "attempted":
        return "bg-green-500";
      case "viewed":
        return "bg-red-500";
      case "review":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Question Navigation</h2>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => onQuestionChange(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getStatusColor(q.id)} ${currentQuestion === index ? "ring-2 ring-blue-500" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Attempted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Viewed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <span>Not Visited</span>
        </div>
      </div>
    </div>
  );
};
