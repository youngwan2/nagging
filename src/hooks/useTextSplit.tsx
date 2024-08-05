'use client';

import { useEffect, useState } from 'react';

export default function useTextSplit(text: string) {
  const [splitText, setSplitText] = useState<string[]>([]);

  useEffect(() => {
    if (text) {
      const words = text.split(' ');
      const newText = words.map((word) => {
        return word;
      });
      setSplitText(newText);
    }
  }, [text]);

  return splitText;
}
