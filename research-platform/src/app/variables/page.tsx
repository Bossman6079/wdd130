'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { searchVariables, VariableEntry, variableDatabase } from '@/lib/methodologyData';

const categoryColors: Record<string, string> = {
  'Financial Stability': '#00D4FF',
  'Monetary Policy': '#A855F7',
  'Financial Development': '#FBB924',
  'Governance': '#00FF88',
};

function VariableCard({ v, expanded, onToggle }: { v: VariableEntry; expanded: boolean; onToggle: () => void }) {
  const color = categoryColors[v.category] ?? '#00D4FF';
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${expanded ? `${color}40` : 'rgba(255,255,255,0.06)'}` }}>
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={onToggle}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: `${color}12`, color, border: `1px solid ${color}30` }}>
              {v.category}
            </span>
          </div>
          <h3 className="font-black text-base" style={{ color: '#E8F4FD' }}>{v.name}</h3>
          <p className="text-xs mt-1 line-clamp-2" style={{ color: '#8BA3B8' }}>{v.definition}</p>
        </div>
        <div className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full transition-all"
          style={{ background: expanded ? `${color}15` : 'transparent', color }}>
          {expanded ? '−' : '+'}
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {/* Proxies */}
          <div className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Measurement Proxies</p>
            <div className="space-y-3">
              {v.proxies.map((p, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{p.label}</span>
                    <code className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: `${color}15`, color }}>
                      {p.formula}
                    </code>
                  </div>
                  <p className="text-xs" style={{ color: '#8BA3B8' }}>{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Strengths */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Strengths</p>
              <ul className="space-y-2">
                {v.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: '#E8F4FD' }}>
                    <span style={{ color: '#00FF88' }}>✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            {/* Weaknesses */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Weaknesses</p>
              <ul className="space-y-2">
                {v.weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: '#E8F4FD' }}>
                    <span style={{ color: '#EF4444' }}>✗</span>{w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Datasets */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Common Datasets</p>
            <div className="space-y-2">
              {v.datasets.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#E8F4FD' }}>{d.name}</p>
                    <p className="text-xs" style={{ color: '#8BA3B8' }}>{d.coverage}</p>
                  </div>
                  <code className="text-xs px-2 py-0.5 rounded font-mono shrink-0"
                    style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF' }}>
                    {d.url_hint}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Papers */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Key Papers Using This Variable</p>
            <div className="space-y-2">
              {v.papers.map((p, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span style={{ color: '#FF6B35' }} className="shrink-0">📄</span>
                  <div>
                    <span className="italic" style={{ color: '#FF6B35' }}>{p.citation}</span>
                    <span style={{ color: '#8BA3B8' }}> — {p.use}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {v.related.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Related Variables</p>
              <div className="flex flex-wrap gap-2">
                {v.related.map((r, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function VariablesPage() {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(variableDatabase.map(v => v.category)));

  const filtered = searchVariables(query).filter(v =>
    activeCategory ? v.category === activeCategory : true
  );

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span>
          <span>Variable Intelligence Database</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>📊 Variable Database</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Search any research variable. Get proxies, formulas, strengths, weaknesses, datasets, and the key papers that use it.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#00D4FF' }}>⚡</span>
          <input
            className="w-full pl-10 pr-5 py-4 rounded-2xl text-sm bg-transparent outline-none"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.25)', color: '#E8F4FD' }}
            placeholder="Search variables, proxies, or categories… e.g. bank stability, Z-score, inflation"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.25)')}
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: !activeCategory ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${!activeCategory ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
              color: !activeCategory ? '#00D4FF' : '#8BA3B8',
            }}>
            All ({variableDatabase.length})
          </button>
          {categories.map(cat => {
            const c = categoryColors[cat] ?? '#00D4FF';
            const count = variableDatabase.filter(v => v.category === cat).length;
            return (
              <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: activeCategory === cat ? `${c}12` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeCategory === cat ? `${c}50` : 'rgba(255,255,255,0.08)'}`,
                  color: activeCategory === cat ? c : '#8BA3B8',
                }}>
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-bold" style={{ color: '#E8F4FD' }}>No variables found</p>
            <p className="text-sm mt-1" style={{ color: '#8BA3B8' }}>Try a different term — e.g. "stability", "inflation", "governance"</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs" style={{ color: '#8BA3B8' }}>{filtered.length} variable{filtered.length !== 1 ? 's' : ''} found</p>
            {filtered.map(v => (
              <VariableCard
                key={v.name}
                v={v}
                expanded={expandedId === v.name}
                onToggle={() => setExpandedId(id => id === v.name ? null : v.name)}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex gap-4">
          <Link href="/methodology"
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            ⚙️ Get Methodology Advice →
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
