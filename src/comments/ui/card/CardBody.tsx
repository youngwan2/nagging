import { ReactNode } from 'react';

interface PropsType {
  children: ReactNode;
  className?: string;
}

export default function CardBody({ className, children }: PropsType) {
  return <div className={className}>{children}</div>;
}
