'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getReport, ResearchReport } from '@/lib/mockData';

const typeColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  theories:       { bg: 'rgba(0,212,255,0.06)',  border: 'rgba(0,212,255,0.25)',  text: '#00D4FF',  icon: '🧠' },
  variables:      { bg: 'rgba(0,255,136,0.06)',  border: 'rgba(0,255,136,0.25)',  text: '#00FF88',  icon: '📊' },
  authors:        { bg: 'rgba(123,47,190,0.06)', border: 'rgba(123,47,190,0.3)',  text: '#A855F7',  icon: '👤' },
  papers:         { bg: 'rgba(255,107,53,0.06)', border: 'rgba(255,107,53,0.25)', text: '#FF6B35',  icon: '📄' },
  methodologies:  { bg: 'rgba(251,191,36,0.06)', border: 'rgba(251,191,36,0.25)', text: '#FBB924',  icon: '⚙️' },
  contradictions: { bg: 'rgba(239,68,68,0.06)',  border: 'rgba(239,68,68,0.25)',  text: '#EF4444',  icon: '⚔️' },
  gaps:           { bg: 'rgba(0,255,136,0.04)',  border: 'rgba(0,255,136,0.2)',   text: '#00FF88',  icon: '🔍' },
  timeline:       { bg: 'rgba(0,212,255,0.04)',  border: 'rgba(0,212,255,0.15)',  text: '#00D4FF',  icon: '📅' },
};

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
      {label}
    </span>
  );
}

function SeverityDot({ s }: { s: string }) {
  const c = s === 'High' ? '#EF4444' : s === 'Medium' ? '#FBB924' : '#00FF88';
  return <span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ background: c }} />;
}

export default function ResearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get('q') ?? 'Financial Stability';
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReport(null);
    const t = setTimeout(() => setReport(getReport(q)), 1400);
    return () => clearTimeout(t);
  }, [q]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`LEXIS Research Report: ${q}\n\n${window.location.href}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" className="hover:underline" style={{ color: '#00D4FF' }}>Home</Link>
          <span>/</span>
          <span>Research Intelligence</span>
          <span>/</span>
          <span style={{ color: '#E8F4FD' }}>{q}</span>
        </div>

        {!report ? (
          /* Loading state */
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: '#00D4FF', borderRightColor: '#7B2FBE' }} />
              <div className="absolute inset-2 w-12 h-12 rounded-full border-2 border-transparent animate-spin"
                style={{ borderBottomColor: '#00FF88', animationDirection: 'reverse', animationDuration: '0.8s' }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#00D4FF' }}>Synthesizing Intelligence</h2>
            <p style={{ color: '#8BA3B8' }}>Analyzing thousands of papers on <strong style={{ color: '#E8F4FD' }}>{q}</strong>…</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#E8F4FD' }}>{report.topic}</h1>
                <p className="text-base mb-3" style={{ color: '#8BA3B8' }}>{report.subtitle}</p>
                <span className="text-sm font-mono" style={{ color: '#00D4FF' }}>
                  {report.paperCount.toLocaleString()} papers synthesized · AI-generated report
                </span>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={handleCopy}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                  {copied ? '✓ Copied!' : '⎘ Copy Report'}
                </button>
                <Link href={`/graph?q=${encodeURIComponent(q)}`}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 inline-flex items-center"
                  style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                  View Graph →
                </Link>
              </div>
            </div>

            {/* 8-card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">

              {/* Theories */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.theories.bg, border: `1px solid ${typeColors.theories.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.theories.text }}>
                  {typeColors.theories.icon} Key Theories
                </h2>
                <div className="space-y-4">
                  {report.theories.map(t => (
                    <div key={t.name} className="border-l-2 pl-4" style={{ borderColor: typeColors.theories.border }}>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{t.name}</span>
                        <span className="text-xs font-mono" style={{ color: typeColors.theories.text }}>{t.author}, {t.year}</span>
                      </div>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: '#8BA3B8' }}>{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variables */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.variables.bg, border: `1px solid ${typeColors.variables.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.variables.text }}>
                  {typeColors.variables.icon} Core Variables
                </h2>
                <div className="space-y-3">
                  {report.variables.map(v => (
                    <div key={v.name} className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: typeColors.variables.text }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{v.name}</span>
                          <code className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{ background: 'rgba(0,255,136,0.1)', color: typeColors.variables.text }}>
                            {v.proxy}
                          </code>
                        </div>
                        <p className="text-sm" style={{ color: '#8BA3B8' }}>{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authors */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.authors.bg, border: `1px solid ${typeColors.authors.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.authors.text }}>
                  {typeColors.authors.icon} Leading Authors
                </h2>
                <div className="space-y-4">
                  {report.authors.map(a => (
                    <div key={a.name} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                        style={{ background: 'rgba(168,85,247,0.15)', color: typeColors.authors.text }}>
                        {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate" style={{ color: '#E8F4FD' }}>{a.name}</p>
                        <p className="text-xs truncate" style={{ color: '#8BA3B8' }}>{a.institution}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Chip label={`h-index: ${a.hIndex}`} color={typeColors.authors.text} />
                          <Chip label={a.country} color="#8BA3B8" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Papers */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.papers.bg, border: `1px solid ${typeColors.papers.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.papers.text }}>
                  {typeColors.papers.icon} Landmark Papers
                </h2>
                <div className="space-y-4">
                  {report.papers.map(p => (
                    <div key={p.title}>
                      <p className="font-semibold text-sm leading-snug" style={{ color: '#E8F4FD' }}>{p.title}</p>
                      <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>{p.authors} · {p.year}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Chip label={`${p.citations.toLocaleString()} citations`} color={typeColors.papers.text} />
                        <span className="text-xs italic" style={{ color: '#8BA3B8' }}>{p.journal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodologies */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.methodologies.bg, border: `1px solid ${typeColors.methodologies.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.methodologies.text }}>
                  {typeColors.methodologies.icon} Major Methodologies
                </h2>
                <div className="space-y-4">
                  {report.methodologies.map(m => (
                    <div key={m.name} className="flex gap-4">
                      <div className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-black text-xs text-center leading-tight"
                        style={{ background: 'rgba(251,191,36,0.1)', color: typeColors.methodologies.text, border: '1px solid rgba(251,191,36,0.2)' }}>
                        {m.name}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{m.fullName}</p>
                        <p className="text-sm mt-1" style={{ color: '#8BA3B8' }}>{m.useCase}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contradictions */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.contradictions.bg, border: `1px solid ${typeColors.contradictions.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.contradictions.text }}>
                  {typeColors.contradictions.icon} Contradictory Findings
                </h2>
                <div className="space-y-5">
                  {report.contradictions.map((c, i) => (
                    <div key={i}>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}>
                          <p style={{ color: '#00D4FF' }} className="font-semibold text-xs mb-1">{c.context1}</p>
                          <p style={{ color: '#E8F4FD' }} className="text-xs leading-relaxed">{c.finding1}</p>
                        </div>
                        <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <p style={{ color: '#EF4444' }} className="font-semibold text-xs mb-1">{c.context2}</p>
                          <p style={{ color: '#E8F4FD' }} className="text-xs leading-relaxed">{c.finding2}</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#FBB924' }}>💡 Why they differ:</p>
                        <p className="text-xs leading-relaxed" style={{ color: '#8BA3B8' }}>{c.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gaps */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.gaps.bg, border: `1px solid ${typeColors.gaps.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.gaps.text }}>
                  {typeColors.gaps.icon} Hidden Research Gaps
                </h2>
                <div className="space-y-4">
                  {report.gaps.map(g => (
                    <div key={g.title} className="p-4 rounded-xl" style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)' }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{g.title}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <SeverityDot s={g.severity} />
                          <span className="text-xs font-mono" style={{ color: '#8BA3B8' }}>{g.severity}</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: '#8BA3B8' }}>{g.description}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(0,255,136,0.1)' }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${g.opportunityScore}%`, background: 'linear-gradient(90deg, #00FF88, #00D4FF)' }} />
                        </div>
                        <span className="text-xs font-mono font-bold shrink-0" style={{ color: '#00FF88' }}>
                          {g.opportunityScore}% opp.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6 rounded-2xl" style={{ background: typeColors.timeline.bg, border: `1px solid ${typeColors.timeline.border}` }}>
                <h2 className="flex items-center gap-2 font-black text-lg mb-4" style={{ color: typeColors.timeline.text }}>
                  {typeColors.timeline.icon} Evolution Timeline
                </h2>
                <div className="relative">
                  <div className="absolute left-14 top-0 bottom-0 w-px" style={{ background: 'rgba(0,212,255,0.15)' }} />
                  <div className="space-y-4">
                    {report.timeline.map((entry, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-14 shrink-0 text-right">
                          <span className="text-xs font-mono font-bold" style={{ color: typeColors.timeline.text }}>
                            {entry.year}
                          </span>
                        </div>
                        <div className="relative pl-4 pb-1">
                          <div className="absolute -left-1 top-1.5 w-2.5 h-2.5 rounded-full border-2"
                            style={{ background: '#050B18', borderColor: '#00D4FF' }} />
                          <p className="text-xs font-semibold mb-0.5" style={{ color: '#E8F4FD' }}>{entry.development}</p>
                          <Chip label={entry.paradigm} color="#00D4FF" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href={`/graph?q=${encodeURIComponent(q)}`}
                className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                🕸 Explore Knowledge Graph
              </Link>
              <Link href="/gaps"
                className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00FF88' }}>
                🔍 Find Research Gaps
              </Link>
              <Link href="/"
                className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
                ← New Search
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
