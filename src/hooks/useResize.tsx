'use client';
import { useMenuToggle } from '@src/store/menuStore';
// interface Props { }

import { useCallback, useEffect, useState } from 'react';

export default function useResize() {
  const setToggle = useMenuToggle((state) => state.setToggle);
  const isOpen = useMenuToggle((state) => state.isOpen);
  const [isMobile, setIsMobile] = useState(false);

  const resize = useCallback(() => {
    const width = window.innerWidth;
    setToggle(width > 936);
    setIsMobile(width <= 768);
  }, [setToggle]);

  useEffect(() => {
    resize(); // 초기 로딩 시
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return { isOpen, isMobile, setToggle };
}
