"use client";

import { useState } from 'react';
import { QUICK_FAQ } from '@/data/faq';

function searchFaq(query) {
  if (!query.trim()) return [];
  const lower = query.toLowerCase();
  return QUICK_FAQ.filter((item) => {
    const q = item.q.toLowerCase();
    const a = item.a.toLowerCase();
    return q.includes(lower) || a.includes(lower) || lower.split(' ').some((word) => word.length > 2 && (q.includes(word) || a.includes(word)));
  });
}

export default function QuickTab({ setActiveTab, setMessages }) {
  const [query, setQuery] = useState('');
  const results = searchFaq(query);

  function askChat(question) {
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setActiveTab('chat');
  }

  return (
    <section className="tab-panel">
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#c9a84c', marginBottom: 4 }}>⚡ Quick Assistant</div>
        <div style={{ fontSize: 11, color: '#8a7a5a', marginBottom: 12 }}>Instant answers to common workflow questions.</div>
        <input type="text" placeholder="Search e.g. how long do disputes take" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: '100%' }} />
      </div>

      {!query.trim() && QUICK_FAQ.map((item) => (
        <details key={item.q} className="card" style={{ padding: '12px 14px', marginBottom: 7, cursor: 'pointer' }}>
          <summary style={{ fontSize: 13, color: '#e8dcc8', fontWeight: 'bold', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.q}</span><span style={{ color: '#c9a84c' }}>+</span>
          </summary>
          <div style={{ fontSize: 12, color: '#a89a7a', marginTop: 8, lineHeight: 1.6, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,.06)' }}>{item.a}</div>
        </details>
      ))}

      {query.trim() && (
        <div className="fi">
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>🔎</div>
              <div style={{ fontSize: 13, color: '#8a7a5a' }}>No quick match found.</div>
              <button className="gbtn" style={{ marginTop: 12 }} onClick={() => askChat(query)}>Ask AI Chat →</button>
            </div>
          ) : results.map((item) => (
            <div key={item.q} className="card" style={{ padding: 14, marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 'bold', marginBottom: 6 }}>{item.q}</div>
              <div style={{ fontSize: 12, color: '#a89a7a', lineHeight: 1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
