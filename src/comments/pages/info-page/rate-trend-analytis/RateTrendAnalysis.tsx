import Heading from '@src/comments/ui/heading/Heading';
import { AnimatePresence, motion } from 'framer-motion';

export default function RateTrendAnalysis({ isFlip }: { isFlip: boolean }) {
  return (
    <div>
      <AnimatePresence initial={false}>
        {!isFlip ? (
          <motion.section
            className={`w-full shrink-0 h-[100vh]`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
          >
            <Heading level="2" className="pb-[0.75em]">
              시계열 환율 비교
              <span className="text-[0.55em] pl-4 text-gray-500">Rate Trend</span>
            </Heading>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
