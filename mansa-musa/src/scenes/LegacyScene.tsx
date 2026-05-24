import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Catalan Atlas style illuminated map
const CatalanAtlas: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const shimmer = 0.7 + 0.3 * Math.sin(frame * 0.04);

  return (
    <g opacity={appear} transform="translate(80, 60)">
      <defs>
        <pattern id="parchment" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="40" height="40" fill="#C8A875" />
          <line x1="0" y1="0" x2="40" y2="40" stroke="#B09050" strokeWidth="0.5" opacity="0.3" />
          <line x1="40" y1="0" x2="0" y2="40" stroke="#B09050" strokeWidth="0.5" opacity="0.2" />
        </pattern>
        <filter id="atlasGlow">
          <feGaussianBlur stdDeviation={4} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="atlasEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B6914" stopOpacity={0.8} />
          <stop offset="50%" stopColor="#C9A84C" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#8B6914" stopOpacity={0.8} />
        </linearGradient>
      </defs>

      {/* Parchment background */}
      <rect x={0} y={0} width={820} height={920} rx={12} fill="url(#parchment)" />
      {/* Aged edges */}
      <rect x={0} y={0} width={820} height={920} rx={12} fill="none"
        stroke="url(#atlasEdge)" strokeWidth={10} />
      {/* Inner border */}
      <rect x={15} y={15} width={790} height={890} rx={8} fill="none"
        stroke={C.goldDark} strokeWidth={2} opacity={0.7} />
      <rect x={25} y={25} width={770} height={870} rx={6} fill="none"
        stroke={C.goldDark} strokeWidth={1} opacity={0.4} />

      {/* Map title (in medieval style) */}
      <text x={410} y={65} textAnchor="middle" fontSize={22} fontFamily={cinzel}
        fill={C.brownDark} letterSpacing={3}>CATALAN ATLAS · 1375</text>

      {/* Stylized Africa continent on parchment */}
      <path d="M 200 120 C 240 100 320 95 380 110 C 440 125 490 155 510 195
               C 535 240 530 285 515 325 C 500 365 475 395 490 440
               C 508 490 530 535 520 590 C 508 645 475 690 440 730
               C 400 775 350 800 310 822 C 270 800 228 772 200 730
               C 165 682 140 630 135 575 C 130 518 148 465 162 418
               C 175 375 162 328 155 282 C 148 230 148 178 178 148 Z"
        fill="#B09050" opacity={0.8} stroke={C.brownDark} strokeWidth={3} />

      {/* Mediterranean sea (blue wash) */}
      <ellipse cx={410} cy={105} rx={380} ry={50} fill="#3A5A7A" opacity={0.4} />

      {/* Mali Empire region highlight on atlas */}
      <ellipse cx={265} cy={420} rx={120} ry={95} fill={C.gold} opacity={0.45 * shimmer} filter="url(#atlasGlow)" />
      <ellipse cx={265} cy={420} rx={120} ry={95} fill="none" stroke={C.gold} strokeWidth={2} opacity={0.7} />

      {/* Mansa Musa figure on the map (iconic Catalan Atlas depiction) */}
      <g transform="translate(170, 290)">
        {/* Throne */}
        <rect x={10} y={60} width={90} height={70} rx={6} fill={C.red} stroke={C.gold} strokeWidth={2} />
        <rect x={5} y={55} width={100} height={20} rx={4} fill={C.goldDark} />
        {/* Figure body */}
        <rect x={25} y={10} width={60} height={55} rx={4} fill={C.amber} />
        {/* Royal robe */}
        <path d="M 18 12 C 15 30 15 60 18 65 L 82 65 C 85 60 85 30 82 12"
          fill={C.red} opacity={0.9} />
        <path d="M 18 12 Q 55 8 82 12" fill="none" stroke={C.gold} strokeWidth={2} />
        {/* Head */}
        <ellipse cx={55} cy={2} rx={22} ry={24} fill={C.skin} />
        {/* Crown */}
        <rect x={35} y={-22} width={40} height={14} fill={C.gold} rx={2} />
        {[38, 44, 50, 56, 62, 68].map((x, i) => (
          <polygon key={i} points={`${x},-22 ${x+2},-36 ${x+4},-22`} fill={C.gold} />
        ))}
        {/* Gold scepter */}
        <rect x={90} y={-15} width={6} height={85} rx={3} fill={C.gold} />
        <circle cx={93} cy={-18} r={10} fill={C.gold} />
        <circle cx={93} cy={-18} r={6} fill={C.amber} />
        {/* Gold nugget held */}
        <ellipse cx={18} cy={38} rx={16} ry={14} fill={C.gold} opacity={0.9} />
        <ellipse cx={18} cy={38} rx={9} ry={7} fill={C.goldPale} opacity={0.8} />
      </g>

      {/* Atlas caption (medieval script style) */}
      <text x={265} y={570} textAnchor="middle" fontSize={13} fontFamily={garamond}
        fill={C.brownDark} fontStyle="italic">Musa Mali</text>
      <text x={265} y={590} textAnchor="middle" fontSize={11} fontFamily={garamond}
        fill={C.brownDark} fontStyle="italic">"richest king in all the land"</text>

      {/* Trade route lines on map */}
      <path d="M 265 420 C 320 360 400 300 490 265 C 560 238 620 235 680 240"
        fill="none" stroke={C.brownDark} strokeWidth={2} strokeDasharray="8,5" opacity={0.6} />

      {/* Compass rose */}
      <g transform="translate(700, 800)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const len = i % 2 === 0 ? 40 : 25;
          return (
            <line key={i} x1={0} y1={0}
              x2={Math.sin(rad) * len} y2={-Math.cos(rad) * len}
              stroke={C.brownDark} strokeWidth={i % 2 === 0 ? 2.5 : 1.5} opacity={0.7} />
          );
        })}
        <circle cx={0} cy={0} r={8} fill={C.gold} opacity={0.8} />
        <text x={0} y={-55} textAnchor="middle" fontSize={14} fontFamily={cinzel} fill={C.brownDark}>N</text>
      </g>

      {/* Year label */}
      <text x={410} y={895} textAnchor="middle" fontSize={14} fontFamily={cinzel}
        fill={C.brownDark} letterSpacing={4}>ANNO DOMINI MCCCLXXV</text>
    </g>
  );
};

// Djinguereber Mosque illustration
const DjinguereberMosque: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [200, 320], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear} transform="translate(950, 50)">
      <text x={460} y={45} textAnchor="middle" fontSize={14} fontFamily={cinzel}
        fill={C.gold} letterSpacing={4}>DJINGUEREBER MOSQUE</text>
      <text x={460} y={68} textAnchor="middle" fontSize={11} fontFamily={garamond}
        fill={C.ivoryDim} fontStyle="italic">Built by Mansa Musa · Timbuktu · Still standing today</text>

      {/* Mosque architecture */}
      <g transform="translate(180, 80)">
        {/* Main building */}
        <rect x={50} y={200} width={460} height={380} fill={C.amber} rx={4} />
        {/* Facade texture */}
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <rect key={`${row}-${col}`} x={60 + col * 44} y={220 + row * 58} width={36} height={48}
              fill={C.amberLight} opacity={0.3} rx={2} />
          ))
        )}

        {/* Central tower */}
        <rect x={210} y={60} width={140} height={300} fill={C.amberLight} rx={3} />
        {/* Tower sticks */}
        {[-50, -30, -10, 10, 30, 50].map((ox, i) => (
          <rect key={i} x={280 + ox - 3} y={80 + i * 8} width={6} height={55}
            fill={C.brownDark} opacity={0.85} />
        ))}

        {/* Pyramid top */}
        <polygon points="280,10 195,60 365,60" fill={C.goldDark} />
        <polygon points="280,18 205,60 355,60" fill={C.amber} opacity={0.5} />
        {/* Crescent */}
        <circle cx={280} cy={-2} r={12} fill="none" stroke={C.gold} strokeWidth={2} />
        <circle cx={284} cy={-3} r={9} fill={C.amberLight} />

        {/* Side towers */}
        {[80, 440].map((x, i) => (
          <g key={i}>
            <rect x={x} y={120} width={70} height={260} fill={C.amber} opacity={0.9} rx={3} />
            <polygon points={`${x+35},90 ${x},120 ${x+70},120`} fill={C.goldDark} />
            {[-20, -5, 10].map((ox, j) => (
              <rect key={j} x={x + 35 + ox - 3} y={100 + j * 7} width={6} height={30}
                fill={C.brownDark} opacity={0.8} />
            ))}
            <circle cx={x+35} cy={88} r={8} fill="none" stroke={C.gold} strokeWidth={2} />
            <circle cx={x+37} cy={87} r={6} fill={C.amber} />
          </g>
        ))}

        {/* Entrance archway */}
        <path d="M 230 580 L 230 480 Q 280 450 330 480 L 330 580 Z" fill={C.brownDark} />

        {/* Ground */}
        <rect x={0} y={578} width={560} height={30} fill={C.brownDark} opacity={0.6} rx={3} />
        {/* People */}
        {[80, 140, 170, 390, 440, 480].map((x, i) => (
          <g key={i} transform={`translate(${x}, 548)`}>
            <circle cx={0} cy={-28} r={8} fill={i % 2 === 0 ? C.skin : C.brown} />
            <rect x={-7} y={-20} width={14} height={26} rx={2} fill={i % 3 === 0 ? C.ivory : C.brownDark} />
          </g>
        ))}
      </g>
    </g>
  );
};

// European explorers looking at map
const ExplorersFigures: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [380, 460], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear} transform="translate(950, 680)">
      <text x={460} y={-15} textAnchor="middle" fontSize={13} fontFamily={cinzel}
        fill={C.ivoryDim} letterSpacing={3}>EUROPEAN TRADERS — SEEKING ROUTES TO MALI</text>

      {/* Three explorer figures */}
      {[120, 280, 440, 600].map((x, i) => (
        <g key={i} transform={`translate(${x}, 0)`}>
          {/* Head */}
          <circle cx={0} cy={-70} r={12} fill={i < 2 ? "#D4A890" : C.skin} />
          {/* Hat (medieval European) */}
          <ellipse cx={0} cy={-78} rx={16} ry={9} fill={i < 2 ? "#3A3A4A" : "#4A3A1A"} />
          {i < 2 && <polygon points="-5,-78 0,-100 5,-78" fill={i % 2 === 0 ? "#4A3A1A" : C.red} />}
          {/* Body */}
          <path d="M -18 -58 C -20 -30 -20 15 -18 40 L 18 40 C 20 15 20 -30 18 -58 Z"
            fill={i === 0 ? "#2A3A5A" : i === 1 ? "#3A2A1A" : i === 2 ? "#2A4A2A" : "#4A2A2A"} />
          {/* Feather quill or telescope */}
          {i === 0 && <rect x={14} y={-48} width={4} height={55} rx={1} fill={C.ivory} opacity={0.9} />}
          {i === 2 && (
            <>
              <rect x={12} y={-38} width={40} height={8} rx={3} fill={C.brownDark} />
              <circle cx={52} cy={-34} r={10} fill="none" stroke={C.goldDark} strokeWidth={3} />
            </>
          )}
          {/* Map scroll */}
          {i === 1 && (
            <g transform="translate(-38, -30)">
              <rect x={0} y={0} width={60} height={45} rx={3} fill="#C8A875" />
              <line x1={5} y1={10} x2={55} y2={10} stroke={C.brownDark} strokeWidth={1} opacity={0.5} />
              <line x1={5} y1={20} x2={55} y2={20} stroke={C.brownDark} strokeWidth={1} opacity={0.5} />
              <text x={30} y={37} textAnchor="middle" fontSize={9} fontFamily={garamond}
                fill={C.brownDark}>MALI →</text>
            </g>
          )}
          {/* Legs */}
          <rect x={-10} y={40} width={9} height={40} rx={4} fill={C.brownDark} />
          <rect x={2} y={40} width={9} height={40} rx={4} fill={C.brownDark} />
        </g>
      ))}

      {/* Ship on horizon */}
      <g transform="translate(680, -20)">
        <path d="M 0 40 L 0 -40" stroke={C.brownDark} strokeWidth={5} />
        <path d="M 0 -30 L 60 10 L 0 10 Z" fill={C.ivory} opacity={0.9} />
        <path d="M 0 0 L 40 25 L 0 25 Z" fill={C.ivory} opacity={0.7} />
        <path d="M -60 40 Q 0 30 60 40" fill="none" stroke={C.brownDark} strokeWidth={3} />
        <path d="M -70 40 Q 0 55 70 40" fill={C.brownDark} opacity={0.8} />
      </g>
    </g>
  );
};

export const LegacyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0A0806", opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <radialGradient id="legacyBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.06} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#0A0806" />
        <rect width={1920} height={1080} fill="url(#legacyBg)" />

        {/* Catalan Atlas */}
        <CatalanAtlas frame={frame} />

        {/* Djinguereber Mosque */}
        <DjinguereberMosque frame={frame} />

        {/* European explorers */}
        <ExplorersFigures frame={frame} />

        {/* Title strip */}
        <g opacity={titleOp}>
          <rect x={0} y={0} width={960} height={56} fill={C.black} opacity={0.7} />
          <text x={40} y={35} fontSize={14} fontFamily={cinzel} fill={C.gold} letterSpacing={6}>
            THE LEGACY
          </text>
          <line x1={40} y1={50} x2={900} y2={50} stroke={C.gold} strokeWidth={1} opacity={0.3} />
        </g>

        {/* Legacy bullets - appear progressively */}
        {[
          { text: "Put Africa on the map — literally",           frame: 80,  x: 60,  y: 600 },
          { text: "Catalan Atlas (1375) depicts him as richest king", frame: 150, x: 60,  y: 640 },
          { text: "Accelerated European Age of Exploration",      frame: 220, x: 60,  y: 680 },
          { text: "Built Djinguereber Mosque — still standing",   frame: 290, x: 60,  y: 720 },
          { text: "Expanded Timbuktu as world center of learning", frame: 360, x: 60,  y: 760 },
        ].map(({ text, frame: sf, x, y }) => {
          const op = interpolate(frame, [sf, sf + 30], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={text} opacity={op}>
              <circle cx={x + 10} cy={y - 6} r={4} fill={C.gold} />
              <text x={x + 26} y={y} fontSize={18} fontFamily={garamond} fill={C.ivory}>{text}</text>
            </g>
          );
        })}

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
