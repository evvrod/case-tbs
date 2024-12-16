'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import {
  CustomError,
  clientLogger,
  LevelLogs,
} from '@/5 features/Logger/index';

interface IGlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: IGlobalErrorProps) {
  useEffect(() => {
    clientLogger({
      type: LevelLogs.error,
      log: new CustomError({
        message: error.message,
        status: 400,
        code: 'GLOBAL_ERROR',
        stack: error.stack,
        details: error.digest,
      }),
    });
  }, [error]);
  return (
    <html>
      <body>
        <div>
          <h2>Something went wrong! {error.message}</h2>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
