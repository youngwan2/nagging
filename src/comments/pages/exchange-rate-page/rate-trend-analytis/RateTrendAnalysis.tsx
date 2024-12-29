import Heading from '@src/comments/ui/heading/Heading';
import { AnimatePresence, motion } from 'framer-motion';
import DotLineGraph from './DotLineGraph';
import useDotLineGraphDataState from '@src/hooks/useDotLineGraphDataState';
import CodeSelector from './CodeSelector';

export default function RateTrendAnalysis({ isFlip }: { isFlip: boolean }) {
  const { data, isError, isLoading, code, handleCurrencyCode } = useDotLineGraphDataState();

  console.log(data);

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
            <CodeSelector code={code} handleChange={handleCurrencyCode} />
            <DotLineGraph code={code} data={data} isLoading={isLoading} isError={isError} />
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
