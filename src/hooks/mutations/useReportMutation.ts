'use client';
import { createReportOption, deleteReportOptions } from '@src/services/report.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formDate: FormData) => createReportOption(formDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
}

export function useDeleteReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: number) => deleteReportOptions(reportId),
    onMutate: () => {
      toast('삭제중');
    },
    onSuccess: () => {
      toast('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
}
