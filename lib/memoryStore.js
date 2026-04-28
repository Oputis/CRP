const globalStore = globalThis.__creditProMemoryStore || {
  cases: [],
  disputes: [],
};

globalThis.__creditProMemoryStore = globalStore;

export function listCases() {
  return globalStore.cases;
}

export function createCase(input) {
  const now = new Date().toISOString();
  const newCase = {
    id: crypto.randomUUID(),
    clientName: input.clientName || 'Unnamed Client',
    status: input.status || 'Open',
    notes: input.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  globalStore.cases.push(newCase);
  return newCase;
}

export function listDisputes(caseId = null) {
  if (!caseId) return globalStore.disputes;
  return globalStore.disputes.filter((item) => item.caseId === caseId);
}

export function createDispute(input) {
  const now = new Date().toISOString();
  const newItem = {
    id: crypto.randomUUID(),
    caseId: input.caseId || null,
    bureau: input.bureau || 'Unknown',
    account: input.account || 'Untitled Item',
    type: input.type || 'other',
    status: input.status || 'Sent',
    date: input.date || now.slice(0, 10),
    notes: input.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  globalStore.disputes.push(newItem);
  return newItem;
}
