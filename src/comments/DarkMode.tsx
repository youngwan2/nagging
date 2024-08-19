'use client';
import { useEffect, useState } from 'react';
import { IoMdMoon } from 'react-icons/io';
import { IoSunnySharp } from 'react-icons/io5';

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);
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
    <button aria-label="밝은 테마 및 어두운 테마 바꾸기 버튼" onClick={toggleDarkMode} className="dark:text-white">
      <div
        className={`border border-[#d4d2d2] w-[80px] h-[30px] rounded-full  relative transition-colors dark:bg-black dark:border-slate-700`}
      >
        <div className="">
          <div
            className={`${!isDark ? 'left-[50px] bg-[#26242f]' : 'left-0 bg-[white]'} relative  w-[28px] h-[28px] rounded-full flex items-center justify-center `}
          >
            {isDark ? (
              <IoMdMoon title="밝은 테마로 변경" className="text-[1.4em] fill-[gold]" />
            ) : (
              <IoSunnySharp title="어두운 테마로 변경" className="text-[1.4em] fill-[gold]" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
