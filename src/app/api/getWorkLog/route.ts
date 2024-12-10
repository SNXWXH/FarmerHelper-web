import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get('userId');
  const cropId = searchParams.get('cropId');

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
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/work/worklist`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, cropId, ipAddress }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw new Error('Server-Failed to fetch getWorkLog Data');
  }
}
