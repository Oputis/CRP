import { createCase, listCases } from '@/lib/memoryStore';
import { badRequest, ok, parseJson } from '@/lib/http';

export async function GET() {
  return ok({ cases: listCases() });
}

export async function POST(request) {
  const body = await parseJson(request);

  if (!body || typeof body !== 'object') {
    return badRequest('Request body must be a JSON object.');
  }

  const newCase = createCase(body);
  return ok({ case: newCase });
}
