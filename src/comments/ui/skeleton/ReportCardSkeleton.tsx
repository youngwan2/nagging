// interface PropsType { }

export default function ReportCardSkeleton() {
  return (
    <div className="max-w-[702px] w-full h-[100px] bg-gray-100 rounded-lg p-3 font-sans animate-pulse mt-3">
      <div className="flex justify-between">
        <div className="w-10/12 h-5 bg-gray-300 mb-4 rounded"></div>
        <div className="w-[25px] h-5 bg-gray-300  rounded"></div>
      </div>
      <hr />
      <div className="flex mt-4 mb-4">
        <div className="w-[25px] h-5 bg-gray-300  rounded"></div>
        <div className="w-1/12 h-5 bg-gray-300 ml-4 rounded"></div>
      </div>
    </div>
  );
}
