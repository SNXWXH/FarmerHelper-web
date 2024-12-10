import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { workId, userId, cropId, workContent } = await req.json();

    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/work/patch`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId, userId, cropId, workContent }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw new Error('Server-Failed to fetch login Data');
  }
}
