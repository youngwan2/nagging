import { HTMLInputTypeAttribute } from 'react';

interface PropsType {
  className?: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
}

export default function Input({
  className,
  type,
  placeholder,
  name,
}: PropsType) {
  return (
    <input
      className={className + ' dark:border-[rgba(255,255,255,0.1)]'}
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
}
