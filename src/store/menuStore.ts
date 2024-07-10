import { create } from 'zustand';
import { MenuToggleState } from './types/store.type';

export const useMenuToggle = create<MenuToggleState>((set) => ({
  isOpen: false,
  setToggle: (newState) => set({ isOpen: newState }),
}));
