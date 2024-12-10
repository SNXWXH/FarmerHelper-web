export default async function MonthRank() {
  const bestCrop: Response = await fetch(
    `${process.env.BASE_URL}/api/bestCrop`,
    { cache: 'no-store' }
  );
  const bestCropData = await bestCrop.json();

  const cropsToDisplay = [
    ...bestCropData,
    ...Array(10 - bestCropData.length).fill({
      cropName: '-',
      count: 1,
    }),
  ];

  const leftSideCrops = cropsToDisplay.slice(0, 5);
  const rightSideCrops = cropsToDisplay.slice(5, 10);

  return (
    <>
      <div className='flex mt-8'>
        <div className='w-1/2 flex flex-col'>
          {leftSideCrops.map((crop, idx) => (
            <div key={idx} className='flex m-2'>
              <span className='w-1/4 text-center font-extrabold text-xl'>
                {idx + 1}
              </span>
              <span className='flex justify-center items-center w-3/4 text-center text-xl'>
                {crop?.cropName}
              </span>
            </div>
          ))}
        </div>

        <div className='w-1/2 flex flex-col'>
          {rightSideCrops.map((crop, idx) => (
            <div key={idx + 5} className='flex m-2'>
              <span className='w-1/4 text-center font-extrabold text-xl'>
                {idx + 6}
              </span>
              <span className='flex justify-center items-center w-3/4 text-center text-xl'>
                {crop?.cropName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
