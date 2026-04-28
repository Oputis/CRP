import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages = [] } = await request.json();
  const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';

  return NextResponse.json({
    message: `Sprint 2 backend placeholder received: "${lastUserMessage}"\n\nNext step: wire this route to Anthropic using an environment variable, add rate limits, and keep all provider keys server-side.`,
  });
}
