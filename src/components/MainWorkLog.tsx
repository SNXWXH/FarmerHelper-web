'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function MainWorkLog() {
  const { data: session } = useSession();
  const [todayCrop, setTodayCrop] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.uid) {
      const fetchTodayCrop = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMainWorkLog?userId=${session.user.uid}`
          );
          const data = await response.json();

          if (Array.isArray(data)) {
            const groupedData: Record<string, any> = {};

            data.forEach((item) => {
              if (!groupedData[item.workName]) groupedData[item.workName] = [];

              groupedData[item.workName].push(item);
            });

            const latestWork = Object.values(groupedData).map((items) =>
              items.pop()
            );

            setTodayCrop(latestWork);
          } else {
            setTodayCrop([]);
          }
        } catch (error) {
          console.error('Error fetching today crop data:', error);
          setTodayCrop([]);
        }
      };

      fetchTodayCrop();
    }
  }, [session?.user?.uid]);

  return (
    <>
      {session ? (
        <div className='flex flex-col justify-center items-center mt-8 text-xl font-bold'>
          {todayCrop.length > 0 ? (
            todayCrop.map((list, idx) => (
              <div key={idx}>
                <p>{list.workName}</p>
                <div className='w-full bg-[#F2FAE7] rounded-2xl p-7 my-6'>
                  <div className='flex flex-col'>
                    {list.workContent.split('q!gL9A').map((todo, idx) => (
                      <p className='my-1 ' key={idx}>
                        • {todo}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center mt-8 h-40 text-xl font-bold'>
              오늘의 작업일지가 없습니다! 오늘의 작업일지를 작성해주세요
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center mt-8 h-40 text-xl font-bold'>
          로그인 후 오늘의 작업일지를 확인해보세요!
        </div>
      )}
    </>
  );
}
