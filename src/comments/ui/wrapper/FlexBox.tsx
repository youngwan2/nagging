import { ReactNode } from 'react';

interface PropsType {
  children: ReactNode;
  className?: string;
}

export default function FlexBox({ children, className }: PropsType) {
  return <div className={`${className} flex items-center`}>{children}</div>;
}
