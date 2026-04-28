"use client";

import { TIMELINE_STEPS } from '@/data/timelineSteps';

function daysSince(date) {
  if (!date) return null;
  const start = new Date(date);
  if (Number.isNaN(start.getTime())) return null;
  return Math.floor((new Date() - start) / 86400000);
}

function currentStep(days) {
  if (days === null) return -1;
  for (let i = TIMELINE_STEPS.length - 1; i >= 0; i -= 1) {
    if (days >= TIMELINE_STEPS[i].day) return i;
  }
  return 0;
}

export default function TimelineTab({ selectedItem, setSelectedItem, setActiveTab }) {
  const days = selectedItem ? daysSince(selectedItem.date) : null;
  const stepIndex = currentStep(days);

  return (
    <section className="tab-panel">
      <div className="muted" style={{ fontSize: 12, marginBottom: 14 }}>{selectedItem ? `Tracking: ${selectedItem.account} (${selectedItem.bureau})` : 'Select an item from Tracker, or review the general process below.'}</div>
      {selectedItem && <div className="card fi" style={{ background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', padding: 13, marginBottom: 18 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div className="gold" style={{ fontSize: 13, fontWeight: 'bold' }}>{selectedItem.account}</div><div className="muted" style={{ fontSize: 11 }}>{selectedItem.bureau} · Sent {selectedItem.date || 'No date'}</div></div><button className="xbtn" style={{ fontSize: 10, padding: '4px 10px' }} onClick={() => setSelectedItem(null)}>Clear ×</button></div>{days !== null && <div style={{ marginTop: 9 }}><div style={{ height: 5, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: `${Math.min(100, (days / 45) * 100)}%`, background: days >= 30 ? '#ef4444' : days >= 20 ? '#f59e0b' : '#3b82f6', borderRadius: 3 }} /></div><div className="muted" style={{ fontSize: 10, marginTop: 3 }}>Day {days} of estimated 45-day workflow</div></div>}</div>}
      <div style={{ position: 'relative', paddingLeft: 44 }}>
        <div style={{ position: 'absolute', left: 14, top: 28, bottom: 0, width: 2, background: 'rgba(255,255,255,.07)' }} />
        {TIMELINE_STEPS.map((step, index) => {
          const isPast = days !== null && days >= step.day;
          const isCurrent = index === stepIndex && days !== null;
          return <div key={step.label} style={{ position: 'relative', marginBottom: 22 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, position: 'absolute', left: -44, zIndex: 1, background: isPast ? step.color : 'rgba(255,255,255,.06)', border: isCurrent ? `2px solid ${step.color}` : '2px solid rgba(255,255,255,.1)' }}>{step.icon}</div>
            <div className="card" style={{ background: isCurrent ? `${step.color}10` : undefined, border: isCurrent ? `1px solid ${step.color}40` : undefined, padding: '11px 13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}><div style={{ fontSize: 13, fontWeight: 'bold', color: isPast ? '#e8dcc8' : '#5a6a7a' }}>{step.label}</div><div style={{ fontSize: 10, color: step.color, background: `${step.color}20`, borderRadius: 10, padding: '2px 8px' }}>Day {step.day}</div></div>
              <div style={{ fontSize: 11, color: isPast ? '#8a7a5a' : '#3a4a5a', lineHeight: 1.5 }}>{step.desc}</div>
              {isCurrent && <div style={{ marginTop: 6, fontSize: 11, color: step.color, fontWeight: 'bold' }}>← You are here</div>}
              {index === TIMELINE_STEPS.length - 1 && isCurrent && <button className="gbtn" style={{ marginTop: 8, fontSize: 11, padding: '6px 12px' }} onClick={() => setActiveTab('cfpb')}>Go to escalation tools →</button>}
            </div>
          </div>;
        })}
      </div>
    </section>
  );
}
