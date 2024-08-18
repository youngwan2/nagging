// 헤더 메뉴 토클
export interface MenuToggleState {
  isOpen: boolean;
  setToggle: (newState: boolean) => void;
}

// 트리거
export interface TriggerState {
  isRefetch: boolean;
  setIsRefetch: (isRefetch: boolean) => void;
}
