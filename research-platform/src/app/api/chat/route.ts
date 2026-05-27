import { NextRequest, NextResponse } from 'next/server';
import { getMockResponse } from '@/lib/chatData';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== 'string' || typeof body.field !== 'string') {
    return NextResponse.json({ error: 'Request body must include field and message strings' }, { status: 400 });
  }

  const { field, message } = body as { field: string; message: string };

  // When an OPENAI_API_KEY is set, replace this block:
  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-4o',
  //   messages: [
  //     { role: 'system', content: `You are an expert academic research assistant for the field: ${field}. Answer with depth, citing real papers and methodological nuance.` },
  //     { role: 'user', content: message },
  //   ],
  // });
  // return NextResponse.json({ response: completion.choices[0].message.content });

  const response = getMockResponse(field, message);
  return NextResponse.json({ response });
}
