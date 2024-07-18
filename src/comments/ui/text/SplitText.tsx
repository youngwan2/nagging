'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useTextSplit from '@src/hooks/useTextSplit';
import { useRef } from 'react';

interface PropsType {
  children: React.ReactNode;
  text: string;
}

export default function SplitText({ children, text }: PropsType) {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const splitText = useTextSplit(text);

  useGSAP(() => {
    const span = gsap.utils.toArray('.split-text') as HTMLSpanElement[];
    console.log(span);
    gsap.to(span, {
      duration: 1,
      y: -50,
      opacity: 1,
      ease: 'power2.inOut',
      stagger: {
        amount: 0.1,
      },
    });
  }, []);

  return (
    <div>
      {children}
      <p ref={targetRef}>
        {splitText.map((text, i) => {
          return (
            <span className="split-text opacity-0" key={i}>
              {text + ' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}
