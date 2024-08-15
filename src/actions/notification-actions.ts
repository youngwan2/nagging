'use server';

import { revalidatePath } from 'next/cache';
import { connect } from '../../prisma/client';
// import prisma from '../../prisma/client';

//  additional form arguments example: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments
export async function createReportOption(userId: string, formData: FormData) {
  if (!userId) return null;
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
    // 특정경로 재유효화 reference: https://nextjs.org/docs/app/api-reference/functions/revalidatePath#revalidating-a-specific-url
    revalidatePath('/dashboard/notification-setting');
  } catch (error) {
    console.error('보고서 옵션 저장 실패:', error);
  } finally {
    await close();
  }
}
