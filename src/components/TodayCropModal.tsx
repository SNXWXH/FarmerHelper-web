'use client';

import { useState, useEffect } from 'react';
import cropImageMapping from '@/utils/cropImageMapping';
import Image from 'next/image';
import CloseBtn from './CloseBtn';

export default function TodayCropModal({
  cropName,
}: {
  cropName: string | null;
}) {
  const [cropDetails, setCropDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cropName) {
        const encodedCropName = encodeURIComponent(cropName);

        const todayCropData = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDescription?cropName=${encodedCropName}`
          )
        ).json();

        const cropDetails = JSON.parse(todayCropData[0].description);
        setCropDetails(cropDetails);
      }
    };

    fetchData();
  }, [cropName]);

  if (!cropDetails) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='w-16 h-16 border-4 border-t-4 border-[#698A54] border-solid rounded-full animate-spin'></div>
      </div>
    );
  }

  const plantingTime = cropDetails['Planting season'];
  const harvestTime = cropDetails['Harvest season'];
  const description = cropDetails['Description'];
  const camelCaseCropName = cropImageMapping[cropName];

  return (
    <div className='flex flex-col bg-[#F2FFE0] w-3/5 h-80 p-6 rounded-2xl'>
      <CloseBtn />
      <div className='flex justify-center items-center w-full h-full gap-20'>
        <div className='flex justify-center items-center w-60 h-60 bg-white rounded-lg'>
          <Image
            src={`/crop/${camelCaseCropName}.png`}
            alt={cropName}
            width={200}
            height={0}
          />
        </div>
        <div className='w-3/5 h-60'>
          <p className='font-nanumHeavy font-heavy text-3xl'>{cropName}</p>
          <p className='font-nanumHeavy font-heavy mt-4'>
            심는 시기: {plantingTime}
          </p>
          <p className='font-nanumHeavy font-heavy'>수확 시기: {harvestTime}</p>
          <p className='font-extrabold mt-6 whitespace-break-spaces'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
