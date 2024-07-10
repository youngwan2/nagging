'use client';
import { useMenuToggle } from '@src/store/menuStore';
// interface Props { }

import { useEffect } from 'react';

export default function useResize() {
  const setToggle = useMenuToggle((state) => state.setToggle);
  const isOpen = useMenuToggle((state) => state.isOpen);

  function resize() {
    if (window.innerWidth <= 936) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isOpen]);

  return { isOpen };
}
