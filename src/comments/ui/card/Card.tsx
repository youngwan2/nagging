interface PropsType {
  koTitle: string;
  enTitle: string;
  text?: string;
  children?: React.ReactNode;
}

export default function Card({ koTitle, enTitle, text, children }: PropsType) {
  return (
    <div className="hover:bg-[#272729] hover:text-white min-w-[300px] h-[158px] p-[15px] border bg-slate-50 dark:bg-[#18181B] dark:border-[#3D3D43] dark:text-white rounded-xl m-3">
      <h3>
        <span className="text-[1.05em] font-bold">{koTitle}</span>
        <span className="text-[0.95em] pl-4 text-gray-500">{enTitle}</span>{' '}
      </h3>
      {text ? <p className="pt-12 text-[2.25rem]">{text}</p> : null}
      {children}
    </div>
  );
}
