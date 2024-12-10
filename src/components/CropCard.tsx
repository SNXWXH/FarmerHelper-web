import cropImageMapping from '@/utils/cropImageMapping';
import Image from 'next/image';
import Link from 'next/link';

export default function CropCard({ cropName }: { cropName: string }) {
  const camelCaseCropName = cropImageMapping[cropName];

  return (
    <>
      <Link href={`/todayCrop?cropName=${cropName}`}>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex bg-[#F2FFE0] w-44 h-44 mt-8 justify-center items-center rounded-2xl shadow-xl'>
            <Image
              src={`/crop/${camelCaseCropName}.png`}
              alt={cropName}
              width={140}
              height={140}
            />
          </div>
          <p className='font-extrabold text-xl mt-4'>{cropName}</p>
        </div>
      </Link>
    </>
  );
}
