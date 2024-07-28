import { HTMLAttributes } from 'react';

interface PropsType extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  className?: string;
}

export default function List({ className, children, ...props }: PropsType) {
  return (
    <ul className={`${className} `} {...props}>
      {children}
    </ul>
  );
}
