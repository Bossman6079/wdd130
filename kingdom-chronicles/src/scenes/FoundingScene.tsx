import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { SharedDefs, StatCard, useFade, ease, shimmer } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Simplified West Africa SVG map
// Ghana roughly centered, Ashanti territory highlighted
const WestAfricaMap: React.FC<{ frame: number }> = ({ frame }) => {
  const fill = interpolate(frame, [30, 180], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const { fps } = useVideoConfig();

  const pulse = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 12, stiffness: 50 } });
  const glow = shimmer(frame, 0.06);

  return (
    <g transform="translate(80, 60)">
      <defs>
        <linearGradient id="ashantiFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={0.9} />
          <stop offset="100%" stopColor={C.goldDark} stopOpacity={0.75} />
        </linearGradient>
        <radialGradient id="kumasiGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldPale} stopOpacity={glow * 0.9} />
          <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
        </radialGradient>
        <filter id="mapGlow">
          <feGaussianBlur stdDeviation={8} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="fillClip">
          <rect x={0} y={0} width={fill * 760} height={960} />
        </clipPath>
      </defs>

      {/* Map background */}
      <rect x={20} y={20} width={760} height={940} rx={12} fill="#0D1A10" opacity={0.85} />

      {/* Ocean */}
      <rect x={20} y={20} width={760} height={940} rx={12} fill="#0A1520" opacity={0.6} />

      {/* Grid lines */}
      {[200, 400, 600, 800].map((y, i) => (
        <line key={`h${i}`} x1={20} y1={y} x2={780} y2={y} stroke={C.forestLight} strokeWidth={0.5} opacity={0.2} />
      ))}
      {[160, 320, 480, 640].map((x, i) => (
        <line key={`v${i}`} x1={x} y1={20} x2={x} y2={960} stroke={C.forestLight} strokeWidth={0.5} opacity={0.2} />
      ))}

      {/* West Africa landmass — stylized */}
      <path d="M 100 80 C 180 60 320 55 440 80 C 560 105 640 150 680 210
               C 720 270 710 340 700 410 C 690 480 660 540 650 610
               C 640 685 650 750 640 820 C 625 895 580 940 520 955
               C 460 965 400 950 340 930 C 275 908 210 875 165 830
               C 115 782 80 730 68 670 C 52 600 58 525 72 455
               C 86 385 105 315 108 240 C 110 168 100 90 100 80 Z"
        fill={C.forestLight} opacity={0.7} stroke={C.forestLight} strokeWidth={1} />

      {/* Gulf of Guinea coastline */}
      <path d="M 68 670 C 120 720 200 760 300 790 C 400 820 500 830 580 820
               C 640 812 680 790 700 760"
        fill="none" stroke="#1A4A6A" strokeWidth={3} opacity={0.6} />

      {/* Ashanti territory — highlighted with gold fill animation */}
      <path d="M 250 480 C 290 455 360 445 420 460 C 490 478 530 515 535 560
               C 540 605 510 640 470 658 C 425 678 370 675 325 655
               C 278 632 248 595 243 550 C 238 516 248 492 250 480 Z"
        fill={C.forestLight} opacity={0.4} />
      <path d="M 250 480 C 290 455 360 445 420 460 C 490 478 530 515 535 560
               C 540 605 510 640 470 658 C 425 678 370 675 325 655
               C 278 632 248 595 243 550 C 238 516 248 492 250 480 Z"
        fill="url(#ashantiFill)" filter="url(#mapGlow)"
        opacity={0.7 * fill} clipPath="url(#fillClip)" />
      <path d="M 250 480 C 290 455 360 445 420 460 C 490 478 530 515 535 560
               C 540 605 510 640 470 658 C 425 678 370 675 325 655
               C 278 632 248 595 243 550 C 238 516 248 492 250 480 Z"
        fill="none" stroke={C.gold} strokeWidth={2.5} opacity={fill * 0.9} />

      {/* Denkyira (pre-Ashanti dominant state) — show as fading out */}
      <ellipse cx={320} cy={600} rx={80} ry={60}
        fill={C.british} opacity={0.3 * Math.max(0, 1 - fill)} />

      {/* Kumasi capital marker */}
      <g transform={`translate(388, 555)`}>
        {/* Pulse rings */}
        {[1, 2, 3].map(i => (
          <circle key={i} cx={0} cy={0} r={16 + i * 18 * pulse}
            fill="none" stroke={C.gold} strokeWidth={2}
            opacity={Math.max(0, (1 - i * 0.3) * pulse * 0.8)} />
        ))}
        <circle cx={0} cy={0} r={10} fill={C.goldPale} />
        <circle cx={0} cy={0} r={5} fill={C.gold} />
        <text x={0} y={-22} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
          fill={C.goldPale} letterSpacing={2}>KUMASI</text>
        <text x={0} y={-8} textAnchor="middle" fontSize={10} fontFamily={GARAMOND}
          fill={C.gold} fontStyle="italic">Capital</text>
      </g>

      {/* Neighboring cities */}
      {[
        { cx: 200, cy: 240, label: "ACCRA" },
        { cx: 520, cy: 380, label: "TAMALE" },
        { cx: 160, cy: 580, label: "CAPE COAST" },
      ].map(({ cx, cy, label }) => {
        const op = fill * 0.7;
        return (
          <g key={label} opacity={op}>
            <circle cx={cx} cy={cy} r={5} fill={C.ivoryDim} opacity={0.7} />
            <text x={cx + 10} y={cy + 4} fontSize={11} fontFamily={CINZEL}
              fill={C.ivoryDim} opacity={0.6}>{label}</text>
          </g>
        );
      })}

      {/* Volta River */}
      <path d="M 560 80 C 540 200 530 320 520 440 C 510 560 500 640 490 720"
        fill="none" stroke="#1A4A6A" strokeWidth={2.5} opacity={0.5} />

      {/* Labels */}
      <text x={390} y={55} textAnchor="middle" fontSize={14} fontFamily={CINZEL}
        fill={C.gold} letterSpacing={4} opacity={fill}>ASHANTI TERRITORY</text>
      <text x={120} y={750} fontSize={11} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic" opacity={0.6}>Gulf of Guinea</text>

      {/* Border */}
      <rect x={20} y={20} width={760} height={940} rx={12} fill="none"
        stroke={C.goldDark} strokeWidth={2} opacity={0.4} />
      <text x={390} y={978} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
        fill={C.goldDark} letterSpacing={4} opacity={0.7}>WEST AFRICA · 18th CENTURY</text>
    </g>
  );
};

// Osei Tutu portrait (engraving-style SVG)
const OseiTutuPortrait: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [80, 160], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const breathe = Math.sin(frame * 0.04) * 2;

  return (
    <g opacity={appear} transform={`translate(900, 60)`}>
      {/* Portrait frame */}
      <defs>
        <radialGradient id="portraitBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={C.forestLight} stopOpacity={0.3} />
          <stop offset="100%" stopColor={C.forestDark} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.goldDark} />
          <stop offset="50%" stopColor={C.goldPale} />
          <stop offset="100%" stopColor={C.goldDark} />
        </linearGradient>
      </defs>

      {/* Outer frame */}
      <rect x={40} y={40} width={920} height={700} rx={8} fill="url(#parchmentPat)" />
      <rect x={40} y={40} width={920} height={700} rx={8} fill="none"
        stroke="url(#frameGrad)" strokeWidth={12} />
      <rect x={50} y={50} width={900} height={680} rx={6} fill="none"
        stroke={C.goldDark} strokeWidth={2} opacity={0.6} />

      {/* Background: forest interior setting */}
      <rect x={55} y={55} width={890} height={670} rx={4} fill="#1A2E14" />

      {/* Kente cloth pattern background */}
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={55 + (i % 6) * 148} y={55 + Math.floor(i / 6) * 134}
          width={148} height={134}
          fill={i % 2 === 0 ? "#1E3516" : "#162810"}
          opacity={0.8} />
      ))}
      {/* Kente horizontal stripes */}
      {[80, 120, 160, 200, 280, 360, 440, 520, 600, 680].map((y, i) => (
        <rect key={i} x={55} y={y} width={890} height={10}
          fill={i % 3 === 0 ? C.gold : i % 3 === 1 ? C.red : C.forest}
          opacity={0.35} />
      ))}

      {/* Figure body — warrior king silhouette */}
      <g transform={`translate(500, 360) translate(0, ${breathe})`}>
        {/* Robe — large kente cloth mantle */}
        <path d="M -200 0 C -220 50 -230 150 -210 300 L 210 300 C 230 150 220 50 200 0 Z"
          fill={C.amberDark} />
        {/* Kente stripes on robe */}
        {[30, 80, 130, 180, 230, 280].map((y, i) => (
          <rect key={i} x={-210} y={y} width={420} height={14}
            fill={i % 3 === 0 ? C.gold : i % 3 === 1 ? "#8B0000" : C.forest}
            opacity={0.7} />
        ))}
        {/* Chest band */}
        <rect x={-160} y={-30} width={320} height={50} rx={4} fill={C.gold} opacity={0.8} />
        {/* Chest medallion */}
        <circle cx={0} cy={-8} r={25} fill={C.goldDark} />
        <circle cx={0} cy={-8} r={18} fill={C.goldPale} />
        {/* Body */}
        <ellipse cx={0} cy={-60} rx={90} ry={70} fill={C.skin} />
        {/* Neck */}
        <rect x={-22} y={-92} width={44} height={40} rx={10} fill={C.skin} />
        {/* Head */}
        <ellipse cx={0} cy={-140} rx={68} ry={75} fill={C.skinDark} />
        {/* Face features */}
        <ellipse cx={-22} cy={-148} rx={10} ry={11} fill="#1A0A00" />
        <ellipse cx={22} cy={-148} rx={10} ry={11} fill="#1A0A00" />
        <circle cx={-21} cy={-148} r={4} fill={C.black} />
        <circle cx={23} cy={-148} r={4} fill={C.black} />
        <circle cx={-20} cy={-150} r={1.5} fill="white" opacity={0.7} />
        <circle cx={24} cy={-150} r={1.5} fill="white" opacity={0.7} />
        {/* Broad nose */}
        <path d="M -10 -132 Q 0 -124 10 -132" fill="none" stroke={C.skinDark} strokeWidth={3} opacity={0.5} />
        {/* Mouth */}
        <path d="M -14 -114 Q 0 -106 14 -114" fill="none" stroke={C.skinDark} strokeWidth={2.5} />
        {/* Beard/chin */}
        <ellipse cx={0} cy={-94} rx={28} ry={12} fill={C.skinDark} opacity={0.6} />

        {/* Royal crown — elaborate gold headdress */}
        <defs>
          <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.goldDark} />
            <stop offset="40%" stopColor={C.goldPale} />
            <stop offset="100%" stopColor={C.goldDark} />
          </linearGradient>
        </defs>
        {/* Crown base */}
        <rect x={-75} y={-220} width={150} height={22} rx={4} fill="url(#crownGold)" />
        {/* Crown points */}
        {[-60, -40, -20, 0, 20, 40, 60].map((ox, i) => (
          <polygon key={i} points={`${ox},-220 ${ox-8},-260 ${ox+8},-260 ${ox+16},-220`}
            fill={i === 3 ? C.goldPale : "url(#crownGold)"} />
        ))}
        {/* Crown jewels */}
        {[-50, -25, 0, 25, 50].map((ox, i) => (
          <circle key={i} cx={ox} cy={-232} r={6}
            fill={i === 2 ? C.ivory : i % 2 === 0 ? "#CC2200" : C.goldPale} />
        ))}
        {/* Crown glow */}
        <rect x={-75} y={-265} width={150} height={68} fill="none"
          stroke={C.gold} strokeWidth={1} opacity={0.6} filter="url(#softGlow)" />

        {/* Right arm — holding golden scepter */}
        <ellipse cx={120} cy={-20} rx={22} ry={14} fill={C.skinDark} />
        <rect x={135} y={-120} width={10} height={200} rx={5} fill={C.gold} opacity={0.9} />
        <circle cx={140} cy={-124} r={18} fill={C.gold} />
        <circle cx={140} cy={-124} r={12} fill={C.amberDark} />
        <circle cx={140} cy={-124} r={6} fill={C.goldPale} />

        {/* Left arm — gesture */}
        <ellipse cx={-120} cy={-15} rx={22} ry={14} fill={C.skinDark} />
        <ellipse cx={-148} cy={-8} rx={18} ry={12} fill={C.skinDark} />
      </g>

      {/* Engraving overlay texture */}
      <rect x={55} y={55} width={890} height={670} fill="url(#crosshatch)" opacity={0.08} />

      {/* Name plaque */}
      <rect x={200} y={700} width={600} height={80} rx={4} fill={C.goldDark} opacity={0.9} />
      <text x={500} y={742} textAnchor="middle" fontSize={22} fontFamily={CINZEL}
        fill={C.ivory} letterSpacing={5} fontWeight="700">OSEI TUTU I</text>
      <text x={500} y={766} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
        fill={C.goldPale} fontStyle="italic">Founder of the Ashanti Confederacy  ·  r. 1701–1717</text>
    </g>
  );
};

export const FoundingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.forestDark, opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <rect width={1920} height={1080} fill={C.forestDark} />

        {/* Map */}
        <WestAfricaMap frame={frame} />

        {/* Portrait */}
        <OseiTutuPortrait frame={frame} />

        {/* Scene title */}
        <g opacity={titleOp}>
          <text x={490} y={50} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>THE FOUNDING · 1701</text>
        </g>

        {/* Year stamp */}
        {interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" })}>
            <text x={490} y={990} textAnchor="middle" fontSize={80} fontFamily={CINZEL}
              fill={C.gold} fontWeight="700" opacity={0.15} letterSpacing={8}>1701</text>
          </g>
        )}

        {/* Stats */}
        <StatCard x={80} y={800} label="YEAR FOUNDED" value="1701 AD" startFrame={60} />
        <StatCard x={80} y={930} label="CAPITAL" value="Kumasi" startFrame={100} />

        {/* Vignette */}
        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
