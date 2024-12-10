export default function CropList({
  cropName,
  date,
}: {
  cropName: string;
  date: string;
}) {
  return (
    <>
      <div className='flex justify-between items-center h-16 rounded-3xl font-bold text-xl bg-[#F4FEE6]'>
        <p className='w-3/4 ml-6 font-nanumHeavy font-heavy'>{cropName}</p>
        <div className='flex '>
          <p className='text-[#585858] w-44'>{date}</p>
          <p className='w-1/3 mx-6 items-end'>{'>'}</p>
        </div>
      </div>
    </>
  );
}
