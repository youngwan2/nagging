import { NextResponse } from 'next/server';
import { syncTask } from '@src/task';
import cron from 'node-cron';

/** GET | 기존 스케줄 동기화 */
export async function GET() {
  try {
    const isSync = await syncTask();
    if (isSync) return NextResponse.json({ message: '동기화 성공' });
    else return NextResponse.json({ error: '동기화 실패' });
  } catch (error) {
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

export async function POST() {
  try {
    console.log(cron.getTasks());
    return NextResponse.json({ message: '동기화 성공' });
  } catch (error) {
    return NextResponse.json({ error: '��트워크 에러' }, { status: 500 });
  }
}
