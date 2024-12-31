// 헤더 메뉴 토클
export interface MenuToggleState {
  isOpen: boolean;
  setToggle: (newState: boolean) => void;
}

// 애드센스 계정 id 상태
export interface AdsenseAuthState {
  hasUserAdsenseId: boolean;
  setHasUserAdsenseId: (newState: boolean) => void;
}

export interface PageState {
  page: number;
  setPage: (newPage: number) => void;
}
