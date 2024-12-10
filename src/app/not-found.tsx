import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center  min-h-screen'>
      <p className='font-nanumHeavy font-heavy text-3xl mb-8'>
        요청하신 페이지를 찾을 수 없습니다
      </p>
      <div className='flex bg-[#698A54] w-32 h-12 justify-center items-center rounded-lg'>
        <Link href='/' className='hover:cursor-pointer text-white'>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
