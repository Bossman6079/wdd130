'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { trendingTopics, mostDebated, emergingFields } from '@/lib/mockData';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; opacity: number;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(80, Math.floor(window.innerWidth / 14));
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particles.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grad.addColorStop(0, `rgba(0, 212, 255, ${p.opacity * 0.3})`);
        grad.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = useCallback((q: string) => {
    const term = q.trim() || query.trim();
    if (term) router.push(`/research?q=${encodeURIComponent(term)}`);
  }, [query, router]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(query);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#050B18', color: '#E8F4FD' }}>
      <NetworkCanvas />
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center" style={{ zIndex: 1 }}>
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)' }}>
            AI-Powered Research Intelligence
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight"
            style={{ background: 'linear-gradient(135deg, #E8F4FD 0%, #00D4FF 50%, #7B2FBE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Where Research
            <br />Comes Alive
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#8BA3B8' }}>
            Enter any field. Instantly synthesize theories, authors, gaps, and contradictions from thousands of papers — without reading a single one.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl mt-8 mb-10">
          <div className="relative flex items-center rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: 'rgba(13,27,42,0.8)',
              border: `2px solid ${focused ? '#00D4FF' : 'rgba(0,212,255,0.2)'}`,
              boxShadow: focused ? '0 0 30px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.03)' : 'none',
              backdropFilter: 'blur(20px)',
            }}>
            <span className="pl-5 pr-2 text-xl" style={{ color: '#00D4FF' }}>⚡</span>
            <input
              className="flex-1 py-5 pr-2 text-lg bg-transparent outline-none"
              style={{ color: '#E8F4FD' }}
              placeholder="Explore any research field…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <button
              onClick={() => handleSearch(query)}
              className="m-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
              Search
            </button>
          </div>
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {['Financial Stability', 'AI in Education', 'Climate Finance', 'Monetary Policy', 'Blockchain Banking', 'Central Bank Independence'].map(t => (
            <button
              key={t}
              onClick={() => handleSearch(t)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.2)',
                color: '#8BA3B8',
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = '#00D4FF'; (e.target as HTMLButtonElement).style.borderColor = 'rgba(0,212,255,0.6)'; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = '#8BA3B8'; (e.target as HTMLButtonElement).style.borderColor = 'rgba(0,212,255,0.2)'; }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-16 animate-bounce" style={{ color: '#8BA3B8' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Trending Now */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-10">
          <span className="text-2xl">🔥</span>
          <h2 className="text-3xl font-black" style={{ color: '#E8F4FD' }}>Trending Now</h2>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,107,53,0.15)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.3)' }}>
            Live
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trendingTopics.slice(0, 3).map(topic => (
            <button
              key={topic.name}
              onClick={() => handleSearch(topic.name)}
              className="text-left p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group"
              style={{
                background: 'rgba(13,27,42,0.7)',
                border: '1px solid rgba(0,212,255,0.1)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)')}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-base" style={{ color: '#E8F4FD' }}>{topic.name}</h3>
                <span className="text-sm font-bold px-2 py-0.5 rounded-full ml-2 shrink-0"
                  style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88' }}>
                  {topic.growth}
                </span>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#8BA3B8' }}>{topic.description}</p>
              <div className="text-xs font-mono" style={{ color: '#00D4FF' }}>
                {topic.papers.toLocaleString()} papers indexed
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Most Debated */}
      <section className="relative px-4 py-16 max-w-6xl mx-auto" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-10">
          <span className="text-2xl">⚔️</span>
          <h2 className="text-3xl font-black" style={{ color: '#E8F4FD' }}>Most Debated</h2>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(123,47,190,0.15)', color: '#7B2FBE', border: '1px solid rgba(123,47,190,0.3)' }}>
            Contradictory Evidence
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mostDebated.map(item => (
            <div key={item.topic}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(13,27,42,0.7)',
                border: '1px solid rgba(123,47,190,0.2)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="flex items-center gap-2 mb-3">
                {item.hot && <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF6B35' }} />}
                <h3 className="font-bold text-sm" style={{ color: '#E8F4FD' }}>{item.topic}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8BA3B8' }}>{item.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(0,212,255,0.2)' }}>
                  <div className="h-1 rounded-full w-1/2" style={{ background: '#00D4FF' }} />
                </div>
                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(123,47,190,0.2)' }}>
                  <div className="h-1 rounded-full w-1/2" style={{ background: '#7B2FBE' }} />
                </div>
              </div>
              <p className="text-xs mt-2 font-mono" style={{ color: '#8BA3B8' }}>
                {item.sides} opposing camps · peer-reviewed
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Emerging Fields */}
      <section className="relative px-4 py-16 max-w-6xl mx-auto mb-12" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-10">
          <span className="text-2xl">🚀</span>
          <h2 className="text-3xl font-black" style={{ color: '#E8F4FD' }}>Emerging Fields</h2>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }}>
            AI Predicted
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {emergingFields.map(field => (
            <div key={field.name}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(13,27,42,0.7)',
                border: '1px solid rgba(0,255,136,0.15)',
                backdropFilter: 'blur(20px)',
              }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: '#00FF88' }}>{field.name}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#8BA3B8' }}>{field.prediction}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(0,255,136,0.1)' }}>
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${field.confidence}%`, background: 'linear-gradient(90deg, #00FF88, #00D4FF)' }}
                  />
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: '#00FF88' }}>{field.confidence}%</span>
              </div>
              <p className="text-xs mt-1 font-mono" style={{ color: '#8BA3B8' }}>AI confidence</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t py-10 text-center" style={{ borderColor: 'rgba(0,212,255,0.1)', zIndex: 1 }}>
        <div className="mb-2">
          <span className="text-2xl font-black tracking-widest" style={{ color: '#00D4FF' }}>LEXIS</span>
        </div>
        <p className="text-sm" style={{ color: '#8BA3B8' }}>Where research comes alive · AI-synthesized intelligence</p>
      </footer>
    </div>
  );
}
