import React from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Загрузка...' }) => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
