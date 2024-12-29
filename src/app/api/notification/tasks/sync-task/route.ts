import { NextResponse } from 'next/server';
import { syncTask } from '@src/task';

/** GET | 기존 스케줄 동기화 */
export async function GET() {
  try {
    const isSync = await syncTask(); // 동기화 처리
    if (isSync) return NextResponse.json({ message: '동기화 성공' });
    else return NextResponse.json({ message: '동기화 실패' });
  } catch {
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}
