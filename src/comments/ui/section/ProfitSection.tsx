import { Method, adsenseService } from '@src/services/adsense.service';
import Card from '../card/Card';
import Container from '../container/Container';
import Heading from '../heading/Heading';
import Section from './Section';
import { auth } from '@src/auth';

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
export default async function ProfitSection() {
  const session = await auth();

  const accessToken = session?.access_token || '';
  const userId = session?.userId;

  const url = '/api/adsense/payments';
  const body = {
    userId: userId,
  };
  const { payments }: Payment = (await adsenseService({
    reqUrl: url,
    method: Method.POST,
    token: accessToken,
    body,
  })) || { payments: [] };

  if (payments.length < 1)
    return (
      <Section className="mb-[5rem]">
        <Heading level="2" className="pb-[0.75em]">
          수익 통계
          <span className="text-[0.55em] pl-4 text-gray-500">
            Revenue Statistics
          </span>
          <p className="text-[1rem] font-light">
            접근 권한 혹은 네트워크 문제로 조회에 실패하였습니다.
          </p>
        </Heading>
      </Section>
    );

  const date = {
    year: payments[1].date?.year,
    month: payments[1].date?.month,
    day: payments[1].date?.day,
  };
  return (
    <Section className="mb-[5rem]">
      <Heading level="2" className="pb-[0.75em]">
        수익 통계
        <span className="text-[0.55em] pl-4 text-gray-500">
          Revenue Statistics
        </span>
      </Heading>
      <Container
        elName={'div'}
        className="grid sm:grid-cols-1  2xl:grid-cols-2"
      >
        <Card
          koTitle="최근 지급액"
          enTitle="Recently Profits"
          text={payments[1].amount}
          date={date}
        />
        <Card
          koTitle="미지급액"
          enTitle={'Unpaid Earnings'}
          text={payments[0].amount}
        />
      </Container>
    </Section>
  );
}
