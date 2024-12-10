import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const workId = searchParams.get('workId');
  const userId = searchParams.get('userId');
  const cropId = searchParams.get('cropId');

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/work/delete`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId, userId, cropId }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw new Error('Server-Failed to fetch login Data');
  }
}
