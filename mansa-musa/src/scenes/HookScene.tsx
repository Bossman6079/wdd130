import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Spinning gold coin
const SpinningCoin: React.FC<{ frame: number }> = ({ frame }) => {
  const rotation = (frame * 2) % 360;
  const scaleX = Math.abs(Math.cos((frame * 2 * Math.PI) / 180));
  const glow = 0.5 + 0.5 * Math.sin(frame * 0.08);

  return (
    <g transform={`translate(960,400) rotate(${rotation * 0.3}) scale(${0.85 + 0.15 * Math.sin(frame * 0.05)})`}>
      <defs>
        <radialGradient id="coinGrad" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor={C.goldPale} />
          <stop offset="45%" stopColor={C.gold} />
          <stop offset="100%" stopColor={C.goldDark} />
        </radialGradient>
        <filter id="coinGlow">
          <feGaussianBlur stdDeviation={8 + glow * 8} result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <ellipse cx={0} cy={0} rx={160 * Math.max(0.05, scaleX)} ry={160} fill={`url(#coinGrad)`} filter="url(#coinGlow)" />
      {scaleX > 0.3 && (
        <>
          <text x={0} y={-12} textAnchor="middle" fontSize={48} fontFamily={cinzel}
            fill={C.amber} style={{ transform: `scaleX(${1 / Math.max(0.05, scaleX)})` }}>
            M
          </text>
          <text x={0} y={26} textAnchor="middle" fontSize={18} fontFamily={cinzel}
            fill={C.amber} style={{ transform: `scaleX(${1 / Math.max(0.05, scaleX)})` }}>
            MALI
          </text>
          <circle cx={0} cy={0} r={155 * Math.max(0.05, scaleX)} fill="none" stroke={C.amber} strokeWidth={3} opacity={0.6} />
          <circle cx={0} cy={0} r={140 * Math.max(0.05, scaleX)} fill="none" stroke={C.amber} strokeWidth={1} opacity={0.3} />
        </>
      )}
    </g>
  );
};

// Gold particle
interface Particle { x: number; y: number; size: number; speed: number; drift: number; delay: number; }
const makeParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    x: (i * 137.508) % 1920,
    y: ((i * 193.2) % 200) - 200,
    size: 2 + (i % 5),
    speed: 1.2 + (i % 7) * 0.4,
    drift: ((i % 11) - 5) * 0.3,
    delay: (i * 7) % 120,
  }));
const PARTICLES = makeParticles(60);

const GoldParticles: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    {PARTICLES.map((p, i) => {
      const t = Math.max(0, frame - p.delay);
      const y = (p.y + t * p.speed) % 1280;
      const x = p.x + Math.sin(t * 0.04 + i) * 20 + t * p.drift;
      const opacity = 0.15 + 0.6 * Math.sin(t * 0.07 + i * 0.5);
      return (
        <circle key={i} cx={x} cy={y < 0 ? y + 1280 : y} r={p.size}
          fill={C.gold} opacity={Math.max(0, opacity)} />
      );
    })}
  </g>
);


export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  // Title reveal
  const titleOpacity = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [15, 50], [660, 620], { extrapolateRight: "clamp", easing: ease });

  // Subtitle
  const subOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  // Year text
  const yearOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateRight: "clamp" });

  // Vignette pulse
  const pulse = 0.6 + 0.1 * Math.sin(frame * 0.05);

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.18} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor={C.black} stopOpacity={pulse} />
          </radialGradient>
          {/* Sand texture lines */}
          <pattern id="sand" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke={C.gold} strokeWidth="0.3" opacity="0.05" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width={1920} height={1080} fill={C.black} />
        <rect width={1920} height={1080} fill="url(#sand)" />
        <rect width={1920} height={1080} fill="url(#bgGlow)" />

        {/* Particles */}
        <GoldParticles frame={frame} />

        {/* Horizontal gold lines */}
        {[180, 900].map((y, i) => (
          <line key={i} x1={0} y1={y} x2={1920} y2={y} stroke={C.gold}
            strokeWidth={1} opacity={0.15 + 0.05 * Math.sin(frame * 0.03 + i)} />
        ))}

        {/* Spinning coin */}
        <SpinningCoin frame={frame} />

        {/* Year */}
        <g opacity={yearOpacity}>
          <text x={960} y={260} textAnchor="middle" fontSize={36} fontFamily={cinzel}
            fill={C.gold} letterSpacing={12}>
            1 3 2 4
          </text>
          <line x1={800} y1={275} x2={1120} y2={275} stroke={C.gold} strokeWidth={1} opacity={0.5} />
        </g>

        {/* Main title */}
        <g opacity={titleOpacity} transform={`translate(0,${titleY - 620})`}>
          <text x={960} y={620} textAnchor="middle" fontSize={88} fontFamily={cinzel}
            fill={C.ivory} fontWeight="700" letterSpacing={6}>
            MANSA MUSA
          </text>
          <text x={960} y={690} textAnchor="middle" fontSize={32} fontFamily={cinzel}
            fill={C.gold} letterSpacing={16}>
            THE LION KING OF MALI
          </text>
        </g>

        {/* Subtitle hook */}
        <g opacity={subOpacity}>
          <text x={960} y={800} textAnchor="middle" fontSize={26} fontFamily={garamond}
            fill={C.ivoryDim} fontStyle="italic">
            "The man who crashed the world economy with a single trip"
          </text>
        </g>

        {/* Vignette */}
        <rect width={1920} height={1080} fill="url(#vignette)" />

        {/* Bottom gold bar */}
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
