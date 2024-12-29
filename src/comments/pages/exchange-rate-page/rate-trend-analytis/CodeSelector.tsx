'use client';

import { currencies } from '@src/constants/currencies';

export default function CodeSelector({ code, handleChange }: { code: string; handleChange: (code: string) => void }) {
  return (
    <div className="bg-white dark:bg-black  w-full flex justify-center flex-col border dark:border-gray-700 p-3 rounded-md ">
      <div className="mb-4 max-w-[768px] w-full">
        <label htmlFor="currencySelect" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          화폐 선택:
        </label>
        <select
          id="currencySelect"
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 dark:bg-gray-700 "
        >
          {Object.keys(currencies).map((currencyKey) => (
            <option key={currencyKey} value={currencyKey}>
              {currencies[currencyKey]}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-[960.78px]">
        <div className="mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 mr-3">
            <strong>선택코드:</strong> {code}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>화폐명:</strong> {currencies[code]}
          </p>
        </div>
      </div>
    </div>
  );
}
