export default function GraphSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200 rounded-lg p-4 flex animate-pulse m-5">
      <div className="w-3/4 flex flex-col justify-between">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
