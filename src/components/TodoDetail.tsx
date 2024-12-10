export default function TodoDetail({
  detail,
  onRemove,
}: {
  detail: string;
  onRemove: () => void;
}) {
  return (
    <div className='flex justify-center items-center gap-3'>
      <div>
        <button
          className='w-8 h-8 border-[#A7B893] border-2 rounded-md font-nanumHeavy font-heavy'
          onClick={onRemove}
        >
          -
        </button>
      </div>
      <div className='flex items-center justify-start bg-[#F2FAE7] w-11/12  text-bold text-lg p-5 rounded-lg'>
        {detail}
      </div>
    </div>
  );
}
