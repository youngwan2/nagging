import { auth } from '../../../../../../lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../../../lib/prisma/client';
import { revalidatePath } from 'next/cache';

export async function DELETE(req: NextRequest, res: { params: { reportId: number } }) {
  const { prisma, close } = await connect();
  const reportId = Number(res.params.reportId);
  try {
    const userId = (await auth())?.userId;

    if (!userId) return NextResponse.json({ message: '접근 권한 없음' });

    await prisma.notificationReports.delete({
      where: {
        reportId,
      },
    });

    revalidatePath('/dashboard/notification-setting');

    return NextResponse.json({ message: '보고서 삭제 성공' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  } finally {
    await close();
  }
}
