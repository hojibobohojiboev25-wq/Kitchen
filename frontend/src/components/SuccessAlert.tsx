import React from 'react';

interface SuccessProps {
  message: string;
  onDismiss?: () => void;
}

export const SuccessAlert: React.FC<SuccessProps> = ({ message, onDismiss }) => {
  React.useEffect(() => {
    if (onDismiss) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [onDismiss]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start">
      <div className="text-green-600 text-2xl mr-3">✓</div>
      <div className="flex-1">
        <p className="text-green-800">{message}</p>
      </div>
    </div>
  );
};

export default SuccessAlert;
