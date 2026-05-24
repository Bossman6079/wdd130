import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, OutcomeCard, StatCard, useFade, ease } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Colonial map overlay — West Africa divided
const ColonialMap: React.FC<{ frame: number }> = ({ frame }) => {
  const mapReveal = interpolate(frame, [20, 100], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const britishIn = interpolate(frame, [120, 220], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const ashantiFade = interpolate(frame, [200, 320], [1, 0.25], { extrapolateRight: "clamp" });

  // Simplified West Africa outline
  const westAfrica = "M 80 80 Q 160 60 280 70 Q 380 55 460 80 Q 520 90 540 140 Q 560 200 520 260 Q 480 320 440 360 Q 380 400 300 420 Q 220 440 160 410 Q 100 380 70 320 Q 40 260 50 180 Q 55 120 80 80 Z";

  return (
    <g transform="translate(60, 80)" opacity={mapReveal}>
      {/* Map background */}
      <rect x={0} y={0} width={620} height={520} rx={8} fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />

      {/* West Africa landmass */}
      <path d={westAfrica} fill={C.forest} opacity={ashantiFade} />
      {/* Ashanti core region */}
      <ellipse cx={285} cy={240} rx={90} ry={70} fill={C.gold} opacity={ashantiFade * 0.6} />

      {/* British colonial overlay */}
      <path d={westAfrica} fill={C.british} opacity={britishIn * 0.35} />

      {/* British flag marker */}
      {britishIn > 0.3 && (
        <g opacity={britishIn}>
          <line x1={285} y1={160} x2={285} y2={200} stroke={C.ivory} strokeWidth={2} />
          <rect x={285} y={160} width={36} height={22} fill={C.british} />
          {/* Union Jack simplified */}
          <line x1={285} y1={160} x2={321} y2={182} stroke={C.ivory} strokeWidth={2} />
          <line x1={321} y1={160} x2={285} y2={182} stroke={C.ivory} strokeWidth={2} />
          <line x1={303} y1={160} x2={303} y2={182} stroke={C.ivory} strokeWidth={2} />
          <line x1={285} y1={171} x2={321} y2={171} stroke={C.ivory} strokeWidth={2} />
        </g>
      )}

      {/* Kumasi marker */}
      <circle cx={285} cy={240} r={8} fill={C.gold} opacity={0.9} />
      <text x={285} y={270} textAnchor="middle" fontSize={11} fontFamily={CINZEL}
        fill={C.gold} letterSpacing={2}>KUMASI</text>

      {/* Label */}
      <text x={310} y={490} textAnchor="middle" fontSize={11} fontFamily={CINZEL}
        fill={C.goldDark} letterSpacing={3}>GOLD COAST COLONY · 1902</text>

      {/* Year label */}
      {britishIn > 0.5 && (
        <g opacity={britishIn - 0.5}>
          <rect x={160} y={30} width={300} height={40} rx={4} fill={C.blackSoft} opacity={0.9} />
          <text x={310} y={56} textAnchor="middle" fontSize={18} fontFamily={CINZEL}
            fill={C.red} fontWeight="700">ANNEXED · 1902</text>
        </g>
      )}
    </g>
  );
};

// Exile sequence — Yaa Asantewaa
const ExilePanel: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [240, 310], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear} transform="translate(760, 80)">
      <rect x={0} y={0} width={540} height={360} rx={8}
        fill={C.blackSoft} stroke={C.ash} strokeWidth={1} opacity={0.95} />
      <rect x={0} y={0} width={540} height={4} rx={2} fill={C.ash} />

      <text x={270} y={40} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
        fill={C.ash} letterSpacing={3}>THE EXILES</text>
      <line x1={20} y1={52} x2={520} y2={52} stroke={C.ash} strokeWidth={0.5} opacity={0.4} />

      {/* Exile ship silhouette */}
      <g transform="translate(270, 160)">
        {/* Hull */}
        <path d="M -120 0 Q 0 20 120 0 L 100 40 Q 0 60 -100 40 Z" fill={C.british} opacity={0.6} />
        {/* Mast */}
        <line x1={0} y1={0} x2={0} y2={-80} stroke={C.ash} strokeWidth={3} />
        {/* Sail */}
        <path d="M 0 -80 L 0 -20 L 50 -50 Z" fill={C.ivoryDim} opacity={0.5} />
        {/* Waves */}
        <path d="M -150 45 Q -100 35 -50 45 Q 0 55 50 45 Q 100 35 150 45"
          fill="none" stroke={C.british} strokeWidth={2} opacity={0.4} />
      </g>

      {[
        { name: "Yaa Asantewaa", fate: "Exiled to Seychelles — died 1921" },
        { name: "Asantehene Agyeman Prempeh I", fate: "Exiled to Seychelles — returned 1924" },
        { name: "200+ Chiefs and Leaders", fate: "Exiled across the British Empire" },
      ].map(({ name, fate }, i) => {
        const lineOp = interpolate(frame, [310 + i * 30, 340 + i * 30], [0, 1], { extrapolateRight: "clamp" });
        return (
          <g key={i} opacity={lineOp} transform={`translate(20, ${255 + i * 38})`}>
            <circle cx={8} cy={-4} r={5} fill={C.ash} />
            <text x={24} y={0} fontSize={14} fontFamily={CINZEL} fill={C.ivoryDim}>{name}</text>
            <text x={24} y={18} fontSize={12} fontFamily={GARAMOND} fill={C.ash} fontStyle="italic">{fate}</text>
          </g>
        );
      })}
    </g>
  );
};

// "Never Surrendered" — the Golden Stool outcome card
const StoolFinalCard: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [380, 450], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const pulse = 0.8 + Math.sin(frame * 0.06) * 0.2;

  return (
    <g opacity={appear} transform="translate(1360, 80)">
      <rect x={0} y={0} width={500} height={360} rx={8}
        fill={C.blackSoft} stroke={C.gold} strokeWidth={2} />
      <rect x={0} y={0} width={500} height={5} rx={3} fill={C.gold} />

      {/* Stool icon */}
      <g transform="translate(250, 130)" opacity={pulse}>
        <ellipse cx={0} cy={-50} rx={80} ry={14} fill={C.gold} opacity={0.9} />
        <rect x={-10} y={-36} width={20} height={70} rx={4} fill={C.gold} opacity={0.9} />
        <ellipse cx={0} cy={36} rx={90} ry={10} fill={C.gold} opacity={0.9} />
        {[-60, -20, 20, 60].map((ox, i) => (
          <g key={i} opacity={0.8}>
            <line x1={ox} y1={36} x2={ox - 5} y2={65} stroke={C.gold} strokeWidth={6} strokeLinecap="round" />
          </g>
        ))}
        <ellipse cx={0} cy={68} rx={95} ry={8} fill={C.gold} opacity={0.7} />
      </g>

      <text x={250} y={220} textAnchor="middle" fontSize={28} fontFamily={CINZEL}
        fill={C.goldPale} fontWeight="700" letterSpacing={2}>GOLDEN STOOL</text>
      <text x={250} y={258} textAnchor="middle" fontSize={22} fontFamily={CINZEL}
        fill={C.gold} letterSpacing={4}>NEVER SURRENDERED</text>
      <line x1={30} y1={272} x2={470} y2={272} stroke={C.goldDark} strokeWidth={1} opacity={0.4} />
      <text x={250} y={300} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">"Britain took our land.</text>
      <text x={250} y={322} textAnchor="middle" fontSize={14} fontFamily={GARAMOND}
        fill={C.ivory} fontStyle="italic">They never took our soul."</text>
      <text x={250} y={348} textAnchor="middle" fontSize={11} fontFamily={CINZEL}
        fill={C.goldDark} letterSpacing={3}>THE ASHANTI PEOPLE</text>
    </g>
  );
};

export const AftermathScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#080808", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <rect width={1920} height={1080} fill="#080808" />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={960} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>AFTERMATH · ANNEXATION 1902</text>
        </g>

        {/* Colonial map */}
        <ColonialMap frame={frame} />

        {/* Exile panel */}
        <ExilePanel frame={frame} />

        {/* Golden Stool final card */}
        <StoolFinalCard frame={frame} />

        {/* Bottom outcome cards */}
        <OutcomeCard result="WITHDRAWAL" label="Four Anglo-Ashanti Wars — Britain prevails"
          year={1902} x={60} y={660} startFrame={160} />

        {/* Key stats */}
        <StatCard x={60} y={820} label="YEARS OF RESISTANCE" value="1823 – 1900" w={340} startFrame={220} />
        <StatCard x={430} y={820} label="WARS FOUGHT" value="4 Anglo-Ashanti Wars" w={340} startFrame={260} />
        <StatCard x={800} y={820} label="STOOL SURRENDERED" value="Never" w={280} startFrame={300} />

        {/* The defiant truth */}
        {interpolate(frame, [480, 540], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [480, 540], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={60} y={940} width={1200} height={80} rx={6}
              fill={C.blackSoft} stroke={C.gold} strokeWidth={1} />
            <text x={660} y={975} textAnchor="middle" fontSize={20} fontFamily={CINZEL}
              fill={C.goldPale} fontWeight="700" letterSpacing={3}>
              COLONISED IN TERRITORY. NEVER IN SPIRIT.
            </text>
            <text x={660} y={1005} textAnchor="middle" fontSize={15} fontFamily={GARAMOND}
              fill={C.ivoryDim} fontStyle="italic">
              The Golden Stool remains in Kumasi to this day — never sat upon by a conqueror.
            </text>
          </g>
        )}

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
