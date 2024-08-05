import { HTMLAttributes } from 'react';

interface PropsType extends HTMLAttributes<HTMLElement> {
  elName: React.ElementType;
  children: React.ReactNode;
}

export default function Container({ elName, children, ...props }: PropsType) {
  const Container = elName;
  return <Container {...props}>{children}</Container>;
}
