import { Suspense } from 'react';
import { CropProvider } from '../context/modalContext';

export default function TodayCropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CropProvider>{children}</CropProvider>
    </Suspense>
  );
}
