"use client";

import { useState } from 'react';
import { BUREAUS } from '@/data/bureaus';
import { DISPUTE_TYPES } from '@/data/disputeTypes';

const STATUS_COLORS = { Sent: '#3b82f6', 'In Progress': '#f59e0b', Resolved: '#10b981', Denied: '#ef4444' };

function daysSince(date) {
  if (!date) return null;
  const start = new Date(date);
  if (Number.isNaN(start.getTime())) return null;
  return Math.floor((new Date() - start) / 86400000);
}

export default function TrackerTab({ tracker, setTracker, setActiveTab, setSelectedItem, setCfpbFields, setMessages }) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ bureau: 'Equifax', type: '', account: '', date: '', status: 'Sent' });

  function saveItem() {
    if (!draft.account.trim()) return;
    setTracker((prev) => [...prev, { ...draft, id: Date.now() }]);
    setDraft({ bureau: 'Equifax', type: '', account: '', date: '', status: 'Sent' });
    setShowAdd(false);
  }

  return (
    <section className="tab-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="muted" style={{ fontSize: 12 }}>Track open items across bureaus and deadlines.</div>
        <button className="gbtn" onClick={() => setShowAdd((value) => !value)}>+ Add</button>
      </div>

      {showAdd && (
        <div className="card fi" style={{ padding: 16, marginBottom: 16 }}>
          <div className="gold" style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 12 }}>New Tracker Item</div>
          <div className="grid-2" style={{ marginBottom: 12 }}>
            <select value={draft.bureau} onChange={(e) => setDraft((p) => ({ ...p, bureau: e.target.value }))}>{BUREAUS.map((b) => <option key={b}>{b}</option>)}</select>
            <select value={draft.status} onChange={(e) => setDraft((p) => ({ ...p, status: e.target.value }))}>{['Sent','In Progress','Resolved','Denied'].map((s) => <option key={s}>{s}</option>)}</select>
            <input value={draft.account} onChange={(e) => setDraft((p) => ({ ...p, account: e.target.value }))} placeholder="Account / issue" />
            <input value={draft.date} onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))} placeholder="YYYY-MM-DD" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {DISPUTE_TYPES.map((type) => <button key={type.id} onClick={() => setDraft((p) => ({ ...p, type: type.id }))} style={{ background: draft.type === type.id ? 'rgba(201,168,76,.2)' : 'rgba(255,255,255,.04)', border: draft.type === type.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '4px 10px', cursor: 'pointer', color: '#e8dcc8', fontSize: 11, fontFamily: 'inherit' }}>{type.icon} {type.label}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 7 }}><button className="gbtn" onClick={saveItem}>Save</button><button className="xbtn" onClick={() => setShowAdd(false)}>Cancel</button></div>
        </div>
      )}

      {tracker.length === 0 ? <div style={{ textAlign: 'center', padding: '48px 20px', color: '#5a4f3a' }}><div style={{ fontSize: 32, marginBottom: 8 }}>📋</div><div className="muted" style={{ fontSize: 13, marginBottom: 5 }}>No tracker items yet</div><div style={{ fontSize: 11 }}>Generate a letter to auto-add, or tap + Add.</div></div> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 16 }}>
            {BUREAUS.map((bureau) => { const items = tracker.filter((t) => t.bureau === bureau); return <div key={bureau} className="card" style={{ padding: 10, textAlign: 'center' }}><div className="gold" style={{ fontSize: 18, fontWeight: 'bold' }}>{items.length}</div><div className="muted" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 }}>{bureau}</div></div>; })}
          </div>
          {tracker.map((item) => {
            const type = DISPUTE_TYPES.find((dt) => dt.id === item.type);
            const days = daysSince(item.date);
            const urgent = days !== null && days >= 25 && item.status !== 'Resolved';
            return <div key={item.id} className="card" style={{ padding: 13, marginBottom: 9, borderColor: urgent ? 'rgba(239,68,68,.3)' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 7 }}>
                <div><div style={{ fontSize: 13, fontWeight: 'bold' }}>{type?.icon} {item.account}</div><div className="muted" style={{ fontSize: 11 }}>{item.bureau} · {item.date || 'No date'}{days !== null ? ` · Day ${days}` : ''}</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><select value={item.status} onChange={(e) => setTracker((prev) => prev.map((row) => row.id === item.id ? { ...row, status: e.target.value } : row))} style={{ color: STATUS_COLORS[item.status], width: 'auto', padding: '4px 8px' }}>{['Sent','In Progress','Resolved','Denied'].map((s) => <option key={s}>{s}</option>)}</select><button onClick={() => setTracker((prev) => prev.filter((row) => row.id !== item.id))} style={{ background: 'none', border: 'none', color: '#5a4f3a', cursor: 'pointer', fontSize: 15 }}>×</button></div>
              </div>
              {urgent && <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 7 }}>⚠️ Review window approaching.</div>}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button className="xbtn" style={{ padding: '4px 11px', fontSize: 10 }} onClick={() => { setSelectedItem(item); setActiveTab('timeline'); }}>📅 Timeline</button>
                <button className="xbtn" style={{ padding: '4px 11px', fontSize: 10, color: '#ef4444' }} onClick={() => { setCfpbFields((p) => ({ ...p, bureau: item.bureau, accountName: item.account, disputeDate: item.date })); setActiveTab('cfpb'); }}>🚨 Escalate</button>
                <button className="xbtn" style={{ padding: '4px 11px', fontSize: 10 }} onClick={() => { setMessages((prev) => [...prev, { role: 'user', content: `Help me follow up on ${item.bureau}: ${item.account}. Status: ${item.status}.` }]); setActiveTab('chat'); }}>💬 Advice</button>
              </div>
            </div>;
          })}
        </>
      )}
    </section>
  );
}
