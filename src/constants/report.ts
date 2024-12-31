export const metrics = [
  { text: '광고 클릭 수', value: 'CLICKS' },
  { text: '광고 클릭 당 수익', value: 'COST_PER_CLICK' },
  { text: '예상 수익', value: 'ESTIMATED_EARNINGS' },
  { text: '페이지 조회 수', value: 'PAGE_VIEWS' },
  { text: '광고 요청 수', value: 'AD_REQUESTS' },
  { text: '광고가 표시된 요청 수', value: 'MATCHED_AD_REQUESTS' },
  { text: '전체 광고 노출 수', value: 'TOTAL_IMPRESSIONS' },
  { text: '광고 노출 수', value: 'IMPRESSIONS' },
  { text: '개별 광고 노출 수', value: 'INDIVIDUAL_AD_IMPRESSIONS' },
  { text: '스팸으로 분류된 페이지 조회 비율', value: 'PAGE_VIEWS_SPAM_RATIO' },
  { text: '스팸으로 분류된 광고 요청 비율', value: 'AD_REQUESTS_SPAM_RATIO' },
  { text: '스팸으로 분류된 광고 노출 요청 비율', value: 'MATCHED_AD_REQUESTS_SPAM_RATIO' },
  { text: '스팸으로 분류된 광고 노출 비율', value: 'IMPRESSIONS_SPAM_RATIO' },
  { text: '스팸으로 분류된 개별 광고 노출 비율', value: 'INDIVIDUAL_AD_IMPRESSIONS_SPAM_RATIO' },
  { text: '스팸으로 분류된 클릭 비율', value: 'CLICKS_SPAM_RATIO' },
  { text: '광고 요청의 응답 비율', value: 'AD_REQUESTS_COVERAGE' },
  { text: '광고 클릭률 (페이지 조회 대비)', value: 'PAGE_VIEWS_CTR' },
  { text: '광고 클릭률 (광고 요청 대비)', value: 'AD_REQUESTS_CTR' },
  { text: '광고 클릭률 (광고 노출 요청 대비)', value: 'MATCHED_AD_REQUESTS_CTR' },
  { text: '광고 클릭률 (광고 노출 대비)', value: 'IMPRESSIONS_CTR' },
  { text: '광고 클릭률 (개별 광고 노출 대비)', value: 'INDIVIDUAL_AD_IMPRESSIONS_CTR' },
  { text: '측정 가능한 광고 노출 비율', value: 'ACTIVE_VIEW_MEASURABILITY' },
  { text: '광고 노출이 실제로 본 화면에 표시된 비율', value: 'ACTIVE_VIEW_VIEWABILITY' },
  { text: '광고가 화면에 표시된 평균 시간', value: 'ACTIVE_VIEW_TIME' },
  { text: '페이지 조회 1000회당 수익', value: 'PAGE_VIEWS_RPM' },
  { text: '광고 요청 1000회당 수익', value: 'AD_REQUESTS_RPM' },
  { text: '광고 노출 요청 1000회당 수익', value: 'MATCHED_AD_REQUESTS_RPM' },
  { text: '광고 노출 1000회당 수익', value: 'IMPRESSIONS_RPM' },
  { text: '개별 광고 노출 1000회당 수익', value: 'INDIVIDUAL_AD_IMPRESSIONS_RPM' },
  { text: '클릭 당 수익', value: 'COST_PER_CLICK' },
  { text: '광고 노출 당 광고 수', value: 'ADS_PER_IMPRESSION' },
  { text: '총 예상 수익', value: 'TOTAL_EARNINGS' },
  { text: '웹 검색 결과 페이지 수', value: 'WEBSEARCH_RESULT_PAGES' },
  { text: '펀넬 요청 수', value: 'FUNNEL_REQUESTS' },
  { text: '펀넬 노출 수', value: 'FUNNEL_IMPRESSIONS' },
  { text: '펀넬 클릭 수', value: 'FUNNEL_CLICKS' },
  { text: '펀넬 1000회당 수익', value: 'FUNNEL_RPM' },
] as const;

export const timeUnitOptions = [
  { text: '주 단위', value: 'WEEK' },
  { text: '월 단위', value: 'MONTH' },
  { text: '일 단위', value: 'DATE' },
];
