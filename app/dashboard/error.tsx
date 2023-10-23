"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
      <Link href="/">Back Home</Link>
    </div>
  );
}
