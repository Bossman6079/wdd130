import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Egyptian banker/merchant figure
const BankerFigure: React.FC<{ x: number; y: number; frame: number; idx: number }> =
  ({ x, y, frame, idx }) => {
  const appear = interpolate(frame, [60 + idx * 30, 90 + idx * 30], [0, 1], { extrapolateRight: "clamp" });
  const sway = Math.sin(frame * 0.03 + idx) * 3;

  return (
    <g opacity={appear} transform={`translate(${x}, ${y + sway})`}>
      {/* Head */}
      <ellipse cx={0} cy={-68} rx={14} ry={16} fill={C.skinLight} />
      {/* Turban/hat */}
      <ellipse cx={0} cy={-78} rx={17} ry={10} fill={idx % 2 === 0 ? C.ivory : "#3A4A2A"} opacity={0.95} />
      {/* Beard */}
      <path d="M -10 -56 Q 0 -44 10 -56" fill={C.brownDark} opacity={0.6} />
      {/* Body - merchant robe */}
      <path d="M -18 -54 C -22 -30 -24 10 -20 40 L 20 40 C 24 10 22 -30 18 -54 Z"
        fill={idx % 2 === 0 ? "#2A2A4A" : "#2A3A1A"} />
      {/* Gold trim on robe */}
      <path d="M -18 -54 C -22 -30 -24 10 -20 40" fill="none" stroke={C.goldDark} strokeWidth={2} opacity={0.5} />
      {/* Belt pouch (for gold) */}
      <ellipse cx={8} cy={10} rx={12} ry={10} fill={C.goldDark} opacity={0.8} />
      <text x={8} y={14} textAnchor="middle" fontSize={10} fill={C.gold}>$</text>
      {/* Arms holding ledger */}
      <rect x={14} y={-30} width={28} height={38} rx={3} fill={C.ivory} opacity={0.85} />
      <line x1={16} y1={-22} x2={38} y2={-22} stroke={C.brownDark} strokeWidth={1.5} opacity={0.5} />
      <line x1={16} y1={-14} x2={38} y2={-14} stroke={C.brownDark} strokeWidth={1.5} opacity={0.5} />
      <line x1={16} y1={-6} x2={38} y2={-6} stroke={C.brownDark} strokeWidth={1.5} opacity={0.5} />
      {/* Legs */}
      <rect x={-12} y={38} width={10} height={35} rx={4} fill={C.brownDark} opacity={0.8} />
      <rect x={4} y={38} width={10} height={35} rx={4} fill={C.brownDark} opacity={0.8} />
    </g>
  );
};

// Mansa Musa on horseback returning
const MansaReturning: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [30, 90], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const breathe = Math.sin(frame * 0.04);

  return (
    <g opacity={appear} transform={`translate(200, 480)`}>
      <defs>
        <radialGradient id="returnGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={0.2} />
          <stop offset="100%" stopColor={C.black} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={160} cy={120} rx={230} ry={140} fill="url(#returnGlow)" />

      {/* Horse */}
      <g transform={`translate(0, ${breathe * 2})`}>
        {/* Horse body */}
        <ellipse cx={120} cy={80} rx={90} ry={42} fill="#3A2808" />
        {/* Horse neck */}
        <ellipse cx={195} cy={50} rx={28} ry={50} fill="#3A2808" />
        {/* Horse head */}
        <ellipse cx={228} cy={22} rx={32} ry={20} fill="#3A2808" />
        <ellipse cx={248} cy={12} rx={10} ry={7} fill="#3A2808" />
        {/* Horse eye */}
        <circle cx={238} cy={18} r={3} fill={C.brownDark} />
        {/* Mane */}
        <path d="M 195 10 Q 210 -5 225 8 Q 200 15 195 30" fill="#1A1008" />
        {/* Horse legs */}
        {[30, 60, 140, 170].map((ox, i) => (
          <rect key={i} x={ox} y={118} width={14} height={55 + (i % 2) * 8}
            rx={5} fill="#2A1E04" />
        ))}
        {/* Horse tail */}
        <path d="M 30 80 C 0 85 -15 100 -5 120" fill="none" stroke="#1A1008" strokeWidth={8} />
        {/* Decorative saddle cloth */}
        <path d="M 60 60 L 60 100 Q 120 115 180 100 L 180 60 Q 120 55 60 60"
          fill={C.red} opacity={0.8} />
        <path d="M 60 60 Q 120 55 180 60" fill="none" stroke={C.gold} strokeWidth={3} />
        <path d="M 60 100 Q 120 115 180 100" fill="none" stroke={C.gold} strokeWidth={2} opacity={0.6} />

        {/* Rider - Mansa Musa */}
        <g transform={`translate(90, -40)`}>
          {/* Head */}
          <ellipse cx={50} cy={-20} rx={16} ry={18} fill={C.skin} />
          {/* Royal crown */}
          <rect x={35} y={-38} width={30} height={12} fill={C.gold} rx={2} />
          {[38, 44, 50, 56, 62].map((x, i) => (
            <polygon key={i} points={`${x},-38 ${x+2},-52 ${x+4},-38`} fill={C.gold} />
          ))}
          {/* Crown gems */}
          {[40, 50, 60].map((x, i) => (
            <circle key={i} cx={x} cy={-32} r={3} fill={i === 1 ? C.ivory : C.amber} />
          ))}
          {/* Royal robe */}
          <path d="M 20 -6 C 16 20 14 50 18 70 L 82 70 C 86 50 84 20 80 -6 Z"
            fill={C.red} />
          <path d="M 20 -6 C 16 20 14 50 18 70" fill="none" stroke={C.gold} strokeWidth={3} />
          <path d="M 80 -6 C 84 20 86 50 82 70" fill="none" stroke={C.gold} strokeWidth={3} />
          {/* Robe pattern */}
          {[30, 40, 50, 60, 70].map((x, i) => (
            <rect key={i} x={x-4} y={10} width={8} height={45} rx={1} fill={C.goldDark} opacity={0.35} />
          ))}
        </g>
      </g>

      {/* Gold dust trail */}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx={-30 - i * 25} cy={100 + i * 5}
          rx={15 + i * 5} ry={8 + i * 3}
          fill={C.amber} opacity={0.05 + i * 0.02} />
      ))}
    </g>
  );
};

// Gold flow diagram (borrowing back gold)
const GoldFlowDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const flowAnim = (frame % 120) / 120;

  return (
    <g opacity={appear} transform="translate(920, 140)">
      <rect x={0} y={0} width={900} height={400} rx={8}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} opacity={0.9} />
      <text x={450} y={36} textAnchor="middle" fontSize={16} fontFamily={cinzel}
        fill={C.gold} letterSpacing={4}>ECONOMIC CORRECTION</text>
      <line x1={40} y1={48} x2={860} y2={48} stroke={C.goldDark} strokeWidth={1} opacity={0.4} />

      {/* Musa box */}
      <rect x={40} y={80} width={220} height={100} rx={6}
        fill={C.brownDark} stroke={C.gold} strokeWidth={2} />
      <text x={150} y={118} textAnchor="middle" fontSize={18} fontFamily={cinzel} fill={C.gold}>MANSA MUSA</text>
      <text x={150} y={142} textAnchor="middle" fontSize={13} fontFamily={garamond} fill={C.ivoryDim}>Mali Empire</text>
      <text x={150} y={162} textAnchor="middle" fontSize={12} fontFamily={garamond}
        fill={C.goldLight} fontStyle="italic">Borrows gold back</text>

      {/* Arrow: Musa → Lenders (gold going back) */}
      <path d={`M 260 130 Q ${260 + flowAnim * 380 + 10} 130 620 130`}
        fill="none" stroke={C.gold} strokeWidth={2}
        strokeDasharray="10,6" strokeDashoffset={-flowAnim * 100} />
      <polygon points="620,122 640,130 620,138" fill={C.gold} />

      {/* Arrow: High interest back to Musa */}
      <path d={`M 620 165 Q ${620 - flowAnim * 380 - 10} 165 260 165`}
        fill="none" stroke={C.red} strokeWidth={2}
        strokeDasharray="10,6" strokeDashoffset={-flowAnim * 100} />
      <polygon points="260,157 240,165 260,173" fill={C.red} />

      {/* Label on arrows */}
      <text x={440} y={118} textAnchor="middle" fontSize={12} fontFamily={garamond}
        fill={C.gold} fontStyle="italic">← gold withdrawn from circulation</text>
      <text x={440} y={180} textAnchor="middle" fontSize={12} fontFamily={garamond}
        fill={C.red} fontStyle="italic">high-interest debt →</text>

      {/* Egyptian Lenders box */}
      <rect x={640} y={80} width={220} height={100} rx={6}
        fill="#1A1A2A" stroke="#4A4A8A" strokeWidth={2} />
      <text x={750} y={118} textAnchor="middle" fontSize={18} fontFamily={cinzel} fill={C.ivory}>EGYPTIAN</text>
      <text x={750} y={138} textAnchor="middle" fontSize={18} fontFamily={cinzel} fill={C.ivory}>LENDERS</text>
      <text x={750} y={162} textAnchor="middle" fontSize={12} fontFamily={garamond}
        fill={C.ivoryDim} fontStyle="italic">Interest paid by Mali</text>

      {/* Result */}
      <rect x={200} y={230} width={500} height={120} rx={6} fill={C.black} stroke={C.goldDark} strokeWidth={1} />
      <text x={450} y={270} textAnchor="middle" fontSize={16} fontFamily={cinzel}
        fill={C.gold} letterSpacing={2}>RESULT</text>
      <text x={450} y={300} textAnchor="middle" fontSize={15} fontFamily={garamond}
        fill={C.ivory}>Gold supply reduced → prices partially stabilized</text>
      <text x={450} y={325} textAnchor="middle" fontSize={13} fontFamily={garamond}
        fill={C.ivoryDim} fontStyle="italic">
        "First person in history to crash — and attempt to fix — a global economy"
      </text>

      {/* Footnote */}
      <text x={450} y={370} textAnchor="middle" fontSize={11} fontFamily={garamond}
        fill={C.goldDark}>* He did not fully succeed</text>
    </g>
  );
};

export const ReturnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <radialGradient id="returnBg" cx="25%" cy="60%" r="50%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.08} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill={C.black} />
        <rect width={1920} height={1080} fill="url(#returnBg)" />

        {/* Desert ground */}
        <path d="M 0 700 Q 480 660 960 700 Q 1440 740 1920 700 L 1920 1080 L 0 1080 Z"
          fill="#120E06" opacity={0.8} />

        {/* Mansa Musa returning */}
        <MansaReturning frame={frame} />

        {/* Egyptian banker figures */}
        <BankerFigure x={680} y={520} frame={frame} idx={0} />
        <BankerFigure x={760} y={530} frame={frame} idx={1} />
        <BankerFigure x={840} y={520} frame={frame} idx={2} />

        {/* Negotiation label */}
        {interpolate(frame, [120, 160], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [120, 160], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={580} y={440} width={360} height={55} rx={4}
              fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
            <text x={760} y={472} textAnchor="middle" fontSize={16} fontFamily={cinzel}
              fill={C.gold} letterSpacing={2}>NEGOTIATING IN CAIRO</text>
            <text x={760} y={488} textAnchor="middle" fontSize={12} fontFamily={garamond}
              fill={C.ivoryDim} fontStyle="italic">Borrowing gold at high interest</text>
          </g>
        )}

        {/* Flow diagram */}
        <GoldFlowDiagram frame={frame} />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={380} y={100} textAnchor="middle" fontSize={14} fontFamily={cinzel}
            fill={C.gold} letterSpacing={5}>THE RETURN · 1325</text>
          <text x={380} y={160} textAnchor="start" fontSize={44} fontFamily={cinzel}
            fill={C.ivory} fontWeight="700">THE</text>
          <text x={380} y={220} textAnchor="start" fontSize={44} fontFamily={cinzel}
            fill={C.gold} fontWeight="700">CORRECTION</text>
        </g>

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
