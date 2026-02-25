import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start">
      <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <p className="text-red-800">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 ml-4"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
