import { NextResponse } from 'next/server';

export function ok(data, init = {}) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function badRequest(message, details = null) {
  return NextResponse.json({ error: message, details }, { status: 400 });
}

export function serverError(message = 'Internal server error') {
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
