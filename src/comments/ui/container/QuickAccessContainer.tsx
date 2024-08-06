import HomeCard from '../card/HomeCard';
import Heading from '../heading/Heading';
import Container from './Container';

export default function QuickAccessContainer() {
  return (
    <Container elName={'div'} className="w-full mt-8 2xl:mt-0 2xl:ml-8">
      <Heading level="2" className="pb-[0.75em]">
        서비스 바로가기
        <span className="text-[0.55em] pl-4 text-gray-500">
          Quick Access to Services
        </span>
      </Heading>
      <HomeCard
        koTitle="환율 정보"
        enTitle="Exchange Rate Information"
        href="/dashboard/info"
        text={`간편하게 참고할 수 있는 오늘의 환율 정보를 확인할 수 있습니다. USD 를 기준으로 총 50 개국의 정보를 확인할 수 있습니다(단, 매일 오전 10:30 ~ 이후로 금일 정보 조회가 가능합니다. 이전 시간에는 latest 를 기준으로 조회 가능한 과거 날짜를 기준으로 보여줍니다.). `}
      />{' '}
      <HomeCard
        koTitle="간편 수익통계"
        enTitle="Simple Income Statistics"
        href="/dashboard/anlaytics"
        text="연도별로 수익통계를 확인하고, 최근 수익금 지불여부를 확인할 수 있습니다."
      />
      <HomeCard
        koTitle="보고서/알림 설정"
        enTitle="Report Notification Setup"
        href="/dashboard/notification-settings"
        text="지정한 보고서 형식에 맞춰 이메일을 통해 수익 정보를 전달합니다. 년/월/주 단위로 알림 설정이 가능하며, 필요에 따라서는 즉시 받기를 통해 지정한 날짜 범위 내의 정보를 받아볼 수 있습니다."
      />
    </Container>
  );
}
