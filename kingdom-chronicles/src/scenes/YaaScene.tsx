import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, StatCard, useFade, ease } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Yaa Asantewaa — portrait in engraving style
const YaaPortrait: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const glow = 0.7 + Math.sin(frame * 0.04) * 0.3;

  return (
    <g opacity={appear} transform="translate(340, 120)">
      {/* Portrait frame — ornate */}
      <rect x={-10} y={-10} width={440} height={600} rx={10}
        fill={C.blackSoft} stroke={C.gold} strokeWidth={3} />
      {/* Corner ornaments */}
      {[[-10, -10], [420, -10], [-10, 580], [420, 580]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={12} fill={C.gold} opacity={0.8} />
          <circle cx={cx} cy={cy} r={7} fill={C.goldDark} />
        </g>
      ))}

      {/* Engraving filter group */}
      <g filter="url(#engrave)">
        {/* Background parchment */}
        <rect x={0} y={0} width={420} height={580} rx={6} fill={C.parchment} opacity={0.9} />

        {/* Yaa Asantewaa figure */}
        <g transform="translate(210, 290)">
          {/* Royal headdress */}
          <ellipse cx={0} cy={-215} rx={55} ry={18} fill={C.sepia} opacity={0.9} />
          <path d="M -50 -215 Q 0 -260 50 -215" fill={C.sepia} opacity={0.8} />
          {/* Headdress feathers */}
          {[-30, -15, 0, 15, 30].map((ox, i) => (
            <path key={i}
              d={`M ${ox} -230 Q ${ox - 5} -270 ${ox} -295`}
              fill="none" stroke={C.sepia} strokeWidth={3} />
          ))}
          <ellipse cx={0} cy={-300} rx={8} ry={12} fill={C.sepia} opacity={0.7} />

          {/* Face */}
          <ellipse cx={0} cy={-178} rx={42} ry={50} fill={C.sepiaLight} />
          {/* Eyes — determined, proud */}
          <ellipse cx={-16} cy={-185} rx={8} ry={6} fill={C.sepia} />
          <ellipse cx={16} cy={-185} rx={8} ry={6} fill={C.sepia} />
          <circle cx={-16} cy={-185} r={3} fill="#1A0E04" />
          <circle cx={16} cy={-185} r={3} fill="#1A0E04" />
          {/* Nose */}
          <path d="M -6 -175 Q 0 -165 6 -175" fill="none" stroke={C.sepia} strokeWidth={2} />
          {/* Mouth — firm, set */}
          <path d="M -14 -158 Q 0 -154 14 -158" fill="none" stroke={C.sepia} strokeWidth={2.5} />
          {/* Neck ornament */}
          <rect x={-25} y={-130} width={50} height={12} rx={4} fill={C.sepia} opacity={0.7} />

          {/* Royal kente robe — bold stripes */}
          <path d="M -70 -125 C -80 -50 -80 60 -70 130 L 70 130 C 80 60 80 -50 70 -125 Z"
            fill={C.sepiaLight} />
          {/* Kente stripe pattern */}
          {[-60, -40, -20, 0, 20, 40, 60].map((ox, i) => (
            <line key={i} x1={ox} y1={-125} x2={ox} y2={130} stroke={C.sepia}
              strokeWidth={i % 2 === 0 ? 3 : 1.5} opacity={0.4} />
          ))}
          {[-80, -40, 0, 40, 80, 120].map((oy, i) => (
            <line key={i} x1={-70} y1={oy} x2={70} y2={oy} stroke={C.sepia}
              strokeWidth={1} opacity={0.3} />
          ))}

          {/* Royal staff / musket — war leader */}
          <line x1={75} y1={-280} x2={75} y2={140} stroke={C.sepia} strokeWidth={5} />
          <polygon points="75,-280 65,-240 85,-240" fill={C.sepiaLight} />
          {/* Staff ornament */}
          <ellipse cx={75} cy={-130} rx={10} ry={6} fill={C.sepia} opacity={0.6} />

          {/* Left arm reaching out — rallying gesture */}
          <path d="M -70 -80 Q -120 -50 -150 -20" fill="none" stroke={C.sepiaLight} strokeWidth={18}
            strokeLinecap="round" />
          <circle cx={-150} cy={-20} r={12} fill={C.sepiaLight} />
        </g>

        {/* Crosshatch texture overlay */}
        <rect x={0} y={0} width={420} height={580} rx={6} fill="url(#crosshatch)" opacity={0.06} />
      </g>

      {/* Name plate */}
      <rect x={30} y={510} width={360} height={60} rx={4} fill={C.blackSoft} stroke={C.gold} strokeWidth={1} />
      <text x={210} y={537} textAnchor="middle" fontSize={18} fontFamily={CINZEL}
        fill={C.gold} letterSpacing={3}>YAA ASANTEWAA</text>
      <text x={210} y={558} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic">Queen Mother of Ejisu · War Leader</text>

      {/* Glow halo */}
      <ellipse cx={210} cy={280} rx={220} ry={310}
        fill={C.gold} opacity={glow * 0.04} />
    </g>
  );
};

// Siege of Kumasi fort counter
const SiegeCounter: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [280, 350], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const days = Math.floor(interpolate(frame, [300, 600], [0, 100], { extrapolateRight: "clamp" }));

  return (
    <g opacity={appear} transform="translate(1460, 600)">
      <rect x={0} y={0} width={400} height={220} rx={8}
        fill={C.blackSoft} stroke={C.red} strokeWidth={2} />
      <rect x={0} y={0} width={400} height={4} rx={2} fill={C.red} />

      <text x={200} y={40} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
        fill={C.red} letterSpacing={4}>SIEGE OF KUMASI FORT</text>
      <line x1={20} y1={52} x2={380} y2={52} stroke={C.redBright} strokeWidth={0.5} opacity={0.3} />

      <text x={200} y={110} textAnchor="middle" fontSize={72} fontFamily={CINZEL}
        fill={C.redBright} fontWeight="700">{days}</text>
      <text x={200} y={140} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.ivoryDim}>days of siege · 1900</text>

      <text x={200} y={175} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">Ashanti forces surrounded</text>
      <text x={200} y={198} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">the British fort for over 3 months</text>
    </g>
  );
};

// The famous quote reveal — word by word
const WarCry: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [160, 200], [0, 1], { extrapolateRight: "clamp" });
  const words = [
    "If", "you", "men", "will", "not", "go", "forward,",
    "then", "we", "women", "will."
  ];

  return (
    <g opacity={appear} transform="translate(900, 380)">
      <rect x={-30} y={-30} width={960} height={200} rx={6}
        fill={C.blackSoft} stroke={C.gold} strokeWidth={1} opacity={0.8} />
      <rect x={-30} y={-30} width={6} height={200} rx={3} fill={C.gold} />

      {/* Two lines of the quote */}
      <g>
        {words.slice(0, 7).map((word, i) => {
          const wOp = interpolate(frame, [200 + i * 12, 220 + i * 12], [0, 1], { extrapolateRight: "clamp" });
          return (
            <text key={i} x={i * 110 + 20} y={60} fontSize={32} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic" opacity={wOp}>{word}</text>
          );
        })}
      </g>
      <g>
        {words.slice(7).map((word, i) => {
          const wOp = interpolate(frame, [286 + i * 12, 306 + i * 12], [0, 1], { extrapolateRight: "clamp" });
          const isWomen = word === "women";
          return (
            <text key={i} x={i * 130 + 20} y={115} fontSize={32} fontFamily={GARAMOND}
              fill={isWomen ? C.goldPale : C.ivory} fontStyle="italic"
              fontWeight={isWomen ? "700" : "normal"} opacity={wOp}>{word}</text>
          );
        })}
      </g>

      {/* Attribution */}
      <text x={460} y={160} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
        fill={C.goldDark} letterSpacing={3}
        opacity={interpolate(frame, [340, 380], [0, 1], { extrapolateRight: "clamp" })}>
        — YAA ASANTEWAA · 1900
      </text>
    </g>
  );
};

export const YaaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });
  const heroLabel = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0A0D08", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <defs>
          <radialGradient id="yaaBg" cx="25%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.gold} stopOpacity={0.08} />
            <stop offset="100%" stopColor="#0A0D08" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#0A0D08" />
        <rect width={1920} height={1080} fill="url(#yaaBg)" />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={960} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>YAA ASANTEWAA · THE WAR OF THE GOLDEN STOOL · 1900</text>
        </g>

        {/* Hero label */}
        <g opacity={heroLabel}>
          <text x={960} y={100} textAnchor="middle" fontSize={22} fontFamily={CINZEL}
            fill={C.goldPale} letterSpacing={4}>QUEEN MOTHER · WAR LEADER · LEGEND</text>
        </g>

        {/* Portrait */}
        <YaaPortrait frame={frame} />

        {/* The war cry quote */}
        <WarCry frame={frame} />

        {/* Siege counter */}
        <SiegeCounter frame={frame} />

        {/* Stats */}
        <StatCard x={900} y={620} label="ASHANTI FIGHTERS" value="5,000+" w={280} startFrame={200} />
        <StatCard x={1200} y={620} label="BRITISH REINFORCEMENTS" value="1,400 sent" w={280} startFrame={240} />

        {/* Context panel */}
        {interpolate(frame, [420, 480], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [420, 480], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={900} y={745} width={560} height={130} rx={6}
              fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
            <text x={1180} y={778} textAnchor="middle" fontSize={14} fontFamily={CINZEL}
              fill={C.gold} letterSpacing={2}>THE FINAL CAUSE</text>
            <text x={1180} y={806} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">British Governor Hodgson demanded</text>
            <text x={1180} y={828} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">to sit on the Golden Stool.</text>
            <text x={1180} y={858} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
              fill={C.ivoryDim} fontStyle="italic">The Ashanti rose as one people.</text>
          </g>
        )}

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
