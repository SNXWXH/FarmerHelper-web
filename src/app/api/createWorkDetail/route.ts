import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const responseIP = await fetch(`https://api.ip.pe.kr/json`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!responseIP.ok) {
    throw new Error('Failed to fetch IP');
  }

  const ipJson = await responseIP.json();
  const ipAddress = ipJson.ip;

  try {
    const { userId, cropId, workContent } = await req.json();

    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/work/listcreate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, cropId, workContent, ipAddress }),
      }
    );

    const data = await response.json();

    if (data.isOK) {
      return NextResponse.json(
        { message: '작업 일지가 성공적으로 생성되었습니다.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: '작업 일지 생성에 실패했습니다.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json(
      { error: '서버 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
