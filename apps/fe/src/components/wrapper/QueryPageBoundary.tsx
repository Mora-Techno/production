'use client';

import type { ReactNode } from 'react';

type QueryPageBoundaryProps = {
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  skeleton: ReactNode;
  children: ReactNode;
};

export function QueryPageBoundary({
  isLoading,
  isError = false,
  errorMessage = 'Gagal memuat data. Silakan muat ulang halaman.',
  skeleton,
  children,
}: QueryPageBoundaryProps) {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/10 px-5 py-8 text-sm font-medium text-destructive">
        {errorMessage}
      </div>
    );
  }

  return <>{children}</>;
}
