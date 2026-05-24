import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { SharedDefs, useFade, ease, shimmer } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Golden Stool SVG — draws itself with stroke-dashoffset
const GoldenStool: React.FC<{ frame: number }> = ({ frame }) => {
  const drawProgress = interpolate(frame, [30, 240], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const TOTAL_LENGTH = 1800; // estimated path length
  const drawn = drawProgress * TOTAL_LENGTH;
  const fillOp = interpolate(frame, [200, 320], [0, 0.9], { extrapolateRight: "clamp" });
  const glow = shimmer(frame, 0.06);
  useVideoConfig();

  return (
    <g transform="translate(960, 440)">
      <defs>
        <radialGradient id="stoolGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={C.goldPale} />
          <stop offset="50%" stopColor={C.gold} />
          <stop offset="100%" stopColor={C.goldDark} />
        </radialGradient>
        <radialGradient id="stoolGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={C.goldPale} stopOpacity={glow * 0.6} />
          <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
        </radialGradient>
        <filter id="stoolFilter">
          <feGaussianBlur stdDeviation={20} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Glow halo */}
      <ellipse cx={0} cy={0} rx={300} ry={220} fill="url(#stoolGlow)" />

      {/* === GOLDEN STOOL === */}
      {/* Top seat surface */}
      <ellipse cx={0} cy={-80} rx={160} ry={28} fill="url(#stoolGrad)" opacity={fillOp}
        strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn}
        stroke={C.goldPale} strokeWidth={4} />

      {/* Seat decorative rim */}
      <ellipse cx={0} cy={-80} rx={160} ry={28} fill="none" stroke={C.goldPale}
        strokeWidth={3} strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn * 0.9}
        opacity={0.7} />

      {/* Side profile of seat */}
      <path d="M -160 -80 L -160 -50 Q 0 -35 160 -50 L 160 -80" fill="url(#stoolGrad)"
        opacity={fillOp * 0.9}
        stroke={C.goldPale} strokeWidth={3}
        strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn * 0.85} />

      {/* Decorative bells/ornaments hanging from seat (Ashanti golden stool detail) */}
      {[-120, -80, -40, 0, 40, 80, 120].map((ox, i) => (
        <g key={i} opacity={fillOp * 0.8}>
          <line x1={ox} y1={-50} x2={ox} y2={-20} stroke={C.gold} strokeWidth={2} />
          <ellipse cx={ox} cy={-14} rx={7} ry={10} fill={C.goldPale} />
          <ellipse cx={ox} cy={-14} rx={4} ry={6} fill={C.gold} />
        </g>
      ))}

      {/* Central support column */}
      <rect x={-20} y={-50} width={40} height={120} rx={8} fill="url(#stoolGrad)"
        opacity={fillOp}
        stroke={C.goldPale} strokeWidth={3}
        strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn * 0.75} />
      {/* Column decorations */}
      {[-20, 10, 40].map((y, i) => (
        <ellipse key={i} cx={0} cy={y} rx={25} ry={8} fill={C.goldDark} opacity={fillOp * 0.9} />
      ))}

      {/* Base platform */}
      <path d="M -180 70 Q 0 80 180 70 L 180 85 Q 0 95 -180 85 Z"
        fill="url(#stoolGrad)" opacity={fillOp}
        stroke={C.goldPale} strokeWidth={3}
        strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn * 0.65} />

      {/* Base legs (4 curved legs) */}
      {[-130, -40, 40, 130].map((ox, i) => (
        <path key={i}
          d={`M ${ox - 15} 78 Q ${ox - 20} 120 ${ox - 25} 150 L ${ox + 25} 150 Q ${ox + 20} 120 ${ox + 15} 78`}
          fill="url(#stoolGrad)" opacity={fillOp * 0.9}
          stroke={C.goldPale} strokeWidth={2}
          strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn * 0.55} />
      ))}

      {/* Foot base plate */}
      <ellipse cx={0} cy={152} rx={190} ry={18} fill="url(#stoolGrad)" opacity={fillOp}
        stroke={C.goldPale} strokeWidth={3}
        strokeDasharray={`${TOTAL_LENGTH}`} strokeDashoffset={TOTAL_LENGTH - drawn * 0.45} />

      {/* Decorative patterns on seat */}
      {drawProgress > 0.7 && (
        <g opacity={(drawProgress - 0.7) / 0.3 * fillOp}>
          {/* Adinkra-style circle pattern on seat */}
          <circle cx={0} cy={-80} r={40} fill="none" stroke={C.goldDark} strokeWidth={2} />
          <circle cx={0} cy={-80} r={25} fill="none" stroke={C.goldDark} strokeWidth={1.5} />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={i} x1={Math.cos(rad) * 25} y1={-80 + Math.sin(rad) * 25}
                x2={Math.cos(rad) * 40} y2={-80 + Math.sin(rad) * 40}
                stroke={C.goldDark} strokeWidth={1.5} />
            );
          })}
        </g>
      )}

      {/* Glow filter effect on full reveal */}
      {drawProgress > 0.85 && (
        <ellipse cx={0} cy={35} rx={200} ry={160} fill="url(#stoolGrow)"
          opacity={(drawProgress - 0.85) / 0.15 * 0.4} filter="url(#stoolFilter)" />
      )}
    </g>
  );
};

// Gold particle burst on reveal
const ParticleBurst: React.FC<{ frame: number; triggerFrame: number }> = ({ frame, triggerFrame }) => {
  const t = Math.max(0, frame - triggerFrame);
  const burst = interpolate(t, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <g>
      {Array.from({ length: 50 }, (_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const speed = 3 + (i % 5) * 2;
        const dist = burst * speed * 80;
        const x = 960 + Math.cos(angle) * dist;
        const y = 440 + Math.sin(angle) * dist;
        const size = 4 + (i % 4) * 2;
        const op = Math.max(0, burst * (1 - burst * 1.5) * 2);
        return (
          <circle key={i} cx={x} cy={y} r={size} fill={C.goldPale} opacity={op} />
        );
      })}
    </g>
  );
};

// Animated text cards for stool meaning
const StoolCard: React.FC<{ x: number; y: number; title: string; body: string; startFrame: number; frame: number }> =
  ({ x, y, title, body, startFrame, frame }) => {
  const op = interpolate(frame, [startFrame, startFrame + 30], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [startFrame, startFrame + 30], [15, 0], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={op} transform={`translate(${x}, ${y + slideY})`}>
      <rect x={0} y={0} width={380} height={110} rx={6} fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
      <rect x={0} y={0} width={4} height={110} rx={2} fill={C.gold} />
      <text x={20} y={34} fontSize={14} fontFamily={CINZEL} fill={C.gold} letterSpacing={3}>{title}</text>
      <text x={20} y={62} fontSize={17} fontFamily={GARAMOND} fill={C.ivory}>{body}</text>
      <text x={20} y={88} fontSize={13} fontFamily={GARAMOND} fill={C.ivoryDim} fontStyle="italic">Ashanti sacred tradition</text>
    </g>
  );
};

export const GoldenStoolScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });
  const twi = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0A0A06", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <defs>
          <radialGradient id="goldenBg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={C.amberDark} stopOpacity={0.12} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#0A0A06" />
        <rect width={1920} height={1080} fill="url(#goldenBg)" />

        {/* Scene title */}
        <g opacity={titleOp}>
          <text x={960} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={8}>THE GOLDEN STOOL · SIKA DWA KOFI</text>
          <line x1={600} y1={68} x2={1320} y2={68} stroke={C.gold} strokeWidth={1} opacity={0.3} />
        </g>

        {/* Twi name badge */}
        <g opacity={twi}>
          <rect x={760} y={820} width={400} height={80} rx={6} fill={C.blackSoft} stroke={C.gold} strokeWidth={1} />
          <text x={960} y={852} textAnchor="middle" fontSize={24} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={3}>Sika Dwa Kofi</text>
          <text x={960} y={880} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
            fill={C.ivoryDim} fontStyle="italic">"The Golden Stool Born on Friday"</text>
        </g>

        {/* Golden Stool drawing */}
        <GoldenStool frame={frame} />

        {/* Particle burst at full reveal */}
        <ParticleBurst frame={frame} triggerFrame={240} />

        {/* Info cards — left side */}
        <StoolCard x={60} y={250} title="SOUL OF THE NATION"
          body='"The sunsum of the Ashanti people"'
          startFrame={120} frame={frame} />
        <StoolCard x={60} y={390} title="NEVER SAT UPON"
          body="Not a throne — never used as a seat"
          startFrame={180} frame={frame} />
        <StoolCard x={60} y={530} title="CALLED DOWN FROM HEAVEN"
          body="By Okomfo Anokye, 1701"
          startFrame={240} frame={frame} />
        <StoolCard x={60} y={670} title="TO LOSE IT"
          body='"To lose everything — the nation itself"'
          startFrame={300} frame={frame} />

        {/* Right side: consequence */}
        {interpolate(frame, [360, 420], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [360, 420], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={1480} y={250} width={380} height={220} rx={6}
              fill={C.blackSoft} stroke={C.gold} strokeWidth={2} />
            <rect x={1480} y={250} width={380} height={4} rx={2} fill={C.gold} />
            <text x={1670} y={292} textAnchor="middle" fontSize={14} fontFamily={CINZEL}
              fill={C.gold} letterSpacing={3}>THE CONSEQUENCE</text>
            <text x={1670} y={330} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">"Every war Britain would fight</text>
            <text x={1670} y={358} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">against the Ashanti was, at its</text>
            <text x={1670} y={386} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">core, a war for this stool."</text>
            <text x={1670} y={440} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
              fill={C.goldDark} letterSpacing={2}>AND THEY NEVER GOT IT.</text>
          </g>
        )}

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
