import { HTMLAttributes } from 'react';

interface PropsType extends HTMLAttributes<HTMLFormElement> {
  elName?: React.ElementType;
  children: React.ReactNode;
}

export default function Form({ children, ...props }: PropsType) {
  return <form {...props}>{children}</form>;
}
