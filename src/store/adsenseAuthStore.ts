import { create } from 'zustand';
import { TriggerState } from './types/store.type';

export const useAdsenseAuthStore = create<TriggerState>((set) => ({
  isRefetch: false,
  setIsRefetch: (isRefetch: boolean) => set({ isRefetch }),
}));
