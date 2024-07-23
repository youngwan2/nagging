'use client'; // Error components must be Client Components

import Container from '@src/comments/ui/container/Container';
import Heading from '@src/comments/ui/heading/Heading';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container elName={'div'} className="text-center">
      <Heading level="2" className="font-medium text-center text-[1.35em]">
        앗! 무언가가 잘못된 것 같아요. 다시시도 해보세요! <br />
        <p className="text-[0.95em]"> Something went wrong!</p>
      </Heading>
      <button
        className="dark:bg-white drak:text-black p-2 border rounded-md mt-3 hover:bg-slate-100"
        onClick={() => reset()}
      >
        Try again
      </button>
    </Container>
  );
}
