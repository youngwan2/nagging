import { auth } from '../../../lib/auth';

import Section from './Section';
import Heading from '../ui/heading/Heading';
import Container from '../ui/container/Container';
import SummaryCard from '../ui/card/SummaryCard';
import EmptyMessage from '../ui/message/EmptyMessage';
import CredentialMessage from '../ui/message/CredentialMessage';

import { Method } from '@src/configs/fetch.config';
import { commonService } from '@src/services/common.service';

interface Payment {
  payments: {
    name: string;
    amount: string;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  }[];
}

// reference : SSR Query | https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
export default async function ProfitSection() {
  const session = await auth();
  const accessToken = session?.access_token || '';
  const userId = session?.userId;
  const url = '/api/adsense/payments';
  const body = { userId: userId };
  const { payments }: Payment = (await commonService({
    reqUrl: url,
    method: Method.POST,
    token: accessToken,
    body,
  })) || { payments: [] };

  if (!payments)
    return (
      <Section className="mb-[5rem] mt-[2.5rem]">
        <Heading level="2" className="pb-[0.75em]">
          지급액 통계
          <span className="text-[0.55em] pl-4 text-gray-500">Payment Statistics</span>
        </Heading>
        <CredentialMessage
          className="max-w-[768px] mx-auto"
          message="접근 권한이 없습니다. 로그인 후에도 동일한 메시지가 표시된다면, 우측 상단의 Adsense 버튼을 클릭하여 애드센스 계정 조회를 요청해주세요."
        />
      </Section>
    );
  if (payments.length < 1)
    return (
      <Section className="mb-[5rem] mt-[2.5rem]">
        <Heading level="2" className="pb-[0.75em]">
          지급액 통계
          <span className="text-[0.55em] pl-4 text-gray-500">Payment Statistics</span>
          <EmptyMessage
            title="조회된 지급액이 없습니다."
            message="현재 조회된 지급액 정보가 없습니다."
            className="mt-4"
          />
        </Heading>
      </Section>
    );

  const date = {
    year: payments[1].date?.year,
    month: payments[1].date?.month,
    day: payments[1].date?.day,
  };
  return (
    <Section className="mb-[5rem] mt-[2.5rem]">
      <Heading level="2" className="pb-[0.75em]">
        지급액 통계
        <span className="text-[0.55em] pl-4 text-gray-500">Payment Statistics</span>
      </Heading>

      <Container elName={'div'} className="grid sm:grid-cols-1  2xl:grid-cols-2">
        <SummaryCard koTitle="최근 지급액" enTitle="Recently Profits" text={payments[1].amount} date={date} />
        <SummaryCard className="2xl:ml-5" koTitle="미지급액" enTitle={'Unpaid Earnings'} text={payments[0].amount} />
      </Container>
    </Section>
  );
}
