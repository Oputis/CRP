import { createChatCompletion } from '@/lib/anthropic';
import { badRequest, ok, parseJson, serverError } from '@/lib/http';

export async function POST(request) {
  const body = await parseJson(request);

  if (!body || !Array.isArray(body.messages)) {
    return badRequest('Request body must include a messages array.');
  }

  try {
    const message = await createChatCompletion(body.messages);
    return ok({ message });
  } catch (error) {
    console.error('Chat route failed:', error);
    return serverError(error.message || 'Unable to generate chat response.');
  }
}
