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
    const tl = gsap.timeline();
    gsap.set(span, {
      duration: 3,
      ease: 'power2.inOut',
    });
    tl.fromTo(
      span,
      {
        opacity: 0,
        stagger: {
          amount: 0.5,
        },
      },
      {
        opacity: 1,
        stagger: {
          amount: 0.5,
        },
      },
    );
  }, [splitText]);

  return (
    <div className="dark:text-white mt-3">
      {children}
      <p ref={targetRef}>
        {splitText.map((text, i) => {
          return (
            <span className="split-text opacity-1" key={i}>
              {text + ' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}
