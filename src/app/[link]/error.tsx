"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
    <div className="w-full container h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-y-3">
      <h2 className="text-5xl text-red-500 font-semibold">Oops!</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button
        variant="outline"
        className="mt-[30px]"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
