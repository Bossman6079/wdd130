import { NextRequest, NextResponse } from 'next/server';
import { getForecast } from '@/lib/platformData';

export async function GET(req: NextRequest) {
  const field = req.nextUrl.searchParams.get('field') ?? '';

  if (!field.trim()) {
    return NextResponse.json({ error: 'Missing query parameter field' }, { status: 400 });
  }

  // When an OPENAI_API_KEY is set, replace this block with a structured completion call
  // that returns FieldForecast-shaped JSON for the given field name.

  const forecast = getForecast(field);
  return NextResponse.json(forecast);
}
