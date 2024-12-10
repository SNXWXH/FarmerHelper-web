import { ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex fixed justify-center items-center w-full h-full bg-black bg-opacity-35'>
        {children}
      </div>
    </>
  );
}
