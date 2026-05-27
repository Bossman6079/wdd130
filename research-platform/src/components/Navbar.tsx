'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navGroups = [
  {
    label: 'Discover',
    links: [
      { href: '/research?q=Financial+Stability', label: 'Research Engine', icon: '🧠', desc: 'AI-synthesized field reports' },
      { href: '/graph?q=Financial+Stability', label: 'Knowledge Graph', icon: '🕸', desc: 'Interactive theory networks' },
      { href: '/timeline', label: 'Evolution Timeline', icon: '📅', desc: 'How fields evolved over time' },
      { href: '/chat', label: 'Talk to a Field', icon: '💬', desc: 'Chat with the entire literature' },
      { href: '/trends', label: 'Emerging Trends', icon: '🚀', desc: 'AI-predicted rising research areas' },
      { href: '/forecast', label: 'AI Forecasting', icon: '🔮', desc: 'Publication velocity & citations' },
    ],
  },
  {
    label: 'Tools',
    links: [
      { href: '/gaps', label: 'Gap Finder', icon: '🔍', desc: 'Find unexplored research areas' },
      { href: '/methodology', label: 'Methodology AI', icon: '⚙️', desc: 'Econometric method recommender' },
      { href: '/variables', label: 'Variable Database', icon: '📊', desc: 'Proxies, formulas & datasets' },
      { href: '/review', label: 'Literature Review', icon: '📝', desc: 'AI-generated academic reviews' },
      { href: '/supervisor', label: 'AI Supervisor', icon: '🎓', desc: 'Proposal critique & scoring' },
      { href: '/journals', label: 'Journal Intelligence', icon: '📰', desc: 'Find the right journal' },
      { href: '/datasets', label: 'Dataset Hub', icon: '🗄', desc: 'Curated research datasets' },
      { href: '/visualize', label: 'Visualization Studio', icon: '🎨', desc: 'Generate research diagrams' },
    ],
  },
  {
    label: 'Community',
    links: [
      { href: '/collaborate', label: 'Collaboration Hub', icon: '🤝', desc: 'Find co-authors & discuss' },
      { href: '/workspace', label: 'My Workspace', icon: '💼', desc: 'Saved topics, citations & XP' },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(5,11,24,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,212,255,0.08)' }}
        onMouseLeave={() => setOpenGroup(null)}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
            L
          </div>
          <span className="text-base font-black tracking-widest" style={{ color: '#00D4FF', letterSpacing: '0.2em' }}>
            LEXIS
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navGroups.map(group => (
            <div key={group.label} className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}>
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: openGroup === group.label ? '#00D4FF' : '#8BA3B8' }}>
                {group.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform" style={{ transform: openGroup === group.label ? 'rotate(180deg)' : 'none' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {openGroup === group.label && (
                <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ background: 'rgba(13,27,42,0.98)', border: '1px solid rgba(0,212,255,0.15)', backdropFilter: 'blur(20px)' }}>
                  {group.links.map(link => {
                    const active = pathname === link.href.split('?')[0];
                    return (
                      <Link key={link.href} href={link.href}
                        className="flex gap-3 px-4 py-3 transition-all hover:bg-white/5"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                        onClick={() => setOpenGroup(null)}>
                        <span className="text-base shrink-0">{link.icon}</span>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: active ? '#00D4FF' : '#E8F4FD' }}>
                            {link.label}
                          </p>
                          <p className="text-xs" style={{ color: '#8BA3B8' }}>{link.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
          onClick={() => setMobileOpen(o => !o)}>
          {[0, 1, 2].map(i => (
            <div key={i} className="w-5 h-0.5 rounded-full transition-all"
              style={{ background: '#00D4FF', opacity: 0.8 }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-14 left-0 right-0 p-4"
            style={{ background: 'rgba(5,11,24,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,212,255,0.15)' }}
            onClick={e => e.stopPropagation()}>
            {navGroups.map(group => (
              <div key={group.label} className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest px-2 mb-2" style={{ color: '#8BA3B8' }}>
                  {group.label}
                </p>
                {group.links.map(link => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}>
                    <span>{link.icon}</span>
                    <span className="text-sm font-medium" style={{ color: '#E8F4FD' }}>{link.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
