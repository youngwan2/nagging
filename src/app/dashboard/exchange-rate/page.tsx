'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DailyExchangeRate from '@src/comments/pages/exchange-rate-page/daily-exchange-rate/DailyExchangeRate';
import RateTrendAnalysis from '@src/comments/pages/exchange-rate-page/rate-trend-analytis/RateTrendAnalysis';

export default function InformationPage() {
  const [isFlip, setIsFlip] = useState(true);

  const divRef = useRef<HTMLDivElement>(null);

  function handleFlip() {
    setIsFlip((prev) => !prev);
  }

  return (
    <div className="w-full overflow-hidden overflow-x-hidden">
      <button
        className="p-1 px-2 rounded-t-md mb-2 dark:bg-white dark:text-black bg-slate-500 text-white active:bg-slate-200"
        onClick={handleFlip}
      >
        {isFlip ? '시계열 환율 보기' : '데일리 환율 보기'}
      </button>
      <motion.div className={`flex flex-col justify-between w-full`} ref={divRef}>
        <DailyExchangeRate isFlip={isFlip} />
        <RateTrendAnalysis isFlip={isFlip} />
      </motion.div>
    </div>
  );
}
