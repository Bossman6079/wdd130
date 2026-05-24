import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, OutcomeCard, useFade, ease } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// City silhouette of Kumasi
const KumasiCity: React.FC<{ frame: number }> = ({ frame }) => {
  const buildReveal = interpolate(frame, [20, 100], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const burnStart = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const ashFall = interpolate(frame, [350, 480], [0, 1], { extrapolateRight: "clamp", easing: ease });

  const buildings = [
    { x: 100, h: 180, w: 80 }, { x: 210, h: 240, w: 70 }, { x: 300, h: 160, w: 90 },
    { x: 415, h: 210, w: 75 }, { x: 510, h: 280, w: 100 }, { x: 640, h: 200, w: 80 },
    { x: 740, h: 170, w: 85 }, { x: 850, h: 230, w: 90 }, { x: 960, h: 150, w: 70 },
    { x: 1050, h: 195, w: 85 },
  ];

  return (
    <g transform="translate(400, 300)">
      {buildings.map(({ x, h, w }, i) => {
        const baseColor = burnStart > 0.01
          ? `rgba(${Math.round(139 + burnStart * 60)}, ${Math.round(Math.max(0, 50 - burnStart * 50))}, 0, 1)`
          : C.forestDark;
        const ashColor = `rgba(60, 55, 50, ${ashFall})`;
        return (
          <g key={i} opacity={buildReveal}>
            {/* Building body */}
            <rect x={x} y={580 - h} width={w} height={h} rx={3} fill={baseColor} />
            {/* Ash overlay */}
            <rect x={x} y={580 - h} width={w} height={h} rx={3} fill={ashColor} />
            {/* Roof shape */}
            <polygon points={`${x},${580 - h} ${x + w/2},${580 - h - 30} ${x + w},${580 - h}`}
              fill={burnStart > 0.01 ? C.red : C.forest} opacity={0.8} />
          </g>
        );
      })}

      {/* Ground */}
      <rect x={60} y={580} width={1100} height={50} fill="#1A0E04" opacity={0.9} />

      {/* City label */}
      <text x={610} y={660} textAnchor="middle" fontSize={18} fontFamily={CINZEL}
        fill={burnStart > 0.5 ? C.ash : C.gold} letterSpacing={6} opacity={buildReveal}>
        KUMASI
      </text>
      <text x={610} y={685} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic" opacity={buildReveal}>
        Capital of the Ashanti Confederacy
      </text>
    </g>
  );
};

// Fire animation
const FireAnimation: React.FC<{ frame: number }> = ({ frame }) => {
  const fireIn = interpolate(frame, [200, 260], [0, 1], { extrapolateRight: "clamp" });

  if (fireIn < 0.05) return null;

  return (
    <g opacity={fireIn}>
      {[180, 280, 420, 560, 680, 800, 940, 1060, 1180, 1300, 1440].map((x, i) => {
        const flicker = 0.7 + Math.sin(frame * 0.3 + i * 1.3) * 0.3;
        const h = 60 + (i % 4) * 30;
        const baseY = 580;
        return (
          <g key={i} transform={`translate(${x}, ${baseY})`}>
            {/* Outer flame */}
            <ellipse cx={0} cy={-h * 0.6} rx={22 * flicker} ry={h * 0.7}
              fill={C.amber} opacity={0.7 * flicker} />
            {/* Inner flame */}
            <ellipse cx={0} cy={-h * 0.5} rx={14 * flicker} ry={h * 0.55}
              fill={C.goldPale} opacity={0.8 * flicker} />
            {/* Core */}
            <ellipse cx={0} cy={-h * 0.3} rx={6} ry={h * 0.25}
              fill="#FFFFFF" opacity={0.5 * flicker} />
          </g>
        );
      })}

      {/* Smoke */}
      {[200, 400, 650, 900, 1150, 1350].map((x, i) => {
        const drift = Math.sin(frame * 0.05 + i) * 30;
        const smokeOp = interpolate(frame, [220, 320], [0, 0.4], { extrapolateRight: "clamp" });
        return (
          <ellipse key={i} cx={x + drift} cy={200 - i * 20}
            rx={40 + i * 10} ry={25 + i * 8}
            fill="#1A1A1A" opacity={smokeOp} />
        );
      })}
    </g>
  );
};

// British army marching on Kumasi
const WolseleyArmy: React.FC<{ frame: number }> = ({ frame }) => {
  const march = interpolate(frame, [40, 180], [-200, 0], { extrapolateRight: "clamp", easing: ease });
  const appear = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" });

  return (
    <g opacity={appear} transform={`translate(${march}, 0)`}>
      <g transform="translate(60, 730)">
        {[0, 90, 180, 270, 360, 450, 540, 630, 720].map((x, i) => {
          const bob = Math.sin(frame * 0.2 + i * 0.8) * 4;
          return (
            <g key={i} transform={`translate(${x}, ${bob})`} opacity={0.85}>
              {/* Pith helmet (tropical) */}
              <ellipse cx={0} cy={-75} rx={18} ry={10} fill="#D4C890" />
              <rect x={-14} y={-80} width={28} height={16} rx={3} fill="#C8BC80" />
              {/* Head */}
              <circle cx={0} cy={-58} r={14} fill="#D4A090" />
              {/* Khaki uniform */}
              <rect x={-18} y={-44} width={36} height={50} rx={3} fill="#8B8040" />
              {/* Legs */}
              <rect x={-12} y={6} width={10} height={35} rx={3} fill="#6A6030" />
              <rect x={4} y={6} width={10} height={35} rx={3} fill="#6A6030" />
              {/* Rifle */}
              <line x1={18} y1={-90} x2={18} y2={40} stroke={C.sepia} strokeWidth={4} />
            </g>
          );
        })}
        <text x={360} y={80} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
          fill={C.british} letterSpacing={3} opacity={0.8}>
          GENERAL WOLSELEY · 1874
        </text>
      </g>
    </g>
  );
};

// Golden Stool escape sequence
const StoolEscape: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [300, 370], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const move = interpolate(frame, [320, 500], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear}>
      <g transform="translate(1400, 200)">
        <rect x={0} y={0} width={460} height={340} rx={8}
          fill={C.blackSoft} stroke={C.gold} strokeWidth={2} opacity={0.95} />
        <rect x={0} y={0} width={460} height={4} rx={2} fill={C.gold} />

        <text x={230} y={40} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
          fill={C.gold} letterSpacing={3}>THE GOLDEN STOOL ESCAPES</text>
        <line x1={20} y1={52} x2={440} y2={52} stroke={C.goldDark} strokeWidth={0.5} opacity={0.5} />

        {/* Path from Kumasi outward */}
        <text x={230} y={90} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
          fill={C.ivoryDim} fontStyle="italic">King Kofi Kakari ordered</text>
        <text x={230} y={114} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
          fill={C.ivoryDim} fontStyle="italic">the stool hidden in the forest</text>
        <text x={230} y={138} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
          fill={C.ivoryDim} fontStyle="italic">before Wolseley arrived.</text>

        {/* Mini stool icon moving */}
        <g transform={`translate(${80 + move * 200}, 190)`}>
          <rect x={-20} y={-8} width={40} height={8} rx={3} fill={C.gold} opacity={0.9} />
          <rect x={-4} y={0} width={8} height={20} rx={2} fill={C.gold} opacity={0.9} />
          <rect x={-22} y={20} width={44} height={6} rx={2} fill={C.gold} opacity={0.9} />
          <ellipse cx={0} cy={4} rx={15} ry={3} fill={C.goldPale} opacity={0.5} />
        </g>

        {/* Arrow showing path */}
        <path d={`M 80 190 Q 180 160 ${80 + move * 200} 190`}
          fill="none" stroke={C.goldDark} strokeWidth={1.5} strokeDasharray="6,4" opacity={0.5} />

        <text x={230} y={260} textAnchor="middle" fontSize={22} fontFamily={CINZEL}
          fill={C.goldPale} fontWeight="700" letterSpacing={2}>NEVER CAPTURED</text>
        <text x={230} y={290} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
          fill={C.ivory} fontStyle="italic">Britain took the city. Not the soul.</text>
        <text x={230} y={318} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
          fill={C.goldDark} letterSpacing={3}>GOLDEN STOOL · SAFE</text>
      </g>
    </g>
  );
};

export const KumasiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });
  const burnLabel = interpolate(frame, [280, 340], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0D0804", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <defs>
          <radialGradient id="burnBg" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor={C.amberDark} stopOpacity={0.15} />
            <stop offset="100%" stopColor="#0D0804" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#0D0804" />
        <rect width={1920} height={1080} fill="url(#burnBg)" />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={960} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>THE BURNING OF KUMASI · 1874</text>
        </g>

        {/* Wolseley army marching */}
        <WolseleyArmy frame={frame} />

        {/* Kumasi city — builds then burns */}
        <KumasiCity frame={frame} />

        {/* Fire over the city */}
        <FireAnimation frame={frame} />

        {/* "BURNED" overlay */}
        <g opacity={burnLabel}>
          <text x={960} y={1010} textAnchor="middle" fontSize={32} fontFamily={CINZEL}
            fill={C.red} fontWeight="700" letterSpacing={8}>
            KUMASI BURNED — 1874
          </text>
        </g>

        {/* Golden Stool escape panel */}
        <StoolEscape frame={frame} />

        {/* Outcome */}
        <OutcomeCard result="WITHDRAWAL" label="Britain destroys city — Ashanti nation survives"
          year={1874} x={60} y={900} startFrame={200} />

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
