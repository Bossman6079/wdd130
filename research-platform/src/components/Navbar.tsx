'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/research?q=Financial+Stability', label: 'Research' },
    { href: '/graph?q=Financial+Stability', label: 'Graph' },
    { href: '/gaps', label: 'Gap Finder' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: 'linear-gradient(to bottom, rgba(5,11,24,0.95) 0%, rgba(5,11,24,0) 100%)', backdropFilter: 'blur(8px)' }}>
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
          style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: '#050B18' }}>
          L
        </div>
        <span className="text-lg font-black tracking-widest" style={{ color: '#00D4FF', letterSpacing: '0.2em' }}>
          LEXIS
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {links.map(({ href, label }) => {
          const isActive = pathname === href.split('?')[0];
          return (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? '#00D4FF' : '#8BA3B8',
                background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
