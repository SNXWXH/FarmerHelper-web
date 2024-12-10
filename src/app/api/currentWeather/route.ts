import { NextResponse } from 'next/server';

export async function GET() {
  const responseIP = await fetch(`https://api.ip.pe.kr/json`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!responseIP.ok) {
    throw new Error('Failed to fetch IP');
  }

  const ipJson = await responseIP.json();
  const ip = ipJson.ip;

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/main/weather/${ip}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw new Error('Server-Failed to fetch currentWeather Data');
  }
}
