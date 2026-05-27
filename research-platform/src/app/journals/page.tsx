'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { journalDatabase, JournalEntry } from '@/lib/reviewData';

const quartileColor: Record<string, string> = { Q1: '#00FF88', Q2: '#00D4FF', Q3: '#FBB924', Q4: '#8BA3B8' };
const accessColors = { Free: '#00FF88', Subscription: '#FBB924', Request: '#00D4FF' };

function JournalCard({ j, open, onToggle }: { j: JournalEntry; open: boolean; onToggle: () => void }) {
  const qc = quartileColor[j.quartile] ?? '#8BA3B8';
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${open ? `${qc}35` : 'rgba(255,255,255,0.06)'}` }}>
      <button className="w-full text-left px-6 py-5" onClick={onToggle}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-black text-xs px-2.5 py-0.5 rounded-full"
                style={{ background: `${qc}12`, color: qc, border: `1px solid ${qc}30` }}>
                {j.quartile}
              </span>
              <code className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF' }}>
                {j.abbreviation}
              </code>
            </div>
            <h3 className="font-black text-base" style={{ color: '#E8F4FD' }}>{j.name}</h3>
            <p className="text-xs mt-1 line-clamp-1" style={{ color: '#8BA3B8' }}>{j.scope}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-black" style={{ color: qc }}>{j.impactFactor}</p>
            <p className="text-xs" style={{ color: '#8BA3B8' }}>Impact Factor</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: '#8BA3B8' }}>Accept rate:</span>
            <span className="text-xs font-bold" style={{ color: j.avgAcceptanceRate < 15 ? '#EF4444' : '#FBB924' }}>
              {j.avgAcceptanceRate}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: '#8BA3B8' }}>Review:</span>
            <span className="text-xs font-bold" style={{ color: '#00D4FF' }}>{j.avgReviewTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: '#8BA3B8' }}>Limit:</span>
            <span className="text-xs font-bold" style={{ color: '#E8F4FD' }}>{j.wordLimit}</span>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {/* Topic fit */}
          <div className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Best Topic Fit</p>
            <div className="flex flex-wrap gap-2">
              {j.topicFit.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: `${qc}10`, color: qc, border: `1px solid ${qc}25` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Methods */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Common Methodologies</p>
              <div className="flex flex-wrap gap-1.5">
                {j.methodologies.map(m => (
                  <span key={m} className="text-xs px-2 py-0.5 rounded-md font-mono"
                    style={{ background: 'rgba(251,191,36,0.08)', color: '#FBB924', border: '1px solid rgba(251,191,36,0.2)' }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Submission info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Submission Details</p>
              <div className="space-y-1.5">
                <p className="text-xs" style={{ color: '#8BA3B8' }}>Citation style: <span style={{ color: '#E8F4FD' }}>{j.citationStyle}</span></p>
                <p className="text-xs" style={{ color: '#8BA3B8' }}>Word limit: <span style={{ color: '#E8F4FD' }}>{j.wordLimit}</span></p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-4 rounded-xl" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#00D4FF' }}>💡 Editorial Note</p>
            <p className="text-sm" style={{ color: '#8BA3B8' }}>{j.notes}</p>
          </div>

          {/* Acceptance difficulty meter */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs" style={{ color: '#8BA3B8' }}>Publication difficulty</p>
              <p className="text-xs font-bold" style={{ color: j.avgAcceptanceRate < 15 ? '#EF4444' : j.avgAcceptanceRate < 25 ? '#FBB924' : '#00FF88' }}>
                {j.avgAcceptanceRate < 15 ? 'Very Competitive' : j.avgAcceptanceRate < 25 ? 'Competitive' : 'Accessible'}
              </p>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="h-2 rounded-full"
                style={{
                  width: `${100 - j.avgAcceptanceRate * 2}%`,
                  background: j.avgAcceptanceRate < 15 ? '#EF4444' : j.avgAcceptanceRate < 25 ? '#FBB924' : '#00FF88',
                }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JournalsPage() {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterQ, setFilterQ] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'if' | 'accept' | 'speed'>('if');

  const filtered = journalDatabase
    .filter(j => {
      if (filterQ && j.quartile !== filterQ) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return j.name.toLowerCase().includes(q) ||
        j.scope.toLowerCase().includes(q) ||
        j.topicFit.some(t => t.toLowerCase().includes(q)) ||
        j.methodologies.some(m => m.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sortBy === 'if') return b.impactFactor - a.impactFactor;
      if (sortBy === 'accept') return b.avgAcceptanceRate - a.avgAcceptanceRate;
      return 0;
    });

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Journal Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>📰 Journal Intelligence</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Find the right journal for your research. Compare impact factors, acceptance rates, topic fit, preferred methodologies, and submission timelines.
        </p>

        {/* Search + filters */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 flex items-center rounded-2xl overflow-hidden"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)' }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
            onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)')}>
            <span className="pl-4 text-base" style={{ color: '#00D4FF' }}>🔍</span>
            <input
              className="flex-1 px-3 py-3.5 bg-transparent outline-none text-sm"
              style={{ color: '#E8F4FD' }}
              placeholder="Search by topic, methodology, journal name…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'if' | 'accept' | 'speed')}>
            <option value="if">Sort: Impact Factor</option>
            <option value="accept">Sort: Acceptance Rate</option>
          </select>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {[null, 'Q1', 'Q2'].map(q => (
            <button key={q ?? 'all'}
              onClick={() => setFilterQ(q)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: filterQ === q ? `${quartileColor[q ?? ''] ?? 'rgba(0,212,255,0.12)'}12` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${filterQ === q ? (quartileColor[q ?? ''] ?? '#00D4FF') + '50' : 'rgba(255,255,255,0.08)'}`,
                color: filterQ === q ? (quartileColor[q ?? ''] ?? '#00D4FF') : '#8BA3B8',
              }}>
              {q ?? 'All Quartiles'} ({q ? journalDatabase.filter(j => j.quartile === q).length : journalDatabase.length})
            </button>
          ))}
        </div>

        <p className="text-xs mb-4" style={{ color: '#8BA3B8' }}>{filtered.length} journal{filtered.length !== 1 ? 's' : ''}</p>
        <div className="space-y-4">
          {filtered.map(j => (
            <JournalCard
              key={j.abbreviation}
              j={j}
              open={expandedId === j.abbreviation}
              onToggle={() => setExpandedId(id => id === j.abbreviation ? null : j.abbreviation)}
            />
          ))}
        </div>

        <div className="mt-10 flex gap-4">
          <Link href="/methodology"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            ⚙️ Check Methodology Fit →
          </Link>
        </div>
      </div>
    </div>
  );
}
