'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { recommendMethodology, MethodResult, MethodologyRecommendation } from '@/lib/methodologyData';

function MethodCard({ rec, primary }: { rec: MethodologyRecommendation; primary?: boolean }) {
  const [open, setOpen] = useState(primary);
  const rankColor = rec.rank === 'Primary' ? '#00FF88' : rec.rank === 'Alternative' ? '#00D4FF' : '#FBB924';
  const barColor = rec.suitability >= 90 ? '#00FF88' : rec.suitability >= 75 ? '#00D4FF' : '#FBB924';

  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ background: 'rgba(13,27,42,0.8)', border: `1px solid ${primary ? 'rgba(0,255,136,0.35)' : 'rgba(0,212,255,0.15)'}` }}>
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full"
              style={{ background: `${rankColor}15`, color: rankColor, border: `1px solid ${rankColor}40` }}>
              {rec.rank}
            </span>
            {primary && <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,255,136,0.08)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }}>
              ★ Recommended
            </span>}
          </div>
          <h3 className="font-black text-base" style={{ color: '#E8F4FD' }}>{rec.name}</h3>
          <p className="text-xs mt-0.5 truncate" style={{ color: '#8BA3B8' }}>{rec.fullName}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xl font-black mb-1" style={{ color: barColor }}>{rec.suitability}%</div>
          <div className="w-20 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-1.5 rounded-full" style={{ width: `${rec.suitability}%`, background: barColor }} />
          </div>
          <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>fit score</p>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-sm leading-relaxed pt-4" style={{ color: '#8BA3B8' }}>{rec.rationale}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Key Assumptions</p>
              <ul className="space-y-1.5">
                {rec.assumptions.map((a, i) => (
                  <li key={i} className="flex gap-2 text-xs" style={{ color: '#E8F4FD' }}>
                    <span style={{ color: '#00D4FF' }}>✓</span>{a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Diagnostic Tests</p>
              <ul className="space-y-1.5">
                {rec.diagnostics.map((d, i) => (
                  <li key={i} className="flex gap-2 text-xs" style={{ color: '#E8F4FD' }}>
                    <span style={{ color: '#FBB924' }}>→</span>{d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Software</p>
              <div className="flex flex-wrap gap-1.5">
                {rec.software.map((s, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-md font-mono"
                    style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Common Pitfalls</p>
              <ul className="space-y-1.5">
                {rec.pitfalls.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs" style={{ color: '#E8F4FD' }}>
                    <span style={{ color: '#EF4444' }}>⚠</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Key References</p>
            <div className="flex flex-wrap gap-2">
              {rec.references.map((r, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-lg italic"
                  style={{ background: 'rgba(255,107,53,0.08)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.2)' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MethodologyPage() {
  const [dataType, setDataType] = useState('panel');
  const [panelDim, setPanelDim] = useState('large-N-small-T');
  const [endogeneity, setEndogeneity] = useState(true);
  const [timeSeries, setTimeSeries] = useState(false);
  const [policyEval, setPolicyEval] = useState(false);
  const [sampleSize, setSampleSize] = useState('medium');
  const [depVar, setDepVar] = useState('');
  const [result, setResult] = useState<MethodResult | null>(null);
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(recommendMethodology({ dataType, panelDimension: panelDim, endogeneity, timeSeries, policyEval, sampleSize, depVar }));
      setLoading(false);
    }, 1200);
  };

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center justify-between gap-4 p-4 rounded-xl cursor-pointer"
      style={{ background: value ? 'rgba(0,212,255,0.06)' : 'rgba(13,27,42,0.5)', border: `1px solid ${value ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
      <span className="text-sm" style={{ color: value ? '#E8F4FD' : '#8BA3B8' }}>{label}</span>
      <div className="relative w-10 h-5 rounded-full transition-all shrink-0"
        style={{ background: value ? '#00D4FF' : 'rgba(255,255,255,0.1)' }}>
        <div className="absolute top-0.5 h-4 w-4 rounded-full transition-all"
          style={{ left: value ? '22px' : '2px', background: '#050B18' }} />
        <input type="checkbox" className="hidden" checked={value} onChange={e => onChange(e.target.checked)} />
      </div>
    </label>
  );

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span>
          <span>Methodology Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>⚙️ Methodology Intelligence</h1>
        <p className="max-w-xl text-base leading-relaxed mb-10" style={{ color: '#8BA3B8' }}>
          Describe your data structure and research design. The AI recommends the optimal econometric method with assumptions, diagnostics, and literature support.
        </p>

        {/* Input panel */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.15)' }}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#8BA3B8' }}>Data Type</label>
              <div className="flex gap-2">
                {['panel', 'time-series', 'cross-section'].map(t => (
                  <button key={t} onClick={() => setDataType(t)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all"
                    style={{
                      background: dataType === t ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${dataType === t ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      color: dataType === t ? '#00D4FF' : '#8BA3B8',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#8BA3B8' }}>Panel Dimension (if panel)</label>
              <div className="flex gap-2">
                {[['large-N-small-T', 'Large-N Short-T'], ['balanced', 'Balanced Long']].map(([val, label]) => (
                  <button key={val} onClick={() => setPanelDim(val)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: panelDim === val ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${panelDim === val ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      color: panelDim === val ? '#00D4FF' : '#8BA3B8',
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#8BA3B8' }}>Sample Size</label>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map(s => (
                  <button key={s} onClick={() => setSampleSize(s)}
                    className="flex-1 py-2.5 rounded-xl text-sm capitalize transition-all"
                    style={{
                      background: sampleSize === s ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${sampleSize === s ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: sampleSize === s ? '#FBB924' : '#8BA3B8',
                    }}>
                    {s === 'small' ? '< 100' : s === 'medium' ? '100–500' : '500+'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#8BA3B8' }}>Dependent Variable (optional)</label>
              <input
                className="w-full px-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8F4FD' }}
                placeholder="e.g. Bank Z-Score, Inflation Rate…"
                value={depVar}
                onChange={e => setDepVar(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <Toggle label="Endogeneity concerns" value={endogeneity} onChange={setEndogeneity} />
            <Toggle label="Time series / cointegration" value={timeSeries} onChange={setTimeSeries} />
            <Toggle label="Policy evaluation (DiD/IV)" value={policyEval} onChange={setPolicyEval} />
          </div>

          <button onClick={run} disabled={loading}
            className="w-full py-4 rounded-xl font-black text-base transition-all hover:scale-[1.01] disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            {loading ? '⚡ Analyzing design…' : '⚙️ Get Methodology Recommendation'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-16">
            <div className="w-12 h-12 rounded-full border-2 border-transparent animate-spin mb-4"
              style={{ borderTopColor: '#00D4FF', borderRightColor: '#7B2FBE' }} />
            <p className="text-sm" style={{ color: '#00D4FF' }}>Matching your design to econometric literature…</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Summary */}
            <div className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.25)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#00FF88' }}>AI Assessment</p>
              <p className="text-sm leading-relaxed" style={{ color: '#E8F4FD' }}>{result.summary}</p>
            </div>

            {/* Primary */}
            <h2 className="text-lg font-black mb-4" style={{ color: '#E8F4FD' }}>Primary Recommendation</h2>
            <div className="mb-6">
              <MethodCard rec={result.primary} primary />
            </div>

            {/* Alternatives */}
            {result.alternatives.length > 0 && (
              <>
                <h2 className="text-lg font-black mb-4" style={{ color: '#E8F4FD' }}>Alternatives & Robustness Checks</h2>
                <div className="space-y-4 mb-8">
                  {result.alternatives.map((alt, i) => <MethodCard key={i} rec={alt} />)}
                </div>
              </>
            )}

            {/* Concerns */}
            {result.concerns.length > 0 && (
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.25)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#FBB924' }}>⚠ Watch Out For</p>
                <ul className="space-y-2">
                  {result.concerns.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: '#8BA3B8' }}>
                      <span style={{ color: '#FBB924' }}>→</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <Link href="/chat"
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                Discuss with AI →
              </Link>
              <Link href="/variables"
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.15)', color: '#8BA3B8' }}>
                Browse Variables →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
