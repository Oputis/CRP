"use client";

import { useState } from 'react';
import { BUREAUS } from '@/data/bureaus';
import { FIELD_LABELS } from '@/data/fieldLabels';
import { LETTER_TEMPLATES } from '@/data/templates';
import { generateLetter } from '@/utils/letterGenerator';

const MULTILINE_FIELDS = ['issueDescription', 'reason', 'collectorAddress'];

export default function LettersTab({ setActiveTab, setTracker }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fields, setFields] = useState({});
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  function updateField(field, value) {
    setFields((prev) => ({ ...prev, [field]: value }));
  }

  function copyLetter() {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function addToTracker() {
    setTracker((prev) => [...prev, {
      id: Date.now(),
      bureau: fields.bureau || 'Unknown',
      type: selectedTemplate.id,
      account: fields.accountName || fields.creditorName || fields.collectorName || selectedTemplate.title,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent',
    }]);
    setActiveTab('tracker');
  }

  if (!selectedTemplate) {
    return (
      <section className="tab-panel">
        <div className="muted" style={{ fontSize: 12, marginBottom: 14 }}>Choose a template, enter the core facts, and generate a clean draft.</div>
        <div className="grid-2">
          {LETTER_TEMPLATES.map((template) => (
            <button key={template.id} className="card" onClick={() => { setSelectedTemplate(template); setFields({}); setGeneratedLetter(''); }} style={{ padding: 14, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 20, marginBottom: 5 }}>{template.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 'bold', color: '#e8dcc8', marginBottom: 3 }}>{template.title}</div>
              <div style={{ fontSize: 11, color: '#8a7a5a', lineHeight: 1.45 }}>{template.desc}</div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="tab-panel">
      <button className="xbtn" style={{ marginBottom: 14, fontSize: 11 }} onClick={() => { setSelectedTemplate(null); setGeneratedLetter(''); }}>← All Templates</button>
      <div style={{ background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', borderRadius: 10, padding: 14, marginBottom: 18 }}>
        <div style={{ fontSize: 17 }}>{selectedTemplate.icon}</div>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#c9a84c' }}>{selectedTemplate.title}</div>
        <div style={{ fontSize: 11, color: '#8a7a5a', marginTop: 2 }}>{selectedTemplate.desc}</div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 'bold', color: '#e8dcc8', marginBottom: 12 }}>Fill in the case details</div>
      <div className="grid-2" style={{ marginBottom: 18 }}>
        {selectedTemplate.fields.map((field) => (
          <div key={field} style={{ gridColumn: MULTILINE_FIELDS.includes(field) ? '1 / -1' : 'auto' }}>
            <div style={{ fontSize: 10, color: '#8a7a5a', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>{FIELD_LABELS[field] || field}</div>
            {field === 'bureau' ? (
              <select value={fields[field] || ''} onChange={(e) => updateField(field, e.target.value)} style={{ width: '100%' }}><option value="">Select Bureau</option>{BUREAUS.map((bureau) => <option key={bureau}>{bureau}</option>)}</select>
            ) : MULTILINE_FIELDS.includes(field) ? (
              <textarea rows={3} value={fields[field] || ''} onChange={(e) => updateField(field, e.target.value)} placeholder={`Enter ${FIELD_LABELS[field] || field}`} style={{ width: '100%', minHeight: 72, resize: 'vertical' }} />
            ) : (
              <input type="text" value={fields[field] || ''} onChange={(e) => updateField(field, e.target.value)} placeholder={`Enter ${FIELD_LABELS[field] || field}`} style={{ width: '100%' }} />
            )}
          </div>
        ))}
      </div>

      <button className="gbtn" style={{ width: '100%', padding: 13, fontSize: 13, marginBottom: 18 }} onClick={() => setGeneratedLetter(generateLetter(selectedTemplate.id, fields))}>✨ Generate Letter</button>

      {generatedLetter && (
        <div className="fi">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#c9a84c' }}>✅ Draft — Edit & Copy</div>
            <button className="xbtn" onClick={copyLetter}>{copied ? '✅ Copied!' : '📋 Copy All'}</button>
          </div>
          <textarea className="lo" value={generatedLetter} onChange={(e) => setGeneratedLetter(e.target.value)} />
          <button className="xbtn" style={{ marginTop: 10, width: '100%' }} onClick={addToTracker}>📋 Add to Tracker</button>
        </div>
      )}
    </section>
  );
}
