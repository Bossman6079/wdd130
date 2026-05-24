import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Cairo skyline silhouette (minarets, domes)
const CairoSkyline: React.FC = () => (
  <g opacity={0.85}>
    {/* Far background buildings */}
    {[120, 200, 290, 380, 460, 550, 660, 750, 850, 960, 1060, 1150, 1250, 1340, 1440, 1530].map((x, i) => (
      <rect key={i} x={x} y={680 - (i % 5) * 40 - 60}
        width={60 + (i % 3) * 20} height={160 + (i % 5) * 40}
        fill={C.brownDark} opacity={0.5 + (i % 3) * 0.1} />
    ))}

    {/* Main minarets */}
    {[200, 500, 800, 1100, 1400].map((x, i) => (
      <g key={i} transform={`translate(${x}, 500)`}>
        {/* Minaret body */}
        <rect x={-18} y={-200} width={36} height={240} fill={C.amber} rx={2} opacity={0.9} />
        <rect x={-22} y={-210} width={44} height={20} fill={C.brownDark} rx={2} />
        {/* Mid balcony */}
        <rect x={-24} y={-130} width={48} height={10} fill={C.brownDark} rx={2} />
        {/* Pointed top */}
        <polygon points="-14,-210 0,-260 14,-210" fill={C.goldDark} opacity={0.9} />
        {/* Crescent */}
        <circle cx={0} cy={-268} r={8} fill="none" stroke={C.gold} strokeWidth={2} opacity={0.8} />
        <circle cx={3} cy={-269} r={6} fill={C.brownDark} />
      </g>
    ))}

    {/* Dome shapes */}
    {[350, 650, 950, 1250].map((x, i) => (
      <g key={i} transform={`translate(${x}, 0)`}>
        <ellipse cx={0} cy={710} rx={65} ry={50} fill={C.amber} opacity={0.7} />
        <rect x={-65} y={710} width={130} height={80} fill={C.amber} opacity={0.8} />
      </g>
    ))}

    {/* Ground */}
    <rect x={0} y={760} width={1920} height={100} fill={C.brownDark} opacity={0.7} />
    <rect x={0} y={758} width={1920} height={4} fill={C.goldDark} opacity={0.3} />
  </g>
);

// Gold coins raining from top
const GoldRain: React.FC<{ frame: number; intensity: number }> = ({ frame, intensity }) => {
  const coins = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 137.5 + frame * 0.3) % 1920,
    startY: -50 - (i * 37) % 400,
    speed: 2 + (i % 5),
    size: 6 + (i % 8),
    rot: (frame * 3 + i * 30) % 360,
    delay: i * 8,
  }));

  return (
    <g opacity={intensity}>
      {coins.map((c, i) => {
        const y = (c.startY + Math.max(0, frame - c.delay) * c.speed) % 900;
        return (
          <g key={i} transform={`translate(${c.x}, ${y < 0 ? y + 900 : y}) rotate(${c.rot})`}>
            <ellipse cx={0} cy={0} rx={c.size * Math.abs(Math.cos((frame * 2 + i) * Math.PI / 90))}
              ry={c.size} fill={C.gold} opacity={0.7} />
          </g>
        );
      })}
    </g>
  );
};

// Gold price crash chart
const PriceChart: React.FC<{ frame: number }> = ({ frame }) => {
  const chartReveal = interpolate(frame, [180, 360], [0, 1], { extrapolateRight: "clamp", easing: ease });

  const dataPoints = [
    [0, 0],   // Start (baseline = high value)
    [0.1, -5],
    [0.2, -25],
    [0.35, -60],
    [0.5, -100],
    [0.65, -130],
    [0.8, -155],
    [1.0, -170],
  ];

  const W = 480, H = 200;
  const baseY = H;
  const revealedPoints = dataPoints.filter(p => p[0] <= chartReveal);
  if (revealedPoints.length < 2) return null;

  const pathD = revealedPoints.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p[0] * W} ${baseY + p[1]}`
  ).join(" ");

  const fillD = pathD + ` L ${revealedPoints[revealedPoints.length-1][0] * W} ${baseY} L 0 ${baseY} Z`;

  return (
    <g transform="translate(1360, 280)">
      <defs>
        <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={C.red} stopOpacity={0.5} />
          <stop offset="100%" stopColor={C.red} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      {/* Chart background */}
      <rect x={-20} y={-30} width={W + 40} height={H + 60} rx={6}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} opacity={0.9} />
      {/* Title */}
      <text x={W/2} y={-10} textAnchor="middle" fontSize={14} fontFamily={cinzel}
        fill={C.gold} letterSpacing={3}>GOLD VALUE IN CAIRO</text>
      {/* Axes */}
      <line x1={0} y1={baseY} x2={W} y2={baseY} stroke={C.ivoryDim} strokeWidth={1} opacity={0.5} />
      <line x1={0} y1={0} x2={0} y2={baseY} stroke={C.ivoryDim} strokeWidth={1} opacity={0.5} />
      {/* Y labels */}
      <text x={-10} y={baseY} textAnchor="end" fontSize={11} fontFamily={garamond} fill={C.ivoryDim}>Low</text>
      <text x={-10} y={10} textAnchor="end" fontSize={11} fontFamily={garamond} fill={C.ivoryDim}>High</text>
      {/* Fill */}
      <path d={fillD} fill="url(#chartFill)" />
      {/* Line */}
      <path d={pathD} fill="none" stroke={C.red} strokeWidth={3} />
      {/* Mansa Musa arrives marker */}
      {chartReveal > 0.15 && (
        <g>
          <line x1={0.2 * W} y1={0} x2={0.2 * W} y2={baseY}
            stroke={C.gold} strokeWidth={1} strokeDasharray="4,3" opacity={0.7} />
          <text x={0.2 * W + 5} y={20} fontSize={10} fontFamily={cinzel} fill={C.gold}>
            Mansa Musa arrives
          </text>
        </g>
      )}
      {/* Down indicator */}
      {chartReveal > 0.8 && (
        <g transform={`translate(${W * 0.85}, ${baseY - 80})`}>
          <text x={0} y={0} textAnchor="middle" fontSize={32} fontFamily={cinzel}
            fill={C.red} fontWeight="700">−75%</text>
          <text x={0} y={25} textAnchor="middle" fontSize={12} fontFamily={garamond}
            fill={C.ivoryDim}>gold value</text>
        </g>
      )}
    </g>
  );
};

// Happy crowd turning shocked
const CairoCrowd: React.FC<{ frame: number }> = ({ frame }) => {
  const joyPhase = interpolate(frame, [60, 180], [0, 1], { extrapolateRight: "clamp" });
  const shockPhase = interpolate(frame, [220, 340], [0, 1], { extrapolateRight: "clamp" });

  return (
    <g transform="translate(0, 730)">
      {/* Ground line */}
      <rect x={0} y={0} width={1100} height={8} fill={C.brownDark} opacity={0.5} />
      {/* Crowd figures */}
      {Array.from({ length: 28 }, (_, i) => {
        const x = 50 + i * 38;
        const jumpH = joyPhase > 0 && shockPhase < 0.5
          ? Math.abs(Math.sin(frame * 0.25 + i * 0.8)) * 20 * joyPhase
          : 0;
        const slump = shockPhase * 8;
        const armUp = joyPhase * (1 - shockPhase);

        return (
          <g key={i} transform={`translate(${x}, ${-jumpH + slump})`}>
            {/* Head */}
            <circle cx={0} cy={-60} r={10} fill={i % 3 === 0 ? C.skin : i % 3 === 1 ? C.skinLight : C.brown} />
            {/* Body */}
            <rect x={-9} y={-50} width={18} height={40} rx={3}
              fill={i % 4 === 0 ? C.amber : i % 4 === 1 ? C.brownDark : i % 4 === 2 ? C.red : "#2A4A1A"} />
            {/* Arms — raised in joy or fallen */}
            <line x1={-9} y1={-38} x2={-9 - armUp * 20} y2={-38 - armUp * 25}
              stroke={i % 3 === 0 ? C.skin : C.skinLight} strokeWidth={5} strokeLinecap="round" />
            <line x1={9} y1={-38} x2={9 + armUp * 20} y2={-38 - armUp * 25}
              stroke={i % 3 === 0 ? C.skin : C.skinLight} strokeWidth={5} strokeLinecap="round" />
            {/* Legs */}
            <line x1={-5} y1={-10} x2={-8} y2={20} stroke={C.brownDark} strokeWidth={6} strokeLinecap="round" />
            <line x1={5} y1={-10} x2={8} y2={20} stroke={C.brownDark} strokeWidth={6} strokeLinecap="round" />
            {/* Shock expression dot */}
            {shockPhase > 0.5 && (
              <text x={0} y={-72} textAnchor="middle" fontSize={12} fill={C.ivoryDim}>!</text>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const CairoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  // Gold rain intensity: peaks then fades as crisis hits
  const goldRainIntensity = interpolate(frame, [30, 150, 220, 340], [0, 0.9, 0.9, 0.15], { extrapolateRight: "clamp" });

  // Sky color: festive orange → crisis red-gray
  const skyProgress = interpolate(frame, [120, 300], [0, 1], { extrapolateRight: "clamp" });

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  // "12 YEARS" reveal
  const yearsOp = interpolate(frame, [380, 430], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <linearGradient id="cairoSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`rgba(${Math.round(20 + skyProgress * 30)},${Math.round(12 - skyProgress * 12)},${Math.round(8 - skyProgress * 8)},1)`} />
            <stop offset="100%" stopColor={`rgba(${Math.round(40 + skyProgress * 20)},${Math.round(25)},${Math.round(10)},1)`} />
          </linearGradient>
          <radialGradient id="sunCairo" cx="70%" cy="15%" r="30%">
            <stop offset="0%" stopColor={skyProgress > 0.5 ? "#3A1A0A" : C.gold} stopOpacity={0.3} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width={1920} height={1080} fill="url(#cairoSky)" />
        <rect width={1920} height={1080} fill="url(#sunCairo)" />

        {/* Cairo skyline */}
        <CairoSkyline />

        {/* Gold rain */}
        <GoldRain frame={frame} intensity={goldRainIntensity} />

        {/* Crowd */}
        <CairoCrowd frame={frame} />

        {/* Price chart */}
        <PriceChart frame={frame} />

        {/* Left text panel */}
        <rect x={0} y={0} width={360} height={780} rx={0} fill={C.black} opacity={0.75} />

        <g opacity={titleOp}>
          <text x={30} y={70} fontSize={13} fontFamily={cinzel} fill={C.gold} letterSpacing={5}>
            CAIRO, EGYPT · 1324
          </text>
          <text x={30} y={140} fontSize={56} fontFamily={cinzel} fill={C.ivory} fontWeight="700">
            THE
          </text>
          <text x={30} y={200} fontSize={56} fontFamily={cinzel} fill={C.gold} fontWeight="700">
            CAIRO
          </text>
          <text x={30} y={260} fontSize={56} fontFamily={cinzel} fill={C.ivory} fontWeight="700">
            CRISIS
          </text>
          <line x1={30} y1={278} x2={300} y2={278} stroke={C.gold} strokeWidth={2} opacity={0.6} />
        </g>

        {/* Story bullets */}
        {[
          { y: 320, text: "Musa gives gold freely", frame: 40 },
          { y: 365, text: "Cairo flooded with gold", frame: 100 },
          { y: 410, text: "Gold value collapses −75%", frame: 180 },
          { y: 455, text: "Prices skyrocket", frame: 240 },
          { y: 500, text: "Economy in free fall", frame: 300 },
        ].map(({ y, text, frame: sf }) => {
          const op = interpolate(frame, [sf, sf + 25], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={y} opacity={op}>
              <circle cx={48} cy={y - 6} r={4} fill={C.gold} />
              <text x={64} y={y} fontSize={16} fontFamily={garamond} fill={C.ivory}>{text}</text>
            </g>
          );
        })}

        {/* 12 YEARS stat */}
        <g opacity={yearsOp} transform="translate(30, 580)">
          <rect x={0} y={0} width={300} height={130} rx={6}
            fill={C.redDeep} stroke={C.red} strokeWidth={2} />
          <rect x={0} y={0} width={300} height={4} rx={2} fill={C.red} />
          <text x={150} y={55} textAnchor="middle" fontSize={60} fontFamily={cinzel}
            fill={C.ivory} fontWeight="700">12</text>
          <text x={150} y={92} textAnchor="middle" fontSize={16} fontFamily={cinzel}
            fill={C.ivoryDim} letterSpacing={4}>YEARS OF DEPRESSION</text>
          <text x={150} y={115} textAnchor="middle" fontSize={12} fontFamily={garamond}
            fill={C.ivoryDim} fontStyle="italic">Egypt's economic collapse</text>
        </g>

        {/* Quote */}
        {interpolate(frame, [340, 380], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [340, 380], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={400} y={860} width={1160} height={90} rx={6} fill={C.black} opacity={0.8} />
            <text x={980} y={900} textAnchor="middle" fontSize={22} fontFamily={garamond}
              fill={C.ivoryDim} fontStyle="italic">
              "One man's generosity caused a continent-wide financial crisis."
            </text>
            <text x={980} y={930} textAnchor="middle" fontSize={15} fontFamily={cinzel}
              fill={C.goldDark} letterSpacing={3}>
              — 12 YEARS OF ECONOMIC DEPRESSION IN EGYPT
            </text>
          </g>
        )}

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
