'use client';
import { useMenuToggle } from '@src/store/menuStore';
// interface Props { }

import { useCallback, useEffect } from 'react';

export default function useResize() {
  const setToggle = useMenuToggle((state) => state.setToggle);
  const isOpen = useMenuToggle((state) => state.isOpen);

  const resize = useCallback(() => {
    if (window.innerWidth <= 936) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [setToggle]);
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isOpen, resize]);

  return { isOpen };
}
