import React, { useState, useEffect } from 'react';
import { Check, X, Crown, Zap, Users, BrainCircuit, Shield, CreditCard, Star, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Starter',
    price: '0',
    period: 'forever',
    description: 'Get started with basic planning tools',
    features: [
      { text: 'Up to 25 tasks', included: true },
      { text: '3 Planner modules', included: true },
      { text: 'Calendar view', included: true },
      { text: 'Basic timeline', included: true },
      { text: 'AI Autonomous Planning', included: false },
      { text: 'Finance & Budget tracker', included: false },
      { text: 'Advanced Analytics', included: false },
      { text: 'Priority support', included: false },
    ],
    highlighted: false,
    icon: <Star size={24} />,
    color: '#94a3b8',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '799',
    currency: '₹',
    period: '/month',
    description: 'AI-powered autonomous life planning',
    features: [
      { text: 'Unlimited tasks', included: true },
      { text: 'All 5 Planner modules', included: true },
      { text: 'AI Autonomous Planning', included: true },
      { text: 'Goal Planner with milestones', included: true },
      { text: 'Finance & Budget tracker', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Custom templates', included: true },
      { text: 'Priority email support', included: true },
    ],
    highlighted: true,
    icon: <Zap size={24} />,
    color: '#6366f1',
    badge: 'Most Popular'
  },
  {
    id: 'team',
    name: 'Team',
    price: '1,599',
    currency: '₹',
    period: '/month',
    description: 'Collaboration for teams and startups',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Up to 10 team members', included: true },
      { text: 'Shared planners & projects', included: true },
      { text: 'Team analytics & reports', included: true },
      { text: 'Role-based permissions', included: true },
      { text: 'Group goal tracking', included: true },
      { text: 'Family finance planning', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    highlighted: false,
    icon: <Users size={24} />,
    color: '#10b981',
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currentPlan, setCurrentPlan] = useState(() => {
    return localStorage.getItem('user_plan') || 'free';
  });
  const [justUpgraded, setJustUpgraded] = useState(false);

  useEffect(() => {
    localStorage.setItem('user_plan', currentPlan);
  }, [currentPlan]);

  const handleUpgrade = (planId) => {
    if (planId === currentPlan) return;
    setCurrentPlan(planId);
    setJustUpgraded(true);
    setTimeout(() => setJustUpgraded(false), 3000);
  };

  const getButtonText = (planId) => {
    if (planId === currentPlan) return 'Current Plan';
    if (plans.findIndex(p => p.id === planId) < plans.findIndex(p => p.id === currentPlan)) return 'Downgrade';
    return 'Upgrade Now';
  };

  return (
    <div className="page-content" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Success Toast */}
      {justUpgraded && (
        <div style={{ 
          position: 'fixed', top: '24px', right: '24px', zIndex: 2000, 
          padding: '16px 24px', background: '#10b981', color: '#fff', 
          borderRadius: '12px', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
          display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '14px',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <CheckCircle2 size={20} /> Successfully upgraded to {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan!
        </div>
      )}

      {/* Hero Header with Illustration */}
      <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative' }}>
        <div style={{ marginBottom: '24px' }}>
          <img 
            src="/pricing-hero.png" 
            alt="Upgrade your experience" 
            style={{ width: '180px', height: '180px', objectFit: 'contain', margin: '0 auto', display: 'block', opacity: 0.9 }}
          />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '20px', color: '#6366f1', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
          <Crown size={14} /> Pricing Plans
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>Unlock Your Full Potential</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
          Start free. Upgrade instantly to unlock AI autonomous planning, financial tracking, and team collaboration.
        </p>

        {/* Billing Toggle */}
        <div style={{ display: 'inline-flex', marginTop: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setBillingCycle('monthly')}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: billingCycle === 'monthly' ? 'var(--bg-primary)' : 'transparent', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s' }}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: billingCycle === 'yearly' ? 'var(--bg-primary)' : 'transparent', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: billingCycle === 'yearly' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: billingCycle === 'yearly' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s' }}
          >
            Yearly <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 700 }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
        {plans.map(plan => {
          const isCurrentPlan = plan.id === currentPlan;
          const computedPrice = billingCycle === 'yearly' && plan.price !== '0' 
            ? Math.round(parseInt(plan.price.replace(',', '')) * 0.8).toLocaleString('en-IN')
            : plan.price;

          return (
            <div 
              key={plan.id}
              style={{ 
                background: 'var(--bg-primary)', 
                borderRadius: '20px', 
                padding: plan.highlighted ? '32px' : '28px', 
                border: isCurrentPlan 
                  ? '2px solid #10b981' 
                  : plan.highlighted ? '2px solid #6366f1' : '1px solid var(--border-color)',
                boxShadow: plan.highlighted ? '0 20px 60px rgba(99, 102, 241, 0.12)' : 'var(--shadow-sm)',
                position: 'relative',
                transform: plan.highlighted ? 'scale(1.03)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {plan.badge && !isCurrentPlan && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', background: '#6366f1', color: '#fff', borderRadius: '20px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {plan.badge}
                </div>
              )}

              {isCurrentPlan && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', background: '#10b981', color: '#fff', borderRadius: '20px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Active
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${plan.color}15`, color: plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {plan.icon}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>{plan.name}</h3>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                {plan.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                {plan.currency && <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-secondary)' }}>{plan.currency}</span>}
                <span style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-2px' }}>{computedPrice}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{plan.period}</span>
              </div>

              <button 
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrentPlan}
                style={{ 
                  width: '100%', padding: '14px', borderRadius: '12px', border: 'none', 
                  background: isCurrentPlan ? 'var(--bg-secondary)' : plan.highlighted ? '#6366f1' : 'var(--bg-secondary)', 
                  color: isCurrentPlan ? 'var(--text-muted)' : plan.highlighted ? '#fff' : 'var(--text-primary)',
                  fontWeight: 700, fontSize: '14px', cursor: isCurrentPlan ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: plan.highlighted && !isCurrentPlan ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none',
                  transition: 'all 0.2s', opacity: isCurrentPlan ? 0.6 : 1
                }}
              >
                {isCurrentPlan ? (
                  <><CheckCircle2 size={16} /> Current Plan</>
                ) : (
                  <>{getButtonText(plan.id)} <ArrowRight size={16} /></>
                )}
              </button>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    {f.included 
                      ? <Check size={16} color="#10b981" strokeWidth={3} /> 
                      : <X size={16} color="var(--text-muted)" strokeWidth={2} />
                    }
                    <span style={{ color: f.included ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: f.included ? 500 : 400 }}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Trust Bar */}
      <div style={{ textAlign: 'center', marginTop: '48px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Shield size={16} color="#10b981" /> SSL Encrypted
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <CreditCard size={16} color="#6366f1" /> Razorpay Ready
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <BrainCircuit size={16} color="#7c3aed" /> Powered by Gemini AI
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Sparkles size={16} color="#f59e0b" /> Instant activation
          </div>
        </div>
      </div>

    </div>
  );
}
