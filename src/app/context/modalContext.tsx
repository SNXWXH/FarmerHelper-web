'use client';

import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

const CropContext = createContext<{ cropName?: string }>({});

export function CropProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const cropContextValue = useMemo(() => {
    const cropName = searchParams.get('cropName') || '';
    return { cropName };
  }, [searchParams]);

  return (
    <CropContext.Provider value={cropContextValue}>
      {children}
    </CropContext.Provider>
  );
}

export function useCropContext() {
  return useContext(CropContext);
}
