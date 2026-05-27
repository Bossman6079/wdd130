import { NextRequest, NextResponse } from 'next/server';
import { getReport } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';

  if (!q.trim()) {
    return NextResponse.json({ error: 'Missing query parameter q' }, { status: 400 });
  }

  // When an OPENAI_API_KEY is set, replace this block with a real API call:
  // const completion = await openai.chat.completions.create({ ... });
  // Parse the JSON response and return it as ResearchReport shape.

  const report = getReport(q);
  return NextResponse.json(report);
}
