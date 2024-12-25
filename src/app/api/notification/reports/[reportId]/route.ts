import { auth } from '../../../../../../lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../prisma/client';

export async function DELETE(_: NextRequest, res: { params: { reportId: number } }) {
  const reportId = Number(res.params.reportId);
  try {
    const userId = (await auth())?.userId;

    if (!userId) return NextResponse.json({ message: '접근 권한이 없습니다.', status: 401 });

    await prisma.notificationReports.delete({
      where: {
        reportId,
      },
    });

    return NextResponse.json({ message: '성공적으로 삭제처리 되었습니다.', status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}
