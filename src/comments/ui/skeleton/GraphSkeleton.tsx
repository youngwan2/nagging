'use client';
import React from 'react';

export default function GraphSkeleton() {
  const points = [...Array(8)].map((_, i) => [i * 50, Math.random() * 100]);
  const pathD = `M ${points.map(([x, y]) => `${x},${100 - y}`).join(' L ')}`;

  return (
    <div className="w-full h-[450px] bg-gray-100 rounded-lg p-4 relative overflow-hidden">
      <div className="animate-pulse flex flex-col h-full">
        {/* Y-axis */}
        <div className="w-8 h-full bg-gray-300 rounded"></div>

        {/* Graph area */}
        <div className="flex-1 flex items-end mt-2">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end items-center">
              <div className="w-3/4 bg-gray-300 rounded" style={{ height: `${points[index][1]}%` }}></div>
              {/* X-axis label */}
              <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>

      <svg
        className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
        viewBox="0 0 350 100"
        preserveAspectRatio="none"
      >
        <path d={pathD} fill="none" stroke="url(#shimmer)" strokeWidth="1" className="animate-draw" />
        <defs>
          <linearGradient id="shimmer" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.2">
              <animate attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#9CA3AF" stopOpacity="0.5">
              <animate attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.2">
              <animate attributeName="offset" values="0; 3" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
