"use client";

import { useState } from 'react';
import HeaderTabs from '@/components/HeaderTabs';
import ChatTab from '@/components/tabs/ChatTab';
import QuickTab from '@/components/tabs/QuickTab';
import LettersTab from '@/components/tabs/LettersTab';
import TrackerTab from '@/components/tabs/TrackerTab';
import TimelineTab from '@/components/tabs/TimelineTab';
import CFPBTab from '@/components/tabs/CFPBTab';
import SimulatorTab from '@/components/tabs/SimulatorTab';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Hey! I am CreditPro — your credit workflow assistant. Use the tabs to chat, generate letters, track cases, monitor timelines, draft CFPB escalations, and simulate score changes. What are we working on today?',
};

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [tracker, setTracker] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cfpbFields, setCfpbFields] = useState({});

  return (
    <main className="screen">
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} trackerCount={tracker.length} />
      {activeTab === 'chat' && <ChatTab messages={messages} setMessages={setMessages} />}
      {activeTab === 'quick' && <QuickTab setActiveTab={setActiveTab} setMessages={setMessages} />}
      {activeTab === 'letters' && <LettersTab setActiveTab={setActiveTab} setTracker={setTracker} />}
      {activeTab === 'tracker' && <TrackerTab tracker={tracker} setTracker={setTracker} setActiveTab={setActiveTab} setSelectedItem={setSelectedItem} setCfpbFields={setCfpbFields} setMessages={setMessages} />}
      {activeTab === 'timeline' && <TimelineTab selectedItem={selectedItem} setSelectedItem={setSelectedItem} setActiveTab={setActiveTab} />}
      {activeTab === 'cfpb' && <CFPBTab cfpbFields={cfpbFields} setCfpbFields={setCfpbFields} />}
      {activeTab === 'simulator' && <SimulatorTab />}
    </main>
  );
}
