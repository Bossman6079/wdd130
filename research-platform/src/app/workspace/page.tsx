'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { achievements, leaderboard } from '@/lib/platformData';
import { trendingTopics } from '@/lib/mockData';

interface SavedTopic { id: string; topic: string; date: string; note: string }
interface Citation { id: string; title: string; authors: string; year: number; tag: string }

const DEFAULT_TOPICS: SavedTopic[] = [
  { id: '1', topic: 'Financial Stability', date: '2024-05-20', note: 'Core topic for PhD chapter 2. Focus on SSA panel evidence.' },
  { id: '2', topic: 'Central Bank Independence', date: '2024-05-18', note: 'CBI-stability nexus. Use Bodea-Hicks CBI index.' },
];
const DEFAULT_CITATIONS: Citation[] = [
  { id: '1', title: 'Bank Competition and Financial Stability', authors: 'Beck, Demirguc-Kunt & Levine', year: 2006, tag: 'Foundational' },
  { id: '2', title: 'Central Bank Independence and Macroeconomic Performance', authors: 'Alesina & Summers', year: 1993, tag: 'CBI' },
  { id: '3', title: 'Too Much Finance?', authors: 'Arcand, Berkes & Panizza', year: 2015, tag: 'Finance-Growth' },
];

const STATS = [
  { label: 'Topics Saved', value: '2',  icon: '🧠', color: '#00D4FF' },
  { label: 'Citations',    value: '3',  icon: '📄', color: '#A855F7' },
  { label: 'Reviews Gen.', value: '1',  icon: '📝', color: '#00FF88' },
  { label: 'Daily Streak', value: '3',  icon: '🔥', color: '#FF6B35' },
];

function XpBar({ xp, max }: { xp: number; max: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1" style={{ color: '#8BA3B8' }}>
        <span>{xp} XP</span><span>Level 2 → {max} XP</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div className="h-2 rounded-full transition-all" style={{ width: `${(xp / max) * 100}%`, background: 'linear-gradient(90deg, #00D4FF, #7B2FBE)' }} />
      </div>
    </div>
  );
}

export default function WorkspacePage() {
  const [topics, setTopics] = useState<SavedTopic[]>(DEFAULT_TOPICS);
  const [citations, setCitations] = useState<Citation[]>(DEFAULT_CITATIONS);
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'topics' | 'citations' | 'achievements' | 'leaderboard'>('topics');
  const [addingTopic, setAddingTopic] = useState('');
  const [addingNote, setAddingNote] = useState('');

  const userXp = achievements.filter(a => a.unlocked).reduce((s, a) => s + a.xp, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const addTopic = () => {
    if (!addingTopic.trim()) return;
    setTopics(prev => [...prev, {
      id: Date.now().toString(),
      topic: addingTopic.trim(),
      date: new Date().toISOString().slice(0, 10),
      note: addingNote.trim(),
    }]);
    setAddingTopic(''); setAddingNote('');
  };

  const removeTopic = (id: string) => setTopics(prev => prev.filter(t => t.id !== id));
  const removeCitation = (id: string) => setCitations(prev => prev.filter(c => c.id !== id));

  const tabs = [
    { key: 'topics', label: 'Saved Topics', icon: '🧠', count: topics.length },
    { key: 'citations', label: 'Citations', icon: '📄', count: citations.length },
    { key: 'achievements', label: 'Achievements', icon: '🏆', count: unlockedCount },
    { key: 'leaderboard', label: 'Leaderboard', icon: '⭐', count: null },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Workspace</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile card */}
          <div className="md:col-span-1 p-6 rounded-2xl" style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.15)' }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0"
                style={{ background: 'linear-gradient(135deg, #00D4FF20, #7B2FBE20)', border: '2px solid rgba(0,212,255,0.4)', color: '#00D4FF' }}>
                R
              </div>
              <div>
                <p className="font-black text-base" style={{ color: '#E8F4FD' }}>Researcher</p>
                <p className="text-xs" style={{ color: '#8BA3B8' }}>Level 2 · LEXIS Scholar</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm">🔥</span>
                  <span className="text-xs font-bold" style={{ color: '#FF6B35' }}>3-day streak</span>
                </div>
              </div>
            </div>
            <XpBar xp={userXp} max={1000} />
            <div className="grid grid-cols-2 gap-3 mt-5">
              {STATS.map(s => (
                <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                  <p className="text-xl">{s.icon}</p>
                  <p className="font-black text-lg" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs" style={{ color: '#8BA3B8' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick access */}
          <div className="md:col-span-2 p-6 rounded-2xl" style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
            <h2 className="font-black text-base mb-4" style={{ color: '#E8F4FD' }}>Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { href: '/research?q=Financial+Stability', icon: '🧠', label: 'Research Engine', color: '#00D4FF' },
                { href: '/review', icon: '📝', label: 'Literature Review', color: '#A855F7' },
                { href: '/supervisor', icon: '🎓', label: 'AI Supervisor', color: '#00FF88' },
                { href: '/methodology', icon: '⚙️', label: 'Methodology', color: '#FBB924' },
                { href: '/chat', icon: '💬', label: 'Chat with Field', color: '#FF6B35' },
                { href: '/gaps', icon: '🔍', label: 'Gap Finder', color: '#EF4444' },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:scale-105 hover:-translate-y-0.5"
                  style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: '#E8F4FD' }}>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Suggested next research */}
            <div className="mt-5 p-4 rounded-xl" style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.15)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#00FF88' }}>💡 LEXIS Suggestion</p>
              <p className="text-sm" style={{ color: '#8BA3B8' }}>
                Based on your saved topics, you might benefit from exploring{' '}
                <Link href="/research?q=Climate+Finance" className="underline" style={{ color: '#00FF88' }}>Climate Finance</Link>
                {' '}and its intersection with banking stability — a rapidly emerging gap in the SSA literature.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-6">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0"
              style={{
                background: activeTab === tab.key ? 'rgba(0,212,255,0.1)' : 'rgba(13,27,42,0.6)',
                border: `1px solid ${activeTab === tab.key ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                color: activeTab === tab.key ? '#00D4FF' : '#8BA3B8',
              }}>
              {tab.icon} {tab.label}
              {tab.count !== null && (
                <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-black"
                  style={{ background: activeTab === tab.key ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.07)', color: activeTab === tab.key ? '#00D4FF' : '#8BA3B8' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Topics tab */}
        {activeTab === 'topics' && (
          <div className="space-y-4">
            {/* Add new */}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#8BA3B8' }}>Save a Topic</p>
              <div className="flex gap-3 mb-3">
                <input className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-transparent outline-none"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.2)', color: '#E8F4FD' }}
                  placeholder="Topic name…" value={addingTopic} onChange={e => setAddingTopic(e.target.value)} />
                <button onClick={addTopic}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
                  Save
                </button>
              </div>
              <input className="w-full px-4 py-2.5 rounded-xl text-sm bg-transparent outline-none"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8F4FD' }}
                placeholder="Optional note…" value={addingNote} onChange={e => setAddingNote(e.target.value)} />
            </div>

            {topics.map(t => (
              <div key={t.id} className="flex gap-4 p-5 rounded-2xl group"
                style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <Link href={`/research?q=${encodeURIComponent(t.topic)}`}
                      className="font-black text-base hover:underline" style={{ color: '#00D4FF' }}>
                      {t.topic}
                    </Link>
                    <span className="text-xs" style={{ color: '#8BA3B8' }}>{t.date}</span>
                  </div>
                  {t.note && <p className="text-sm" style={{ color: '#8BA3B8' }}>{t.note}</p>}
                  <div className="flex gap-2 mt-3">
                    <Link href={`/research?q=${encodeURIComponent(t.topic)}`}
                      className="text-xs px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                      style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF' }}>
                      Research →
                    </Link>
                    <Link href={`/graph?q=${encodeURIComponent(t.topic)}`}
                      className="text-xs px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                      style={{ background: 'rgba(123,47,190,0.08)', color: '#A855F7' }}>
                      Graph →
                    </Link>
                    <Link href={`/chat`}
                      className="text-xs px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                      style={{ background: 'rgba(0,255,136,0.08)', color: '#00FF88' }}>
                      Chat →
                    </Link>
                  </div>
                </div>
                <button onClick={() => removeTopic(t.id)}
                  className="opacity-0 group-hover:opacity-100 text-xs transition-all px-2 py-1 rounded"
                  style={{ color: '#EF4444' }}>✕</button>
              </div>
            ))}

            {topics.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🧠</p>
                <p className="font-bold" style={{ color: '#8BA3B8' }}>No saved topics yet</p>
              </div>
            )}
          </div>
        )}

        {/* Citations tab */}
        {activeTab === 'citations' && (
          <div className="space-y-3">
            {citations.map(c => (
              <div key={c.id} className="flex items-center gap-4 p-5 rounded-2xl group"
                style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(255,107,53,0.12)' }}>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: '#E8F4FD' }}>{c.title}</p>
                  <p className="text-xs mt-1" style={{ color: '#8BA3B8' }}>{c.authors} · {c.year}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.2)' }}>
                  {c.tag}
                </span>
                <button onClick={() => removeCitation(c.id)}
                  className="opacity-0 group-hover:opacity-100 text-xs transition-all px-2 py-1 rounded"
                  style={{ color: '#EF4444' }}>✕</button>
              </div>
            ))}
            <div className="text-center py-4">
              <p className="text-xs" style={{ color: '#8BA3B8' }}>
                Citations from Research Reports are saved here automatically when you click ⎘ Copy on any paper card.
              </p>
            </div>
          </div>
        )}

        {/* Achievements tab */}
        {activeTab === 'achievements' && (
          <div>
            <div className="flex items-center gap-4 mb-6 p-5 rounded-2xl"
              style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div>
                <p className="text-3xl font-black" style={{ color: '#00D4FF' }}>{userXp} XP</p>
                <p className="text-sm" style={{ color: '#8BA3B8' }}>{unlockedCount} of {achievements.length} achievements unlocked</p>
                <XpBar xp={userXp} max={1000} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map(a => (
                <div key={a.id} className="flex gap-4 p-4 rounded-2xl"
                  style={{
                    background: a.unlocked ? 'rgba(0,212,255,0.06)' : 'rgba(13,27,42,0.5)',
                    border: `1px solid ${a.unlocked ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.05)'}`,
                    opacity: a.unlocked ? 1 : 0.55,
                  }}>
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: a.unlocked ? '#E8F4FD' : '#8BA3B8' }}>{a.title}</p>
                    <p className="text-xs" style={{ color: '#8BA3B8' }}>{a.description}</p>
                    <p className="text-xs mt-1 font-mono font-bold" style={{ color: a.unlocked ? '#00D4FF' : '#8BA3B8' }}>
                      {a.unlocked ? `+${a.xp} XP ✓` : `${a.xp} XP — locked`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl">
            <p className="text-sm mb-5" style={{ color: '#8BA3B8' }}>Top LEXIS researchers this month by XP earned</p>
            <div className="space-y-3">
              {leaderboard.map(entry => (
                <div key={entry.rank} className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{
                    background: entry.name === 'You' ? 'rgba(0,212,255,0.08)' : 'rgba(13,27,42,0.7)',
                    border: `1px solid ${entry.name === 'You' ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <span className="w-8 text-center font-black" style={{ color: entry.rank <= 3 ? '#FBB924' : '#8BA3B8' }}>
                    {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: entry.name === 'You' ? '#00D4FF' : '#E8F4FD' }}>{entry.name}</p>
                    <p className="text-xs" style={{ color: '#8BA3B8' }}>{entry.institution} · 🔥 {entry.streak}d streak</p>
                  </div>
                  <span className="font-black text-base" style={{ color: entry.rank === 1 ? '#FBB924' : '#00D4FF' }}>
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
