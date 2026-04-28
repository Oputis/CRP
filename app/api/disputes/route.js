import { createDispute, listDisputes } from '@/lib/memoryStore';
import { badRequest, ok, parseJson } from '@/lib/http';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('caseId');
  return ok({ disputes: listDisputes(caseId) });
}

export async function POST(request) {
  const body = await parseJson(request);

  if (!body || typeof body !== 'object') {
    return badRequest('Request body must be a JSON object.');
  }

  const newDispute = createDispute(body);
  return ok({ dispute: newDispute });
}
