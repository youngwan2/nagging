'use client';

import { MouseEventHandler } from 'react';

interface PropsType {
  className: string;
  children: React.ReactNode;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | ((state: any) => void);
}

export default function Button({
  className,
  title,
  type,
  children,
  disabled,
  onClick,
}: PropsType) {
  return (
    <button
      disabled={disabled}
      className={className + ' dark:text-white  text-black '}
      title={title}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
