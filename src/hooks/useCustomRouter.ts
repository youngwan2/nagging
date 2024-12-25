import { useRouter } from 'next/navigation';

export default function useCustomRouter() {
  const router = useRouter();

  return {
    currentPageRefresh: () => router.refresh(),
    push: (url: string) => {
      router.push(url);
    },
    replace: (url: string) => {
      router.replace(url);
    },
  };
}
