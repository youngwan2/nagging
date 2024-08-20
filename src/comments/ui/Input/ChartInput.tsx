interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
  placeholder: string;
  defaultValue: string;
  type: string;
}

export default function ChartInput({ className, placeholder, defaultValue, type, ...props }: PropsType) {
  return (
    <input
      className={'max-w-[200px] p-3 rounded-md dark:border-none border border-gray-400 ' + className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      type={type}
      {...props}
    />
  );
}
