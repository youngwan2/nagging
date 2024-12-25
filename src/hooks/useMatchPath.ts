'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useMatchPath(targetPathName: string) {
  const [isMatch, setIsMatch] = useState(false);
  const pathname = usePathname();

  console.log(pathname, targetPathName, isMatch);

  useEffect(() => {
    if (pathname === targetPathName) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [pathname, targetPathName]);

  return { isMatch };
}
