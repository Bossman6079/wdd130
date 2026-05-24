import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Desert sunset panorama
const DesertSunset: React.FC<{ frame: number }> = ({ frame }) => {
  const sunProgress = interpolate(frame, [0, 600], [0, 1], { extrapolateRight: "clamp" });
  const sunY = 380 - sunProgress * 80; // sun rises
  const sunRadius = 60 + sunProgress * 20;

  return (
    <g>
      <defs>
        <radialGradient id="sunGradOutro" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldPale} stopOpacity={0.95} />
          <stop offset="40%" stopColor={C.gold} stopOpacity={0.8} />
          <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="skyOutro" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A0505" />
          <stop offset={`${20 + sunProgress * 20}%`} stopColor={`rgba(${40 + sunProgress * 60},${20 + sunProgress * 15},${8 + sunProgress * 5},1)`} />
          <stop offset="100%" stopColor="#1A0D04" />
        </linearGradient>
        <radialGradient id="sunGlow2" cx="50%" cy={`${(sunY / 1080) * 100}%`} r="40%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={0.35 * (0.5 + sunProgress * 0.5)} />
          <stop offset="100%" stopColor={C.black} stopOpacity={0} />
        </radialGradient>
        <filter id="sunFilter">
          <feGaussianBlur stdDeviation={30} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width={1920} height={1080} fill="url(#skyOutro)" />
      <rect width={1920} height={1080} fill="url(#sunGlow2)" />

      {/* Sun */}
      <circle cx={960} cy={sunY} r={sunRadius * 1.8} fill="url(#sunGradOutro)" filter="url(#sunFilter)" opacity={0.6} />
      <circle cx={960} cy={sunY} r={sunRadius} fill={C.goldPale} opacity={0.9} />
      <circle cx={960} cy={sunY} r={sunRadius * 0.7} fill={C.goldLight} opacity={0.95} />

      {/* Sun rays */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5 + frame * 0.2) * Math.PI / 180;
        const rayLen = 80 + (i % 3) * 40;
        const x1 = 960 + Math.cos(angle) * sunRadius;
        const y1 = sunY + Math.sin(angle) * sunRadius;
        const x2 = 960 + Math.cos(angle) * (sunRadius + rayLen);
        const y2 = sunY + Math.sin(angle) * (sunRadius + rayLen);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={C.goldPale} strokeWidth={2 + i % 2}
            opacity={(0.15 + sunProgress * 0.25) * (0.5 + 0.5 * Math.sin(frame * 0.08 + i))} />
        );
      })}

      {/* Desert horizon dunes */}
      <path d="M 0 620 Q 240 560 480 620 Q 720 680 960 620 Q 1200 560 1440 620 Q 1680 680 1920 620 L 1920 1080 L 0 1080 Z"
        fill="#1C1004" opacity={0.95} />
      <path d="M 0 680 Q 320 630 640 680 Q 960 730 1280 680 Q 1600 630 1920 680 L 1920 1080 L 0 1080 Z"
        fill="#160C03" opacity={0.97} />
      <path d="M 0 760 Q 480 720 960 760 Q 1440 800 1920 760 L 1920 1080 L 0 1080 Z"
        fill="#100804" opacity={0.98} />

      {/* Light reflection on sand */}
      <path d="M 700 620 Q 960 610 1220 620" fill="none" stroke={C.gold} strokeWidth={2} opacity={sunProgress * 0.3} />
    </g>
  );
};

// Silhouette figures walking into sunset (caravan)
const SilhouetteFigures: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [60, 120], [0, 1], { extrapolateRight: "clamp" });

  // Figures slowly walking (getting smaller = walking away into horizon)
  const walkOffset = interpolate(frame, [60, 900], [0, 60], { extrapolateRight: "clamp" });

  const figures = [
    { x: 300, y: 720, scale: 0.9, speed: 1.0 },
    { x: 440, y: 710, scale: 1.0, speed: 0.9 },
    { x: 580, y: 715, scale: 1.1, speed: 1.1 },
    { x: 700, y: 720, scale: 0.85, speed: 1.0 }, // camel-like
    { x: 850, y: 712, scale: 1.05, speed: 0.95 },
    { x: 960, y: 718, scale: 1.15, speed: 1.0 }, // Mansa Musa (center)
    { x: 1070, y: 714, scale: 1.0, speed: 1.05 },
    { x: 1200, y: 720, scale: 0.9, speed: 0.9 },
    { x: 1340, y: 715, scale: 0.8, speed: 1.0 },
    { x: 1480, y: 710, scale: 0.75, speed: 1.1 },
    { x: 1620, y: 718, scale: 0.7, speed: 0.95 },
  ];

  return (
    <g opacity={appear}>
      {figures.map((f, i) => {
        const walkAnim = Math.sin(frame * 0.25 + i) * 4;
        const isMansa = i === 5;
        const x = f.x + walkOffset * f.speed;
        const s = f.scale * (1 - walkOffset * 0.001); // slight shrink

        return (
          <g key={i} transform={`translate(${x}, ${f.y}) scale(${s})`}>
            {isMansa ? (
              // Mansa Musa on horse (more detailed)
              <g transform="translate(0, -60)">
                {/* Horse */}
                <ellipse cx={0} cy={20} rx={40} ry={22} fill="#1A1208" />
                <ellipse cx={30} cy={5} rx={20} ry={30} fill="#1A1208" />
                <ellipse cx={50} cy={-8} rx={16} ry={11} fill="#1A1208" />
                {[-25, -10, 10, 25].map((ox, j) => (
                  <rect key={j} x={ox - 5} y={40} width={10} height={35} rx={4} fill="#120C04" />
                ))}
                {/* Rider silhouette */}
                <ellipse cx={0} cy={-22} rx={22} ry={32} fill="#0A0806" />
                {/* Crown glow */}
                <circle cx={0} cy={-52} r={8} fill={C.gold} opacity={0.6 + 0.4 * Math.sin(frame * 0.08)} />
                <polygon points="-5,-52 0,-64 5,-52" fill={C.gold} opacity={0.7} />
              </g>
            ) : (
              // Regular figure
              <g transform={`translate(0, ${walkAnim})`}>
                <circle cx={0} cy={-65} r={10} fill="#0A0806" />
                <rect x={-10} y={-55} width={20} height={45} rx={4} fill="#0A0806" />
                <line x1={-10} y1={-42} x2={-22} y2={-28} stroke="#0A0806" strokeWidth={5} />
                <line x1={10} y1={-42} x2={22} y2={-28} stroke="#0A0806" strokeWidth={5} />
                <line x1={-6} y1={-10} x2={-8} y2={28} stroke="#0A0806" strokeWidth={6} />
                <line x1={6} y1={-10} x2={8} y2={28} stroke="#0A0806" strokeWidth={6} />
                {/* Gold staff for some */}
                {i % 3 === 0 && (
                  <line x1={16} y1={-75} x2={16} y2={28} stroke={C.goldDark} strokeWidth={3} opacity={0.7} />
                )}
              </g>
            )}
          </g>
        );
      })}

      {/* Dust trail */}
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i}
          cx={200 + walkOffset * 0.8 + i * 20}
          cy={745}
          rx={30 + i * 15} ry={10 + i * 5}
          fill={C.amber} opacity={0.03 + i * 0.01} />
      ))}
    </g>
  );
};

// Quote cards that appear sequentially
const QuoteCard: React.FC<{ x: number; y: number; quote: string; attr: string; startFrame: number; frame: number; w?: number }> =
  ({ x, y, quote, attr, startFrame, frame, w = 800 }) => {
  const op = interpolate(frame, [startFrame, startFrame + 40], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const slideY = interpolate(frame, [startFrame, startFrame + 40], [20, 0], { extrapolateRight: "clamp" });

  return (
    <g opacity={op} transform={`translate(${x}, ${y + slideY})`}>
      <rect x={0} y={0} width={w} height={100} rx={6}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} opacity={0.9} />
      <rect x={0} y={0} width={4} height={100} rx={2} fill={C.gold} />
      <text x={20} y={36} fontSize={17} fontFamily={garamond}
        fill={C.ivory} fontStyle="italic">"{quote}"</text>
      <text x={20} y={72} fontSize={13} fontFamily={cinzel}
        fill={C.gold} letterSpacing={3}>{attr}</text>
    </g>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  // Final fade to gold then black
  const finalFadeGold = interpolate(frame, [durationInFrames - 120, durationInFrames - 60], [0, 0.7], { extrapolateRight: "clamp" });

  const titleOp = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Desert sunset */}
        <DesertSunset frame={frame} />

        {/* Walking silhouettes */}
        <SilhouetteFigures frame={frame} />

        {/* Left overlay panel */}
        <rect x={0} y={0} width={420} height={660} fill={C.black} opacity={0.72} />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={40} y={70} fontSize={13} fontFamily={cinzel} fill={C.gold} letterSpacing={5}>
            THE CLOSE
          </text>
          <text x={40} y={145} fontSize={58} fontFamily={cinzel} fill={C.ivory} fontWeight="700">
            WHAT
          </text>
          <text x={40} y={215} fontSize={58} fontFamily={cinzel} fill={C.gold} fontWeight="700">
            HISTORY
          </text>
          <text x={40} y={285} fontSize={58} fontFamily={cinzel} fill={C.ivory} fontWeight="700">
            FORGETS
          </text>
          <line x1={40} y1={305} x2={360} y2={305} stroke={C.gold} strokeWidth={2} opacity={0.5} />
        </g>

        {/* Closing statements */}
        {[
          { y: 340, text: "The Mali Empire rose to unrivaled power", frame: 60 },
          { y: 385, text: "Then fell to succession and the slave trade", frame: 120 },
          { y: 430, text: "But for a century — it was the world's crown", frame: 180 },
        ].map(({ y, text, frame: sf }) => {
          const op = interpolate(frame, [sf, sf + 30], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={text} opacity={op}>
              <circle cx={55} cy={y - 6} r={4} fill={C.gold} />
              <text x={72} y={y} fontSize={17} fontFamily={garamond} fill={C.ivory}>{text}</text>
            </g>
          );
        })}

        {/* Quote cards at bottom */}
        <QuoteCard x={60} y={780}
          quote="A man so rich, his generosity was a weapon."
          attr="— MANSA MUSA · PILGRIMAGE OF 1324"
          startFrame={240} frame={frame} w={840} />

        <QuoteCard x={60} y={900}
          quote="History remembers conquerors. He never raised a sword."
          attr="— HIS FOOTSTEPS RESHAPED THE GLOBAL ECONOMY"
          startFrame={380} frame={frame} w={900} />

        {/* Final golden text */}
        {interpolate(frame, [600, 680], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [600, 680], [0, 1], { extrapolateRight: "clamp" })}>
            <text x={960} y={200} textAnchor="middle" fontSize={52} fontFamily={cinzel}
              fill={C.gold} fontWeight="700" letterSpacing={6}>
              MANSA MUSA
            </text>
            <text x={960} y={265} textAnchor="middle" fontSize={24} fontFamily={garamond}
              fill={C.ivoryDim} fontStyle="italic">
              The Lion King of Mali · The Richest Person Who Ever Lived
            </text>
            <line x1={620} y1={285} x2={1300} y2={285} stroke={C.gold} strokeWidth={1} opacity={0.5} />
            <text x={960} y={320} textAnchor="middle" fontSize={18} fontFamily={cinzel}
              fill={C.goldDark} letterSpacing={4}>c. 1280 – 1337 AD</text>
          </g>
        )}

        {/* He just walked through the desert... handing out gold. */}
        {interpolate(frame, [750, 820], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [750, 820], [0, 1], { extrapolateRight: "clamp" })}>
            <text x={960} y={390} textAnchor="middle" fontSize={26} fontFamily={garamond}
              fill={C.ivory} fontStyle="italic">
              "He just walked through the desert...
            </text>
            <text x={960} y={432} textAnchor="middle" fontSize={26} fontFamily={garamond}
              fill={C.gold} fontStyle="italic">
              handing out gold."
            </text>
          </g>
        )}

        {/* Gold vignette fade at very end */}
        <rect width={1920} height={1080} fill={C.gold} opacity={finalFadeGold} />

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
