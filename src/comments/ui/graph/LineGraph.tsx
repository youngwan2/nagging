'use client';

import Heading from '@src/comments/ui/heading/Heading';
import { FlattenedData } from '@src/types/anlaytics.types';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PropsType {
  data: FlattenedData[];
  message: React.ReactNode;
}

export default function LineGraph({ data, message }: PropsType) {
  if (message) return message;
  if (data.length === 0)
    return (
      <Heading level="2" className="text-[1em] text-center font-normal">
        검색 범위를 지정하고 [조회] 버튼을 클릭해주세요.
      </Heading>
    );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: data.length }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
