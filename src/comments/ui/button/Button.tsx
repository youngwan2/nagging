import { MouseEventHandler } from 'react';

interface PropsType {
  className: string;
  children: React.ReactNode;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  className,
  title,
  type,
  children,
  onClick,
}: PropsType) {
  return (
    <button className={className} title={title} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
