import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Simplified continent shapes as SVG paths (stylized, not geographic)
// Africa - centered around x=1000, y=560 on 1920x1080 canvas
const AFRICA_PATH =
  "M 920,340 C 940,310 980,305 1010,315 C 1050,325 1080,340 1095,370 C 1115,405 1110,440 1100,470 C 1090,500 1075,525 1085,555 C 1098,590 1110,620 1105,660 C 1098,700 1075,730 1050,755 C 1020,782 985,800 960,820 C 935,800 905,780 885,755 C 855,720 835,680 830,640 C 825,600 840,565 852,530 C 862,498 855,465 848,435 C 840,400 838,365 860,340 C 880,320 910,330 920,340 Z";

const EUROPE_PATH =
  "M 760,200 C 790,180 830,175 860,185 C 895,198 910,220 915,245 C 920,265 905,280 890,290 C 870,302 845,305 825,300 C 800,293 778,280 762,262 C 742,240 738,215 760,200 Z";

const ASIA_PATH =
  "M 1100,180 C 1160,160 1230,165 1290,185 C 1360,210 1410,250 1430,295 C 1448,335 1435,375 1410,405 C 1380,440 1335,455 1290,460 C 1240,465 1185,450 1145,420 C 1100,385 1075,340 1070,295 C 1065,250 1070,200 1100,180 Z";

const NORTH_AMERICA_PATH =
  "M 400,200 C 450,175 510,178 555,200 C 600,222 625,260 620,300 C 615,340 588,368 555,380 C 518,393 475,385 440,365 C 400,342 372,305 370,265 C 368,228 380,210 400,200 Z";

// Mali Empire region within Africa (highlighted)
const MALI_PATH =
  "M 860,420 C 885,405 915,400 940,408 C 968,418 980,440 982,462 C 984,485 970,503 950,512 C 928,522 900,520 878,508 C 853,493 840,468 842,445 C 844,432 852,426 860,420 Z";

// Niger River bend
const NIGER_RIVER =
  "M 870,490 C 900,485 930,478 955,465 C 975,455 990,450 1005,460 C 1020,470 1018,488 1008,498 C 992,510 970,515 948,512";

// Trade route: Mali -> Egypt (Cairo) -> Mecca
const TRADE_ROUTE =
  "M 961,460 C 990,440 1030,420 1060,400 C 1090,380 1120,360 1150,350 C 1185,338 1220,345 1250,355 C 1280,365 1295,385 1300,410";

interface InfoCard { x: number; y: number; title: string; sub: string; startFrame: number; }
const INFO_CARDS: InfoCard[] = [
  { x: 820,  y: 165, title: "EUROPE",        sub: "Recovering from plague & famine",  startFrame: 60  },
  { x: 1180, y: 170, title: "MONGOL EMPIRE", sub: "Fracturing",                        startFrame: 100 },
  { x: 1320, y: 300, title: "BYZANTINE",     sub: "Shrinking",                          startFrame: 140 },
  { x: 820,  y: 490, title: "MALI EMPIRE",   sub: "Controls half the world's gold",     startFrame: 180 },
];

const WorldMap: React.FC<{ frame: number }> = ({ frame }) => {
  const maliGlow = 0.5 + 0.5 * Math.sin(frame * 0.06);
  const pulseScale = 1 + 0.02 * Math.sin(frame * 0.08);

  return (
    <g>
      <defs>
        <radialGradient id="maliGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={maliGlow * 0.8} />
          <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
        </radialGradient>
        <filter id="mapGlow">
          <feGaussianBlur stdDeviation={6} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="maliFilter">
          <feGaussianBlur stdDeviation={12} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ocean */}
      <rect x={280} y={140} width={1100} height={780} rx={20} fill="#0D1820" opacity={0.85} />

      {/* Grid lines */}
      {[200, 350, 500, 650, 800].map((y, i) => (
        <line key={`h${i}`} x1={280} y1={y} x2={1380} y2={y}
          stroke={C.gold} strokeWidth={0.4} opacity={0.12} />
      ))}
      {[350, 500, 650, 800, 950, 1100, 1250].map((x, i) => (
        <line key={`v${i}`} x1={x} y1={140} x2={x} y2={920}
          stroke={C.gold} strokeWidth={0.4} opacity={0.12} />
      ))}

      {/* Continents */}
      <path d={NORTH_AMERICA_PATH} fill="#1A2A1A" stroke={C.goldDark} strokeWidth={1} opacity={0.7} />
      <path d={EUROPE_PATH} fill="#1E1E2A" stroke="#4A4A8A" strokeWidth={1} opacity={0.8} />
      <path d={ASIA_PATH} fill="#1E1E2A" stroke="#4A4A8A" strokeWidth={1} opacity={0.8} />
      <path d={AFRICA_PATH} fill="#1A1208" stroke={C.goldDark} strokeWidth={1.5} opacity={0.9} />

      {/* Mali Empire glow */}
      <ellipse cx={961} cy={460} rx={110 * pulseScale} ry={80 * pulseScale}
        fill="url(#maliGlowGrad)" />

      {/* Mali Empire highlight */}
      <path d={MALI_PATH} fill={C.gold} opacity={0.55} filter="url(#maliFilter)" />
      <path d={MALI_PATH} fill={C.goldDark} stroke={C.gold} strokeWidth={2} opacity={0.9} />

      {/* Niger River */}
      <path d={NIGER_RIVER} fill="none" stroke="#2A5A8A" strokeWidth={2.5} opacity={0.7} />

      {/* Gold star at Mali */}
      <polygon points="961,448 966,460 979,460 969,468 972,481 961,473 950,481 953,468 943,460 956,460"
        fill={C.goldLight} filter="url(#mapGlow)" />

      {/* Trade route - animated */}
      <path d={TRADE_ROUTE} fill="none" stroke={C.gold} strokeWidth={1.5}
        strokeDasharray="8,6" opacity={0.45}
        strokeDashoffset={-frame * 0.8} />

      {/* City dots */}
      {[
        { cx: 961, cy: 455, label: "TIMBUKTU" },
        { cx: 1298, cy: 398, label: "MECCA" },
        { cx: 1165, cy: 348, label: "CAIRO" },
      ].map(({ cx, cy, label }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={5} fill={C.gold} />
          <circle cx={cx} cy={cy} r={9} fill="none" stroke={C.gold} strokeWidth={1} opacity={0.5} />
          <text x={cx} y={cy - 14} textAnchor="middle" fontSize={11} fontFamily={cinzel}
            fill={C.goldLight} letterSpacing={1}>{label}</text>
        </g>
      ))}

      {/* Map border */}
      <rect x={280} y={140} width={1100} height={780} rx={20} fill="none"
        stroke={C.goldDark} strokeWidth={2} opacity={0.5} />
    </g>
  );
};

export const WorldMapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  // Title
  const titleOp = interpolate(frame, [20, 55], [0, 1], { extrapolateRight: "clamp" });

  // Subtitle slide in
  const subOp = interpolate(frame, [50, 90], [0, 1], { extrapolateRight: "clamp" });

  // Map slide in from right
  const mapX = interpolate(frame, [30, 80], [200, 0], { extrapolateRight: "clamp", easing: ease });

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <radialGradient id="bgGradWM" cx="20%" cy="50%" r="60%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.08} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width={1920} height={1080} fill={C.black} />
        <rect width={1920} height={1080} fill="url(#bgGradWM)" />

        {/* Left panel — text */}
        <g>
          <rect x={0} y={0} width={280} height={1080} fill={C.black} />
          <line x1={280} y1={60} x2={280} y2={1020} stroke={C.gold} strokeWidth={1} opacity={0.3} />

          {/* Title */}
          <g opacity={titleOp}>
            <text x={40} y={140} fontSize={14} fontFamily={cinzel} fill={C.gold} letterSpacing={4}>
              EARLY 14TH CENTURY
            </text>
            <text x={40} y={200} fontSize={52} fontFamily={cinzel} fill={C.ivory} fontWeight="700">
              THE
            </text>
            <text x={40} y={260} fontSize={52} fontFamily={cinzel} fill={C.ivory} fontWeight="700">
              WORLD
            </text>
            <text x={40} y={320} fontSize={52} fontFamily={cinzel} fill={C.gold} fontWeight="700">
              STAGE
            </text>
            <line x1={40} y1={340} x2={220} y2={340} stroke={C.gold} strokeWidth={2} opacity={0.6} />
          </g>

          {/* Info bullets */}
          <g opacity={subOp}>
            {[
              { y: 390, text: "Europe: Plague & famine", dim: true },
              { y: 430, text: "Mongols: Fracturing", dim: true },
              { y: 470, text: "Byzantines: Shrinking", dim: true },
              { y: 530, text: "Mali: DOMINANT", dim: false },
            ].map(({ y, text, dim }) => (
              <g key={y}>
                <circle cx={50} cy={y - 6} r={3} fill={dim ? C.ivoryDim : C.gold} />
                <text x={65} y={y} fontSize={15} fontFamily={garamond} fill={dim ? C.ivoryDim : C.goldLight}>
                  {text}
                </text>
              </g>
            ))}
          </g>

          {/* Bottom accent */}
          <text x={40} y={1040} fontSize={11} fontFamily={cinzel} fill={C.goldDark} letterSpacing={2}>
            MALI EMPIRE
          </text>
        </g>

        {/* Map */}
        <g transform={`translate(${mapX}, 60)`}>
          <WorldMap frame={frame} />
        </g>

        {/* Info cards */}
        {INFO_CARDS.map(({ x, y, title, sub, startFrame }) => {
          const op = interpolate(frame, [startFrame, startFrame + 30], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={title} opacity={op} transform={`translate(${mapX}, 60)`}>
              <rect x={x + 280 - 10} y={y - 22} width={180} height={48} rx={4}
                fill={title === "MALI EMPIRE" ? C.goldDark : C.blackSoft}
                stroke={title === "MALI EMPIRE" ? C.gold : "#3A3A4A"} strokeWidth={1} opacity={0.92} />
              <text x={x + 280 + 80} y={y - 3} textAnchor="middle" fontSize={13} fontFamily={cinzel}
                fill={title === "MALI EMPIRE" ? C.goldPale : C.ivory} letterSpacing={2}>
                {title}
              </text>
              <text x={x + 280 + 80} y={y + 16} textAnchor="middle" fontSize={11} fontFamily={garamond}
                fill={C.ivoryDim}>
                {sub}
              </text>
            </g>
          );
        })}

        {/* Bottom bar */}
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
