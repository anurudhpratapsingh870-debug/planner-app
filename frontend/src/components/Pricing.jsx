import React, { useState } from 'react';
import { Check, X, Crown, Zap, Users, BrainCircuit, Shield, CreditCard, Star, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Get started with basic planning',
    features: [
      { text: 'Up to 25 tasks', included: true },
      { text: '3 Planner modules', included: true },
      { text: 'Calendar view', included: true },
      { text: 'Basic timeline', included: true },
      { text: 'AI Planning', included: false },
      { text: 'Finance tracker', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Current Plan',
    highlighted: false,
    icon: <Star size={24} />,
    color: 'var(--text-secondary)',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '799',
    currency: '₹',
    period: '/month',
    description: 'Unlock AI-powered autonomous planning',
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
    cta: 'Upgrade to Pro',
    highlighted: true,
    icon: <Zap size={24} />,
    color: 'var(--accent-indigo)',
    badge: 'Most Popular'
  },
  {
    id: 'team',
    name: 'Team',
    price: '1,599',
    currency: '₹',
    period: '/month',
    description: 'Collaboration for teams & startups',
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
    cta: 'Start Team Trial',
    highlighted: false,
    icon: <Users size={24} />,
    color: 'var(--accent-green)',
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleSubscribe = (planId) => {
    if (planId === 'free') return;
    
    // Razorpay integration placeholder
    // When you add your Razorpay key, this will trigger the payment flow
    alert(`Payment integration with Razorpay will be activated here.\n\nPlan: ${planId.toUpperCase()}\nAmount: ₹${planId === 'pro' ? '799' : '1,599'}/month\n\nTo enable payments:\n1. Add VITE_RAZORPAY_KEY_ID to your .env\n2. Include Razorpay script in index.html\n3. This button will open the Razorpay checkout modal.`);
  };

  return (
    <div className="page-content" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '20px', color: 'var(--accent-indigo)', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
          <Crown size={14} /> Pricing Plans
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>Choose Your Plan</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          Start free. Upgrade when you need AI-powered autonomous planning, finance tracking, and team collaboration.
        </p>

        {/* Billing Toggle */}
        <div style={{ display: 'inline-flex', marginTop: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setBillingCycle('monthly')}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: billingCycle === 'monthly' ? 'var(--bg-primary)' : 'transparent', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none' }}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: billingCycle === 'yearly' ? 'var(--bg-primary)' : 'transparent', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: billingCycle === 'yearly' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: billingCycle === 'yearly' ? 'var(--shadow-sm)' : 'none' }}
          >
            Yearly <span style={{ color: 'var(--success)', fontSize: '11px', fontWeight: 700 }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
        {plans.map(plan => (
          <div 
            key={plan.id}
            style={{ 
              background: 'var(--bg-primary)', 
              borderRadius: '20px', 
              padding: plan.highlighted ? '32px' : '28px', 
              border: plan.highlighted ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
              boxShadow: plan.highlighted ? '0 20px 60px rgba(99, 102, 241, 0.15)' : 'var(--shadow-sm)',
              position: 'relative',
              transform: plan.highlighted ? 'scale(1.04)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {plan.badge && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', background: 'var(--accent-indigo)', color: '#fff', borderRadius: '20px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {plan.badge}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${plan.color}15`, color: plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {plan.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{plan.name}</h3>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              {plan.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
              {plan.currency && <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-secondary)' }}>{plan.currency}</span>}
              <span style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-2px' }}>
                {billingCycle === 'yearly' && plan.price !== '0' 
                  ? Math.round(parseInt(plan.price.replace(',', '')) * 0.8).toLocaleString('en-IN')
                  : plan.price
                }
              </span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{plan.period}</span>
            </div>

            <button 
              onClick={() => handleSubscribe(plan.id)}
              style={{ 
                width: '100%', padding: '14px', borderRadius: '12px', border: 'none', 
                background: plan.highlighted ? 'var(--accent-indigo)' : 'var(--bg-secondary)', 
                color: plan.highlighted ? '#fff' : 'var(--text-primary)',
                fontWeight: 700, fontSize: '14px', cursor: plan.id === 'free' ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: plan.highlighted ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none',
                transition: 'all 0.2s', opacity: plan.id === 'free' ? 0.6 : 1
              }}
            >
              {plan.id === 'free' ? plan.cta : <>{plan.cta} <ArrowRight size={16} /></>}
            </button>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                  {f.included 
                    ? <Check size={16} color="var(--success)" strokeWidth={3} /> 
                    : <X size={16} color="var(--text-muted)" strokeWidth={2} />
                  }
                  <span style={{ color: f.included ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: f.included ? 500 : 400 }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Trust Bar */}
      <div style={{ textAlign: 'center', marginTop: '48px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Shield size={16} color="var(--success)" /> SSL Encrypted
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <CreditCard size={16} color="var(--accent-indigo)" /> Powered by Razorpay
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <BrainCircuit size={16} color="var(--accent-purple)" /> AI by Google Gemini
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Star size={16} color="var(--accent-amber)" /> Cancel anytime
          </div>
        </div>
      </div>

    </div>
  );
}
