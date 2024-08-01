interface PropsType extends React.HTMLAttributes<HTMLElement> {
  elementName: React.JSX.ElementType;
  children: React.ReactNode;
}

export default function Card({ elementName, children, ...props }: PropsType) {
  const Container = elementName;
  return <Container {...props}>{children}</Container>;
}
