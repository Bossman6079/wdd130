import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, StatCard, useFade, ease } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Ashanti warrior figure — engraving style
const AshantWarrior: React.FC<{ x: number; y: number; frame: number; delay?: number }> =
  ({ x, y, frame, delay = 0 }) => {
  const appear = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
  const march = Math.sin((frame + delay * 3) * 0.2) * 5;

  return (
    <g opacity={appear} transform={`translate(${x}, ${y + march})`} filter="url(#engrave)">
      {/* Spear */}
      <line x1={28} y1={-120} x2={28} y2={80} stroke={C.sepia} strokeWidth={5} />
      <polygon points="28,-120 20,-90 36,-90" fill={C.sepiaLight} />
      {/* Head */}
      <circle cx={0} cy={-100} r={22} fill={C.sepiaLight} />
      {/* War paint */}
      <line x1={-15} y1={-100} x2={-5} y2={-100} stroke={C.sepia} strokeWidth={3} />
      <line x1={5} y1={-100} x2={15} y2={-100} stroke={C.sepia} strokeWidth={3} />
      {/* Headdress */}
      <path d="M -22 -118 Q 0 -140 22 -118" fill={C.sepia} />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={-15 + i * 8} y1={-118} x2={-12 + i * 8} y2={-145 - (i % 3) * 8}
          stroke={C.sepia} strokeWidth={2} />
      ))}
      {/* Body — warrior tunic */}
      <path d="M -30 -78 C -35 -40 -35 20 -28 70 L 28 70 C 35 20 35 -40 30 -78 Z"
        fill={C.sepiaLight} />
      {/* Chest pattern */}
      <path d="M -20 -60 L -20 40 M 20 -60 L 20 40" stroke={C.sepia} strokeWidth={2} opacity={0.4} />
      {/* Belt */}
      <rect x={-32} y={-5} width={64} height={12} rx={3} fill={C.sepia} />
      {/* Legs */}
      <rect x={-22} y={68} width={18} height={55} rx={4} fill={C.sepiaLight} />
      <rect x={6} y={68} width={18} height={55} rx={4} fill={C.sepiaLight} />
      {/* Shield (left arm) */}
      <ellipse cx={-50} cy={-20} rx={18} ry={38} fill={C.sepia} />
      <ellipse cx={-50} cy={-20} rx={14} ry={30} fill={C.sepiaLight} opacity={0.6} />
      {/* Cross on shield */}
      <line x1={-50} y1={-45} x2={-50} y2={5} stroke={C.sepia} strokeWidth={3} />
      <line x1={-65} y1={-20} x2={-35} y2={-20} stroke={C.sepia} strokeWidth={3} />
    </g>
  );
};

// Territory expansion animation
const TerritoryMap: React.FC<{ frame: number }> = ({ frame }) => {
  const stages = [
    { progress: interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp", easing: ease }), rx: 120, ry: 80, fill: C.forest },
    { progress: interpolate(frame, [120, 240], [0, 1], { extrapolateRight: "clamp", easing: ease }), rx: 180, ry: 130, fill: C.forestLight },
    { progress: interpolate(frame, [240, 360], [0, 1], { extrapolateRight: "clamp", easing: ease }), rx: 240, ry: 175, fill: C.gold },
  ];

  return (
    <g transform="translate(480, 540)">
      <defs>
        <radialGradient id="terrGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={0.8} />
          <stop offset="100%" stopColor={C.forestLight} stopOpacity={0.4} />
        </radialGradient>
      </defs>
      {/* Expansion rings */}
      {stages.map(({ progress, rx, ry, fill }, i) => (
        <ellipse key={i} cx={0} cy={0}
          rx={rx * progress} ry={ry * progress}
          fill={fill} opacity={0.2 * (1 - i * 0.05)}
          stroke={fill} strokeWidth={2} />
      ))}
      {/* Core */}
      <ellipse cx={0} cy={0} rx={80} ry={55} fill={C.gold} opacity={0.7} />
      <text x={0} y={5} textAnchor="middle" fontSize={14} fontFamily={CINZEL}
        fill={C.ivory} letterSpacing={2}>ASHANTI</text>
      {/* Labels for expansion */}
      {stages[1].progress > 0.5 && (
        <text x={0} y={145} textAnchor="middle" fontSize={12} fontFamily={GARAMOND}
          fill={C.gold} fontStyle="italic" opacity={stages[1].progress}>Ghana</text>
      )}
      {stages[2].progress > 0.5 && (
        <>
          <text x={-220} y={5} textAnchor="middle" fontSize={11} fontFamily={GARAMOND}
            fill={C.goldLight} fontStyle="italic" opacity={stages[2].progress}>Ivory Coast</text>
          <text x={200} y={5} textAnchor="middle" fontSize={11} fontFamily={GARAMOND}
            fill={C.goldLight} fontStyle="italic" opacity={stages[2].progress}>Togo</text>
        </>
      )}
      {/* Year markers */}
      <text x={0} y={-95} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
        fill={C.gold} opacity={stages[0].progress}>1701</text>
      <text x={0} y={-145} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
        fill={C.goldLight} opacity={stages[1].progress}>1750</text>
      <text x={0} y={-195} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
        fill={C.goldPale} opacity={stages[2].progress}>1820</text>
    </g>
  );
};

// Army organization diagram
const ArmyDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [200, 300], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const wings = [
    { label: "KYIDOM", sub: "Rear Guard", x: 0, y: 0 },
    { label: "BENKUM", sub: "Left Wing", x: -220, y: 100 },
    { label: "ADONTEN", sub: "Main Body", x: 0, y: 100 },
    { label: "NIFA", sub: "Right Wing", x: 220, y: 100 },
    { label: "GYAASEHENE", sub: "Household Corps", x: -110, y: 200 },
    { label: "AKWANMOFO", sub: "Advance Scouts", x: 110, y: 200 },
  ];

  return (
    <g opacity={appear} transform="translate(1400, 250)">
      <rect x={-250} y={-40} width={500} height={340} rx={8}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} opacity={0.9} />
      <text x={0} y={-10} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
        fill={C.gold} letterSpacing={3}>ASHANTI MILITARY STRUCTURE</text>
      <line x1={-220} y1={5} x2={220} y2={5} stroke={C.goldDark} strokeWidth={1} opacity={0.5} />

      {wings.map(({ label, sub, x, y }) => (
        <g key={label} transform={`translate(${x}, ${y + 25})`}>
          <rect x={-95} y={0} width={190} height={55} rx={4}
            fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
          <text x={0} y={20} textAnchor="middle" fontSize={11} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={1}>{label}</text>
          <text x={0} y={38} textAnchor="middle" fontSize={10} fontFamily={GARAMOND}
            fill={C.ivoryDim} fontStyle="italic">{sub}</text>
        </g>
      ))}
      {/* Connector lines */}
      <line x1={0} y1={75} x2={-220} y2={120} stroke={C.goldDark} strokeWidth={1} opacity={0.4} />
      <line x1={0} y1={75} x2={0} y2={120} stroke={C.goldDark} strokeWidth={1} opacity={0.4} />
      <line x1={0} y1={75} x2={220} y2={120} stroke={C.goldDark} strokeWidth={1} opacity={0.4} />
    </g>
  );
};

export const MilitaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0D1A10", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <rect width={1920} height={1080} fill="#0D1A10" />

        {/* Scene title */}
        <g opacity={titleOp}>
          <text x={960} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>MILITARY POWER · 19th CENTURY</text>
        </g>

        {/* Warriors marching */}
        <g transform="translate(60, 120)">
          {[0, 100, 200, 300, 400, 500, 600].map((ox, i) => (
            <AshantWarrior key={i} x={ox} y={580} frame={frame} delay={i * 15} />
          ))}
          {[50, 150, 250, 350, 450, 550].map((ox, i) => (
            <AshantWarrior key={`r${i}`} x={ox} y={700} frame={frame} delay={i * 15 + 10} />
          ))}
          <text x={350} y={850} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
            fill={C.sepia} fontStyle="italic" opacity={0.7}>
            Ashanti warriors — 19th century depiction
          </text>
        </g>

        {/* Territory map */}
        <TerritoryMap frame={frame} />

        {/* Army structure diagram */}
        <ArmyDiagram frame={frame} />

        {/* Stats */}
        <StatCard x={1180} y={620} label="PEAK ARMY SIZE" value="80,000+" w={300} startFrame={60} />
        <StatCard x={1180} y={750} label="GOLD CONTROL" value="~30% of world supply" w={300} startFrame={120} />
        <StatCard x={1180} y={880} label="TRADE DOMINANCE" value="Interior W. Africa" w={300} startFrame={180} />

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
