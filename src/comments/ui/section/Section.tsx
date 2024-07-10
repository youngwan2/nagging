// interface Props { }

interface PropsType {
  className?: string;
  children: React.ReactNode;
}
export default function Section({ className, children }: PropsType) {
  const initialStyle = ` relative w-full `;
  return <section className={className + initialStyle}>{children}</section>;
}
