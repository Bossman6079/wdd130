'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getReport } from '@/lib/mockData';
import { trendingTopics } from '@/lib/mockData';

const paradigmColors: Record<string, string> = {
  'Theoretical Foundation': '#A855F7',
  'Regulatory Architecture': '#00D4FF',
  'Crisis & Learning': '#EF4444',
  'Advanced Risk Measurement': '#FBB924',
  'Paradigm Disruption': '#EF4444',
  'Post-Crisis Reform': '#00D4FF',
  'Digital Disruption': '#00FF88',
  'Contemporary Challenges': '#FF6B35',
  'Political Economy Foundation': '#A855F7',
  'Theoretical Breakthrough': '#00D4FF',
  'Institutional Design': '#FBB924',
  'Empirical Confirmation': '#00FF88',
  'Policy Adoption Wave': '#00D4FF',
  'Crisis Reappraisal': '#EF4444',
  'Governance & Legitimacy': '#A855F7',
  'Contemporary Test': '#FF6B35',
  'Foundation': '#A855F7',
  'Empirical Turn': '#00D4FF',
  'Methodological Advance': '#FBB924',
  'Nuanced Understanding': '#00FF88',
  'Contemporary Disruption': '#FF6B35',
};

export default function TimelinePage() {
  const [field, setField] = useState('Financial Stability');
  const [visible, setVisible] = useState(0);
  const report = getReport(field);

  useEffect(() => {
    setVisible(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= report.timeline.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [field, report.timeline.length]);

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span>
          <span>Research Evolution Timeline</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>📅 Evolution Timeline</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Watch a research field evolve decade by decade — from foundational theories to contemporary disruptions.
        </p>

        {/* Field selector */}
        <div className="flex flex-wrap gap-2 mb-12">
          {trendingTopics.map(t => (
            <button
              key={t.name}
              onClick={() => setField(t.name)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: field === t.name ? 'rgba(0,212,255,0.12)' : 'rgba(13,27,42,0.6)',
                border: `1px solid ${field === t.name ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: field === t.name ? '#00D4FF' : '#8BA3B8',
              }}>
              {t.name}
            </button>
          ))}
        </div>

        {/* Title + subtitle */}
        <div className="mb-12 p-6 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.15)' }}>
          <h2 className="text-2xl font-black mb-1" style={{ color: '#E8F4FD' }}>{report.topic}</h2>
          <p style={{ color: '#8BA3B8' }} className="text-sm">{report.subtitle}</p>
          <div className="flex gap-6 mt-4">
            <div>
              <p className="text-2xl font-black" style={{ color: '#00D4FF' }}>{report.timeline.length}</p>
              <p className="text-xs" style={{ color: '#8BA3B8' }}>paradigm shifts</p>
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: '#00FF88' }}>{report.paperCount.toLocaleString()}</p>
              <p className="text-xs" style={{ color: '#8BA3B8' }}>papers indexed</p>
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: '#A855F7' }}>
                {report.timeline[0]?.year.split('–')[0] ?? '1970'}
              </p>
              <p className="text-xs" style={{ color: '#8BA3B8' }}>field origin</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.3), rgba(123,47,190,0.3))' }} />

          <div className="space-y-0">
            {report.timeline.map((entry, i) => {
              const color = paradigmColors[entry.paradigm] ?? '#00D4FF';
              const isLeft = i % 2 === 0;
              const show = i < visible;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 md:gap-0 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 0.05}s` }}>

                  {/* Mobile: simple left-aligned timeline */}
                  <div className="md:hidden flex gap-4 items-start w-full py-4 pl-4 border-l-2"
                    style={{ borderColor: color }}>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-sm font-black font-mono" style={{ color }}>{entry.year}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${color}12`, color, border: `1px solid ${color}30` }}>
                          {entry.paradigm}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#E8F4FD' }}>{entry.development}</p>
                    </div>
                  </div>

                  {/* Desktop: alternating left/right */}
                  <div className={`hidden md:flex w-full items-center ${isLeft ? '' : 'flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`w-5/12 ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                      <div className={`p-5 rounded-2xl mb-4 inline-block w-full transition-all hover:scale-[1.01]`}
                        style={{ background: 'rgba(13,27,42,0.8)', border: `1px solid ${color}30` }}>
                        <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'} flex-wrap`}>
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                            style={{ background: `${color}12`, color, border: `1px solid ${color}30` }}>
                            {entry.paradigm}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#E8F4FD' }}>{entry.development}</p>
                      </div>
                    </div>

                    {/* Center dot + year */}
                    <div className="w-2/12 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black z-10 border-2"
                        style={{ background: '#050B18', borderColor: color, color }}>
                        {i + 1}
                      </div>
                      <span className="text-xs font-mono mt-1 font-bold" style={{ color }}>{entry.year}</span>
                    </div>

                    {/* Empty right/left */}
                    <div className="w-5/12" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* End cap */}
          <div className="hidden md:flex items-center justify-center mt-8">
            <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#00D4FF' }} />
          </div>
        </div>

        {/* Paradigm legend */}
        <div className="mt-16 p-6 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#8BA3B8' }}>Paradigm Legend</p>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(report.timeline.map(e => e.paradigm))).map(p => {
              const c = paradigmColors[p] ?? '#00D4FF';
              return (
                <div key={p} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  <span className="text-xs" style={{ color: '#8BA3B8' }}>{p}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link href={`/research?q=${encodeURIComponent(field)}`}
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            Full Research Report →
          </Link>
          <Link href={`/graph?q=${encodeURIComponent(field)}`}
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
            🕸 Knowledge Graph →
          </Link>
        </div>
      </div>
    </div>
  );
}
