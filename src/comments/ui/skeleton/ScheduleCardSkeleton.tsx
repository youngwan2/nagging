export default function ScheduleCardSkeleton() {
  return (
    <div className="max-w-[702px] w-full h-[260px] bg-gray-100 rounded-lg p-3 font-sans animate-pulse">
      <div className="w-10/12 h-5 bg-gray-300 mb-4 rounded"></div>
      <div className="w-10/12 h-5 bg-gray-300 mb-4 rounded"></div>
      <div className="w-10/12 h-5 bg-gray-300 mb-4 rounded"></div>
      <div className="w-10/12 h-5 bg-gray-300 mb-4 rounded"></div>
      <div className="w-10/12 h-5 bg-gray-300 mb-4 rounded"></div>
      <div className=" mt-6 w-1/2 h-10 bg-gray-300 mb-2 rounded"></div>
    </div>
  );
}
