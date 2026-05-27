'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getPapersDatabase, PaperWithField } from '@/lib/mockData';

const allPapers = getPapersDatabase();
const allFields = Array.from(new Set(allPapers.map(p => p.field)));

const SORT_OPTIONS = [
  { value: 'citations', label: 'Most Cited' },
  { value: 'year-desc', label: 'Newest First' },
  { value: 'year-asc', label: 'Oldest First' },
  { value: 'title', label: 'Alphabetical' },
] as const;
type SortKey = typeof SORT_OPTIONS[number]['value'];

function CitationBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00D4FF, #7B2FBE)' }} />
      </div>
      <span className="text-xs font-mono tabular-nums" style={{ color: '#8BA3B8', minWidth: '3rem', textAlign: 'right' }}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function PaperCard({ paper, maxCitations }: { paper: PaperWithField; maxCitations: number }) {
  return (
    <div className="p-5 rounded-2xl transition-all hover:scale-[1.005] group"
      style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${paper.fieldColor}18` }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-bold leading-snug flex-1 group-hover:text-white transition-colors"
          style={{ color: '#E8F4FD' }}>
          {paper.title}
        </h3>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full shrink-0"
          style={{ background: `${paper.fieldColor}12`, color: paper.fieldColor, border: `1px solid ${paper.fieldColor}30` }}>
          {paper.year}
        </span>
      </div>

      <p className="text-xs mb-1" style={{ color: '#8BA3B8' }}>{paper.authors}</p>
      <p className="text-xs italic mb-3" style={{ color: '#8BA3B8' }}>{paper.journal}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ background: `${paper.fieldColor}10`, color: paper.fieldColor, border: `1px solid ${paper.fieldColor}25` }}>
          {paper.field}
        </span>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8BA3B8' }}>
          <span style={{ color: '#00FF88' }}>★</span>
          <span className="font-mono font-bold" style={{ color: '#00FF88' }}>{paper.citations.toLocaleString()}</span>
          <span>citations</span>
        </div>
      </div>

      <CitationBar value={paper.citations} max={maxCitations} />
    </div>
  );
}

export default function PapersPage() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('citations');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [minCitations, setMinCitations] = useState('');

  const filtered = useMemo(() => {
    let papers = allPapers;

    if (activeField) papers = papers.filter(p => p.field === activeField);

    if (query.trim()) {
      const q = query.toLowerCase();
      papers = papers.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q) ||
        p.field.toLowerCase().includes(q)
      );
    }

    if (yearFrom) papers = papers.filter(p => p.year >= parseInt(yearFrom));
    if (yearTo) papers = papers.filter(p => p.year <= parseInt(yearTo));
    if (minCitations) papers = papers.filter(p => p.citations >= parseInt(minCitations));

    return [...papers].sort((a, b) => {
      if (sortKey === 'citations') return b.citations - a.citations;
      if (sortKey === 'year-desc') return b.year - a.year;
      if (sortKey === 'year-asc') return a.year - b.year;
      return a.title.localeCompare(b.title);
    });
  }, [query, sortKey, activeField, yearFrom, yearTo, minCitations]);

  const maxCitations = Math.max(...filtered.map(p => p.citations), 1);
  const totalCitations = allPapers.reduce((s, p) => s + p.citations, 0);

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Paper Database</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>📄 Paper Database</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Browse and search landmark papers across all research fields. Filter by topic, year, or citation count.
        </p>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Papers indexed', value: allPapers.length, color: '#00D4FF' },
            { label: 'Fields covered', value: allFields.length, color: '#A855F7' },
            { label: 'Total citations', value: `${(totalCitations / 1000).toFixed(0)}K+`, color: '#00FF88' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-2xl text-center"
              style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${s.color}20` }}>
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: '#8BA3B8' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <div className="w-56 shrink-0 space-y-5">
            {/* Sort */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Sort by</p>
              <div className="space-y-1">
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => setSortKey(opt.value)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs transition-all"
                    style={{
                      background: sortKey === opt.value ? 'rgba(0,212,255,0.1)' : 'transparent',
                      color: sortKey === opt.value ? '#00D4FF' : '#8BA3B8',
                      border: `1px solid ${sortKey === opt.value ? 'rgba(0,212,255,0.3)' : 'transparent'}`,
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Field filter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Field</p>
              <div className="space-y-1">
                <button onClick={() => setActiveField(null)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs transition-all"
                  style={{
                    background: !activeField ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: !activeField ? '#00D4FF' : '#8BA3B8',
                    border: `1px solid ${!activeField ? 'rgba(0,212,255,0.3)' : 'transparent'}`,
                  }}>
                  All Fields ({allPapers.length})
                </button>
                {allFields.map(f => {
                  const count = allPapers.filter(p => p.field === f).length;
                  const color = allPapers.find(p => p.field === f)?.fieldColor ?? '#8BA3B8';
                  return (
                    <button key={f} onClick={() => setActiveField(activeField === f ? null : f)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: activeField === f ? `${color}12` : 'transparent',
                        color: activeField === f ? color : '#8BA3B8',
                        border: `1px solid ${activeField === f ? `${color}35` : 'transparent'}`,
                      }}>
                      {f} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Year range */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Year range</p>
              <div className="flex gap-2">
                <input
                  className="w-full px-2 py-1.5 rounded-lg text-xs bg-transparent outline-none"
                  style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8F4FD' }}
                  placeholder="From"
                  value={yearFrom}
                  onChange={e => setYearFrom(e.target.value)}
                />
                <input
                  className="w-full px-2 py-1.5 rounded-lg text-xs bg-transparent outline-none"
                  style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8F4FD' }}
                  placeholder="To"
                  value={yearTo}
                  onChange={e => setYearTo(e.target.value)}
                />
              </div>
            </div>

            {/* Min citations */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Min citations</p>
              <input
                className="w-full px-3 py-2 rounded-xl text-xs bg-transparent outline-none"
                style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8F4FD' }}
                placeholder="e.g. 1000"
                value={minCitations}
                onChange={e => setMinCitations(e.target.value)}
              />
            </div>

            {/* Reset */}
            {(query || activeField || yearFrom || yearTo || minCitations) && (
              <button
                onClick={() => { setQuery(''); setActiveField(null); setYearFrom(''); setYearTo(''); setMinCitations(''); }}
                className="w-full py-2 rounded-xl text-xs transition-all"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                Clear all filters
              </button>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="flex items-center rounded-2xl overflow-hidden mb-5"
              style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)' }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
              onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)')}>
              <span className="pl-4 text-base" style={{ color: '#00D4FF' }}>🔍</span>
              <input
                className="flex-1 px-3 py-3.5 bg-transparent outline-none text-sm"
                style={{ color: '#E8F4FD' }}
                placeholder="Search papers by title, authors, journal, or field…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button className="pr-4 text-xs" style={{ color: '#8BA3B8' }} onClick={() => setQuery('')}>✕</button>
              )}
            </div>

            {/* Result count + view toggle */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color: '#8BA3B8' }}>
                <span className="font-bold" style={{ color: '#E8F4FD' }}>{filtered.length}</span> papers
                {activeField && <span> in <span style={{ color: allPapers.find(p => p.field === activeField)?.fieldColor }}>{activeField}</span></span>}
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: '#8BA3B8' }}>
                <span>Sorted by</span>
                <span style={{ color: '#00D4FF' }}>{SORT_OPTIONS.find(o => o.value === sortKey)?.label}</span>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center rounded-2xl"
                style={{ background: 'rgba(13,27,42,0.4)', border: '1px dashed rgba(255,255,255,0.08)' }}>
                <p className="text-4xl mb-3">📭</p>
                <p className="font-bold" style={{ color: '#E8F4FD' }}>No papers match your filters</p>
                <p className="text-sm mt-1" style={{ color: '#8BA3B8' }}>Try adjusting your search or clearing filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((p, i) => (
                  <PaperCard key={`${p.title}-${i}`} paper={p} maxCitations={maxCitations} />
                ))}
              </div>
            )}

            {/* CTA */}
            {filtered.length > 0 && (
              <div className="mt-8 p-5 rounded-2xl"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#E8F4FD' }}>Want the full synthesis?</p>
                <p className="text-xs mb-3" style={{ color: '#8BA3B8' }}>
                  The Research Engine pulls all papers into a structured report — theories, gaps, contradictions, and methodology recommendations.
                </p>
                <div className="flex gap-3 flex-wrap">
                  {(activeField ? [activeField] : allFields.slice(0, 3)).map(f => (
                    <Link key={f} href={`/research?q=${encodeURIComponent(f)}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                      Research {f} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
