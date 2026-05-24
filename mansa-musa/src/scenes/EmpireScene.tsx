import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";


import { C } from "../palette";
import { CINZEL as cinzel, GARAMOND as garamond } from "../fonts";




const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

// Timbuktu mosque illustration (Djinguereber style)
const MosqueIllustration: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [80, 140], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const glow = 0.6 + 0.4 * Math.sin(frame * 0.05);

  return (
    <g opacity={appear} transform="translate(1050, 200)">
      <defs>
        <radialGradient id="mosqueGlow" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={glow * 0.4} />
          <stop offset="100%" stopColor={C.black} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <ellipse cx={380} cy={580} rx={380} ry={160} fill="url(#mosqueGlow)" />

      {/* Ground */}
      <rect x={60} y={555} width={640} height={40} fill={C.amber} opacity={0.6} rx={4} />

      {/* Main mosque building */}
      {/* Central tower */}
      <rect x={310} y={280} width={120} height={280} fill={C.amber} rx={2} />
      <rect x={320} y={290} width={100} height={260} fill={C.amberLight} opacity={0.4} />

      {/* Pyramid top of central tower */}
      <polygon points="370,210 290,280 450,280" fill={C.goldDark} />
      <polygon points="370,220 300,280 440,280" fill={C.amber} opacity={0.5} />

      {/* Wooden sticks (typical Sudano-Sahelian style) */}
      {[-40, -20, 0, 20, 40].map((ox, i) => (
        <rect key={i} x={370 + ox - 2} y={230 + (i % 2 * 8)} width={4} height={50}
          fill={C.brownDark} opacity={0.9} />
      ))}

      {/* Side wings */}
      <rect x={130} y={380} width={180} height={175} fill={C.amber} opacity={0.9} rx={2} />
      <rect x={450} y={380} width={180} height={175} fill={C.amber} opacity={0.9} rx={2} />

      {/* Side mini-towers */}
      <rect x={165} y={310} width={55} height={70} fill={C.amberLight} opacity={0.8} />
      <polygon points="192,288 155,310 230,310" fill={C.goldDark} />
      <rect x={540} y={310} width={55} height={70} fill={C.amberLight} opacity={0.8} />
      <polygon points="567,288 530,310 605,310" fill={C.goldDark} />

      {/* Window openings */}
      {[155, 190, 225].map((x, i) => (
        <rect key={i} x={x} y={420} width={24} height={35} fill={C.brownDark} rx={2} opacity={0.9} />
      ))}
      {[455, 490, 525].map((x, i) => (
        <rect key={i} x={x} y={420} width={24} height={35} fill={C.brownDark} rx={2} opacity={0.9} />
      ))}
      <rect x={350} y={380} width={60} height={80} fill={C.brownDark} rx={3} opacity={0.9} />

      {/* Gold crescent on top */}
      <circle cx={370} cy={198} r={14} fill="none" stroke={C.gold} strokeWidth={3} />
      <circle cx={376} cy={196} r={10} fill={C.black} />

      {/* Palm trees */}
      {[90, 650].map((x, i) => (
        <g key={i} transform={`translate(${x}, 380)`}>
          <rect x={-6} y={0} width={12} height={180} fill={C.brownDark} rx={4} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * 55;
            const py = Math.sin(rad) * 30;
            return (
              <path key={j} d={`M 0 0 Q ${px*0.5} ${py*0.5 - 20} ${px} ${py}`}
                fill="none" stroke="#2A5A1A" strokeWidth={4} opacity={0.9} />
            );
          })}
        </g>
      ))}

      {/* Scholars/people silhouettes near mosque */}
      {[200, 260, 330, 400, 470].map((x, i) => (
        <g key={i} transform={`translate(${x}, 510)`}>
          <ellipse cx={0} cy={0} rx={9} ry={12} fill={C.brownDark} opacity={0.85} />
          <rect x={-7} y={10} width={14} height={35} fill={C.brownDark} opacity={0.7} rx={2} />
          {i % 2 === 0 && <circle cx={0} cy={-15} r={7} fill={C.black} stroke={C.gold} strokeWidth={1} />}
        </g>
      ))}

      {/* Label */}
      <text x={380} y={620} textAnchor="middle" fontSize={20} fontFamily={cinzel}
        fill={C.gold} letterSpacing={4}>TIMBUKTU</text>
      <text x={380} y={645} textAnchor="middle" fontSize={13} fontFamily={garamond}
        fill={C.ivoryDim} fontStyle="italic">The Golden City of Knowledge</text>
    </g>
  );
};

// Gold flood-fill animation over Mali region
const MaliGoldFlood: React.FC<{ frame: number }> = ({ frame }) => {
  const fill = interpolate(frame, [20, 160], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.07);

  return (
    <g transform="translate(60, 220)">
      <defs>
        <linearGradient id="goldFlood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.gold} stopOpacity={0.9} />
          <stop offset="50%" stopColor={C.goldDark} stopOpacity={0.75} />
          <stop offset="100%" stopColor={C.amber} stopOpacity={0.85} />
        </linearGradient>
        <filter id="empireGlow">
          <feGaussianBlur stdDeviation={15} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="empireClip">
          <rect x={0} y={0} width={`${fill * 680}px`} height={600} />
        </clipPath>
      </defs>

      {/* Empire outline */}
      <rect x={0} y={0} width={680} height={520} rx={8}
        fill="none" stroke={C.goldDark} strokeWidth={2} opacity={0.3} />

      {/* Gold fill */}
      <rect x={0} y={0} width={680} height={520} rx={8}
        fill="url(#goldFlood)" opacity={0.15 + glow * 0.1}
        clipPath="url(#empireClip)" />

      {/* Empire border glow */}
      <rect x={0} y={0} width={fill * 680} height={520} rx={8}
        fill="none" stroke={C.gold} strokeWidth={3} opacity={0.5 * fill} filter="url(#empireGlow)" />

      {/* "MALI EMPIRE" label */}
      <text x={340} y={280} textAnchor="middle" fontSize={48} fontFamily={cinzel}
        fill={C.gold} opacity={fill} letterSpacing={8} fontWeight="700">
        MALI EMPIRE
      </text>
      <text x={340} y={330} textAnchor="middle" fontSize={22} fontFamily={garamond}
        fill={C.ivory} opacity={fill * 0.8} fontStyle="italic">
        ~2,000,000 km² · 14th century
      </text>

      {/* Gold dust particles */}
      {Array.from({ length: 30 }, (_, i) => {
        const px = (i * 137.5) % 680;
        const py = (i * 97.3) % 520;
        const pr = 2 + (i % 4);
        const pop = Math.sin(frame * 0.07 + i) * 0.4 + 0.5;
        return <circle key={i} cx={px} cy={py} r={pr} fill={C.goldLight} opacity={pop * fill} />;
      })}
    </g>
  );
};

// Stats panel
const StatCard: React.FC<{ x: number; y: number; label: string; value: string; startFrame: number; frame: number }> =
  ({ x, y, label, value, startFrame, frame }) => {
  const op = interpolate(frame, [startFrame, startFrame + 30], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [startFrame, startFrame + 30], [20, 0], { extrapolateRight: "clamp", easing: ease });
  return (
    <g opacity={op} transform={`translate(${x}, ${y + slideY})`}>
      <rect x={0} y={0} width={300} height={90} rx={6}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
      <rect x={0} y={0} width={300} height={4} rx={2} fill={C.gold} />
      <text x={20} y={32} fontSize={13} fontFamily={cinzel} fill={C.gold} letterSpacing={3}>{label}</text>
      <text x={20} y={68} fontSize={30} fontFamily={cinzel} fill={C.ivory} fontWeight="700">{value}</text>
    </g>
  );
};

// Mansa Musa portrait (stylized SVG character)
const MansaMusaPortrait: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const breathe = Math.sin(frame * 0.04) * 2;

  return (
    <g opacity={appear} transform={`translate(60, 90) scale(${appear})`} style={{ transformOrigin: "430px 540px" }}>
      <defs>
        <radialGradient id="portraitBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.amber} stopOpacity={0.15} />
          <stop offset="100%" stopColor={C.black} stopOpacity={0} />
        </radialGradient>
        <filter id="portraitGlow">
          <feGaussianBlur stdDeviation={18} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <ellipse cx={430} cy={440} rx={280} ry={280} fill="url(#portraitBg)" />
      <circle cx={430} cy={430} r={210} fill="none" stroke={C.goldDark} strokeWidth={2} opacity={0.4} />
      <circle cx={430} cy={430} r={225} fill="none" stroke={C.gold} strokeWidth={0.8} opacity={0.3}
        strokeDasharray="12,8" />

      {/* Throne back */}
      <rect x={320} y={350} width={220} height={290} rx={15}
        fill={C.brownDark} stroke={C.gold} strokeWidth={3} />
      <rect x={335} y={360} width={190} height={60} rx={8} fill={C.goldDark} opacity={0.8} />
      {/* Throne decorations */}
      {[350, 395, 440, 485].map((x, i) => (
        <circle key={i} cx={x} cy={385} r={8} fill={C.gold} opacity={0.7} />
      ))}

      {/* Body / Robe */}
      <ellipse cx={430} cy={565 + breathe * 0.3} rx={115} ry={75} fill={C.redDeep} />
      {/* Robe main */}
      <path d="M 320 560 C 320 540 350 520 430 518 C 510 520 540 540 540 560 L 540 640 C 540 655 530 665 430 665 C 330 665 320 655 320 640 Z"
        fill={C.red} />
      {/* Gold robe trim */}
      <path d="M 320 560 C 320 540 350 520 430 518 C 510 520 540 540 540 560"
        fill="none" stroke={C.gold} strokeWidth={4} />
      <path d="M 340 590 L 340 650" stroke={C.gold} strokeWidth={2} opacity={0.5} />
      <path d="M 520 590 L 520 650" stroke={C.gold} strokeWidth={2} opacity={0.5} />
      {/* Robe pattern */}
      {[370, 400, 430, 460, 490].map((x, i) => (
        <rect key={i} x={x - 8} y={590} width={16} height={50} rx={2}
          fill={C.goldDark} opacity={0.4} />
      ))}

      {/* Neck */}
      <rect x={410} y={490} width={40} height={35} rx={8} fill={C.skin} />

      {/* Head */}
      <ellipse cx={430} cy={455 + breathe * 0.2} rx={70} ry={78} fill={C.skin} />
      {/* Face features */}
      {/* Eyes */}
      <ellipse cx={407} cy={448} rx={9} ry={10} fill={C.brownDark} />
      <ellipse cx={453} cy={448} rx={9} ry={10} fill={C.brownDark} />
      <circle cx={410} cy={447} r={4} fill={C.black} />
      <circle cx={456} cy={447} r={4} fill={C.black} />
      <circle cx={411} cy={445} r={1.5} fill="white" opacity={0.8} />
      <circle cx={457} cy={445} r={1.5} fill="white" opacity={0.8} />
      {/* Eyebrows */}
      <path d="M 398 436 Q 407 430 418 436" fill="none" stroke={C.brownDark} strokeWidth={2.5} />
      <path d="M 444 436 Q 453 430 464 436" fill="none" stroke={C.brownDark} strokeWidth={2.5} />
      {/* Nose */}
      <path d="M 428 455 Q 420 470 425 475 Q 430 478 435 475 Q 440 470 432 455"
        fill="none" stroke={C.brownDark} strokeWidth={2} opacity={0.6} />
      {/* Mouth — subtle smile */}
      <path d="M 415 488 Q 430 496 445 488" fill="none" stroke={C.brownDark} strokeWidth={2.5} />
      {/* Beard hint */}
      <path d="M 380 485 Q 395 505 430 510 Q 465 505 480 485" fill="none" stroke={C.brown} strokeWidth={3} opacity={0.5} />

      {/* Crown / Royal headdress */}
      <defs>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.goldDark} />
          <stop offset="50%" stopColor={C.goldPale} />
          <stop offset="100%" stopColor={C.goldDark} />
        </linearGradient>
      </defs>
      {/* Crown base */}
      <rect x={365} y={382} width={130} height={25} rx={5} fill="url(#crownGrad)" />
      {/* Crown spikes */}
      {[
        [374, 382, 385, 335],
        [399, 382, 410, 310],
        [424, 382, 435, 298],
        [449, 382, 460, 310],
        [474, 382, 485, 335],
      ].map(([x1, y1, x2, y2], i) => (
        <polygon key={i} points={`${x1},${y1} ${(x1+x2)/2-8},${y2} ${(x1+x2)/2+8},${y2} ${x1+8},${y1}`}
          fill="url(#crownGrad)" />
      ))}
      {/* Crown jewels */}
      {[385, 410, 435, 460, 485].map((x, i) => (
        <circle key={i} cx={x} cy={394} r={5}
          fill={i === 2 ? C.ivory : i % 2 === 0 ? C.goldPale : C.amber} />
      ))}
      {/* Crown glow */}
      <rect x={365} y={380} width={130} height={30} rx={5} fill="none"
        stroke={C.gold} strokeWidth={1.5} opacity={0.8} filter="url(#portraitGlow)" />

      {/* Gold staff/scepter in right hand */}
      <rect x={530} y={480} width={8} height={160} rx={4} fill={C.gold} />
      <circle cx={534} cy={478} r={14} fill={C.gold} />
      <circle cx={534} cy={478} r={9} fill={C.amber} />
      {/* Right hand */}
      <ellipse cx={534} cy={524} rx={16} ry={12} fill={C.skin} />

      {/* Gold nugget in left hand */}
      <ellipse cx={330} cy={534} rx={16} ry={14} fill={C.skinLight} />
      <ellipse cx={318} cy={526} rx={14} ry={11} fill={C.gold} opacity={0.9} />
      <ellipse cx={318} cy={526} rx={8} ry={6} fill={C.goldPale} opacity={0.7} />

      {/* Name label */}
      <text x={430} y={700} textAnchor="middle" fontSize={26} fontFamily={cinzel}
        fill={C.gold} letterSpacing={6} fontWeight="700">MANSA MUSA</text>
      <text x={430} y={728} textAnchor="middle" fontSize={14} fontFamily={garamond}
        fill={C.ivoryDim} fontStyle="italic">Emperor of Mali · c. 1280–1337</text>
      <line x1={310} y1={740} x2={550} y2={740} stroke={C.gold} strokeWidth={1} opacity={0.4} />
    </g>
  );
};

export const EmpireScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globalOpacity = fadeIn * fadeOut;

  const titleOp = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.black, opacity: globalOpacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <radialGradient id="bgGradEmp" cx="30%" cy="50%" r="60%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.06} />
            <stop offset="100%" stopColor={C.black} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill={C.black} />
        <rect width={1920} height={1080} fill="url(#bgGradEmp)" />

        {/* Left: Mali map gold flood */}
        <MaliGoldFlood frame={frame} />

        {/* Center: Mansa Musa portrait */}
        <MansaMusaPortrait frame={frame} />

        {/* Right: Stats + Mosque */}
        <MosqueIllustration frame={frame} />

        {/* Right panel stats */}
        <StatCard x={1340} y={80}  label="EMPIRE SIZE"   value="~2M km²"      startFrame={40}  frame={frame} />
        <StatCard x={1340} y={190} label="GOLD SHARE"    value="~50% of world" startFrame={80}  frame={frame} />
        <StatCard x={1340} y={300} label="TIMBUKTU POP." value="100,000+"      startFrame={120} frame={frame} />
        <StatCard x={1340} y={410} label="ACCESSION"     value="c. 1312 AD"    startFrame={160} frame={frame} />

        {/* Title overlay */}
        <g opacity={titleOp}>
          <text x={860} y={60} textAnchor="middle" fontSize={15} fontFamily={cinzel}
            fill={C.gold} letterSpacing={5}>THE EMPIRE</text>
        </g>

        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.5} />
      </svg>
    </AbsoluteFill>
  );
};
