import Link from 'next/link';
import SummaryCard from './SummaryCard';
import Text from '../text/Text';

interface PropsType {
  koTitle?: string;
  enTitle?: string;
  href?: string;
  text?: string;
}
export default function HomeCard({ koTitle, enTitle, href, text }: PropsType) {
  return (
    <SummaryCard className="md:min-h-[150px] h-auto p-3 group" koTitle={koTitle} enTitle={enTitle}>
      {href ? (
        <Link href={href}>
          <Text elementName={'span'} className="pt-[2em]">
            {text}
          </Text>
        </Link>
      ) : (
        <Text elementName={'span'}>{text}</Text>
      )}
    </SummaryCard>
  );
}
