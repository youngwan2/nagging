'use client';
import { useEffect, useRef, useState } from 'react';
import { IoMdMoon } from 'react-icons/io';
import { IoSunnySharp } from 'react-icons/io5';
import Button from './ui/button/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      x: isDark ? 0 : 50,
      rotate: isDark ? 0 : 360,
    });
  }, [isDark]);

  useEffect(() => {
    if (
      localStorage.theme !== 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  function toggleDarkMode() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage.setItem('theme', 'light');
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <Button aria-label="밝은 테마 및 어두운 테마 바꾸기 버튼" onClick={toggleDarkMode} className="dark:text-white">
      <div
        className={`border border-[#d4d2d2] w-[80px] h-[30px] rounded-full  relative transition-colors dark:bg-black dark:border-slate-700`}
      >
        <div
          ref={iconRef}
          className={`${!isDark ? 'bg-white border shadow-[inset_-2px_2px_5px_rgba(0,0,0,0.1)]' : 'bg-[white]'} 
                relative  w-[28px] h-[28px] rounded-full flex items-center justify-center`}
        >
          {isDark ? (
            <IoMdMoon title="밝은 테마로 변경" className="text-[1.4em] fill-[gold]" />
          ) : (
            <IoSunnySharp title="어두운 테마로 변경" className="text-[1.4em] fill-[gold]" />
          )}
        </div>
      </div>
    </Button>
  );
}
