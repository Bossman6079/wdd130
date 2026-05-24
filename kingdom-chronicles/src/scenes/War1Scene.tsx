import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, OutcomeCard, BattleEntry, useFade, ease } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// British soldier — stiff, formal, marching to his doom
const BritishSoldier: React.FC<{ x: number; y: number; frame: number; delay?: number }> =
  ({ x, y, frame, delay = 0 }) => {
  const march = Math.sin((frame + delay) * 0.15) * 6;
  const appear = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <g opacity={appear} transform={`translate(${x}, ${y + march})`}>
      {/* Shako hat */}
      <rect x={-14} y={-118} width={28} height={28} rx={3} fill="#1A1A3A" />
      <rect x={-18} y={-122} width={36} height={6} rx={2} fill="#2A2A4A" />
      {/* Plume */}
      <line x1={0} y1={-122} x2={0} y2={-150} stroke={C.redBright} strokeWidth={3} />
      <ellipse cx={0} cy={-152} rx={4} ry={8} fill={C.redBright} />
      {/* Head */}
      <circle cx={0} cy={-90} r={18} fill="#D4A090" />
      {/* Mutton chops */}
      <path d="M -16 -92 Q -20 -78 -14 -72" fill="none" stroke="#8B6030" strokeWidth={3} />
      <path d="M 16 -92 Q 20 -78 14 -72" fill="none" stroke="#8B6030" strokeWidth={3} />
      {/* Red coat */}
      <path d="M -28 -72 C -32 -30 -32 20 -28 60 L 28 60 C 32 20 32 -30 28 -72 Z"
        fill="#8B0000" />
      {/* Gold epaulettes */}
      <ellipse cx={-32} cy={-65} rx={14} ry={8} fill={C.gold} />
      <ellipse cx={32} cy={-65} rx={14} ry={8} fill={C.gold} />
      {/* White cross belt */}
      <line x1={-25} y1={-70} x2={25} y2={20} stroke={C.ivory} strokeWidth={4} />
      <line x1={25} y1={-70} x2={-25} y2={20} stroke={C.ivory} strokeWidth={4} />
      {/* Blue trousers */}
      <rect x={-20} y={58} width={17} height={55} rx={4} fill="#1A1A4A" />
      <rect x={4} y={58} width={17} height={55} rx={4} fill="#1A1A4A" />
      {/* Musket */}
      <line x1={32} y1={-130} x2={32} y2={70} stroke={C.sepia} strokeWidth={5} />
      <polygon points="32,-130 26,-100 38,-100" fill={C.sepiaLight} />
    </g>
  );
};

// Ashanti ambush — figures in jungle hiding
const AshantAmbush: React.FC<{ frame: number }> = ({ frame }) => {
  const reveal = interpolate(frame, [300, 420], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={reveal}>
      {/* Dense jungle vegetation */}
      {Array.from({ length: 20 }, (_, i) => {
        const x = 200 + i * 55;
        const h = 150 + (i % 5) * 50;
        return (
          <g key={i}>
            <rect x={x - 8} y={500 - h} width={16} height={h} rx={4} fill="#0D2E0A" opacity={0.9} />
            <ellipse cx={x} cy={500 - h} rx={30 + (i % 3) * 15} ry={35 + (i % 4) * 10}
              fill={C.forestLight} opacity={0.85} />
          </g>
        );
      })}

      {/* Ashanti warriors emerging */}
      {[280, 390, 500, 610, 720].map((x, i) => {
        const wReveal = interpolate(reveal, [i * 0.15, i * 0.15 + 0.25], [0, 1], { extrapolateRight: "clamp" });
        return (
          <g key={i} opacity={wReveal} transform={`translate(${x}, 460)`}>
            <circle cx={0} cy={-50} r={16} fill={C.skinDark} />
            <path d="M -20 -34 L -20 30 L 20 30 L 20 -34 Z" fill="#1A3A1A" />
            {/* Spear */}
            <line x1={22} y1={-90} x2={22} y2={60} stroke={C.sepia} strokeWidth={4} />
            <polygon points="22,-90 16,-60 28,-60" fill={C.sepiaLight} />
          </g>
        );
      })}
    </g>
  );
};

// MacCarthy scene
const MacCarthyMoment: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [420, 540], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear} transform="translate(1200, 160)">
      <rect x={0} y={0} width={660} height={400} rx={8}
        fill={C.blackSoft} stroke={C.red} strokeWidth={2} opacity={0.95} />
      <rect x={0} y={0} width={660} height={5} rx={3} fill={C.red} />

      <text x={330} y={50} textAnchor="middle" fontSize={15} fontFamily={CINZEL}
        fill={C.red} letterSpacing={3}>GOVERNOR MacCARTHY · 1823</text>
      <line x1={30} y1={62} x2={630} y2={62} stroke={C.goldDark} strokeWidth={0.5} opacity={0.5} />

      {/* His portrait — sepia toned simple illustration */}
      <g transform="translate(110, 100)">
        <ellipse cx={0} cy={0} rx={60} ry={70} fill={C.parchment} filter="url(#sepia)" />
        <circle cx={0} cy={-20} r={28} fill={C.sepiaLight} />
        {/* Uniform collar */}
        <path d="M -25 8 L -40 60 L 40 60 L 25 8 Z" fill="#8B0000" opacity={0.8} />
        {/* Epaulette */}
        <ellipse cx={-50} cy={20} rx={18} ry={10} fill={C.gold} opacity={0.7} />
        <ellipse cx={50} cy={20} rx={18} ry={10} fill={C.gold} opacity={0.7} />
        {/* Moustache */}
        <path d="M -12 -10 Q 0 -5 12 -10" fill="none" stroke={C.sepia} strokeWidth={3} />
        {/* Frame */}
        <rect x={-75} y={-85} width={150} height={160} rx={4} fill="none"
          stroke={C.sepia} strokeWidth={3} />
      </g>

      <text x={330} y={150} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">"Ordered his band to play music</text>
      <text x={330} y={178} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">as they marched toward the Ashanti."</text>

      <rect x={30} y={220} width={600} height={2} fill={C.goldDark} opacity={0.3} />

      <text x={330} y={265} textAnchor="middle" fontSize={22} fontFamily={CINZEL}
        fill={C.red} fontWeight="700">RESULT: KILLED IN BATTLE</text>
      <text x={330} y={300} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic">His skull kept as war trophy</text>
      <text x={330} y={325} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic">Used as a ceremonial drinking cup</text>

      <text x={330} y={372} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
        fill={C.goldDark} letterSpacing={4}>BATTLE OF NSAMANKOW · 1824</text>
    </g>
  );
};

const WARS = [
  { year: "1823–24", name: "First War", outcome: "British defeat", color: C.red },
  { year: "1863–64", name: "Second War", outcome: "British withdraw", color: C.ash },
  { year: "1873–74", name: "Third War", outcome: "Kumasi burned", color: C.ash },
  { year: "1900", name: "War of the Golden Stool", outcome: "Ashanti annexed", color: C.ash },
];

export const War1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#1A0A0A", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <defs>
          <radialGradient id="warBg" cx="30%" cy="50%" r="60%">
            <stop offset="0%" stopColor={C.red} stopOpacity={0.06} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#1A0A0A" />
        <rect width={1920} height={1080} fill="url(#warBg)" />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={600} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>THE FIRST ANGLO-ASHANTI WAR · 1823</text>
        </g>

        {/* British soldiers marching */}
        <g transform="translate(0, 200)">
          {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => (
            <BritishSoldier key={i} x={x} y={500} frame={frame} delay={i * 12} />
          ))}
        </g>

        {/* Ashanti ambush */}
        <AshantAmbush frame={frame} />

        {/* MacCarthy info panel */}
        <MacCarthyMoment frame={frame} />

        {/* Battle timeline */}
        <g transform="translate(40, 900)">
          <text x={0} y={-15} fontSize={11} fontFamily={CINZEL} fill={C.gold} letterSpacing={4}>
            ANGLO-ASHANTI WARS
          </text>
          {WARS.map((w, i) => (
            <BattleEntry key={i} {...w} x={i * 240} y={0}
              active={i === 0} startFrame={i * 20 + 30} />
          ))}
        </g>

        {/* Outcome */}
        <OutcomeCard result="DEFEAT" label="British forces annihilated"
          year={1824} x={40} y={720} startFrame={200} />

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
