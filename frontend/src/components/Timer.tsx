import React from 'react';
import { Watch } from 'lucide-react';

interface TimerProps {
  duration: number; // в секундах
  onComplete?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [remaining, setRemaining] = React.useState(duration);

  React.useEffect(() => {
    if (remaining <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onComplete]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isWarning = remaining < 60;

  return (
    <div
      className={`flex items-center rounded-lg px-4 py-2 font-semibold ${
        isWarning
          ? 'bg-red-100 text-red-700'
          : 'bg-blue-100 text-blue-700'
      }`}
    >
      <Watch size={16} className="mr-2" />
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;
