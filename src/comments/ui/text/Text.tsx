import { HTMLAttributes } from 'react';

interface PropsType extends HTMLAttributes<HTMLElement> {
  elementName: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  elementName,
  className,
  children,
  ...rest
}: PropsType) {
  const Element = elementName;
  return (
    <Element
      className={'dark:text-gray-200 text-gray-600 ' + className}
      {...rest}
    >
      {children}
    </Element>
  );
}
