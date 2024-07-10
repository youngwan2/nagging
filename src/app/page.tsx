import Card from '@src/comments/Card';

export default function Home() {
  return (
    <div className="relative w-full grid sm:grid-cols-1  2xl:grid-cols-2 ">
      <Card koTitle="전체 수익" enTitle="Total Profits" text="$2,389.000" />
      <Card koTitle="월 수익" enTitle="Monthly Profits" text="$2,389.000" />
      <Card koTitle="목표 수익" enTitle="Target Profits" text="$2,389.000" />
      <Card koTitle="남은 수익" enTitle="Remaining Profits" text="$2,389.000" />
    </div>
  );
}
