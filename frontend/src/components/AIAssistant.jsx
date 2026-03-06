import React, { useState } from 'react';
import { Send, Sparkles, User, Bot, BrainCircuit, Command, Plus } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your AI Life Planner. I can help you break down complex goals into tasks, generate study plans, or analyze your productivity patterns. What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: `That sounds like a great plan. Based on your current "Become a Full Stack Developer" goal, I recommend focusing on PostgreSQL this week as it aligns with your Saturday deadline. Would you like me to generate a 3-day deep dive schedule for you?` }]);
    }, 1000);
  };

  return (
    <div className="page-content" style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: '32px', letterSpacing: '-1px', marginBottom: '8px' }}>AI Assistant</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Your personal coach for life organization and productivity.</p>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(255, 107, 95, 0.1)', borderRadius: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <BrainCircuit size={18} /> GPT-4o Powering
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Messages */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', maxWidth: '85%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '10px', 
                background: msg.role === 'user' ? 'var(--bg-secondary)' : 'rgba(255, 107, 95, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: msg.role === 'user' ? 'var(--text-secondary)' : 'var(--primary)',
                flexShrink: 0
              }}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div style={{ 
                padding: '16px 20px', borderRadius: '16px', 
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                fontSize: '15px', lineHeight: '1.6',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.role === 'bot' ? '4px' : '16px',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <input 
              type="text" 
              placeholder="Message your planner assistant..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, background: 'none', border: 'none', padding: '8px 0', fontSize: '15px', color: 'var(--text-primary)', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
               <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}><Plus size={20} /></button>
               <button 
                onClick={handleSend}
                style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
               >
                 <Send size={18} />
               </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {[
              { text: 'Analyze productivity', icon: <Sparkles size={14} /> },
              { text: 'Create syllabus plan', icon: <Command size={14} /> }
            ].map((tip, i) => (
              <button key={i} onClick={() => setInput(tip.text)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {tip.icon} {tip.text}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
