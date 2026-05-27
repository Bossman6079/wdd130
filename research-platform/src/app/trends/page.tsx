'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { emergingTrends, TrendEntry } from '@/lib/reviewData';

const statusConfig = {
  rising:   { label: 'Rising',   color: '#00FF88', icon: '↑', bg: 'rgba(0,255,136,0.08)'  },
  peaking:  { label: 'Peaking',  color: '#FBB924', icon: '◆', bg: 'rgba(251,191,36,0.08)' },
  declining:{ label: 'Declining',color: '#EF4444', icon: '↓', bg: 'rgba(239,68,68,0.08)'  },
  emerging: { label: 'Emerging', color: '#00D4FF', icon: '✦', bg: 'rgba(0,212,255,0.08)'  },
};

function TrendCard({ t, expanded, onToggle }: { t: TrendEntry; expanded: boolean; onToggle: () => void }) {
  const cfg = statusConfig[t.status];
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.005]"
      style={{ background: cfg.bg, border: `1px solid ${expanded ? cfg.color + '50' : cfg.color + '25'}` }}
      onClick={onToggle}>
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-base font-black" style={{ color: cfg.color }}>{cfg.icon}</span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                {cfg.label}
              </span>
              <span className="text-xs font-mono" style={{ color: '#8BA3B8' }}>{t.paperVelocity}</span>
            </div>
            <h3 className="font-black text-lg leading-snug" style={{ color: '#E8F4FD' }}>{t.topic}</h3>
            <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>{t.horizon}</p>
          </div>

          {/* Momentum gauge */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 56 56" className="w-full h-full">
                <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                <circle cx="28" cy="28" r="22" fill="none" stroke={cfg.color} strokeWidth="4"
                  strokeDasharray={`${(t.momentum / 100) * 138.2} 138.2`}
                  strokeDashoffset="34.6"
                  strokeLinecap="round" />
                <text x="28" y="28" textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontWeight="900" fill={cfg.color}>{t.momentum}</text>
              </svg>
            </div>
            <p className="text-xs" style={{ color: '#8BA3B8' }}>momentum</p>
          </div>
        </div>

        {/* Citation acceleration */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="h-1.5 rounded-full transition-all" style={{ width: `${Math.min(t.citationAcceleration * 15, 100)}%`, background: cfg.color }} />
          </div>
          <span className="text-xs font-mono shrink-0" style={{ color: cfg.color }}>
            ×{t.citationAcceleration} citation accel.
          </span>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6 space-y-5 border-t" style={{ borderColor: `${cfg.color}15` }}>
          <p className="text-sm leading-relaxed pt-4" style={{ color: '#8BA3B8' }}>{t.rationale}</p>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Key Drivers</p>
              <ul className="space-y-1.5">
                {t.keyDrivers.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: '#E8F4FD' }}>
                    <span style={{ color: cfg.color }}>→</span>{d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Related Topics</p>
              <div className="flex flex-wrap gap-2">
                {t.relatedTopics.map(r => (
                  <Link key={r} href={`/research?q=${encodeURIComponent(r)}`}
                    onClick={e => e.stopPropagation()}
                    className="text-xs px-2.5 py-1 rounded-full transition-all hover:scale-105"
                    style={{ background: `${cfg.color}10`, color: cfg.color, border: `1px solid ${cfg.color}25` }}>
                    {r}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrendsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter ? emergingTrends.filter(t => t.status === filter) : emergingTrends;
  const sorted = [...filtered].sort((a, b) => b.momentum - a.momentum);

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Emerging Trend Prediction</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>🚀 Emerging Trends</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          AI-tracked research momentum. See which topics are rising, peaking, or emerging — with citation acceleration scores and predicted time horizons.
        </p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {(Object.entries(statusConfig) as [string, typeof statusConfig[keyof typeof statusConfig]][]).map(([key, cfg]) => {
            const count = emergingTrends.filter(t => t.status === key).length;
            return (
              <button key={key} onClick={() => setFilter(filter === key ? null : key)}
                className="p-4 rounded-2xl text-center transition-all hover:scale-105"
                style={{
                  background: filter === key ? cfg.bg : 'rgba(13,27,42,0.7)',
                  border: `1px solid ${filter === key ? cfg.color + '50' : 'rgba(255,255,255,0.06)'}`,
                }}>
                <p className="text-3xl font-black" style={{ color: cfg.color }}>{cfg.icon} {count}</p>
                <p className="text-xs mt-1 font-semibold" style={{ color: cfg.color }}>{cfg.label}</p>
              </button>
            );
          })}
        </div>

        {/* Trend list */}
        <div className="space-y-4">
          {sorted.map(t => (
            <TrendCard
              key={t.topic}
              t={t}
              expanded={expanded === t.topic}
              onToggle={() => setExpanded(id => id === t.topic ? null : t.topic)}
            />
          ))}
        </div>

        {/* Top risers */}
        <div className="mt-12 p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
          <h2 className="font-black text-base mb-4" style={{ color: '#00D4FF' }}>⚡ Top Citation Accelerators</h2>
          <div className="space-y-3">
            {[...emergingTrends]
              .sort((a, b) => b.citationAcceleration - a.citationAcceleration)
              .slice(0, 4)
              .map((t, i) => {
                const cfg = statusConfig[t.status];
                return (
                  <div key={t.topic} className="flex items-center gap-4">
                    <span className="w-6 text-center font-black text-sm" style={{ color: '#8BA3B8' }}>#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: '#E8F4FD' }}>{t.topic}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          <div className="h-1.5 rounded-full"
                            style={{ width: `${Math.min(t.citationAcceleration * 15, 100)}%`, background: cfg.color }} />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-black shrink-0" style={{ color: cfg.color }}>
                      ×{t.citationAcceleration}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link href="/research?q=Climate+Finance"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            Explore Top Trend →
          </Link>
          <Link href="/chat"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
            💬 Ask the AI →
          </Link>
        </div>
      </div>
    </div>
  );
}
