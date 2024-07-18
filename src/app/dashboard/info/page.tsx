// interface Props { }

import InfomationContainer from '@src/comments/ui/container/InfomationContainer';
import Heading from '@src/comments/ui/heading/Heading';
import Section from '@src/comments/ui/section/Section';

export default function InfomationPage() {
  return (
    <Section className="w-full">
      <Heading level="2" className="pb-[0.75em]">
        실시간 환율
        <span className="text-[0.55em] pl-4 text-gray-500">
          Daily Exchange Rates
        </span>
      </Heading>
      <InfomationContainer />
    </Section>
  );
}
