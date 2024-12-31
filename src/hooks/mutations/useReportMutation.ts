'use client';
import { createReportOption, deleteReportOptions } from '@src/services/report.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '../queries/queryKeys';

export function useCreateReportMutation(page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formDate: FormData) => createReportOption(formDate),
    onSuccess: () => {
      toast.success('추가 성공');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT.PER_PAGE(page) });
    },
    onError: () => {
      toast.error('추가 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}

export function useDeleteReportMutation(page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: number) => deleteReportOptions(reportId),
    onMutate: () => {
      toast('삭제중');
    },
    onSuccess: () => {
      toast.success('삭제 성공');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT.PER_PAGE(page) });
    },
    onError: () => {
      toast.error('삭제 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}
