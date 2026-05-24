import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, useFade, ease, shimmer } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// The final quote — word by word, slow and deliberate
const FinalQuote: React.FC<{ frame: number }> = ({ frame }) => {
  const line1 = ["Some", "things"];
  const line2 = ["cannot", "be"];
  const line3 = ["colonised."];

  return (
    <g transform="translate(960, 440)">
      {/* Line 1 */}
      <g>
        {line1.map((word, i) => {
          const op = interpolate(frame, [30 + i * 25, 60 + i * 25], [0, 1], { extrapolateRight: "clamp" });
          return (
            <text key={i} x={(i - 0.5) * 220} y={-60}
              textAnchor="middle" fontSize={72} fontFamily={CINZEL}
              fill={C.ivory} fontWeight="700" opacity={op}>{word}</text>
          );
        })}
      </g>
      {/* Line 2 */}
      <g>
        {line2.map((word, i) => {
          const op = interpolate(frame, [90 + i * 25, 120 + i * 25], [0, 1], { extrapolateRight: "clamp" });
          return (
            <text key={i} x={(i - 0.5) * 220} y={20}
              textAnchor="middle" fontSize={72} fontFamily={CINZEL}
              fill={C.ivory} fontWeight="700" opacity={op}>{word}</text>
          );
        })}
      </g>
      {/* Line 3 — the final word */}
      <g>
        {line3.map((word, i) => {
          const op = interpolate(frame, [160, 210], [0, 1], { extrapolateRight: "clamp", easing: ease });
          const scale = interpolate(frame, [160, 220], [0.85, 1], { extrapolateRight: "clamp", easing: ease });
          return (
            <g key={i} transform={`scale(${scale})`}>
              <text x={0} y={110}
                textAnchor="middle" fontSize={80} fontFamily={CINZEL}
                fill={C.gold} fontWeight="700" opacity={op}>{word}</text>
            </g>
          );
        })}
      </g>
    </g>
  );
};

// Particle field — gold motes floating
const GoldParticles: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <g opacity={appear}>
      {Array.from({ length: 60 }, (_, i) => {
        const seed = i * 137.5;
        const x = ((seed * 73) % 1920);
        const y = ((seed * 37) % 1080);
        const drift = Math.sin(frame * 0.025 + i * 0.4) * 12;
        const size = 1.5 + (i % 4) * 0.8;
        const op = (0.3 + Math.sin(frame * 0.04 + i * 0.7) * 0.2) * appear;
        return (
          <circle key={i} cx={x} cy={y + drift} r={size}
            fill={C.goldPale} opacity={op} />
        );
      })}
    </g>
  );
};

// Series branding block
const ChannelBrand: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [240, 310], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const glow = shimmer(frame, 0.05);

  return (
    <g opacity={appear} transform="translate(960, 800)">
      {/* Horizontal rule */}
      <line x1={-500} y1={-40} x2={500} y2={-40} stroke={C.gold} strokeWidth={1} opacity={0.4} />

      {/* Logo mark — stylised crown / stool motif */}
      <g transform="translate(-400, 0)">
        <rect x={-22} y={-8} width={44} height={8} rx={2} fill={C.gold} opacity={0.9} />
        <rect x={-4} y={0} width={8} height={20} rx={2} fill={C.gold} opacity={0.9} />
        <rect x={-24} y={20} width={48} height={6} rx={2} fill={C.gold} opacity={0.9} />
        {[-16, -4, 8, 20].map((ox, i) => (
          <line key={i} x1={ox} y1={26} x2={ox - 2} y2={42} stroke={C.gold} strokeWidth={5} strokeLinecap="round" opacity={0.8} />
        ))}
        <ellipse cx={2} cy={44} rx={28} ry={6} fill={C.gold} opacity={0.6} />
        <ellipse cx={2} cy={44} rx={28} ry={6} fill={C.gold} opacity={glow * 0.3}
          filter="url(#softGlow)" />
      </g>

      {/* Channel name */}
      <text x={0} y={-10} textAnchor="middle" fontSize={28} fontFamily={CINZEL}
        fill={C.gold} fontWeight="700" letterSpacing={8}>KINGDOM CHRONICLES</text>
      <text x={0} y={20} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic">Untold stories of Africa's greatest empires</text>

      {/* Episode tag */}
      <rect x={-120} y={38} width={240} height={32} rx={4} fill={C.forest} stroke={C.gold} strokeWidth={1} />
      <text x={0} y={59} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
        fill={C.gold} letterSpacing={3}>EPISODE 02 · THE ASHANTI</text>

      <line x1={-500} y1={90} x2={500} y2={90} stroke={C.gold} strokeWidth={1} opacity={0.4} />

      {/* Subscribe prompt */}
      <text x={0} y={115} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic"
        opacity={interpolate(frame, [300, 360], [0, 1], { extrapolateRight: "clamp" })}>
        Subscribe · Like · Share · History deserves to be remembered
      </text>
    </g>
  );
};

// Next episode teaser
const NextEpisode: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [320, 390], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear} transform="translate(1480, 640)">
      <rect x={0} y={0} width={380} height={180} rx={6}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
      <rect x={0} y={0} width={380} height={3} rx={2} fill={C.goldDark} />
      <text x={190} y={32} textAnchor="middle" fontSize={11} fontFamily={CINZEL}
        fill={C.goldDark} letterSpacing={3}>NEXT ON KINGDOM CHRONICLES</text>
      <text x={190} y={75} textAnchor="middle" fontSize={22} fontFamily={CINZEL}
        fill={C.gold}>Episode 03</text>
      <text x={190} y={105} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">The Zulu Empire</text>
      <text x={190} y={130} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic">"The warriors who defeated</text>
      <text x={190} y={150} textAnchor="middle" fontSize={13} fontFamily={GARAMOND}
        fill={C.ivoryDim} fontStyle="italic">the British at Isandlwana"</text>
    </g>
  );
};

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  return (
    <AbsoluteFill style={{ background: "#060606", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <defs>
          <radialGradient id="closingBg" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={C.forest} stopOpacity={0.08} />
            <stop offset="100%" stopColor="#060606" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#060606" />
        <rect width={1920} height={1080} fill="url(#closingBg)" />

        {/* Gold particles drifting */}
        <GoldParticles frame={frame} />

        {/* The final quote */}
        <FinalQuote frame={frame} />

        {/* Attribution */}
        {interpolate(frame, [220, 260], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [220, 260], [0, 1], { extrapolateRight: "clamp" })}>
            <text x={960} y={600} textAnchor="middle" fontSize={16} fontFamily={GARAMOND}
              fill={C.ivoryDim} fontStyle="italic">— The Ashanti of West Africa · 1701 – present</text>
          </g>
        )}

        {/* Channel branding */}
        <ChannelBrand frame={frame} />

        {/* Next episode teaser */}
        <NextEpisode frame={frame} />

        {/* Top bar */}
        <rect x={0} y={0} width={1920} height={8} fill={C.gold} opacity={0.4} />

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.8} />
      </svg>
    </AbsoluteFill>
  );
};
