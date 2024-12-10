import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get('userId');
  const nicknameParams = searchParams.get('nickname');
  const nickname = decodeURIComponent(nicknameParams);

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/login/nickname`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, nickname }),
      }
    );

    const data = await response.json();

    if (data.isOK) {
      return NextResponse.json({ message: '로그인 성공' }, { status: 200 });
    } else {
      return NextResponse.json({ error: '로그인 실패' }, { status: 400 });
    }
  } catch (error) {
    throw new Error('Server-Failed to fetch login Data');
  }
}
