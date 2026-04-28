import { getRequiredEnv } from '@/lib/env';
import { SYSTEM_PROMPT } from '@/data/prompts';

const ANTHROPIC_MESSAGES_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-3-5-sonnet-latest';

export function normalizeMessages(messages = []) {
  return messages
    .filter((message) => message && ['user', 'assistant'].includes(message.role) && typeof message.content === 'string')
    .map((message) => ({ role: message.role, content: message.content.slice(0, 6000) }))
    .slice(-12);
}

export async function createChatCompletion(messages) {
  const apiKey = getRequiredEnv('ANTHROPIC_API_KEY');
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

  const response = await fetch(ANTHROPIC_MESSAGES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      system: SYSTEM_PROMPT,
      messages: normalizeMessages(messages),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || 'Anthropic request failed.';
    throw new Error(message);
  }

  return data?.content?.[0]?.text || 'No response generated.';
}
