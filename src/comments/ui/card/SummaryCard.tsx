import Heading from '../heading/Heading';

interface PropsType {
  koTitle?: string;
  enTitle?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  date?: {
    year?: number;
    month?: number;
    day?: number;
  };
}

export default function SummaryCard({
  koTitle,
  enTitle,
  text,
  children,
  date,
  className,
}: PropsType) {
  const bindingDate = date
    ? '지급: ' + date.year + '.' + date.month + '.' + date.day
    : null;
  return (
    <div
      className={`animate-appearance-in hover:bg-[#3b3b3c] hover:text-white min-w-[300px] w-full h-[178px] p-[15px] border bg-slate-50 dark:bg-[#18181B] dark:border-[#3D3D43] dark:text-white rounded-xl m-3 relative ${className}`}
    >
      <Heading
        level="3"
        className="text-[1rem] dark:text-white hover:text-white"
      >
        <span className="text-[1.05em] font-bold dark:text-white">
          {koTitle}
        </span>
        <span className="text-[0.95em] pl-4 dark:text-gray-500 ">
          {enTitle}
        </span>{' '}
        <span className="absolute right-3 bottom-3 text-[0.95em] pl-4 text-gray-500 dark:text-white">
          {bindingDate}
        </span>
      </Heading>
      {text ? <p className="pt-12 text-[2.25rem]">{text}</p> : null}
      {children}
    </div>
  );
}
