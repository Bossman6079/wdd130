'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface GapResult {
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  opportunity: number;
  type: string;
}

const MOCK_GAPS: GapResult[] = [
  { title: 'Sub-Saharan Africa Regional Heterogeneity', description: 'Existing studies pool SSA countries despite vast institutional, legal, and economic diversity. Country-group specific evidence using cluster analysis remains sparse.', severity: 'High', opportunity: 93, type: 'Regional Gap' },
  { title: 'Non-Linear Threshold Effects', description: 'Most studies assume linear relationships. Panel smooth transition regression (PSTR) models identifying regime changes have rarely been applied in this domain.', severity: 'High', opportunity: 88, type: 'Methodological Gap' },
  { title: 'Gender-Disaggregated Analysis', description: 'The gendered dimensions of outcomes — differential access, impact heterogeneity, and policy responsiveness — are almost entirely absent from the empirical literature.', severity: 'Medium', opportunity: 76, type: 'Variable Gap' },
  { title: 'COVID-19 Structural Break Analysis', description: 'Post-pandemic evidence on how the 2020–2022 shock altered long-run relationships and structural parameters is emerging but limited.', severity: 'High', opportunity: 91, type: 'Temporal Gap' },
  { title: 'Interaction with Digital Financial Services', description: 'How mobile money penetration and fintech adoption moderate or mediate the focal relationship is an open and fast-growing question.', severity: 'Medium', opportunity: 85, type: 'Emerging Variable' },
];

const severityColor = { High: '#EF4444', Medium: '#FBB924', Low: '#00FF88' } as const;
const typeColor: Record<string, string> = {
  'Regional Gap': '#00D4FF',
  'Methodological Gap': '#A855F7',
  'Variable Gap': '#00FF88',
  'Temporal Gap': '#FF6B35',
  'Emerging Variable': '#FBB924',
};

export default function GapsPage() {
  const [text, setText] = useState('');
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GapResult[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const runAnalysis = () => {
    if (!text.trim()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => { setLoading(false); setResults(MOCK_GAPS); }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setText(`[File uploaded: ${file.name}]\n\nAI will extract keywords and analyze research gaps from this document.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setText(`[File uploaded: ${file.name}]\n\nAI will extract keywords and analyze research gaps from this document.`);
  };

  const distribution = results ? {
    High: results.filter(g => g.severity === 'High').length,
    Medium: results.filter(g => g.severity === 'Medium').length,
    Low: results.filter(g => g.severity === 'Low').length,
  } : null;

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
            <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
            <span>/</span>
            <span>Research Gap Finder</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>
            🔍 Research Gap Finder
          </h1>
          <p style={{ color: '#8BA3B8' }} className="max-w-xl text-base leading-relaxed">
            Paste your literature review, abstract, or keywords. Our AI identifies underexplored areas, missing variables, methodological weaknesses, and future opportunities.
          </p>
        </div>

        {/* Input */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Drop zone */}
          <div
            className="relative rounded-2xl flex flex-col items-center justify-center p-10 text-center cursor-pointer transition-all"
            style={{
              background: dragging ? 'rgba(0,212,255,0.1)' : 'rgba(13,27,42,0.6)',
              border: `2px dashed ${dragging ? '#00D4FF' : 'rgba(0,212,255,0.25)'}`,
              minHeight: '200px',
            }}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
            <div className="text-5xl mb-4">📎</div>
            <p className="font-bold text-sm" style={{ color: '#E8F4FD' }}>Drop your paper or proposal</p>
            <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>PDF, DOCX, TXT · or click to browse</p>
          </div>

          {/* Text area */}
          <div className="flex flex-col">
            <textarea
              className="flex-1 p-4 rounded-2xl text-sm resize-none outline-none leading-relaxed"
              style={{
                background: 'rgba(13,27,42,0.6)',
                border: '1px solid rgba(0,212,255,0.2)',
                color: '#E8F4FD',
                minHeight: '200px',
              }}
              placeholder="Or paste your abstract, keywords, or literature review here…

Example:
'This study examines the impact of central bank independence on banking stability in Sub-Saharan Africa using a panel of 32 countries from 2000–2022. GMM estimation is employed...'"
              value={text}
              onChange={e => setText(e.target.value)}
              onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(0,212,255,0.6)'; }}
              onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(0,212,255,0.2)'; }}
            />
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={runAnalysis}
            disabled={!text.trim() || loading}
            className="px-8 py-4 rounded-xl font-black text-base transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: loading ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            {loading ? '⚡ Analyzing gaps…' : '🔍 Analyze Research Gaps'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-16">
            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: '#00D4FF', borderRightColor: '#7B2FBE' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#00D4FF' }}>Scanning literature landscape…</p>
            <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>Identifying gaps, weaknesses, and opportunities</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-black" style={{ color: '#E8F4FD' }}>Analysis Complete</h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.3)' }}>
                {results.length} gaps found
              </span>
            </div>

            {/* Distribution bar chart */}
            {distribution && (
              <div className="p-6 rounded-2xl mb-8"
                style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <p className="text-sm font-bold mb-4" style={{ color: '#8BA3B8' }}>GAP SEVERITY DISTRIBUTION</p>
                <div className="space-y-3">
                  {(['High', 'Medium', 'Low'] as const).map(s => (
                    <div key={s} className="flex items-center gap-4">
                      <span className="w-16 text-xs font-mono font-bold" style={{ color: severityColor[s] }}>{s}</span>
                      <div className="flex-1 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div
                          className="h-3 rounded-full transition-all duration-700"
                          style={{ width: `${(distribution[s] / results.length) * 100}%`, background: severityColor[s], opacity: 0.8 }}
                        />
                      </div>
                      <span className="text-xs font-mono w-8 text-right" style={{ color: '#8BA3B8' }}>{distribution[s]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gap cards */}
            <div className="space-y-5">
              {results.map((gap, i) => (
                <div key={i} className="p-6 rounded-2xl"
                  style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid rgba(${gap.severity === 'High' ? '239,68,68' : gap.severity === 'Medium' ? '251,191,36' : '0,255,136'},0.2)` }}>
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{ background: `${severityColor[gap.severity]}15`, color: severityColor[gap.severity], border: `1px solid ${severityColor[gap.severity]}40` }}>
                        {gap.severity} Priority
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: `${typeColor[gap.type] ?? '#00D4FF'}15`, color: typeColor[gap.type] ?? '#00D4FF', border: `1px solid ${typeColor[gap.type] ?? '#00D4FF'}30` }}>
                        {gap.type}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold shrink-0" style={{ color: '#00FF88' }}>
                      {gap.opportunity}% opportunity
                    </span>
                  </div>

                  <h3 className="font-black text-base mb-2" style={{ color: '#E8F4FD' }}>{gap.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8BA3B8' }}>{gap.description}</p>

                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(0,255,136,0.1)' }}>
                        <div className="h-1.5 rounded-full"
                          style={{ width: `${gap.opportunity}%`, background: 'linear-gradient(90deg, #00FF88, #00D4FF)' }} />
                      </div>
                      <span className="text-xs" style={{ color: '#8BA3B8' }}>Research opportunity score</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="mt-8 p-6 rounded-2xl"
              style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <h3 className="font-black text-base mb-4" style={{ color: '#00D4FF' }}>💡 Recommended Research Directions</h3>
              <ul className="space-y-2">
                {[
                  'Employ panel smooth transition regression (PSTR) to capture non-linear threshold effects',
                  'Use country-group clustering (institutional quality quartiles) before pooling SSA countries',
                  'Incorporate gender-disaggregated data from World Bank Gender Statistics Database',
                  'Apply structural break tests (Bai-Perron) around 2020 COVID shock',
                  'Interact focal variable with mobile money penetration index (GSMA data)',
                ].map((rec, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: '#8BA3B8' }}>
                    <span style={{ color: '#00D4FF' }}>→</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <button onClick={() => { setResults(null); setText(''); }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
                ← Analyze Another
              </button>
              <Link href="/research?q=Central+Bank+Independence"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 inline-flex items-center"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                Explore Research Report →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
