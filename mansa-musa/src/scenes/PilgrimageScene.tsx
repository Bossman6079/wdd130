import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Route points: Mali → Sahara → Cairo → Mecca
const ROUTE_POINTS = [
  [200, 650], // Mali start
  [380, 580], // Sahara west
  [580, 510], // Sahara mid
  [760, 450], // Libya
  [920, 400], // Cairo
  [1080, 360], // Red Sea
  [1240, 340], // Arabia
  [1380, 370], // Mecca
];

// Build SVG path from route points
const buildRoutePath = (points: number[][]) =>
  points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");

const ROUTE_PATH = buildRoutePath(ROUTE_POINTS);

// Animated route reveal
const RouteReveal: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [30, 280], [0, 1], { extrapolateRight: "clamp", easing: ease });
  // Total path length (estimate ~1250px for our route)
  const totalLength = 1250;
  const drawnLength = progress * totalLength;

  return (
    <g>
      {/* Shadow route */}
      <path d={ROUTE_PATH} fill="none" stroke={C.black} strokeWidth={10} opacity={0.4} />
      {/* Main route line */}
      <path d={ROUTE_PATH} fill="none" stroke={C.gold} strokeWidth={4}
        strokeDasharray={`${totalLength}`} strokeDashoffset={totalLength - drawnLength}
        opacity={0.85} />
      {/* Animated dot on route head */}
      {progress > 0 && progress < 1 && (() => {
        const idx = Math.min(ROUTE_POINTS.length - 2, Math.floor(progress * (ROUTE_POINTS.length - 1)));
        const frac = (progress * (ROUTE_POINTS.length - 1)) - idx;
        const p0 = ROUTE_POINTS[idx], p1 = ROUTE_POINTS[idx + 1];
        const cx = p0[0] + (p1[0] - p0[0]) * frac;
        const cy = p0[1] + (p1[1] - p0[1]) * frac;
        return (
          <g>
            <circle cx={cx} cy={cy} r={12} fill={C.gold} opacity={0.9} />
            <circle cx={cx} cy={cy} r={20} fill="none" stroke={C.gold} strokeWidth={2} opacity={0.5} />
          </g>
        );
      })()}
      {/* Waypoint markers */}
      {[
        { p: ROUTE_POINTS[0], label: "MALI", sub: "Start" },
        { p: ROUTE_POINTS[4], label: "CAIRO", sub: "Egypt" },
        { p: ROUTE_POINTS[7], label: "MECCA", sub: "Destination" },
      ].map(({ p, label, sub }) => {
        const pIdx = ROUTE_POINTS.indexOf(p);
        const revealProg = pIdx / (ROUTE_POINTS.length - 1);
        const op = interpolate(progress, [revealProg - 0.05, revealProg + 0.05], [0, 1], { extrapolateRight: "clamp" });
        return (
          <g key={label} opacity={op}>
            <circle cx={p[0]} cy={p[1]} r={8} fill={label === "MECCA" ? C.ivory : C.gold} />
            <text x={p[0]} y={p[1] - 18} textAnchor="middle" fontSize={16} fontFamily={cinzel}
              fill={label === "MECCA" ? C.ivory : C.goldLight} letterSpacing={2}>{label}</text>
            <text x={p[0]} y={p[1] - 3} textAnchor="middle" fontSize={11} fontFamily={garamond}
              fill={C.ivoryDim}>{sub}</text>
          </g>
        );
      })}
    </g>
  );
};

// Camel caravan
const CamelFigure: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Body */}
    <ellipse cx={0} cy={0} rx={32} ry={22} fill={C.amberLight} />
    {/* Hump */}
    <ellipse cx={8} cy={-22} rx={14} ry={18} fill={C.amber} />
    {/* Neck */}
    <rect x={22} y={-28} width={12} height={36} rx={5} fill={C.amberLight} />
    {/* Head */}
    <ellipse cx={35} cy={-24} rx={14} ry={10} fill={C.amberLight} />
    {/* Ear */}
    <ellipse cx={32} cy={-32} rx={4} ry={6} fill={C.amber} />
    {/* Eye */}
    <circle cx={40} cy={-26} r={2} fill={C.brownDark} />
    {/* Legs */}
    {[-20, -8, 8, 20].map((ox, i) => (
      <rect key={i} x={ox - 4} y={18} width={8} height={30 + (i % 2 === 0 ? 5 : 0)} rx={3}
        fill={C.amber} />
    ))}
    {/* Gold load on back */}
    <rect x={-22} y={-18} width={24} height={18} rx={3} fill={C.goldDark} opacity={0.9} />
    <rect x={-20} y={-16} width={20} height={14} rx={2} fill={C.gold} opacity={0.7} />
  </g>
);

// Walking servant figure
const ServantFigure: React.FC<{ x: number; y: number; frame: number; offset?: number }> =
  ({ x, y, frame, offset = 0 }) => {
  const walkCycle = Math.sin((frame + offset) * 0.25);
  const legSwing = walkCycle * 10;
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Head */}
      <circle cx={0} cy={-62} r={10} fill={C.skin} />
      {/* Headwrap */}
      <ellipse cx={0} cy={-68} rx={12} ry={7} fill={C.ivory} opacity={0.9} />
      {/* Body robe */}
      <path d="M -12 -52 C -15 -30 -16 0 -12 20 L 12 20 C 16 0 15 -30 12 -52 Z"
        fill={C.brownDark} opacity={0.85} />
      {/* Gold staff */}
      <rect x={14} y={-75} width={5} height={90} rx={2} fill={C.gold} opacity={0.9} />
      <circle cx={16} cy={-78} r={7} fill={C.gold} />
      {/* Legs */}
      <line x1={-6} y1={18} x2={-6 + legSwing * 0.5} y2={46} stroke={C.brownDark} strokeWidth={8} strokeLinecap="round" />
      <line x1={6} y1={18} x2={6 - legSwing * 0.5} y2={46} stroke={C.brownDark} strokeWidth={8} strokeLinecap="round" />
      {/* Gold dust trail */}
      <circle cx={-20} cy={20} r={2} fill={C.gold} opacity={0.4} />
    </g>
  );
};

// Scale stat (people count visualization)
const ScaleStat: React.FC<{ x: number; y: number; label: string; value: string; icon: string; frame: number; startFrame: number }> =
  ({ x, y, label, value, icon, frame, startFrame }) => {
  const op = interpolate(frame, [startFrame, startFrame + 25], [0, 1], { extrapolateRight: "clamp" });
  return (
    <g opacity={op} transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={340} height={95} rx={6} fill={C.blackSoft}
        stroke={C.goldDark} strokeWidth={1} />
      <rect x={0} y={0} width={4} height={95} rx={2} fill={C.gold} />
      <text x={24} y={32} fontSize={28} fontFamily="serif" fill={C.gold}>{icon}</text>
      <text x={65} y={30} fontSize={14} fontFamily={cinzel} fill={C.gold} letterSpacing={2}>{label}</text>
      <text x={65} y={62} fontSize={24} fontFamily={cinzel} fill={C.ivory} fontWeight="700">{value}</text>
    </g>
  );
};

export const PilgrimageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  // Caravan moves across bottom
  const caravanX = interpolate(frame, [30, durationInFrames - 60], [-300, 1800], { extrapolateRight: "clamp" });

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0D0A06", opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <linearGradient id="desertBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A0806" />
            <stop offset="60%" stopColor="#120E06" />
            <stop offset="100%" stopColor="#1C1408" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="80%" cy="20%" r="35%">
            <stop offset="0%" stopColor={C.gold} stopOpacity={0.2} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
          <filter id="sandFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" />
          </filter>
        </defs>

        <rect width={1920} height={1080} fill="url(#desertBg)" />
        <rect width={1920} height={1080} fill="url(#sunGlow)" />

        {/* Stars */}
        {Array.from({ length: 80 }, (_, i) => (
          <circle key={i} cx={(i * 137.5) % 1920} cy={(i * 97.3) % 500}
            r={0.8 + (i % 3) * 0.5}
            fill="white" opacity={0.3 + 0.3 * Math.sin(frame * 0.05 + i)} />
        ))}

        {/* Crescent moon */}
        <g opacity={0.8}>
          <circle cx={1650} cy={120} r={55} fill={C.gold} opacity={0.25} />
          <circle cx={1668} cy={112} r={46} fill="#0D0A06" />
        </g>

        {/* Desert dunes */}
        <path d="M 0 820 Q 240 760 480 820 Q 720 880 960 820 Q 1200 760 1440 820 Q 1680 880 1920 820 L 1920 1080 L 0 1080 Z"
          fill="#1C1408" opacity={0.9} />
        <path d="M 0 870 Q 300 820 600 870 Q 900 920 1200 870 Q 1500 820 1920 870 L 1920 1080 L 0 1080 Z"
          fill="#150E06" opacity={0.95} />

        {/* Route map (upper area) */}
        <g transform="translate(0, 80)">
          <text x={960} y={40} textAnchor="middle" fontSize={12} fontFamily={cinzel}
            fill={C.goldDark} letterSpacing={6} opacity={titleOp}>
            THE ROUTE · MALI TO MECCA · 1324 AD
          </text>
          {/* Simplified mini-map for route */}
          <g opacity={0.6}>
            <rect x={100} y={55} width={1720} height={440} rx={8}
              fill={C.black} opacity={0.5} stroke={C.goldDark} strokeWidth={1} />
            {/* Desert texture */}
            <text x={200} y={300} fontSize={180} fill={C.amber} opacity={0.04}
              fontFamily="serif">∿∿∿∿∿∿∿∿</text>
          </g>
          <RouteReveal frame={frame} />
        </g>

        {/* Animated caravan at bottom */}
        <g transform={`translate(${caravanX}, 820)`}>
          {/* Servants with staffs */}
          {[0, 80, 160, 240, 320].map((ox, i) => (
            <ServantFigure key={i} x={ox} y={0} frame={frame} offset={ox} />
          ))}
          {/* Camels with gold */}
          {[400, 550, 700, 850].map((ox, i) => (
            <CamelFigure key={i} x={ox} y={-10} scale={0.85} />
          ))}
          {/* More servants */}
          {[1000, 1080, 1160].map((ox, i) => (
            <ServantFigure key={`s2${i}`} x={ox} y={0} frame={frame} offset={ox * 2} />
          ))}
          {/* Mansa Musa on horse (simplified) */}
          <g transform="translate(1250, -20)">
            {/* Horse body */}
            <ellipse cx={0} cy={20} rx={55} ry={30} fill="#3A2808" />
            <rect x={30} y={-8} width={18} height={48} rx={5} fill="#3A2808" />
            <ellipse cx={52} cy={-10} rx={20} ry={14} fill="#3A2808" />
            {/* Legs */}
            {[-35, -15, 10, 30].map((ox, i) => (
              <rect key={i} x={ox - 4} y={46} width={8} height={35} rx={3} fill="#2A1E04" />
            ))}
            {/* Rider - Mansa Musa */}
            <circle cx={12} cy={-28} r={12} fill={C.skin} />
            <ellipse cx={12} cy={-33} rx={14} ry={8} fill={C.gold} />
            <rect x={-8} y={-18} width={40} height={45} rx={4} fill={C.red} />
            {/* Gold robe detail */}
            <path d="M -8 -18 L -8 25 Q 16 32 40 25 L 40 -18" fill="none" stroke={C.gold} strokeWidth={2} opacity={0.5} />
          </g>
        </g>

        {/* Dust cloud behind caravan */}
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i}
            cx={caravanX + 1400 + i * 30 + Math.sin(frame * 0.1 + i) * 20}
            cy={860 + i * 8}
            rx={25 + i * 8} ry={12 + i * 4}
            fill={C.amber} opacity={0.03 + i * 0.01} />
        ))}

        {/* Scale stats - left panel */}
        <ScaleStat x={60} y={120} label="TOTAL ENTOURAGE" value="60,000 people" icon="👥" frame={frame} startFrame={40} />
        <ScaleStat x={60} y={235} label="SERVANTS"         value="12,000 (1.8kg gold each)" icon="⚖" frame={frame} startFrame={80} />
        <ScaleStat x={60} y={350} label="GOLD HERALDS"     value="500 (golden staffs)" icon="🏅" frame={frame} startFrame={120} />
        <ScaleStat x={60} y={465} label="CAMELS"           value="80 (50–300 lbs gold dust each)" icon="🐪" frame={frame} startFrame={160} />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={960} y={60} textAnchor="middle" fontSize={18} fontFamily={cinzel}
            fill={C.gold} letterSpacing={8}>THE HAJJ · THE PILGRIMAGE TO MECCA</text>
        </g>

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
