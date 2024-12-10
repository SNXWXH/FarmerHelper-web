'use client';

import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { uploadImage } from '@/utils/uploadImage';
import { useRouter } from 'next/navigation';

const CreateLog = () => {
  const [fileName, setFileName] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [date, setDate] = useState('');
  const [crop, setCrop] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileInput(file);
    } else {
      setFileName('');
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
  };

  const handleCropChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedCrop = event.target.value;
    setCrop(selectedCrop);
  };

  const handleSubmit = async () => {
    if (!session?.user.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);

    try {
      let downloadURL = 'null';

      if (crop.trim() === '' || date.trim() === '') {
        alert('작물 , 날짜는 반드시 입력되어야합니다');
        return;
      }

      if (fileInput)
        downloadURL = await uploadImage(fileInput, session.user.uid);

      const cropName = crop;
      const cropDate = date;

      const response = await fetch('/api/createWorkList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user.uid,
          cropName,
          cropDate,
          imageUrl: downloadURL,
        }),
      });

      if (response.ok) {
        router.push('/workLog');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading image or sending data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className='flex flex-col items-center'>
            <div className='border-t-4 border-[#698A54] border-solid w-16 h-16 rounded-full animate-spin'></div>
            <p className='mt-4 text-xl'>작물 생성 중...</p>
          </div>
        </div>
      ) : session ? (
        <div className='flex h-screen justify-center'>
          <div className='flex flex-col justify-center items-center w-3/5'>
            <p className='font-nanumHeavy font-heavy text-2xl'>작업일지 생성</p>
            <p className='text-xl mt-6'>심을 작물과 날짜를 입력해주세요!</p>
            <div className='w-1/2 justify-center'>
              <div className='flex mt-6 items-center'>
                <p className='w-1/4 font-extrabold'>작물</p>
                <input
                  type='text'
                  placeholder='작물을 입력해주세요.'
                  className='ml-auto w-2/3 h-12 rounded-lg bg-gray-100 pl-3 text-sm'
                  value={crop}
                  onChange={handleCropChange}
                />
              </div>
              <div className='flex mt-4 items-center'>
                <p className='w-1/4 font-extrabold'>날짜</p>
                <input
                  type='date'
                  value={date}
                  onChange={handleDateChange}
                  className='ml-auto w-2/3 h-12 rounded-lg bg-gray-100 pl-3 text-sm'
                />
              </div>
              <div className='flex mt-6 items-center'>
                <p className='w-1/4 font-extrabold'>커버이미지</p>
                <label
                  htmlFor='file-upload'
                  className='px-4 py-2 text-sm text-green-500 border border-green-500 rounded-md cursor-pointer hover:bg-green-100 ml-auto'
                >
                  이미지 첨부
                </label>
                <input
                  id='file-upload'
                  type='file'
                  className='hidden'
                  onChange={handleFileChange}
                />
              </div>
              {fileName && (
                <p className='mt-2 text-right text-sm text-gray-500'>
                  {fileName}
                </p>
              )}
            </div>
            <button
              className='mt-10 rounded-md font-extrabold w-24 h-9 bg-[#698A54] text-white'
              onClick={handleSubmit}
            >
              완료
            </button>
          </div>
        </div>
      ) : (
        <div className='flex h-screen justify-center'>
          <div className='flex flex-col justify-center items-center w-3/5'>
            <p className='font-nanumHeavy font-heavy text-3xl'>작업일지 생성</p>
            <p className='text-2xl mt-6'>로그인 후 이용해 주세요!</p>
            <button
              className='mt-10 rounded-md font-extrabold w-24 h-11 bg-[#698A54] text-white'
              onClick={() => router.push('/login')}
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateLog;
