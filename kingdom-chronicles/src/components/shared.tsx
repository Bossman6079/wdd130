import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

export const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Shared fade in/out wrapper
export function useFade() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeIn  = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return fadeIn * fadeOut;
}

// Gold shimmer value
export function shimmer(frame: number, speed = 0.05) {
  return 0.7 + 0.3 * Math.sin(frame * speed);
}

// Shared SVG defs: grain filter, sepia filter
export const SharedDefs: React.FC = () => (
  <defs>
    {/* Film grain */}
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
      <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
      <feComposite in="blend" in2="SourceGraphic" operator="in" />
    </filter>
    {/* Sepia / aged photo */}
    <filter id="sepia">
      <feColorMatrix type="matrix" values="0.393 0.769 0.189 0 0
                                           0.349 0.686 0.168 0 0
                                           0.272 0.534 0.131 0 0
                                           0     0     0     1 0" />
    </filter>
    {/* Engraving: high contrast + grain */}
    <filter id="engrave">
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.5" intercept="-0.2" />
        <feFuncG type="linear" slope="1.5" intercept="-0.2" />
        <feFuncB type="linear" slope="1.5" intercept="-0.2" />
      </feComponentTransfer>
    </filter>
    {/* Soft glow */}
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    {/* Strong glow */}
    <filter id="strongGlow">
      <feGaussianBlur stdDeviation="18" result="blur" />
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    {/* Parchment pattern */}
    <pattern id="parchmentPat" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill={C.parchment} />
      <line x1="0" y1="0" x2="60" y2="60" stroke={C.sepia} strokeWidth="0.4" opacity="0.25" />
      <line x1="60" y1="0" x2="0" y2="60" stroke={C.sepia} strokeWidth="0.3" opacity="0.15" />
    </pattern>
    {/* Crosshatch (engraving) */}
    <pattern id="crosshatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="8" y2="8" stroke={C.skinDark} strokeWidth="0.6" opacity="0.4" />
      <line x1="8" y1="0" x2="0" y2="8" stroke={C.skinDark} strokeWidth="0.4" opacity="0.25" />
    </pattern>
    {/* Vignette gradient */}
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stopColor="transparent" />
      <stop offset="100%" stopColor={C.black} stopOpacity="0.55" />
    </radialGradient>
  </defs>
);

// QuoteSlate — word-by-word reveal
export const QuoteSlate: React.FC<{
  quote: string;
  accent?: string[];
  bgColor?: string;
  accentColor?: string;
  framesPerWord?: number;
  startFrame?: number;
  subText?: string;
}> = ({
  quote, accent = [], bgColor = C.black, accentColor = C.gold,
  framesPerWord = 8, startFrame = 0, subText,
}) => {
  const frame = useCurrentFrame();
  const words = quote.split(" ");
  const revealed = Math.floor((frame - startFrame) / framesPerWord);

  return (
    <g>
      <rect width={1920} height={1080} fill={bgColor} />
      {/* Decorative gold lines */}
      <line x1={160} y1={480} x2={1760} y2={480} stroke={accentColor} strokeWidth={1} opacity={0.3} />
      <line x1={160} y1={600} x2={1760} y2={600} stroke={accentColor} strokeWidth={1} opacity={0.3} />
      {/* Words */}
      <text x={960} y={548} textAnchor="middle" fontSize={64} fontFamily={CINZEL}
        fill={C.ivory} fontWeight="700" letterSpacing={3}>
        {words.slice(0, Math.max(0, revealed)).map((w, i) => (
          <tspan key={i} fill={accent.includes(w) ? accentColor : C.ivory}>{w} </tspan>
        ))}
      </text>
      {subText && revealed > words.length && (
        <text x={960} y={640} textAnchor="middle" fontSize={28} fontFamily={GARAMOND}
          fill={accentColor} fontStyle="italic" opacity={interpolate(frame, [startFrame + words.length * framesPerWord, startFrame + words.length * framesPerWord + 30], [0, 1], { extrapolateRight: "clamp" })}>
          {subText}
        </text>
      )}
    </g>
  );
};

// Outcome card
export const OutcomeCard: React.FC<{
  result: "WIN" | "DEFEAT" | "WITHDRAWAL" | "VICTORY";
  label: string;
  year: number;
  x: number; y: number;
  startFrame: number;
}> = ({ result, label, year, x, y, startFrame }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [startFrame, startFrame + 25], [0, 1], { extrapolateRight: "clamp" });
  const slideX = interpolate(frame, [startFrame, startFrame + 25], [30, 0], { extrapolateRight: "clamp", easing: ease });
  const color = result === "WIN" || result === "VICTORY" ? C.forestLight : result === "WITHDRAWAL" ? C.amber : C.red;

  return (
    <g opacity={op} transform={`translate(${x + slideX}, ${y})`}>
      <rect x={0} y={0} width={340} height={110} rx={6} fill={C.blackSoft} stroke={color} strokeWidth={2} />
      <rect x={0} y={0} width={340} height={5} rx={3} fill={color} />
      <text x={20} y={36} fontSize={13} fontFamily={CINZEL} fill={color} letterSpacing={4}>{year}</text>
      <text x={20} y={68} fontSize={22} fontFamily={CINZEL} fill={color} fontWeight="700">{result}</text>
      <text x={20} y={94} fontSize={14} fontFamily={GARAMOND} fill={C.ivoryDim} fontStyle="italic">{label}</text>
    </g>
  );
};

// Stat card with CountUp
export const StatCard: React.FC<{
  label: string; value: string; sub?: string;
  x: number; y: number; startFrame: number; w?: number; accent?: string;
}> = ({ label, value, sub, x, y, startFrame, w = 360, accent = C.gold }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [startFrame, startFrame + 30], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [startFrame, startFrame + 30], [20, 0], { extrapolateRight: "clamp", easing: ease });
  return (
    <g opacity={op} transform={`translate(${x}, ${y + slideY})`}>
      <rect x={0} y={0} width={w} height={sub ? 110 : 90} rx={6} fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
      <rect x={0} y={0} width={4} height={sub ? 110 : 90} rx={2} fill={accent} />
      <text x={20} y={30} fontSize={13} fontFamily={CINZEL} fill={accent} letterSpacing={3}>{label}</text>
      <text x={20} y={66} fontSize={30} fontFamily={CINZEL} fill={C.ivory} fontWeight="700">{value}</text>
      {sub && <text x={20} y={94} fontSize={13} fontFamily={GARAMOND} fill={C.ivoryDim} fontStyle="italic">{sub}</text>}
    </g>
  );
};

// Battle timeline entry
export const BattleEntry: React.FC<{
  year: string; name: string; outcome: string; color: string;
  x: number; y: number; active: boolean; startFrame: number;
}> = ({ year, name, outcome, color, x, y, active, startFrame }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [startFrame, startFrame + 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <g opacity={op} transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={220} height={110} rx={6}
        fill={active ? color : C.blackSoft}
        stroke={active ? color : C.ash} strokeWidth={active ? 2 : 1} />
      {active && <rect x={0} y={0} width={220} height={5} rx={3} fill={color} />}
      <text x={15} y={30} fontSize={11} fontFamily={CINZEL} fill={active ? C.ivory : C.ash} letterSpacing={2}>{year}</text>
      <text x={15} y={56} fontSize={16} fontFamily={CINZEL} fill={active ? C.ivory : C.ash} fontWeight={active ? "700" : "normal"}>{name}</text>
      <text x={15} y={80} fontSize={13} fontFamily={GARAMOND} fill={active ? C.goldPale : C.ash} fontStyle="italic">{outcome}</text>
    </g>
  );
};
