'use server';

import { revalidatePath } from 'next/cache';
import { connect } from '../../prisma/client';

type InitialState = {
  message: string;
  success: boolean;
  loading: boolean;
};

//  additional form arguments example: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments
export async function createReportOption(initialState: InitialState, formData: FormData) {
  const userId = formData.get('user-id')?.toString();

  if (!userId) return { ...initialState, message: '로그인 후 시도해주세요', loading: true };

  const { prisma, close } = await connect();

  const dateRange = {
    reportName:
      formData.get('report-name')?.toString() ||
      `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} 에 생성된 보고서`,
    dateRange: 'CUSTOM',
    dimensions: [formData.get('dimension')?.toString()] || ['MONTH'],
    startDate: {
      day: Number(formData.get('start-day')) || 1,
      month: Number(formData.get('start-month')) || 1,
      year: Number(formData.get('start-year')) || new Date().getFullYear(),
    },
    endDate: {
      day: Number(formData.get('end-day')) || 31,
      month: Number(formData.get('end-month')) || 12,
      year: Number(formData.get('end-year')) || new Date().getFullYear(),
    },
    metrics: formData.getAll('metrics'),
    reportingTimeZone: 'ACCOUNT_TIME_ZONE',
    currencyCode: formData.get('code')?.toString(),
  };

  try {
    const stringDateRange = JSON.stringify(dateRange);

    await prisma.notificationReports.create({
      data: {
        userId,
        report: stringDateRange,
      },
    });
    revalidatePath('/dashboard/notification-settings');
    return { ...initialState, message: '성공적으로 추가되었습니다.', success: true, loading: true };
  } catch (error) {
    console.error('보고서 옵션 저장 실패:', error);
    return { ...initialState, message: '저장에 실패하였습니다.', loading: true };
  } finally {
    await close();
    return { ...initialState, message: '작업 완료' };
  }
}
