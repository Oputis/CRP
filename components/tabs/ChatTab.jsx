"use client";

import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { QUICK_ACTIONS } from '@/data/prompts';

export default function ChatTab({ messages, setMessages }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;
    setInput('');
    const updated = [...messages, { role: 'user', content: userText }];
    setMessages(updated);
    setLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: updated }) });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message || 'I could not generate a response yet.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Connection error. Sprint 2 will connect this route to the model provider.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,.06)', overflowX: 'auto', display: 'flex', gap: 7 }}>
        {QUICK_ACTIONS.map((action) => <button key={action.label} className="chip" onClick={() => sendMessage(action.prompt)}>{action.label}</button>)}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px' }}>
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className="fi" style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 13, gap: 8 }}>
            {message.role === 'assistant' && <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#a8863a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>💳</div>}
            <div style={{ maxWidth: '83%', background: message.role === 'user' ? 'rgba(201,168,76,.1)' : 'rgba(255,255,255,.05)', border: message.role === 'user' ? '1px solid rgba(201,168,76,.25)' : '1px solid rgba(255,255,255,.08)', borderRadius: message.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px', padding: '10px 14px', fontSize: 13, lineHeight: 1.65 }}>
              {message.role === 'assistant' ? <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{message.content}</ReactMarkdown> : message.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ display: 'flex', gap: 8, marginBottom: 13 }}><div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#a8863a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>💳</div><div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '4px 16px 16px 16px', padding: '13px 16px' }}><div style={{ display: 'flex', gap: 5 }}>{[0,1,2].map((dot) => <div key={dot} style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a84c', animation: 'pulse 1.2s ease-in-out infinite', animationDelay: `${dot * .2}s` }} />)}</div></div></div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <textarea className="ifield" rows={2} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Ask anything about this workflow…" />
        <button className="sbtn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>Send →</button>
      </div>
    </section>
  );
}
