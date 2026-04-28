"use client";

import { useState } from 'react';
import { SCORE_ACTIONS } from '@/data/scoreFactors';
import { getScoreLabel, runScoreSimulation } from '@/utils/scoreSimulator';

export default function SimulatorTab() {
  const [currentScore, setCurrentScore] = useState(620);
  const [selectedActions, setSelectedActions] = useState([]);
  const [result, setResult] = useState(null);
  const label = getScoreLabel(currentScore);

  function toggleAction(id) {
    setSelectedActions((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  return (
    <section className="tab-panel">
      <div className="card" style={{ padding: 16, marginBottom: 16, textAlign: 'center' }}>
        <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>Current Score</div>
        <input type="number" min="300" max="850" value={currentScore} onChange={(e) => setCurrentScore(Number(e.target.value))} style={{ width: 120, textAlign: 'center', fontSize: 26, fontWeight: 'bold', color: '#c9a84c' }} />
        <div style={{ marginTop: 8, fontSize: 12, color: label.color }}>{label.label}</div>
      </div>

      <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 'bold', marginBottom: 8 }}>Select Actions</div>
      <div className="grid-2" style={{ marginBottom: 14 }}>
        {SCORE_ACTIONS.map((action) => {
          const selected = selectedActions.includes(action.id);
          return <button key={action.id} className="card" onClick={() => toggleAction(action.id)} style={{ padding: 12, cursor: 'pointer', textAlign: 'left', borderColor: selected ? '#c9a84c' : undefined, background: selected ? 'rgba(201,168,76,.1)' : 'rgba(255,255,255,.04)' }}><div style={{ fontSize: 16 }}>{action.icon}</div><div style={{ fontSize: 12, color: '#e8dcc8', fontWeight: 'bold' }}>{action.label}</div></button>;
        })}
      </div>

      <button className="gbtn" style={{ width: '100%', marginBottom: 16 }} onClick={() => setResult(runScoreSimulation(currentScore, selectedActions))} disabled={selectedActions.length === 0}>Run Simulation</button>

      {result && <div className="card fi" style={{ padding: 16 }}><div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 'bold', marginBottom: 10 }}>Estimated Score Range</div><div style={{ fontSize: 12, color: '#a89a7a', lineHeight: 1.7 }}>Minimum: {result.newMin}<br />Expected: {result.newExp}<br />Maximum: {result.newMax}</div><div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: 'rgba(255,255,255,.04)', fontSize: 11, color: '#8a7a5a', lineHeight: 1.5 }}>Educational estimate only. Actual changes depend on scoring model, bureau data, utilization, file age, and reporting timing.</div></div>}
    </section>
  );
}
