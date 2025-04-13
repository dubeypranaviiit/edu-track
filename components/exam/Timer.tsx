import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

interface TimerProps {
  totalSeconds: number;
}

const Timer = ({ totalSeconds }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <FiClock className="text-xl" />
      <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
