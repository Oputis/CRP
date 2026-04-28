const TABS = [
  { id: 'chat', label: '💬 Chat' },
  { id: 'quick', label: '⚡ Quick' },
  { id: 'letters', label: '📝 Letters' },
  { id: 'tracker', label: '📋 Tracker' },
  { id: 'timeline', label: '📅 Timeline' },
  { id: 'cfpb', label: '🚨 CFPB' },
  { id: 'simulator', label: '📊 Score' },
];

export default function HeaderTabs({ activeTab, setActiveTab, trackerCount }) {
  return (
    <header style={{ padding: '16px 18px 0', borderBottom: '1px solid rgba(201,168,76,.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#a8863a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>💳</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: '#c9a84c', letterSpacing: 1 }}>CreditPro</div>
          <div style={{ fontSize: 9, color: '#5a6a7a', letterSpacing: 2, textTransform: 'uppercase' }}>Workflow Automation</div>
        </div>
        <div style={{ marginLeft: 'auto', background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.3)', borderRadius: 20, padding: '3px 10px', fontSize: 10, color: '#10b981', letterSpacing: 1 }}>● ACTIVE</div>
      </div>
      <nav style={{ display: 'flex', overflowX: 'auto' }}>
        {TABS.map((tab) => {
          const label = tab.id === 'tracker' ? `📋 Tracker (${trackerCount})` : tab.label;
          return <button key={tab.id} className={`tb ${activeTab === tab.id ? 'on' : ''}`} onClick={() => setActiveTab(tab.id)}>{label}</button>;
        })}
      </nav>
    </header>
  );
}
