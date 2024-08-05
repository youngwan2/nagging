import React from 'react';

export default function ExchangeRateTableSkeleton() {
  return (
    <div className="dark:bg-gray-900 dark:text-white p-4 font-sans w-full">
      <div className="mb-4 h-6 dark:bg-black bg-white w-64 rounded"></div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-black">
            <th className="py-2 text-left w-1/12">
              <div className="h-4 bg-gray-700 w-8 rounded"></div>
            </th>
            <th className="py-2 text-left w-5/12">
              <div className="h-4 bg-gray-700 w-32 rounded"></div>
            </th>
            <th className="py-2 text-right w-3/12">
              <div className="h-4 bg-gray-700 w-16 rounded ml-auto"></div>
            </th>
            <th className="py-2 text-right w-3/12">
              <div className="h-4 bg-gray-700 w-24 rounded ml-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((_, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="py-2">
                <div className="h-4 bg-gray-800 w-8 rounded"></div>
              </td>
              <td className="py-2">
                <div className="h-4 bg-gray-800 w-24 rounded"></div>
              </td>
              <td className="py-2 text-right">
                <div className="h-4 bg-gray-800 w-16 rounded ml-auto"></div>
              </td>
              <td className="py-2 text-right">
                <div className="h-4 bg-gray-800 w-24 rounded ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
