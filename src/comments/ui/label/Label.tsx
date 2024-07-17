import { ReactNode } from 'react';

interface PropsType {
  children: ReactNode;
  className?: string;
}

export default function Label({ className, children, ...props }: PropsType) {
  return (
    <label className={' ' + className} {...props}>
      {children}
    </label>
  );
}
