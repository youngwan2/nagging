interface PropsType extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className: string;
  children: React.ReactNode;
}

export default function Select({ className, children, ...props }: PropsType) {
  return (
    <select
      {...props}
      className={
        className + ' dark:text-white dark:bg-black border flex flex-col w-full'
      }
    >
      {children}
    </select>
  );
}
