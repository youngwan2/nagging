import React from 'react';

interface PropsType {
  orientation: 'horizontal' | 'vertical';
}
export default function CardSkeleton({ orientation }: PropsType) {
  if (orientation === 'horizontal') {
    return (
      <div className="flex">
        <div className="max-w-[442px] w-full h-32 bg-gray-200 rounded-lg p-4 flex animate-pulse m-5">
          <div className="w-1/4 h-full bg-gray-300 rounded-md mr-4"></div>
          <div className="w-3/4 flex flex-col justify-between">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="max-w-[442px] w-full h-32 bg-gray-200 rounded-lg p-4 flex animate-pulse m-5">
          <div className="w-1/4 h-full bg-gray-300 rounded-md mr-4"></div>
          <div className="w-3/4 flex flex-col justify-between">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-80 bg-gray-200 rounded-lg p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}
