interface PropsType {
  koTitle: string;
  enTitle: string;
  text?: string;
  children?: React.ReactNode;
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
}: PropsType) {
  const bindingDate = date
    ? '지급: ' + date.year + '.' + date.month + '.' + date.day
    : null;
  return (
    <div className="hover:bg-[#272729] hover:text-white min-w-[300px] h-[158px] p-[15px] border bg-slate-50 dark:bg-[#18181B] dark:border-[#3D3D43] dark:text-white rounded-xl m-3 relative">
      <h3>
        <span className="text-[1.05em] font-bold">{koTitle}</span>
        <span className="text-[0.95em] pl-4 text-gray-500">{enTitle}</span>{' '}
        <span className="absolute right-3 bottom-3 text-[0.95em] pl-4 text-gray-500">
          {bindingDate}
        </span>
      </h3>
      {text ? <p className="pt-12 text-[2.25rem]">{text}</p> : null}
      {children}
    </div>
  );
}
