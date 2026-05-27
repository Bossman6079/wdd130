'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { researchers, discussions } from '@/lib/platformData';

export default function CollaboratePage() {
  const [activeTab, setActiveTab] = useState<'researchers' | 'discussions'>('researchers');
  const [query, setQuery] = useState('');
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const allTopics = Array.from(new Set(researchers.flatMap(r => r.topics)));

  const filteredResearchers = researchers.filter(r => {
    if (topicFilter && !r.topics.includes(topicFilter)) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.institution.toLowerCase().includes(q) ||
      r.topics.some(t => t.toLowerCase().includes(q)) || r.country.toLowerCase().includes(q);
  });

  const filteredDiscussions = discussions.filter(d => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8BA3B8' }}>
          <Link href="/" style={{ color: '#00D4FF' }} className="hover:underline">Home</Link>
          <span>/</span><span>Research Collaboration</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#E8F4FD' }}>🤝 Collaboration Hub</h1>
        <p className="max-w-xl text-base leading-relaxed mb-8" style={{ color: '#8BA3B8' }}>
          Connect with researchers sharing your interests. Discuss methodological challenges, share datasets, find co-authors, and build your academic network.
        </p>

        {/* Search */}
        <div className="flex items-center rounded-2xl overflow-hidden mb-6"
          style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(0,212,255,0.2)' }}
          onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
          onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)')}>
          <span className="pl-4 text-base" style={{ color: '#00D4FF' }}>🔍</span>
          <input
            className="flex-1 px-3 py-3.5 bg-transparent outline-none text-sm"
            style={{ color: '#E8F4FD' }}
            placeholder="Search researchers, topics, discussions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['researchers', 'discussions'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all"
              style={{
                background: activeTab === tab ? 'rgba(0,212,255,0.1)' : 'rgba(13,27,42,0.6)',
                border: `1px solid ${activeTab === tab ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                color: activeTab === tab ? '#00D4FF' : '#8BA3B8',
              }}>
              {tab === 'researchers' ? `👤 Researchers (${filteredResearchers.length})` : `💬 Discussions (${filteredDiscussions.length})`}
            </button>
          ))}
        </div>

        {activeTab === 'researchers' && (
          <>
            {/* Topic filter pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => setTopicFilter(null)}
                className="px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                  background: !topicFilter ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${!topicFilter ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: !topicFilter ? '#00D4FF' : '#8BA3B8',
                }}>
                All Topics
              </button>
              {allTopics.slice(0, 6).map(t => (
                <button key={t} onClick={() => setTopicFilter(topicFilter === t ? null : t)}
                  className="px-3 py-1.5 rounded-full text-xs transition-all"
                  style={{
                    background: topicFilter === t ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${topicFilter === t ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    color: topicFilter === t ? '#00D4FF' : '#8BA3B8',
                  }}>
                  {t}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {filteredResearchers.map(r => {
                const isConnected = connected.has(r.id);
                return (
                  <div key={r.id} className="p-6 rounded-2xl transition-all hover:scale-[1.01]"
                    style={{ background: 'rgba(13,27,42,0.7)', border: `1px solid ${r.color}20` }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                        style={{ background: `${r.color}15`, border: `2px solid ${r.color}40`, color: r.color }}>
                        {r.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-black text-sm" style={{ color: '#E8F4FD' }}>{r.name}</p>
                            <p className="text-xs" style={{ color: '#8BA3B8' }}>{r.institution} · {r.flagEmoji} {r.country}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <div className="w-2 h-2 rounded-full" style={{ background: r.available ? '#00FF88' : '#8BA3B8' }} />
                            <span className="text-xs" style={{ color: r.available ? '#00FF88' : '#8BA3B8' }}>
                              {r.available ? 'Open' : 'Busy'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed mb-4" style={{ color: '#8BA3B8' }}>{r.bio}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {r.topics.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${r.color}10`, color: r.color, border: `1px solid ${r.color}25` }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold" style={{ color: r.color }}>h-index: {r.hIndex}</span>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#8BA3B8', maxWidth: '180px' }}>
                          {r.recentPaper} ({r.recentYear})
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConnected(prev => {
                            const next = new Set(prev);
                            next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                            return next;
                          })}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                          style={{
                            background: isConnected ? 'rgba(0,255,136,0.1)' : `${r.color}12`,
                            border: `1px solid ${isConnected ? 'rgba(0,255,136,0.4)' : `${r.color}30`}`,
                            color: isConnected ? '#00FF88' : r.color,
                          }}>
                          {isConnected ? '✓ Connected' : '+ Connect'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t flex gap-2 flex-wrap" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <p className="text-xs" style={{ color: '#8BA3B8' }}>Seeking:</p>
                      {r.seeking.map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.04)', color: '#8BA3B8', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'discussions' && (
          <div className="space-y-5">
            {/* Post a discussion (UI only) */}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(0,212,255,0.12)' }}>
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                  style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                  R
                </div>
                <input
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-transparent outline-none"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#8BA3B8' }}
                  placeholder="Start a discussion or ask a methodological question…"
                  readOnly
                />
                <button className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                  Post
                </button>
              </div>
            </div>

            {filteredDiscussions.map(d => (
              <div key={d.id} className="p-6 rounded-2xl transition-all hover:scale-[1.005]"
                style={{ background: 'rgba(13,27,42,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                    style={{ background: `${d.color}15`, border: `1px solid ${d.color}30`, color: d.color }}>
                    {d.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{d.author}</p>
                    <p className="text-xs" style={{ color: '#8BA3B8' }}>{d.time} · {d.topic}</p>
                  </div>
                </div>

                <h3 className="font-black text-base mb-2" style={{ color: '#E8F4FD' }}>{d.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8BA3B8' }}>{d.body}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {d.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,212,255,0.07)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <button
                    onClick={() => setLiked(prev => { const n = new Set(prev); n.has(d.id) ? n.delete(d.id) : n.add(d.id); return n; })}
                    className="flex items-center gap-1.5 text-sm transition-all hover:scale-105"
                    style={{ color: liked.has(d.id) ? '#EF4444' : '#8BA3B8' }}>
                    {liked.has(d.id) ? '❤️' : '🤍'} {d.likes + (liked.has(d.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm" style={{ color: '#8BA3B8' }}>
                    💬 {d.replies} replies
                  </button>
                  <button className="text-sm ml-auto" style={{ color: '#00D4FF' }}>Reply →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
