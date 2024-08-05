import { ReactNode } from 'react';

interface PropsType {
  children: ReactNode;
  className?: string;
}

export default function CardFooter({ className, children }: PropsType) {
  return <div className={className}>{children}</div>;
}
