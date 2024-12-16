'use client';
import { useState } from 'react';

const session = Math.floor(Math.random() * 3);

export default function Page() {
  const [, setState] = useState();

  if (session === 1) {
    throw new Error(`Test session error for global-error ${session}`);
  }
  return (
    <button
      onClick={() => {
        if (session === 2) {
          setState(() => {
            throw new Error(`Test error for global-error button ${session}`);
          });
        }
      }}
    >
      Error
    </button>
  );
}
