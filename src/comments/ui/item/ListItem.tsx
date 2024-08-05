interface PropsType {
  children: React.ReactNode;
  className?: string;
}

export default function ListItem({ className, children }: PropsType) {
  return <li className={className + ' '}>{children}</li>;
}
