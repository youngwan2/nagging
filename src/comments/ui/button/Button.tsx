'use client';

import { MouseEventHandler } from 'react';

interface PropsType {
  ariaLabel?: string;
  className: string;
  children: React.ReactNode;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | ((state: any) => void);
}

export default function Button({ ariaLabel, className, title, type, children, disabled, onClick }: PropsType) {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      className={'dark:text-white  text-black ' + className}
      title={title}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
