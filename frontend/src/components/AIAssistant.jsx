import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, BrainCircuit, Command, Plus, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { sendToGemini, parseGeminiResponse } from '../services/gemini';

export default function AIAssistant({ onCreateTasks }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm Antigravity AI — your autonomous life planner.\n\nTell me a goal or outcome, and I'll generate a full structured plan with tasks, deadlines, and priorities that auto-populate your calendar.\n\nTry: \"I want to crack UPSC in 1 year\" or \"Plan my week for exam preparation\"." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTasks, setPendingTasks] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pendingTasks]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    setPendingTasks(null);

    try {
      // Send to Gemini with conversation history (last 10 messages for context)
      const history = messages.slice(-10);
      const rawResponse = await sendToGemini(userMsg, history);
      const { text, tasks } = parseGeminiResponse(rawResponse);

      setMessages(prev => [...prev, { role: 'bot', text }]);
      
      if (tasks && tasks.length > 0) {
        setPendingTasks(tasks);
      }
    } catch (err) {
      console.error('Gemini error:', err);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `I encountered an issue communicating with the AI service. Error: ${err.message}. Please check your API key configuration.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAllTasks = () => {
    if (!pendingTasks || !onCreateTasks) return;
    onCreateTasks(pendingTasks);
    setMessages(prev => [...prev, { 
      role: 'bot', 
      text: `Successfully added ${pendingTasks.length} tasks to your planner! Check your Dashboard, Timeline, and Calendar to see them scheduled.` 
    }]);
    setPendingTasks(null);
  };

  const quickPrompts = [
    { text: 'Plan my week for exam prep', icon: <Command size={14} /> },
    { text: 'I want to crack UPSC in 1 year', icon: <Sparkles size={14} /> },
    { text: 'Build a drone startup roadmap', icon: <Zap size={14} /> },
    { text: 'Create a fitness routine for 3 months', icon: <Plus size={14} /> },
  ];

  return (
    <div className="page-content" style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(139, 92, 246, 0.06))', padding: '20px 24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src="/ai-hero.png" alt="" style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '12px' }} />
          <div>
            <h1 style={{ fontSize: '24px', letterSpacing: '-0.5px', marginBottom: '4px', margin: 0 }}>AI Autonomous Planner</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Describe your goal — AI generates a full plan with tasks, deadlines, and schedules.</p>
          </div>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
          <BrainCircuit size={14} /> Gemini AI
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Messages */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', maxWidth: '88%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '8px', 
                background: msg.role === 'user' ? 'var(--bg-secondary)' : 'rgba(99, 102, 241, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                color: msg.role === 'user' ? 'var(--text-secondary)' : 'var(--accent-indigo)',
                flexShrink: 0
              }}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div style={{ 
                padding: '14px 18px', borderRadius: '14px', 
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                fontSize: '14px', lineHeight: '1.7',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                borderTopRightRadius: msg.role === 'user' ? '4px' : '14px',
                borderTopLeftRadius: msg.role === 'bot' ? '4px' : '14px',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-indigo)' }}>
                <Bot size={16} />
              </div>
              <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Generating your plan...
              </div>
            </div>
          )}

          {/* Pending Tasks Card */}
          {pendingTasks && (
            <div style={{ background: 'var(--bg-primary)', border: '2px solid var(--accent-indigo)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--accent-indigo)" />
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>AI Generated Plan — {pendingTasks.length} Tasks</span>
                </div>
                <button 
                  onClick={handleAddAllTasks}
                  style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-indigo)', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', boxShadow: 'var(--shadow-sm)' }}
                >
                  <Plus size={14} /> Add All Tasks
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {pendingTasks.map((task, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <CheckCircle2 size={16} color="var(--accent-indigo)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{task.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{task.deadline} — {task.priority} — {task.planner}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <input 
              type="text" 
              placeholder="Describe your goal or ask for a plan..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              style={{ flex: 1, background: 'none', border: 'none', padding: '8px 0', fontSize: '14px', color: 'var(--text-primary)', outline: 'none' }}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: isLoading ? 'var(--text-muted)' : 'var(--accent-indigo)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isLoading ? 'not-allowed' : 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'background 0.2s' }}
            >
              <Send size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
            {quickPrompts.map((tip, i) => (
              <button 
                key={i} 
                onClick={() => { setInput(tip.text); }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '6px 12px', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {tip.icon} {tip.text}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
