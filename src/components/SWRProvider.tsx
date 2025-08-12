'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import { swrConfig } from '@/lib/swr/config';

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
}
