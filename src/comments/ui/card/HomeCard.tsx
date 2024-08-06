import Link from 'next/link';
import Card from './SummaryCard';
import Text from '../text/Text';

interface PropsType {
  koTitle?: string;
  enTitle?: string;
  href?: string;
  text?: string;
}
export default function HomeCard({ koTitle, enTitle, href, text }: PropsType) {
  return (
    <Card className="p-3" koTitle={koTitle} enTitle={enTitle}>
      {href ? (
        <Link href={href} className="hover:text-white">
          <Text elementName={'span'} className="pt-[2em] hover:text-white">
            {text}
          </Text>
        </Link>
      ) : (
        <Text elementName={'span'} className="hover:text-white">
          {text}
        </Text>
      )}
    </Card>
  );
}
