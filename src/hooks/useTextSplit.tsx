'use client';

import { useEffect, useRef } from 'react';

export default function useTextSplit(ref: React.RefObject<HTMLSpanElement>) {
  const textRefs = useRef<React.JSX.Element[]>([]);

  useEffect(() => {
    const text = ref.current?.textContent;

    if (text) {
      const words = text.split(' ');
      const newText = words.map((word, index) => {
        return <span key={index}>{word} </span>;
      });
      textRefs.current = newText;
    }
  }, [ref]);

  return textRefs;
}
