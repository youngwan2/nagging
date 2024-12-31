import { create } from 'zustand';
import { PageState } from './types/store.type';

export const usePageState = create<PageState>((set) => ({
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
}));
