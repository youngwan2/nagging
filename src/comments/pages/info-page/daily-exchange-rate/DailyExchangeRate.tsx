import Heading from '@src/comments/ui/heading/Heading';
import DailyExchangeRateTable from './DailyExchangeRateTable';
import { AnimatePresence, motion } from 'framer-motion';

export default function DailyExchangeRate({ isFlip }: { isFlip: boolean }) {
  return (
    <div>
      <AnimatePresence initial={false}>
        {isFlip ? (
          <motion.section
            className={`w-full shrink-0`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
          >
            <Heading level="2" className="pb-[0.75em]">
              데일리 환율
              <span className="text-[0.55em] pl-4 text-gray-500">Daily Exchange Rates</span>
            </Heading>
            <DailyExchangeRateTable />
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
