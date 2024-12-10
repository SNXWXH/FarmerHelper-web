import CropCard from '@/components/CropCard';
import MainWeather from '@/components/MainWeather';
import MainWorkLog from '@/components/MainWorkLog';
import MonthRank from '@/components/MonthRank';
import Skeleton from '@/components/Skeleton';
import Link from 'next/link';
import { Suspense } from 'react';

// const Skeleton = ({ className }: { className?: string }) => (
//   <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
// );

// async function fetchTodayCropData() {
//   const response = await fetch(`${process.env.BASE_URL}/api/todayCrop`, {
//     // cache: 'no-store',
//   });

//   return response.json();
// }

async function fetchTodayCropData() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/todayCrop`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch todayCropData:', error);
    // 기본 데이터 반환
    return [];
  }
}

async function TodayCropSection() {
  const todayCropData = await fetchTodayCropData();
  return (
    <div className='overflow-x-auto flex gap-6'>
      {todayCropData.map((data: any, idx: number) => (
        <CropCard cropName={data.cropName} key={idx} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center h-screen pt-14'>
        <div className='w-3/5'>
          <div className='mt-14'>
            <p className='font-nanumHeavy font-heavy text-2xl'>오늘의 날씨</p>
            <Suspense
              fallback={
                <Skeleton className='mt-8 h-40 w-full bg-[#F2FFE0] rounded-2xl flex justify-center items-center' />
              }
            >
              <MainWeather />
            </Suspense>
          </div>
          <div className='mt-14'>
            <p className='font-nanumHeavy font-heavy text-2xl'>
              오늘의 추천 작물
            </p>
            <Suspense
              fallback={
                <div className='mt-8 flex gap-4 overflow-x-auto '>
                  {[...Array(5)].map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className='h-44 w-44 rounded-lg flex-shrink-0 '
                    />
                  ))}
                </div>
              }
            >
              <TodayCropSection />
            </Suspense>
          </div>

          <div className='mt-14'>
            <p className='font-nanumHeavy font-heavy text-2xl'>
              이번 달 인기 작물
            </p>
            <Suspense
              fallback={
                <div className='mt-8'>
                  {[...Array(5)].map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className='h-8 w-full mb-4 animate-skeleton'
                    />
                  ))}
                </div>
              }
            >
              <MonthRank />
            </Suspense>
          </div>

          <div className='my-14'>
            <p className='font-nanumHeavy font-heavy text-2xl'>
              오늘의 작업일지
            </p>
            <Suspense
              fallback={
                <div className='mt-8'>
                  {[...Array(3)].map((_, idx) => (
                    <Skeleton key={idx} className='h-12 w-full mb-4' />
                  ))}
                </div>
              }
            >
              <MainWorkLog />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
