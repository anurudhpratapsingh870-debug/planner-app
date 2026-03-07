import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, X, Clock, 
  Settings, Volume2, VolumeX, Maximize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


export default function Timer({ isOpen, onClose, onFinish }) {
  const [mode, setMode] = useState('focus'); // 'focus', 'short_break', 'long_break'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef(null);

  const configs = {
    focus: { time: 25 * 60, color: '#2563eb', label: 'Time to Focus' },
    short_break: { time: 5 * 60, color: '#10b981', label: 'Take a Break' },
    long_break: { time: 15 * 60, color: '#8b5cf6', label: 'Long Rest' }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerFinish();
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleTimerFinish = () => {
    setIsActive(false);
    if (!isMuted) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
    }
    
    // Vibrate heavily on completion if running natively
    if (Capacitor.isNativePlatform()) {
      Haptics.vibrate({ duration: 1000 }).catch(console.warn);
    }
    
    if (onFinish) onFinish({ mode, duration: configs[mode].time });
    alert(`${mode === 'focus' ? 'Focus session' : 'Break'} finished!`);
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(configs[mode].time);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(configs[newMode].time);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / configs[mode].time) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          style={{ 
            position: 'fixed', bottom: '32px', right: '32px', 
            width: '320px', background: '#fff', borderRadius: '24px', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)', zIndex: 2000, 
            padding: '24px', border: '1px solid #f1f5f9' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: configs[mode].color }} />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{configs[mode].label}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button 
                onClick={onClose} 
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle 
                cx="100" cy="100" r="90" 
                stroke="#f1f5f9" strokeWidth="8" fill="none" 
              />
              <circle 
                cx="100" cy="100" r="90" 
                stroke={configs[mode].color} strokeWidth="8" fill="none" 
                strokeDasharray="565.48"
                strokeDashoffset={565.48 * (progress / 100)}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#1e293b', fontVariantNumeric: 'tabular-nums' }}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <button 
              onClick={() => switchMode('focus')}
              style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: mode === 'focus' ? '#2563eb' : '#f8fafc', color: mode === 'focus' ? '#fff' : '#64748b' }}
            >Focus</button>
            <button 
              onClick={() => switchMode('short_break')}
              style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: mode === 'short_break' ? '#10b981' : '#f8fafc', color: mode === 'short_break' ? '#fff' : '#64748b' }}
            >Short Break</button>
            <button 
              onClick={() => switchMode('long_break')}
              style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: mode === 'long_break' ? '#8b5cf6' : '#f8fafc', color: mode === 'long_break' ? '#fff' : '#64748b' }}
            >Long Break</button>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={toggleTimer}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: 'none', background: configs[mode].color, color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              {isActive ? <Pause size={18} /> : <Play size={18} />}
              {isActive ? 'Pause' : 'Start Focus'}
            </button>
            <button 
              onClick={resetTimer}
              style={{ padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#fff', color: '#64748b', cursor: 'pointer' }}
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
