// 보고서 옵션 추가
export async function createReportOption(formData: FormData) {
  const dimension = formData.get('dimension');
  const dateRange = {
    reportName:
      formData.get('report-name')?.toString() ||
      `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} 에 생성된 보고서`,
    dateRange: 'CUSTOM',
    dimensions: dimension ? [dimension] : ['MONTH'],
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
    const response = await fetch('/api/notification/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dateRange),
    });

    return response.body;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    throw new Error('보고서 생성 요청 실패');
  }
}

// 보고서 옵션 삭제
export async function deleteReportOptions(postId: number) {
  try {
    return (
      await fetch(`/api/notification/reports/${postId}`, {
        method: 'DELETE',
      })
    ).body;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    throw new Error('보고서 삭제 요청 실패');
  }
}
