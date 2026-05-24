/**
 * Illustrated visual panels for key Premier League moments.
 * Built entirely with SVG + React + Remotion animation — no external images needed.
 */
import { useCurrentFrame, interpolate } from "remotion";
import React from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────

const ease = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateRight: "clamp",
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  });

// Subtle film-grain SVG filter
const GrainFilter = () => (
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feBlend in="SourceGraphic" mode="multiply" />
    </filter>
  </defs>
);

// Crowd silhouette row (generic stadium crowd feel)
const Crowd = ({ y, color, opacity = 0.25 }: { y: number; color: string; opacity?: number }) => (
  <>
    {Array.from({ length: 28 }).map((_, i) => {
      const h = 18 + ((i * 7) % 14);
      return (
        <rect
          key={i}
          x={i * 36}
          y={y - h}
          width={28}
          height={h}
          rx={14}
          fill={color}
          opacity={opacity + (i % 3) * 0.05}
        />
      );
    })}
  </>
);

// ─── Agüero 93:20 ─────────────────────────────────────────────────────────

export const AgueroVisual: React.FC = () => {
  const f = useCurrentFrame();
  const ballProg = ease(f, 10, 40);
  const flashOp  = interpolate(f, [40, 55, 70], [0, 1, 0], { extrapolateRight: "clamp" });
  const scoreOp  = ease(f, 45, 60);
  const clockScale = interpolate(f, [0, 20], [0.5, 1], { extrapolateRight: "clamp" });

  // Ball arc from left-centre to top-right of goal
  const bx = interpolate(ballProg, [0, 1], [120, 760]);
  const by = interpolate(ballProg, [0, 1], [460, 180], {
    easing: (t) => -2 * t * t + 3 * t,
  });

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <GrainFilter />
      {/* Sky-blue gradient background */}
      <defs>
        <radialGradient id="agBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a6fa8" />
          <stop offset="100%" stopColor="#0a1a2e" />
        </radialGradient>
        <linearGradient id="pitch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a5c1a" />
          <stop offset="100%" stopColor="#0d3a0d" />
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#agBg)" />

      {/* Stadium lights glow */}
      <circle cx="100" cy="80" r="40" fill="#fff" opacity="0.06" />
      <circle cx="900" cy="80" r="40" fill="#fff" opacity="0.06" />

      {/* Crowd silhouette at top */}
      <Crowd y={160} color="#6CABDD" opacity={0.2} />

      {/* Pitch surface */}
      <rect x="0" y="480" width="1000" height="120" fill="url(#pitch)" />
      {/* Centre circle */}
      <ellipse cx="500" cy="530" rx="200" ry="60" fill="none" stroke="#2a8a2a" strokeWidth="2" opacity="0.4" />

      {/* Goal posts */}
      <rect x="560" y="200" width="12" height="280" fill="white" opacity="0.9" />
      <rect x="900" y="200" width="12" height="280" fill="white" opacity="0.9" />
      <rect x="560" y="200" width="352" height="12" fill="white" opacity="0.9" />
      {/* Net (grid) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`nv${i}`} x1={600 + i * 40} y1={212} x2={600 + i * 40} y2={480} stroke="white" strokeWidth="1" opacity="0.15" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`nh${i}`} x1={572} y1={240 + i * 37} x2={912} y2={240 + i * 37} stroke="white" strokeWidth="1" opacity="0.15" />
      ))}

      {/* Goal flash on score */}
      <rect x="560" y="200" width="352" height="280" fill="#6CABDD" opacity={flashOp * 0.35} />

      {/* Ball trajectory ghost trail */}
      {[0.2, 0.4, 0.6, 0.8].map((t) => {
        const tx = interpolate(t, [0, 1], [120, 760]);
        const ty = interpolate(t, [0, 1], [460, 180], { easing: (x) => -2*x*x+3*x });
        const trailOp = interpolate(ballProg, [t - 0.1, t + 0.1], [0, 0.3], { extrapolateRight: "clamp" });
        return <circle key={t} cx={tx} cy={ty} r={10} fill="#6CABDD" opacity={trailOp} />;
      })}

      {/* Ball */}
      {ballProg > 0 && (
        <g transform={`translate(${bx}, ${by})`}>
          <circle r="20" fill="white" />
          <circle r="12" fill="#333" opacity="0.3" />
          <circle r="6" fill="#333" opacity="0.4" />
        </g>
      )}

      {/* Scoreboard */}
      <g opacity={scoreOp}>
        <rect x="60" y="30" width="480" height="70" rx="8" fill="rgba(0,0,0,0.7)" />
        <text x="80" y="55" fontFamily="sans-serif" fontSize="14" fill="#6CABDD" letterSpacing="3">PREMIER LEAGUE · FINAL DAY</text>
        <text x="80" y="85" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="white">MAN CITY  3 – 2  QPR</text>
      </g>

      {/* 93:20 clock */}
      <g transform={`translate(500, 330) scale(${clockScale})`} textAnchor="middle">
        <text fontFamily="sans-serif" fontSize="110" fontWeight="900" fill="#6CABDD"
          style={{ textShadow: "0 0 60px #6CABDD" }}>93:20</text>
      </g>
      <text x="500" y="430" textAnchor="middle" fontFamily="sans-serif" fontSize="16"
        fill="rgba(255,255,255,0.5)" letterSpacing="6">AGÜERO · 13 MAY 2012</text>

      {/* Grain overlay */}
      <rect width="1000" height="600" fill="transparent" filter="url(#grain)" opacity="0.03" />
    </svg>
  );
};

// ─── Leicester Miracle ────────────────────────────────────────────────────

export const LeicesterVisual: React.FC = () => {
  const f = useCurrentFrame();
  const confettiSeed = Array.from({ length: 50 }, (_, i) => ({
    x: (i * 127 + 300) % 1000,
    y: (i * 83) % 400,
    size: 6 + (i % 8),
    color: i % 3 === 0 ? "#FDBE11" : i % 3 === 1 ? "#003090" : "#ffffff",
    fall: (i * 0.7) % 1,
  }));

  const oddsProg = ease(f, 5, 30);
  const confProg = ease(f, 20, 60);

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="lcBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#003090" />
          <stop offset="100%" stopColor="#00103a" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#lcBg)" />

      {/* Confetti */}
      {confettiSeed.map((c, i) => {
        const fallY = c.y + confProg * (280 + c.fall * 120);
        const op = confProg * (0.7 + (i % 3) * 0.1);
        return (
          <rect key={i} x={c.x} y={fallY % 600} width={c.size} height={c.size * 2}
            rx={1} fill={c.color} opacity={op}
            transform={`rotate(${(i * 30) % 60}, ${c.x}, ${fallY % 600})`} />
        );
      })}

      {/* Stadium silhouette */}
      <Crowd y={600} color="#003090" opacity={0.3} />

      {/* Fox silhouette (geometric) */}
      <g transform="translate(680,150)" opacity={0.15}>
        {/* Body */}
        <ellipse cx="80" cy="180" rx="70" ry="50" fill="#FDBE11" />
        {/* Head */}
        <ellipse cx="80" cy="110" rx="45" ry="40" fill="#FDBE11" />
        {/* Ears */}
        <polygon points="50,80 35,30 70,75" fill="#FDBE11" />
        <polygon points="110,80 125,30 90,75" fill="#FDBE11" />
        {/* Tail */}
        <ellipse cx="160" cy="200" rx="30" ry="50" fill="#FDBE11" transform="rotate(-30,160,200)" />
      </g>

      {/* Trophy */}
      <g transform="translate(120,80)" opacity={interpolate(f,[30,50],[0,1],{extrapolateRight:"clamp"})}>
        <rect x="80" y="160" width="80" height="20" rx="4" fill="#FDBE11" />
        <rect x="95" y="110" width="50" height="55" rx="4" fill="#FDBE11" />
        <ellipse cx="120" cy="105" rx="55" ry="40" fill="#FDBE11" />
        <line x1="65" y1="105" x2="95" y2="120" stroke="#FDBE11" strokeWidth="10" strokeLinecap="round" />
        <line x1="175" y1="105" x2="145" y2="120" stroke="#FDBE11" strokeWidth="10" strokeLinecap="round" />
      </g>

      {/* 5000/1 odds */}
      <g textAnchor="middle">
        <text x="430" y="280" fontFamily="sans-serif" fontSize="120" fontWeight="900"
          fill="#FDBE11" opacity={oddsProg}
          style={{ textShadow: "0 0 80px #FDBE11aa" }}>
          5000/1
        </text>
        <text x="430" y="340" fontFamily="sans-serif" fontSize="18" fill="rgba(255,255,255,0.5)"
          letterSpacing="6" opacity={oddsProg}>THE ODDS · SEASON START</text>
      </g>

      {/* Season banner */}
      <g opacity={interpolate(f,[40,60],[0,1],{extrapolateRight:"clamp"})}>
        <rect x="60" y="420" width="540" height="60" rx="8" fill="rgba(0,0,0,0.6)" />
        <text x="330" y="445" textAnchor="middle" fontFamily="sans-serif" fontSize="13"
          fill="#FDBE11" letterSpacing="4">PREMIER LEAGUE CHAMPIONS</text>
        <text x="330" y="468" textAnchor="middle" fontFamily="sans-serif" fontSize="18"
          fontWeight="bold" fill="white">LEICESTER CITY · 2015–16</text>
      </g>
    </svg>
  );
};

// ─── Arsenal Invincibles ──────────────────────────────────────────────────

export const InvinciblesVisual: React.FC = () => {
  const f = useCurrentFrame();
  const num49 = ease(f, 10, 45);
  const shieldProg = ease(f, 25, 50);

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="arsBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#1a0000" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#arsBg)" />

      {/* Shield / badge outline */}
      <g transform="translate(500,280) scale(2.2)" textAnchor="middle" opacity={shieldProg * 0.12}>
        <path d="M0,-130 L90,-100 L90,40 Q90,130 0,160 Q-90,130 -90,40 L-90,-100 Z"
          fill="#EF0107" stroke="#fff" strokeWidth="3" />
      </g>

      {/* 38 game squares */}
      {Array.from({ length: 38 }).map((_, i) => {
        const col = i % 10, row = Math.floor(i / 10);
        const delay = i * 2;
        const op = interpolate(f, [delay, delay + 10], [0, 1], { extrapolateRight: "clamp" });
        return (
          <rect key={i} x={60 + col * 52} y={70 + row * 52} width={42} height={42}
            rx={4} fill="#EF0107" stroke="#ff4444" strokeWidth="1" opacity={op * 0.8} />
        );
      })}

      {/* UNBEATEN text on squares */}
      {Array.from({ length: 38 }).map((_, i) => {
        const col = i % 10, row = Math.floor(i / 10);
        const delay = i * 2 + 5;
        const op = interpolate(f, [delay, delay + 8], [0, 1], { extrapolateRight: "clamp" });
        return (
          <text key={i} x={81 + col * 52} y={96 + row * 52} textAnchor="middle"
            fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="white" opacity={op}>
            W
          </text>
        );
      })}

      {/* Big 49 */}
      <g textAnchor="middle" opacity={num49}>
        <text x="760" y="320" fontFamily="sans-serif" fontSize="180" fontWeight="900"
          fill="#EF0107" opacity="0.15">49</text>
      </g>

      {/* Label */}
      <g opacity={interpolate(f,[50,65],[0,1],{extrapolateRight:"clamp"})}>
        <text x="500" y="490" textAnchor="middle" fontFamily="sans-serif" fontSize="15"
          fill="rgba(255,255,255,0.5)" letterSpacing="6">ARSENAL FC · 2003–04</text>
        <text x="500" y="520" textAnchor="middle" fontFamily="sans-serif" fontSize="22"
          fontWeight="bold" fill="white">38 GAMES — 0 DEFEATS</text>
      </g>
    </svg>
  );
};

// ─── The Treble 1999 ──────────────────────────────────────────────────────

export const TrebleVisual: React.FC = () => {
  const f = useCurrentFrame();

  const labels = ["PREMIER LEAGUE", "FA CUP", "CHAMPIONS LEAGUE"];
  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="utBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#1a0000" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#utBg)" />

      {/* Three trophies */}
      {[0, 1, 2].map((i) => {
        const cx = 200 + i * 300;
        const delay = i * 12;
        const sc = interpolate(f, [delay, delay + 20], [0, 1], {
          extrapolateRight: "clamp",
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
        const op = interpolate(f, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });

        return (
          <g key={i} transform={`translate(${cx},160) scale(${sc})`} opacity={op} textAnchor="middle">
            {/* Base */}
            <rect x="-40" y="200" width="80" height="18" rx="4" fill="#ffd700" />
            <rect x="-25" y="150" width="50" height="55" rx="4" fill="#ffd700" />
            {/* Cup */}
            <path d="M-55,80 Q-55,145 0,145 Q55,145 55,80 Q55,30 0,20 Q-55,30 -55,80 Z"
              fill="#ffd700" />
            {/* Handles */}
            <path d="M-55,80 Q-95,80 -95,110 Q-95,145 -55,145" fill="none" stroke="#ffd700" strokeWidth="12" strokeLinecap="round" />
            <path d="M55,80 Q95,80 95,110 Q95,145 55,145" fill="none" stroke="#ffd700" strokeWidth="12" strokeLinecap="round" />
            {/* Star */}
            <text y="110" textAnchor="middle" fontFamily="sans-serif" fontSize="40" fill="#8b0000">★</text>
            {/* Label */}
            <text y="260" textAnchor="middle" fontFamily="sans-serif" fontSize="11"
              fill="rgba(255,255,255,0.5)" letterSpacing="2">{labels[i]}</text>
          </g>
        );
      })}

      {/* 1999 label */}
      <g opacity={interpolate(f,[50,65],[0,1],{extrapolateRight:"clamp"})}>
        <text x="500" y="490" textAnchor="middle" fontFamily="sans-serif" fontSize="15"
          fill="rgba(255,255,255,0.4)" letterSpacing="6">SIR ALEX FERGUSON</text>
        <text x="500" y="525" textAnchor="middle" fontFamily="sans-serif" fontSize="26"
          fontWeight="bold" fill="white">THE TREBLE · 1998–99</text>
      </g>
    </svg>
  );
};

// ─── Liverpool 2020 ───────────────────────────────────────────────────────

export const LiverpoolVisual: React.FC = () => {
  const f = useCurrentFrame();
  const bannerProg = ease(f, 30, 55);

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="livBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#1a0000" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#livBg)" />

      {/* Anfield silhouette (simplified stands) */}
      <g opacity="0.12">
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={i * 42} y={120 - (i % 4) * 8} width={36} height={180} fill="#C8102E" />
        ))}
      </g>

      {/* 30 YEARS countdown */}
      <g textAnchor="middle" opacity={ease(f,5,30)}>
        <text x="500" y="240" fontFamily="sans-serif" fontSize="160" fontWeight="900"
          fill="#C8102E" opacity="0.9" style={{ textShadow: "0 0 100px #C8102E" }}>30</text>
        <text x="500" y="295" fontFamily="sans-serif" fontSize="28" fill="rgba(255,255,255,0.6)"
          letterSpacing="8">YEARS</text>
      </g>

      {/* Trophy */}
      <g transform="translate(200,120) scale(1.6)" opacity={interpolate(f,[25,45],[0,1],{extrapolateRight:"clamp"})}>
        <rect x="-30" y="150" width="60" height="15" rx="3" fill="#C8102E" />
        <rect x="-18" y="110" width="36" height="45" rx="3" fill="#C8102E" />
        <path d="M-42,55 Q-42,108 0,108 Q42,108 42,55 Q42,18 0,10 Q-42,18 -42,55 Z" fill="#C8102E" />
        <path d="M-42,55 Q-72,55 -72,80 Q-72,108 -42,108" fill="none" stroke="#C8102E" strokeWidth="10" strokeLinecap="round" />
        <path d="M42,55 Q72,55 72,80 Q72,108 42,108" fill="none" stroke="#C8102E" strokeWidth="10" strokeLinecap="round" />
        <text y="75" textAnchor="middle" fontFamily="sans-serif" fontSize="32" fill="white">★</text>
      </g>

      {/* Ticket banner */}
      <g opacity={bannerProg}>
        <rect x="60" y="420" width="560" height="70" rx="8" fill="rgba(0,0,0,0.65)" />
        <text x="340" y="448" textAnchor="middle" fontFamily="sans-serif" fontSize="13"
          fill="#C8102E" letterSpacing="5">YOU'LL NEVER WALK ALONE</text>
        <text x="340" y="476" textAnchor="middle" fontFamily="sans-serif" fontSize="20"
          fontWeight="bold" fill="white">LIVERPOOL FC · CHAMPIONS 2019–20</text>
      </g>
    </svg>
  );
};

// ─── City 100 Points 2018 ─────────────────────────────────────────────────

export const CityHundredVisual: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="mcBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a5a8a" />
          <stop offset="100%" stopColor="#050e1a" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#mcBg)" />

      {/* 38 match dots — each lighting up */}
      {Array.from({ length: 38 }).map((_, i) => {
        const col = i % 10, row = Math.floor(i / 10);
        const delay = i * 3;
        const lit = interpolate(f, [delay, delay + 8], [0, 1], { extrapolateRight: "clamp" });
        // 32W 4D 2L
        const result = i < 2 ? "#ff4444" : i < 6 ? "#f0c050" : "#6CABDD";
        return (
          <g key={i}>
            <circle cx={80 + col * 88} cy={80 + row * 88} r={28}
              fill={result} opacity={0.12 + lit * 0.75} />
            <text x={80 + col * 88} y={86 + row * 88} textAnchor="middle"
              fontFamily="sans-serif" fontSize="12" fontWeight="bold"
              fill="white" opacity={lit}>{i < 2 ? "L" : i < 6 ? "D" : "W"}</text>
          </g>
        );
      })}

      {/* 100 PTS */}
      <g textAnchor="middle" opacity={ease(f, 50, 70)}>
        <text x="820" y="340" fontFamily="sans-serif" fontSize="120" fontWeight="900"
          fill="#6CABDD" opacity="0.2">100</text>
        <text x="820" y="380" fontFamily="sans-serif" fontSize="18" fill="rgba(255,255,255,0.4)"
          letterSpacing="5">PTS</text>
      </g>

      <g opacity={ease(f,55,70)}>
        <text x="500" y="500" textAnchor="middle" fontFamily="sans-serif" fontSize="14"
          fill="rgba(255,255,255,0.4)" letterSpacing="5">MANCHESTER CITY · 2017–18</text>
        <text x="500" y="535" textAnchor="middle" fontFamily="sans-serif" fontSize="22"
          fontWeight="bold" fill="white">32W 4D 2L · 106 GOALS</text>
      </g>
    </svg>
  );
};

// ─── City Treble 2023 ─────────────────────────────────────────────────────

export const CityTreble23Visual: React.FC = () => {
  const f = useCurrentFrame();
  const labels = ["PREMIER LEAGUE", "FA CUP", "CHAMPIONS LEAGUE"];

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="mc23Bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a5a8a" />
          <stop offset="100%" stopColor="#050e1a" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#mc23Bg)" />
      <Crowd y={600} color="#6CABDD" opacity={0.15} />

      {[0, 1, 2].map((i) => {
        const cx = 200 + i * 300;
        const delay = i * 14;
        const sc = interpolate(f, [delay, delay + 22], [0, 1], {
          extrapolateRight: "clamp",
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
        const op = interpolate(f, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
        return (
          <g key={i} transform={`translate(${cx},160) scale(${sc})`} opacity={op} textAnchor="middle">
            <rect x="-40" y="200" width="80" height="18" rx="4" fill="#6CABDD" />
            <rect x="-25" y="150" width="50" height="55" rx="4" fill="#6CABDD" />
            <path d="M-55,80 Q-55,145 0,145 Q55,145 55,80 Q55,30 0,20 Q-55,30 -55,80 Z" fill="#6CABDD" />
            <path d="M-55,80 Q-95,80 -95,110 Q-95,145 -55,145" fill="none" stroke="#6CABDD" strokeWidth="12" strokeLinecap="round" />
            <path d="M55,80 Q95,80 95,110 Q95,145 55,145" fill="none" stroke="#6CABDD" strokeWidth="12" strokeLinecap="round" />
            <text y="110" textAnchor="middle" fontFamily="sans-serif" fontSize="40" fill="#0a3a5c">★</text>
            <text y="260" textAnchor="middle" fontFamily="sans-serif" fontSize="11"
              fill="rgba(255,255,255,0.5)" letterSpacing="2">{labels[i]}</text>
          </g>
        );
      })}

      <g opacity={ease(f, 55, 70)}>
        <text x="500" y="495" textAnchor="middle" fontFamily="sans-serif" fontSize="14"
          fill="rgba(255,255,255,0.4)" letterSpacing="5">PEP GUARDIOLA</text>
        <text x="500" y="528" textAnchor="middle" fontFamily="sans-serif" fontSize="24"
          fontWeight="bold" fill="white">THE TREBLE · 2022–23</text>
      </g>
    </svg>
  );
};

// ─── Blackburn 1995 ───────────────────────────────────────────────────────

export const BlackburnVisual: React.FC = () => {
  const f = useCurrentFrame();
  const ballProg = ease(f, 5, 35);

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="brnBg" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#004a82" />
          <stop offset="100%" stopColor="#00102a" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#brnBg)" />
      <Crowd y={180} color="#009EE0" opacity={0.2} />

      {/* Shearer silhouette (simplified player celebrating) */}
      <g transform="translate(600,120)" opacity={ballProg * 0.9}>
        <circle cx="60" cy="60" r="35" fill="#009EE0" opacity="0.6" />
        <rect x="35" y="90" width="50" height="80" rx="10" fill="#009EE0" opacity="0.6" />
        <line x1="85" y1="130" x2="120" y2="100" stroke="#009EE0" strokeWidth="14" strokeLinecap="round" opacity="0.6" />
        <line x1="35" y1="130" x2="10" y2="110" stroke="#009EE0" strokeWidth="14" strokeLinecap="round" opacity="0.6" />
        <line x1="50" y1="165" x2="35" y2="220" stroke="#009EE0" strokeWidth="14" strokeLinecap="round" opacity="0.6" />
        <line x1="70" y1="165" x2="85" y2="220" stroke="#009EE0" strokeWidth="14" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* 34 goals stat */}
      <g textAnchor="middle" opacity={ease(f, 15, 40)}>
        <text x="380" y="260" fontFamily="sans-serif" fontSize="170" fontWeight="900"
          fill="#009EE0" opacity="0.9">34</text>
        <text x="380" y="320" fontFamily="sans-serif" fontSize="20" fill="rgba(255,255,255,0.5)"
          letterSpacing="6">GOALS · 1994–95</text>
      </g>

      <g opacity={ease(f, 45, 60)}>
        <rect x="60" y="440" width="540" height="65" rx="8" fill="rgba(0,0,0,0.6)" />
        <text x="330" y="465" textAnchor="middle" fontFamily="sans-serif" fontSize="13"
          fill="#009EE0" letterSpacing="4">ALAN SHEARER · PREMIER LEAGUE RECORD</text>
        <text x="330" y="492" textAnchor="middle" fontFamily="sans-serif" fontSize="20"
          fontWeight="bold" fill="white">BLACKBURN ROVERS · CHAMPIONS 1994–95</text>
      </g>
    </svg>
  );
};

// ─── EPL Birth 1992 ───────────────────────────────────────────────────────

export const BirthVisual: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <svg viewBox="0 0 1000 600" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="birthBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="100%" stopColor="#05101e" />
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#birthBg)" />

      {/* Football pitch top-down */}
      <g transform="translate(100,60)" opacity={ease(f,0,25)*0.6}>
        <rect width="800" height="480" rx="8" fill="#1a5c1a" />
        {/* Lines */}
        <rect x="0" y="0" width="800" height="480" rx="8" fill="none" stroke="#2a8a2a" strokeWidth="3" />
        <line x1="400" y1="0" x2="400" y2="480" stroke="#2a8a2a" strokeWidth="2" />
        <circle cx="400" cy="240" r="80" fill="none" stroke="#2a8a2a" strokeWidth="2" />
        <circle cx="400" cy="240" r="5" fill="#2a8a2a" />
        {/* Goals */}
        <rect x="0" y="165" width="50" height="150" fill="none" stroke="#2a8a2a" strokeWidth="2" />
        <rect x="750" y="165" width="50" height="150" fill="none" stroke="#2a8a2a" strokeWidth="2" />
        {/* Penalty boxes */}
        <rect x="0" y="105" width="130" height="270" fill="none" stroke="#2a8a2a" strokeWidth="2" />
        <rect x="670" y="105" width="130" height="270" fill="none" stroke="#2a8a2a" strokeWidth="2" />
      </g>

      {/* PREMIER LEAGUE 1992 text */}
      <g textAnchor="middle" opacity={ease(f,20,45)}>
        <text x="500" y="260" fontFamily="sans-serif" fontSize="80" fontWeight="900"
          fill="#00c7ff">1992</text>
        <text x="500" y="320" fontFamily="sans-serif" fontSize="20" fill="rgba(255,255,255,0.5)"
          letterSpacing="8">THE BEGINNING</text>
      </g>

      <g opacity={ease(f,40,60)}>
        <rect x="60" y="430" width="580" height="65" rx="8" fill="rgba(0,0,0,0.6)" />
        <text x="350" y="458" textAnchor="middle" fontFamily="sans-serif" fontSize="13"
          fill="#00c7ff" letterSpacing="4">22 FOUNDING CLUBS · £304M TV DEAL</text>
        <text x="350" y="484" textAnchor="middle" fontFamily="sans-serif" fontSize="20"
          fontWeight="bold" fill="white">15 AUGUST 1992 — KICK-OFF</text>
      </g>
    </svg>
  );
};
