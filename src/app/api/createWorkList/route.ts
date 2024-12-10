import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, cropName, cropDate, imageUrl } = body;

    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/crop/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, cropName, cropDate, imageUrl }),
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
    return NextResponse.json(
      { error: '서버 요청 처리 중 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}
