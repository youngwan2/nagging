import { HTMLInputTypeAttribute } from 'react';

interface PropsType {
  className?: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

export default function Input({ className, type, placeholder }: PropsType) {
  return <input className={className} type={type} placeholder={placeholder} />;
}
