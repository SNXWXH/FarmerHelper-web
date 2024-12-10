import { useRouter } from 'next/navigation';

export default function CloseBtn() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          router.back();
        }}
        className='flex justify-end items-end font-nanumHeavy font-heavy'
      >
        X
      </button>
    </>
  );
}
