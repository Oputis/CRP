import { LETTER_TEMPLATES } from '@/data/templates';
import { generateLetter } from '@/utils/letterGenerator';
import { badRequest, ok, parseJson, serverError } from '@/lib/http';

export async function POST(request) {
  const body = await parseJson(request);

  if (!body || typeof body.templateId !== 'string') {
    return badRequest('Request body must include templateId.');
  }

  const template = LETTER_TEMPLATES.find((item) => item.id === body.templateId);

  if (!template) {
    return badRequest(`Unknown templateId: ${body.templateId}`);
  }

  try {
    const letter = generateLetter(body.templateId, body.fields || {});
    return ok({ template, letter });
  } catch (error) {
    console.error('Letter generation failed:', error);
    return serverError('Unable to generate letter.');
  }
}
