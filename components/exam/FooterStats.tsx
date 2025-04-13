"use client";

interface FooterStatsProps {
  total: number;
  attempted: number;
  onSubmit: () => void;
}

export const FooterStats: React.FC<FooterStatsProps> = ({ total, attempted, onSubmit }) => {
  const remaining = total - attempted;

  return (
    <div className="p-6 border-t mt-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex space-x-8">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold">{total}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Questions</span>
              <span className="font-medium">{total}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-semibold">{attempted}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Attempted</span>
              <span className="font-medium">{attempted}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-semibold">{remaining}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Remaining</span>
              <span className="font-medium">{remaining}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700  font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};
