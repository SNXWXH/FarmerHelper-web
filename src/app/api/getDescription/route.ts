import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cropnameParams = searchParams.get('cropName');
  const id = decodeURIComponent(cropnameParams);

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/main/todaycrop/detail/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw new Error('Server-Failed to fetch login Data');
  }
}
