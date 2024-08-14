import Heading from '../heading/Heading';
import Text from '../text/Text';
import NotificationReportOptionList from '../list/NotificationReportOptionList';
import GraphSkeleton from '../skeleton/GraphSkeleton';
import PaginationContainer from '../pagination/PaginationContainer';
import Container from './Container';

import type { QueryState } from './NotificationPageContainer';

interface PropsType {
  userId?: string;
  queryState: QueryState;
  onPageChange: (page: number) => void;
  page: number;
}

export default function NotificationOptionListContainer({
  userId,
  queryState,
  onPageChange,
  page,
}: PropsType) {
  const { data, isError, isPending, isRefetching } = queryState;

  const optionList = data?.optionList || [];
  const maxPage = data?.maxPage || 0;

  return (
    <Container elName={'section'} className="w-full pl-0 xl:pl-3">
      <Heading level="2" className="mt-[3.5rem] xl:mt-0 ml-0 pb-[0.75em]">
        보고서 옵션 목록
        <Text
          elementName={'span'}
          className="text-[0.55em] pl-4 text-gray-500 opacity-55"
        >
          Report Option List
        </Text>
      </Heading>
      <Text elementName={'p'} className="opacity-90 text-black text-[0.95em]">
        - 안정적인 서비스 운영을 위해 현재는 보고서 1개에 대해서만 알림설정이
        가능합니다. <br />- 보고서를 삭제해도 알림은 제거되지 않습니다. 삭제 후
        알림을 취소하려면 알림 목록을 이용해주세요.
      </Text>
      {isError ? (
        <Heading level="2" className="text-[0.85em]">
          <Text elementName={'p'}>
            네트워크 문제로 인해 데이터를 로드하지 못하였습니다. 나중에 다시
            시도 해주세요.
          </Text>
        </Heading>
      ) : null}
      {!isPending || !isRefetching ? (
        <>
          {userId ? (
            <NotificationReportOptionList items={optionList} />
          ) : (
            <Text elementName={'p'} className="py-5">
              접근권한이 없습니다. 로그인 후 이용해주세요.
            </Text>
          )}

          {/* 페이지 네이션 */}
          <PaginationContainer
            onChange={onPageChange}
            initialPage={page}
            total={maxPage}
          />
        </>
      ) : (
        <GraphSkeleton />
      )}
    </Container>
  );
}
