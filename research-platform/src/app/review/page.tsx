'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getLiteratureReview, LitReview, FrameworkNode } from '@/lib/reviewData';

const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  independent:  { bg: 'rgba(0,212,255,0.12)',  border: '#00D4FF', text: '#00D4FF'  },
  dependent:    { bg: 'rgba(0,255,136,0.12)',  border: '#00FF88', text: '#00FF88'  },
  mediator:     { bg: 'rgba(251,191,36,0.12)', border: '#FBB924', text: '#FBB924'  },
  moderator:    { bg: 'rgba(239,68,68,0.12)',  border: '#EF4444', text: '#EF4444'  },
  control:      { bg: 'rgba(139,163,184,0.1)', border: '#8BA3B8', text: '#8BA3B8'  },
};

function ConceptualFramework({ nodes }: { nodes: FrameworkNode[] }) {
  const W = 660, H = 460;
  const lookup = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl mx-auto" style={{ minWidth: '400px', background: 'rgba(5,11,24,0.6)', borderRadius: '16px' }}>
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(0,212,255,0.6)" />
          </marker>
        </defs>
        {/* Edges */}
        {nodes.map(n =>
          (n.arrowTo ?? []).map(tid => {
            const t = lookup[tid];
            if (!t) return null;
            const dx = t.x - n.x, dy = t.y - n.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const r = 38;
            const x1 = n.x + (dx / len) * r;
            const y1 = n.y + (dy / len) * r;
            const x2 = t.x - (dx / len) * (r + 4);
            const y2 = t.y - (dy / len) * (r + 4);
            return (
              <line key={`${n.id}-${tid}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(0,212,255,0.4)" strokeWidth="1.5"
                strokeDasharray={n.type === 'moderator' ? '5,3' : 'none'}
                markerEnd="url(#arr)" />
            );
          })
        )}
        {/* Nodes */}
        {nodes.map(n => {
          const c = nodeColors[n.type] ?? nodeColors.control;
          const lines = n.label.split('\n');
          return (
            <g key={n.id}>
              <rect x={n.x - 56} y={n.y - 30} width={112} height={60}
                rx={12} fill={c.bg} stroke={c.border} strokeWidth="1.5" />
              {lines.map((line, i) => (
                <text key={i} x={n.x} y={n.y + (lines.length === 1 ? 5 : i * 14 - 5)}
                  textAnchor="middle" fontSize="10" fontWeight="700" fill={c.text}>
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {Object.entries(nodeColors).map(([type, c]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border" style={{ background: c.bg, borderColor: c.border }} />
            <span className="text-xs capitalize" style={{ color: '#8BA3B8' }}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = ['Theoretical', 'Empirical', 'Synthesis', 'Gaps', 'Hypotheses', 'Framework'] as const;
type Tab = typeof tabs[number];

export default function ReviewPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<LitReview | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('Theoretical');

  const generate = () => {
    const t = topic.trim();
    if (!t) return;
    setLoading(true);
    setReview(null);
    setTimeout(() => {
      setReview(getLiteratureReview(t));
      setActiveTab('Theoretical');
      setLoading(false);
    }, 2000);
  };

  const tabColor: Record<Tab, string> = {
    Theoretical: '#00D4FF', Empirical: '#FBB924', Synthesis: '#A855F7',
    Gaps: '#EF4444', Hypotheses: '#00FF88', Framework: '#FF6B35',
  };

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Literature Review Generator</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>📝 Literature Review Generator</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Enter a research topic. The AI generates a full academic literature review — theoretical, empirical, synthesis, gaps, hypotheses, and a conceptual framework diagram.
        </p>

        {/* Input */}
        <div className="flex gap-3 mb-10 max-w-2xl">
          <div className="flex-1 flex items-center rounded-2xl overflow-hidden"
            style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.25)' }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.6)')}
            onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)')}>
            <span className="pl-4 text-lg" style={{ color: '#00D4FF' }}>✦</span>
            <input
              className="flex-1 px-3 py-4 bg-transparent outline-none text-sm"
              style={{ color: '#E8F4FD' }}
              placeholder="e.g. Financial Stability, Central Bank Independence, Climate Finance…"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
            />
          </div>
          <button onClick={generate} disabled={!topic.trim() || loading}
            className="px-6 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            {loading ? '✦ Generating…' : '✦ Generate'}
          </button>
        </div>

        {/* Quick topics */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['Financial Stability', 'Central Bank Independence', 'Climate Finance', 'FinTech Banking'].map(t => (
            <button key={t} onClick={() => { setTopic(t); }}
              className="px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105"
              style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', color: '#8BA3B8' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: '#00D4FF', borderRightColor: '#7B2FBE' }} />
              <div className="absolute inset-2 w-12 h-12 rounded-full border-2 border-transparent animate-spin"
                style={{ borderBottomColor: '#00FF88', animationDirection: 'reverse', animationDuration: '0.7s' }} />
            </div>
            <p className="font-bold" style={{ color: '#00D4FF' }}>Generating Literature Review…</p>
            <p className="text-sm mt-1" style={{ color: '#8BA3B8' }}>Synthesizing theoretical and empirical streams</p>
          </div>
        )}

        {/* Review output */}
        {review && (
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="text-3xl font-black" style={{ color: '#E8F4FD' }}>{review.topic}</h2>
                <p className="text-sm mt-1" style={{ color: '#8BA3B8' }}>AI-generated academic literature review</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(
                  [
                    ...review.theoretical.map(s => `${s.heading}\n\n${s.body}`),
                    ...review.empirical.map(s => `${s.heading}\n\n${s.body}`),
                    `Synthesis\n\n${review.synthesis}`,
                  ].join('\n\n---\n\n')
                )}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                ⎘ Copy Text
              </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-1 mb-6 pb-1">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0"
                  style={{
                    background: activeTab === tab ? `${tabColor[tab]}15` : 'rgba(13,27,42,0.6)',
                    border: `1px solid ${activeTab === tab ? `${tabColor[tab]}50` : 'rgba(255,255,255,0.06)'}`,
                    color: activeTab === tab ? tabColor[tab] : '#8BA3B8',
                  }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="space-y-6">
              {activeTab === 'Theoretical' && review.theoretical.map((sec, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <h3 className="font-black text-base mb-4" style={{ color: '#00D4FF' }}>{sec.heading}</h3>
                  <p className="text-sm leading-loose" style={{ color: '#E8F4FD', textAlign: 'justify' }}>{sec.body}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {sec.citations.map(c => (
                      <span key={c} className="text-xs px-2.5 py-1 rounded-lg italic"
                        style={{ background: 'rgba(255,107,53,0.08)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.2)' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {activeTab === 'Empirical' && review.empirical.map((sec, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(251,191,36,0.1)' }}>
                  <h3 className="font-black text-base mb-4" style={{ color: '#FBB924' }}>{sec.heading}</h3>
                  <p className="text-sm leading-loose" style={{ color: '#E8F4FD', textAlign: 'justify' }}>{sec.body}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {sec.citations.map(c => (
                      <span key={c} className="text-xs px-2.5 py-1 rounded-lg italic"
                        style={{ background: 'rgba(255,107,53,0.08)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.2)' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {activeTab === 'Synthesis' && (
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(123,47,190,0.07)', border: '1px solid rgba(123,47,190,0.25)' }}>
                  <h3 className="font-black text-base mb-4" style={{ color: '#A855F7' }}>4. Synthesis & Critical Assessment</h3>
                  <p className="text-sm leading-loose" style={{ color: '#E8F4FD', textAlign: 'justify' }}>{review.synthesis}</p>
                </div>
              )}

              {activeTab === 'Gaps' && (
                <div className="space-y-4">
                  <h3 className="font-black text-base" style={{ color: '#EF4444' }}>5. Research Gaps</h3>
                  {review.gaps.map((gap, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl"
                      style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <span className="font-black text-sm shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: '#E8F4FD' }}>{gap}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Hypotheses' && (
                <div className="space-y-4">
                  <h3 className="font-black text-base" style={{ color: '#00FF88' }}>6. Research Hypotheses</h3>
                  {review.hypotheses.map(h => {
                    const dirColor = h.direction === 'positive' ? '#00FF88' : h.direction === 'negative' ? '#EF4444' : '#FBB924';
                    return (
                      <div key={h.id} className="p-6 rounded-2xl"
                        style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)' }}>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="font-black text-sm px-3 py-1 rounded-full"
                            style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88' }}>{h.id}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full capitalize"
                            style={{ background: `${dirColor}12`, color: dirColor, border: `1px solid ${dirColor}30` }}>
                            {h.direction} relationship
                          </span>
                        </div>
                        <p className="font-semibold text-sm mb-2" style={{ color: '#E8F4FD' }}>{h.statement}</p>
                        <p className="text-xs leading-relaxed" style={{ color: '#8BA3B8' }}>{h.basis}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'Framework' && (
                <div>
                  <h3 className="font-black text-base mb-6" style={{ color: '#FF6B35' }}>7. Conceptual Framework</h3>
                  <ConceptualFramework nodes={review.framework} />
                  <p className="text-xs mt-4 text-center" style={{ color: '#8BA3B8' }}>
                    Dashed arrows indicate moderating relationships · Solid arrows indicate direct or mediated effects
                  </p>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href={`/research?q=${encodeURIComponent(review.topic)}`}
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                Full Research Report →
              </Link>
              <Link href="/supervisor"
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)', color: '#00FF88' }}>
                🎓 Get Supervisor Feedback →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
