'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { datasetHub, DatasetEntry } from '@/lib/reviewData';

const accessStyle = {
  Free:         { color: '#00FF88', bg: 'rgba(0,255,136,0.1)',  border: 'rgba(0,255,136,0.3)'  },
  Subscription: { color: '#FBB924', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)' },
  Request:      { color: '#00D4FF', bg: 'rgba(0,212,255,0.1)',  border: 'rgba(0,212,255,0.3)'  },
};

const categories = Array.from(new Set(datasetHub.map(d => d.category)));

function DataCard({ d, open, onToggle }: { d: DatasetEntry; open: boolean; onToggle: () => void }) {
  const ac = accessStyle[d.access];
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${open ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
      <button className="w-full text-left px-6 py-5 flex items-start gap-4" onClick={onToggle}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl font-black"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
          {d.access === 'Free' ? '🆓' : d.access === 'Subscription' ? '💳' : '📬'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: ac.bg, color: ac.color, border: `1px solid ${ac.border}` }}>
              {d.access}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#8BA3B8', border: '1px solid rgba(255,255,255,0.08)' }}>
              {d.category}
            </span>
          </div>
          <h3 className="font-black text-base leading-snug" style={{ color: '#E8F4FD' }}>{d.name}</h3>
          <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>{d.coverage} · {d.frequency}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-black" style={{ color: '#00D4FF' }}>{d.papers.toLocaleString()}</p>
          <p className="text-xs" style={{ color: '#8BA3B8' }}>papers use this</p>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-sm leading-relaxed pt-4" style={{ color: '#8BA3B8' }}>{d.description}</p>

          {/* Variables */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Key Variables</p>
            <div className="flex flex-wrap gap-2">
              {d.variables.map(v => (
                <span key={v} className="text-xs px-2.5 py-1 rounded-lg font-mono"
                  style={{ background: 'rgba(0,212,255,0.07)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Access info */}
            <div className="p-4 rounded-xl" style={{ background: `${ac.bg}80`, border: `1px solid ${ac.border}` }}>
              <p className="text-xs font-semibold mb-2" style={{ color: ac.color }}>Access & Format</p>
              <p className="text-sm" style={{ color: '#E8F4FD' }}>
                <strong>Format:</strong> {d.format}
              </p>
              <p className="text-sm mt-1 font-mono text-xs" style={{ color: '#8BA3B8' }}>{d.url}</p>
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Tags</p>
              <div className="flex flex-wrap gap-2">
                {d.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#8BA3B8', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DatasetsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [accessFilter, setAccessFilter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = datasetHub.filter(d => {
    if (activeCategory && d.category !== activeCategory) return false;
    if (accessFilter && d.access !== accessFilter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.variables.some(v => v.toLowerCase().includes(q)) ||
      d.tags.some(t => t.toLowerCase().includes(q));
  });

  const freeCount = datasetHub.filter(d => d.access === 'Free').length;

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Dataset Hub</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>🗄 Dataset Hub</h1>
        <p className="max-w-xl text-base leading-relaxed mb-6" style={{ color: '#8BA3B8' }}>
          Curated repository of research datasets for banking, monetary economics, governance, and SSA finance. Includes variables, coverage, access instructions, and usage statistics.
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <div>
            <p className="text-2xl font-black" style={{ color: '#00D4FF' }}>{datasetHub.length}</p>
            <p className="text-xs" style={{ color: '#8BA3B8' }}>datasets indexed</p>
          </div>
          <div>
            <p className="text-2xl font-black" style={{ color: '#00FF88' }}>{freeCount}</p>
            <p className="text-xs" style={{ color: '#8BA3B8' }}>free to access</p>
          </div>
          <div>
            <p className="text-2xl font-black" style={{ color: '#FBB924' }}>
              {datasetHub.reduce((s, d) => s + d.papers, 0).toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: '#8BA3B8' }}>total citing papers</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center rounded-2xl overflow-hidden mb-5"
          style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)' }}
          onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
          onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)')}>
          <span className="pl-4 text-base" style={{ color: '#00D4FF' }}>🔍</span>
          <input
            className="flex-1 px-3 py-3.5 bg-transparent outline-none text-sm"
            style={{ color: '#E8F4FD' }}
            placeholder="Search datasets, variables, tags… e.g. Z-Score, governance, SSA"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[null, 'Free', 'Subscription', 'Request'].map(a => (
            <button key={a ?? 'all'}
              onClick={() => setAccessFilter(a)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: accessFilter === a ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${accessFilter === a ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: accessFilter === a ? '#00D4FF' : '#8BA3B8',
              }}>
              {a ?? 'All Access Types'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveCategory(null)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: !activeCategory ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${!activeCategory ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
              color: !activeCategory ? '#00D4FF' : '#8BA3B8',
            }}>
            All Categories
          </button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: activeCategory === cat ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeCategory === cat ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: activeCategory === cat ? '#00D4FF' : '#8BA3B8',
              }}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs mb-4" style={{ color: '#8BA3B8' }}>{filtered.length} dataset{filtered.length !== 1 ? 's' : ''}</p>

        <div className="space-y-4">
          {filtered.map(d => (
            <DataCard key={d.name} d={d} open={expandedId === d.name}
              onToggle={() => setExpandedId(id => id === d.name ? null : d.name)} />
          ))}
        </div>

        <div className="mt-10 flex gap-4">
          <Link href="/variables"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            📊 Browse Variables →
          </Link>
        </div>
      </div>
    </div>
  );
}
