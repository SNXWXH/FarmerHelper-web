import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import AuthContext from '@/components/AuthContext';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '농부의 하루',
  description: 'AI를 활용한 농사',
  icons: {
    icon: '/faviconLogo.png',
  },
};

export default function RootLayout({
  children,
}: // modal,
Readonly<{
  children: ReactNode;
  // modal: ReactNode;
}>) {
  return (
    <html lang='en'>
      <AuthContext>
        <body className='font-["NanumSquareNeo"] flex flex-col min-h-screen bg-[#F9FDF4] text-black'>
          <Header />
          {children}
          {/* {isModal && <TodayCrop cropName={cropName} closeModal={closeModal} />} */}
          <Link
            href='/workLog/create'
            className='fixed bottom-6 right-6 w-14 h-14 bg-[#698A54] text-white flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition'
          >
            +
          </Link>
        </body>
      </AuthContext>
    </html>
  );
}
