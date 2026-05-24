import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, OutcomeCard, BattleEntry, useFade } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Pattern of failure visualization
const FailurePattern: React.FC<{ frame: number }> = ({ frame }) => {
  const lines = [
    { text: "1823 — Britain marches with confidence", outcome: "ASHANTI WIN", startFrame: 40 },
    { text: "1824 — MacCarthy killed at Nsamankow", outcome: "BRITISH RETREAT", startFrame: 100 },
    { text: "1863 — Britain returns with larger force", outcome: "ASHANTI WIN", startFrame: 160 },
    { text: "1864 — Disease and jungle defeat them again", outcome: "BRITISH WITHDRAWAL", startFrame: 220 },
    { text: "Two attempts. Two failures.", outcome: "A PATTERN", startFrame: 320, emphasis: true },
  ];

  return (
    <g transform="translate(80, 140)">
      {lines.map(({ text, outcome, startFrame, emphasis }, i) => {
        const op = interpolate(frame, [startFrame, startFrame + 25], [0, 1], { extrapolateRight: "clamp" });
        const color = outcome.includes("ASHANTI") ? C.gold :
                      outcome === "A PATTERN" ? C.goldPale : C.red;
        return (
          <g key={i} opacity={op} transform={`translate(0, ${i * 90})`}>
            {emphasis && (
              <rect x={-20} y={-10} width={1160} height={70} rx={4}
                fill={C.gold} opacity={0.08} />
            )}
            <circle cx={12} cy={18} r={6} fill={color} />
            <text x={36} y={22} fontSize={emphasis ? 24 : 19} fontFamily={emphasis ? CINZEL : GARAMOND}
              fill={emphasis ? C.goldPale : C.ivoryDim}
              fontWeight={emphasis ? "700" : "normal"}>{text}</text>
            <rect x={800} y={0} width={260} height={40} rx={4}
              fill={color} opacity={emphasis ? 0.9 : 0.15} stroke={color} strokeWidth={1} />
            <text x={930} y={26} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
              fill={emphasis ? C.black : color} letterSpacing={2}>{outcome}</text>
          </g>
        );
      })}
    </g>
  );
};

// Jungle terrain with British troops struggling
const JungleTerrain: React.FC<{ frame: number }> = ({ frame }) => {
  const treeReveal = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <g transform="translate(940, 200)">
      {/* Dense canopy */}
      {Array.from({ length: 25 }, (_, i) => {
        const x = (i * 37.5) % 900;
        const h = 200 + (i % 6) * 60;
        const w = 50 + (i % 4) * 30;
        return (
          <g key={i} opacity={treeReveal}>
            {/* Trunk */}
            <rect x={x + w/2 - 6} y={580 - h} width={12} height={h} rx={4}
              fill="#1A0E04" opacity={0.9} />
            {/* Canopy layers */}
            <ellipse cx={x + w/2} cy={580 - h} rx={w * 0.7} ry={45} fill={C.forestDark} opacity={0.95} />
            <ellipse cx={x + w/2} cy={580 - h - 25} rx={w * 0.55} ry={38} fill={C.forest} opacity={0.85} />
            <ellipse cx={x + w/2} cy={580 - h - 45} rx={w * 0.4} ry={30} fill={C.forestLight} opacity={0.75} />
          </g>
        );
      })}

      {/* Ground */}
      <rect x={0} y={580} width={900} height={60} fill="#1A0E04" opacity={0.9} />

      {/* British troops struggling in jungle */}
      {[80, 200, 340, 480, 620, 760].map((x, i) => {
        const appear = interpolate(frame, [80 + i * 20, 110 + i * 20], [0, 1], { extrapolateRight: "clamp" });
        const slump = Math.sin(frame * 0.08 + i) * 3;
        return (
          <g key={i} opacity={appear * 0.7} transform={`translate(${x}, ${545 + slump})`}>
            {/* British soldier — exhausted */}
            <circle cx={0} cy={-45} r={14} fill="#D4A090" />
            <rect x={-16} y={-31} width={32} height={40} rx={3} fill="#8B0000" opacity={0.8} />
            {/* Drooping posture */}
            <line x1={0} y1={-31} x2={0} y2={8} stroke={C.ivory} strokeWidth={3} opacity={0.5} />
            {/* Legs */}
            <line x1={-8} y1={8} x2={-10} y2={38} stroke="#1A1A4A" strokeWidth={7} strokeLinecap="round" />
            <line x1={8} y1={8} x2={10} y2={38} stroke="#1A1A4A" strokeWidth={7} strokeLinecap="round" />
            {/* Disease / weakness indicators */}
            {i % 3 === 0 && (
              <text x={0} y={-62} textAnchor="middle" fontSize={14} fill={C.red} opacity={0.8}>†</text>
            )}
          </g>
        );
      })}

      {/* Jungle label */}
      <text x={450} y={670} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.sepia} fontStyle="italic" opacity={0.7}>Ashanti jungle terrain — impenetrable to European tactics</text>
    </g>
  );
};

const WARS = [
  { year: "1823–24", name: "First War", outcome: "British defeat", color: C.red },
  { year: "1863–64", name: "Second War", outcome: "British withdraw", color: C.amber },
  { year: "1873–74", name: "Third War", outcome: "Kumasi burned", color: C.ash },
  { year: "1900", name: "War of the Golden Stool", outcome: "Ashanti annexed", color: C.ash },
];

export const Wars23Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0D0D0D", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <rect width={1920} height={1080} fill="#0D0D0D" />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={500} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>WARS TWO AND THREE · 1863 & 1873</text>
        </g>

        {/* Pattern of failure */}
        <FailurePattern frame={frame} />

        {/* Jungle terrain with struggling British */}
        <JungleTerrain frame={frame} />

        {/* Outcome cards */}
        <OutcomeCard result="WITHDRAWAL" label="Second Anglo-Ashanti War"
          year={1864} x={940} y={840} startFrame={160} />
        <OutcomeCard result="WITHDRAWAL" label="Third War — partial Ashanti loss"
          year={1874} x={1300} y={840} startFrame={220} />

        {/* Counter stat */}
        {interpolate(frame, [340, 400], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [340, 400], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={940} y={730} width={680} height={88} rx={6}
              fill={C.forest} stroke={C.gold} strokeWidth={2} />
            <text x={1280} y={780} textAnchor="middle" fontSize={26} fontFamily={CINZEL}
              fill={C.goldPale} fontWeight="700" letterSpacing={4}>
              3 × THE MOST POWERFUL EMPIRE FAILED
            </text>
            <text x={1280} y={808} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">The Ashanti were not luck. They were strategy.</text>
          </g>
        )}

        {/* Battle timeline */}
        <g transform="translate(40, 920)">
          <text x={0} y={-15} fontSize={11} fontFamily={CINZEL} fill={C.gold} letterSpacing={4}>TIMELINE</text>
          {WARS.map((w, i) => (
            <BattleEntry key={i} {...w} x={i * 240} y={0}
              active={i === 0 || i === 1} startFrame={i * 20 + 20} />
          ))}
        </g>

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
