'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getSupervisorFeedback, SupervisorFeedback, FeedbackSection } from '@/lib/reviewData';

const statusConfig = {
  strong:   { color: '#00FF88', bg: 'rgba(0,255,136,0.1)',   border: 'rgba(0,255,136,0.3)',   label: 'Strong'   },
  adequate: { color: '#FBB924', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  label: 'Adequate' },
  weak:     { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   label: 'Weak'     },
  missing:  { color: '#8BA3B8', bg: 'rgba(139,163,184,0.1)', border: 'rgba(139,163,184,0.3)', label: 'Missing'  },
};

function ScoreRing({ score, max, color }: { score: number; max: number; color: string }) {
  const pct = score / max;
  const r = 28, circumference = 2 * Math.PI * r;
  const dash = pct * circumference;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeDashoffset={circumference / 4}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x="36" y="36" textAnchor="middle" dominantBaseline="middle"
        fontSize="13" fontWeight="900" fill={color}>{score}</text>
      <text x="36" y="50" textAnchor="middle" fontSize="8" fill="#8BA3B8">/ {max}</text>
    </svg>
  );
}

function SectionCard({ sec }: { sec: FeedbackSection }) {
  const [open, setOpen] = useState(false);
  const cfg = statusConfig[sec.status];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${cfg.border}` }}>
      <button className="w-full flex items-center gap-4 px-5 py-4 text-left" onClick={() => setOpen(o => !o)}>
        <ScoreRing score={sec.score} max={sec.maxScore} color={cfg.color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-black text-sm" style={{ color: '#E8F4FD' }}>{sec.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
              {cfg.label}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${(sec.score / sec.maxScore) * 100}%`, background: cfg.color }} />
          </div>
        </div>
        <span className="text-sm shrink-0" style={{ color: '#8BA3B8' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-sm leading-relaxed pt-4" style={{ color: '#E8F4FD' }}>{sec.comment}</p>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#8BA3B8' }}>Suggestions</p>
            <ul className="space-y-2">
              {sec.suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: '#8BA3B8' }}>
                  <span style={{ color: '#00D4FF' }}>→</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const gradeColor: Record<string, string> = { A: '#00FF88', B: '#00D4FF', C: '#FBB924', D: '#EF4444' };

export default function SupervisorPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<SupervisorFeedback | null>(null);

  const analyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setFeedback(null);
    setTimeout(() => { setFeedback(getSupervisorFeedback(text)); setLoading(false); }, 1800);
  };

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>AI Research Supervisor</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>🎓 AI Research Supervisor</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Paste your research proposal, abstract, or chapter draft. The AI critiques your argument structure, theoretical grounding, methodology, and hypothesis consistency like a senior academic supervisor.
        </p>

        <div className="mb-6">
          <textarea
            className="w-full p-5 rounded-2xl text-sm resize-none outline-none leading-relaxed"
            rows={10}
            style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.2)', color: '#E8F4FD' }}
            placeholder="Paste your proposal, abstract, or research design here…

Example:
'This study examines the relationship between central bank independence (CBI) and banking sector stability in Sub-Saharan Africa. Using a panel of 30 SSA countries from 2005–2020, I employ System GMM to test whether CBI reduces bank fragility as measured by Z-scores. The study is motivated by contradictory findings in the literature — CBI reduces inflation in OECD economies (Alesina & Summers, 1993) but evidence for SSA is mixed. I hypothesize that CBI positively affects stability but that this effect is moderated by institutional quality…'"
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs" style={{ color: '#8BA3B8' }}>{text.length} characters</span>
            <span className="text-xs" style={{ color: text.length < 200 ? '#EF4444' : '#00FF88' }}>
              {text.length < 200 ? '⚠ Add more detail for better feedback' : '✓ Good length for analysis'}
            </span>
          </div>
        </div>

        <button onClick={analyze} disabled={!text.trim() || loading}
          className="w-full py-4 rounded-2xl font-black text-base transition-all hover:scale-[1.01] disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
          {loading ? '🎓 Analyzing proposal…' : '🎓 Get Supervisor Feedback'}
        </button>

        {loading && (
          <div className="flex flex-col items-center py-16">
            <div className="w-12 h-12 rounded-full border-2 border-transparent animate-spin mb-4"
              style={{ borderTopColor: '#00D4FF', borderRightColor: '#7B2FBE' }} />
            <p className="text-sm" style={{ color: '#00D4FF' }}>Reviewing your research design…</p>
          </div>
        )}

        {feedback && (
          <div className="mt-10">
            {/* Overall score */}
            <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl mb-8"
              style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shrink-0"
                  style={{ background: `${gradeColor[feedback.grade]}15`, border: `2px solid ${gradeColor[feedback.grade]}40`, color: gradeColor[feedback.grade] }}>
                  {feedback.grade}
                </div>
                <div>
                  <p className="text-3xl font-black" style={{ color: '#E8F4FD' }}>{feedback.overallScore}<span className="text-lg font-normal" style={{ color: '#8BA3B8' }}> / 100</span></p>
                  <p className="text-sm" style={{ color: '#8BA3B8' }}>Overall research design quality</p>
                  <div className="w-48 h-2 rounded-full mt-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-2 rounded-full" style={{ width: `${feedback.overallScore}%`, background: gradeColor[feedback.grade] }} />
                  </div>
                </div>
              </div>

              <div className="flex-1 grid md:grid-cols-2 gap-4">
                {feedback.strengths.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#00FF88' }}>Strengths</p>
                    {feedback.strengths.map((s, i) => (
                      <p key={i} className="flex gap-2 text-xs mb-1.5" style={{ color: '#8BA3B8' }}>
                        <span style={{ color: '#00FF88' }}>✓</span>{s}
                      </p>
                    ))}
                  </div>
                )}
                {feedback.criticalIssues.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#EF4444' }}>Critical Issues</p>
                    {feedback.criticalIssues.map((s, i) => (
                      <p key={i} className="flex gap-2 text-xs mb-1.5" style={{ color: '#8BA3B8' }}>
                        <span style={{ color: '#EF4444' }}>⚠</span>{s}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section scores */}
            <h2 className="text-xl font-black mb-4" style={{ color: '#E8F4FD' }}>Section-by-Section Critique</h2>
            <div className="space-y-4 mb-8">
              {feedback.sections.map((sec, i) => <SectionCard key={i} sec={sec} />)}
            </div>

            {/* Recommendations */}
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <h3 className="font-black text-base mb-4" style={{ color: '#00D4FF' }}>💡 Priority Recommendations</h3>
              <ol className="space-y-3">
                {feedback.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: '#8BA3B8' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                      style={{ background: 'rgba(0,212,255,0.12)', color: '#00D4FF' }}>{i + 1}</span>
                    {r}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/methodology"
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                ⚙️ Get Methodology Advice →
              </Link>
              <Link href="/review"
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.25)', color: '#00FF88' }}>
                📝 Generate Literature Review →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
