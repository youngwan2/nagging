import Heading from '../heading/Heading';
import Text from '../text/Text';
import NotificationReportOptionList from '../list/NotificationReportOptionList';
import PaginationContainer from '../pagination/PaginationContainer';
import Container from './Container';
import ReportCardSkeleton from '../skeleton/ReportCardSkeleton';
import ErrorMessage from '../message/ErrorMessage';
import CredentialMessage from '../message/CredentialMessage';

import type { QueryState } from './NotificationPageContainer';

interface PropsType {
  userId?: string;
  queryState: QueryState;
  onPageChange: (page: number) => void;
  page: number;
}

export default function NotificationOptionListContainer({ userId, queryState, onPageChange, page }: PropsType) {
  const { data, isError, isPending } = queryState;

  const optionList = data?.optionList || [];
  const maxPage = data?.maxPage || 0;

  return (
    <Container elName={'section'} className="w-full pl-0 xl:pl-3">
      {/* 타이틀 */}
      <Title />
      {/* 안내 */}
      <GuideMessage />
      {
        isError || !Array.isArray(optionList) ? (
          <ErrorMessage className="mt-4" />
        ) : isPending ? (
          <ReportCardSkeleton />
        ) : userId ? (
          <NotificationReportOptionList items={optionList} /> // 보고서 옵션 리스트
        ) : (
          <CredentialMessage className="mt-4" />
        ) // 비회원 메시지
      }

      {/* 페이지 네이션 */}
      <PaginationContainer onChange={onPageChange} initialPage={page} total={maxPage} />
    </Container>
  );
}

function GuideMessage() {
  return (
    <Text elementName={'p'} className="opacity-90 text-black text-[0.95em]">
      - 안정적인 서비스 운영을 위해 현재는 보고서 1개에 대해서만 알림설정이 가능합니다. <br />- [보고서 삭제] 시 해당
      옵션으로 등록된 알림을 해제하거나 다른 보고서로 알림을 설정해주세요.
    </Text>
  );
}

function Title() {
  return (
    <Heading level="2" className="mt-[3.5rem] xl:mt-0 ml-0 pb-[0.75em]">
      보고서 옵션 목록
      <Text elementName={'span'} className="text-[0.55em] pl-4 text-gray-500 opacity-55">
        Report Option List
      </Text>
    </Heading>
  );
}
