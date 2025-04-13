interface SummaryBarProps {
    total: number;
    attempted: number;
    onSubmit: () => void;
  }
  
  const SummaryBar = ({ total, attempted, onSubmit }: SummaryBarProps) => {
    return (
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-8">
          <InfoBlock label="Total Questions" value={total} bg="bg-blue-100" color="text-blue-600" />
          <InfoBlock label="Attempted" value={attempted} bg="bg-green-100" color="text-green-600" />
          <InfoBlock label="Remaining" value={total - attempted} bg="bg-red-100" color="text-red-600" />
        </div>
        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
        >
          Submit Exam
        </button>
      </div>
    );
  };
  
  const InfoBlock = ({ label, value, bg, color }: { label: string; value: number; bg: string; color: string }) => (
    <div className={`flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm`}>
      <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>
        <span className={`${color} font-semibold`}>{value}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
  
  export default SummaryBar;
  