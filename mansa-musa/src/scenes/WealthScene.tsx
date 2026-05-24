import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Format number with B/T suffix
const formatBillions = (n: number): string => {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}T`;
  return `$${Math.round(n)}B`;
};

// Odometer-style counter
const WealthCounter: React.FC<{ frame: number }> = ({ frame }) => {
  const TARGET = 400; // billion
  const startFrame = 60;
  const endFrame = 420;
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const current = progress * TARGET;

  const glow = 0.6 + 0.4 * Math.sin(frame * 0.08);
  const displayStr = formatBillions(current);

  return (
    <g transform="translate(480, 120)">
      <defs>
        <radialGradient id="counterBg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={glow * 0.25} />
          <stop offset="100%" stopColor={C.black} stopOpacity={0} />
        </radialGradient>
        <filter id="counterGlow">
          <feGaussianBlur stdDeviation={20} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx={490} cy={320} rx={520} ry={340} fill="url(#counterBg)" />

      {/* Display screen border */}
      <rect x={30} y={40} width={920} height={380} rx={20}
        fill={C.blackSoft} stroke={C.gold} strokeWidth={4} />
      <rect x={40} y={50} width={900} height={360} rx={16}
        fill={C.black} stroke={C.goldDark} strokeWidth={1} />

      {/* Ticker lines */}
      {[100, 160, 220, 280, 340].map((y, i) => (
        <line key={i} x1={50} y1={y} x2={970} y2={y}
          stroke={C.goldDark} strokeWidth={0.5} opacity={0.15} />
      ))}

      {/* Label */}
      <text x={490} y={95} textAnchor="middle" fontSize={16} fontFamily={cinzel}
        fill={C.goldDark} letterSpacing={6}>ESTIMATED NET WORTH</text>
      <line x1={150} y1={108} x2={830} y2={108} stroke={C.goldDark} strokeWidth={0.5} opacity={0.5} />

      {/* Main counter */}
      <text x={490} y={290} textAnchor="middle" fontSize={160} fontFamily={cinzel}
        fill={C.gold} fontWeight="700" filter="url(#counterGlow)"
        style={{ letterSpacing: "8px" }}>
        {displayStr}
      </text>

      {/* "IN 2024 DOLLARS" */}
      <text x={490} y={360} textAnchor="middle" fontSize={18} fontFamily={cinzel}
        fill={C.ivoryDim} letterSpacing={6}>IN TODAY'S DOLLARS</text>

      {/* Shimmer lines across counter */}
      <rect x={40} y={200} width={progress * 900} height={2} fill={C.goldPale} opacity={0.3 * glow} />
    </g>
  );
};

// Comparison bars for modern billionaires
const ComparisonBars: React.FC<{ frame: number }> = ({ frame }) => {
  const comparisons = [
    { name: "MANSA MUSA", value: 400, color: C.gold,     isMain: true,  startFrame: 60  },
    { name: "ELON MUSK",  value: 300, color: C.ivory,    isMain: false, startFrame: 200 },
    { name: "JEFF BEZOS", value: 215, color: C.ivory,    isMain: false, startFrame: 240 },
    { name: "BILL GATES", value: 130, color: C.ivoryDim, isMain: false, startFrame: 280 },
  ];

  const maxVal = 420;
  const barMaxWidth = 750;

  return (
    <g transform="translate(60, 600)">
      <text x={0} y={-20} fontSize={14} fontFamily={cinzel} fill={C.gold} letterSpacing={4}>
        WEALTH COMPARISON (BILLIONS USD)
      </text>
      <line x1={0} y1={-8} x2={900} y2={-8} stroke={C.goldDark} strokeWidth={1} opacity={0.4} />

      {comparisons.map(({ name, value, color, isMain, startFrame }, i) => {
        const barProgress = interpolate(frame, [startFrame, startFrame + 60], [0, 1], { extrapolateRight: "clamp", easing: ease });
        const barWidth = (value / maxVal) * barMaxWidth * barProgress;
        const y = i * 90;

        return (
          <g key={name} transform={`translate(0, ${y})`}>
            {/* Label */}
            <text x={0} y={24} fontSize={isMain ? 18 : 14} fontFamily={cinzel}
              fill={isMain ? C.gold : C.ivory} letterSpacing={2}>
              {name}
            </text>
            {/* Bar background */}
            <rect x={0} y={32} width={barMaxWidth} height={isMain ? 44 : 35} rx={4}
              fill={C.blackSoft} opacity={0.6} />
            {/* Bar fill */}
            <rect x={0} y={32} width={barWidth} height={isMain ? 44 : 35} rx={4}
              fill={color} opacity={isMain ? 0.9 : 0.5} />
            {/* Gold shine on main bar */}
            {isMain && (
              <rect x={0} y={32} width={barWidth} height={8} rx={4}
                fill={C.goldPale} opacity={0.35} />
            )}
            {/* Value label */}
            <text x={barWidth + 12} y={isMain ? 62 : 56} fontSize={isMain ? 20 : 16}
              fontFamily={cinzel} fill={color} fontWeight={isMain ? "700" : "normal"}>
              ${value}B
            </text>
            {/* Year context */}
            <text x={barWidth + 80} y={isMain ? 62 : 56} fontSize={12}
              fontFamily={garamond} fill={C.ivoryDim} fontStyle="italic">
              {isMain ? "(14th century)" : "(2024)"}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Context facts
const ContextFacts: React.FC<{ frame: number }> = ({ frame }) => {
  const facts = [
    { text: "700 years ago",           icon: "🕰",  startFrame: 320 },
    { text: "Without electricity",      icon: "⚡",  startFrame: 360 },
    { text: "Without the internet",     icon: "🌐", startFrame: 400 },
    { text: "Without a stock market",   icon: "📈", startFrame: 440 },
    { text: "Still the richest person who ever lived", icon: "👑", startFrame: 480 },
  ];

  return (
    <g transform="translate(1000, 620)">
      <rect x={0} y={-30} width={860} height={400} rx={8}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} opacity={0.85} />
      <rect x={0} y={-30} width={860} height={4} rx={2} fill={C.gold} />
      <text x={430} y={-5} textAnchor="middle" fontSize={14} fontFamily={cinzel}
        fill={C.gold} letterSpacing={4}>CONTEXT</text>
      <line x1={20} y1={10} x2={840} y2={10} stroke={C.goldDark} strokeWidth={0.5} opacity={0.5} />

      {facts.map(({ text, icon, startFrame }, i) => {
        const op = interpolate(frame, [startFrame, startFrame + 25], [0, 1], { extrapolateRight: "clamp" });
        return (
          <g key={text} opacity={op} transform={`translate(30, ${30 + i * 62})`}>
            <text x={0} y={24} fontSize={26}>{icon}</text>
            <text x={46} y={28} fontSize={18} fontFamily={garamond} fill={C.ivory}>{text}</text>
          </g>
        );
      })}
    </g>
  );
};

export const WealthScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  // Gold particle background (fewer)
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: (i * 137.5) % 1920,
    y: (i * 97.3) % 1080,
    r: 1 + (i % 4),
    phase: i * 0.7,
  }));

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <radialGradient id="wealthBg" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor={C.gold} stopOpacity={0.08} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill={C.black} />
        <rect width={1920} height={1080} fill="url(#wealthBg)" />

        {/* Background gold particles */}
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={C.gold}
            opacity={0.05 + 0.05 * Math.sin(frame * 0.05 + p.phase)} />
        ))}

        {/* Wealth counter */}
        <WealthCounter frame={frame} />

        {/* Comparison bars */}
        <ComparisonBars frame={frame} />

        {/* Context facts */}
        <ContextFacts frame={frame} />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={960} y={70} textAnchor="middle" fontSize={15} fontFamily={cinzel}
            fill={C.gold} letterSpacing={8}>HOW RICH WAS MANSA MUSA?</text>
        </g>

        {/* Final statement */}
        {interpolate(frame, [560, 620], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [560, 620], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={480} y={530} width={960} height={55} rx={6} fill={C.black} stroke={C.gold} strokeWidth={1} />
            <text x={960} y={566} textAnchor="middle" fontSize={20} fontFamily={cinzel}
              fill={C.ivory} letterSpacing={2}>
              He lived 700 years ago — and was still richer than anyone alive today.
            </text>
          </g>
        )}

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
