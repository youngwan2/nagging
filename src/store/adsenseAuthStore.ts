import { create } from 'zustand';
import { AdsenseAuthState } from './types/store.type';

export const useAdsenseAuthState = create<AdsenseAuthState>((set) => ({
  hasUserAdsenseId: false,
  setHasUserAdsenseId: (newState) => set({ hasUserAdsenseId: newState }),
}));
