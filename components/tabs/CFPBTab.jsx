"use client";

import { useState } from 'react';
import { ESCALATION_SCENARIOS } from '@/data/escalationScenarios';

const FIELDS = [
  ['fullName', 'Full Name'],
  ['bureau', 'Company / Bureau'],
  ['disputeDate', 'Original Submission Date'],
  ['accountName', 'Account Name'],
  ['accountNumber', 'Account Number'],
  ['specificIssue', 'Specific Issue'],
  ['responseText', 'Company Response'],
  ['whyImproper', 'Why This Is Unresolved'],
];

function buildDraft(scenario, fields) {
  return `ESCALATION SUMMARY\n\nCompany: ${fields.bureau || '[COMPANY OR BUREAU]'}\nIssue Pattern: ${scenario.label}\n\nTimeline:\nOn ${fields.disputeDate || '[DATE]'}, I submitted a written dispute or request about ${fields.accountName || '[ACCOUNT]'} ${fields.accountNumber || ''}.\n\nSpecific Issue:\n${fields.specificIssue || '[DESCRIBE ISSUE]'}\n\nResponse Received:\n${fields.responseText || '[SUMMARIZE RESPONSE]'}\n\nWhy This Remains Unresolved:\n${fields.whyImproper || '[EXPLAIN GAP]'}\n\nBasis:\n${scenario.legalBasis}\n\nRequested Resolution:\n1. Review the item and supporting documents.\n2. Correct or remove information that cannot be verified as accurate.\n3. Provide written confirmation of the result.\n4. Provide an updated report if changes are made.\n\nAttachments Checklist:\n- Original letter or submission\n- Proof of mailing or submission\n- Company response\n- Supporting evidence\n- Identity and address verification if required`;
}

export default function CFPBTab({ cfpbFields, setCfpbFields }) {
  const [scenario, setScenario] = useState(null);
  const [draft, setDraft] = useState('');

  function updateField(field, value) {
    setCfpbFields((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section className="tab-panel">
      <div className="gold" style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 5 }}>🚨 Escalation Workspace</div>
      <div className="muted" style={{ fontSize: 11, marginBottom: 14 }}>Select the response pattern, complete the facts, then generate an escalation summary.</div>
      <div className="grid-2" style={{ marginBottom: 18 }}>
        {ESCALATION_SCENARIOS.map((item) => <button key={item.id} className="card" onClick={() => { setScenario(item); setDraft(''); }} style={{ textAlign: 'left', padding: 13, cursor: 'pointer', borderColor: scenario?.id === item.id ? '#c9a84c' : undefined, background: scenario?.id === item.id ? 'rgba(201,168,76,.1)' : undefined }}><div style={{ fontSize: 18 }}>{item.icon}</div><div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>{item.label}</div><div className="muted" style={{ fontSize: 11, lineHeight: 1.45 }}>{item.violation}</div></button>)}
      </div>
      {scenario && <div className="fi"><div className="card" style={{ padding: 14, marginBottom: 14 }}><div className="gold" style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>{scenario.label}</div><div className="muted" style={{ fontSize: 11, lineHeight: 1.6 }}>{scenario.nextSteps.join(' ')}</div></div><div className="grid-2" style={{ marginBottom: 16 }}>{FIELDS.map(([key, label]) => <div key={key} style={{ gridColumn: ['specificIssue','responseText','whyImproper'].includes(key) ? '1 / -1' : 'auto' }}><div className="muted" style={{ fontSize: 10, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>{['specificIssue','responseText','whyImproper'].includes(key) ? <textarea value={cfpbFields[key] || ''} onChange={(e) => updateField(key, e.target.value)} rows={3} style={{ width: '100%', resize: 'vertical' }} /> : <input value={cfpbFields[key] || ''} onChange={(e) => updateField(key, e.target.value)} style={{ width: '100%' }} />}</div>)}</div><button className="gbtn" style={{ width: '100%', marginBottom: 14 }} onClick={() => setDraft(buildDraft(scenario, cfpbFields))}>Generate Escalation Summary</button>{draft && <textarea className="lo fi" value={draft} onChange={(e) => setDraft(e.target.value)} />}</div>}
    </section>
  );
}
