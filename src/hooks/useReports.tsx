'use client';
import { CustomDate, ReportRequest } from '@src/services/adsense.service';
import { useReducer } from 'react';

// 타입
export type Action =
  | { type: 'SET_DATE_RANGE'; payload: 'CUSTOM' }
  | { type: 'SET_DIMENSIONS'; payload: string[] }
  | { type: 'SET_START_DATE'; payload: CustomDate }
  | { type: 'SET_END_DATE'; payload: CustomDate }
  | { type: 'SET_METRICS'; payload: string[] }
  | { type: 'SET_REPORTING_TIME_ZONE'; payload: 'ACCOUNT_TIME_ZONE' };

interface State extends ReportRequest {
  startDate: any;
  endDate: any;
}

// 훅
export function useReports(dateRange: ReportRequest) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(dateRangeReducer, dateRange);

  return { state, dispatch };
}

// 레듀셔
function dateRangeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: 'CUSTOM' };
    case 'SET_DIMENSIONS':
      return { ...state, dimensions: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_METRICS':
      return { ...state, metrics: action.payload };
    case 'SET_REPORTING_TIME_ZONE':
      return { ...state, reportingTimeZone: 'ACCOUNT_TIME_ZONE' };
    default:
      return state;
  }
}

/** 메모
 *
 *
 *
 ***>>>  metrics :
 * - CLICKS: 사용자가 표준 콘텐츠 광고를 클릭한 횟수입니다.
 * - ESTIMATED_EARNINGS: 게시자의 추정 수익으로, 어제 까지의 수익은 정확하고, 최근 수익은 스팸 가능성 또는 환율 변동 등으로 인해 추정
 * - COST_PER_CLICK: 사용자가 광고를 클릭할 때마다 게시자가 얻는 금액입니다. CPC는 예상 수익을 받은 클릭 수로 나누어 계산합니다.
 * - PAGE_VIEWS: 페이지 뷰 수.
 */
