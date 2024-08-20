interface PropsType extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className: string;
  children: React.ReactNode;
}

export default function Select({ className, children, ...props }: PropsType) {
  return (
    <select
      {...props}
      className={
        className + ' dark:text-white dark:bg-black dark:border-[rgba(255,255,255,0.1)] border flex flex-col w-full'
      }
    >
      {children}
    </select>
  );
}
