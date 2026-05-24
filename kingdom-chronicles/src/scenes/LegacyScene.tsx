import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, StatCard, useFade, ease } from "../components/shared";
import { C } from "../palette";
import { CINZEL, GARAMOND } from "../fonts";

// Adinkra symbols — drawing themselves
const AdinkraSymbol: React.FC<{
  cx: number; cy: number; size: number; name: string; meaning: string;
  frame: number; startFrame: number; symbol: "gye-nyame" | "sankofa" | "dwennimmen" | "funtunfunefu";
}> = ({ cx, cy, size, name, meaning, frame, startFrame, symbol }) => {
  const progress = interpolate(frame, [startFrame, startFrame + 80], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const labelOp = interpolate(frame, [startFrame + 60, startFrame + 100], [0, 1], { extrapolateRight: "clamp" });

  const strokeLength = 600;
  const drawn = progress * strokeLength;

  const renderSymbol = () => {
    switch (symbol) {
      case "gye-nyame":
        // "Except God" — ornate cross-like symbol
        return (
          <g>
            <ellipse cx={0} cy={0} rx={size * 0.8} ry={size * 0.8}
              fill="none" stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={strokeLength - drawn} />
            <line x1={0} y1={-size} x2={0} y2={size} stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.2)} />
            <line x1={-size} y1={0} x2={size} y2={0} stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.4)} />
            <ellipse cx={0} cy={0} rx={size * 0.3} ry={size * 0.3}
              fill="none" stroke={C.goldLight} strokeWidth={2}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.6)} />
            {[-1, 1].map((sx, i) => (
              <path key={i}
                d={`M ${sx * size * 0.5} -${size * 0.3} Q ${sx * size * 0.9} 0 ${sx * size * 0.5} ${size * 0.3}`}
                fill="none" stroke={C.goldPale} strokeWidth={2}
                strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.8)} />
            ))}
          </g>
        );
      case "sankofa":
        // "Return and get it" — bird looking backward
        return (
          <g>
            {/* Body */}
            <ellipse cx={0} cy={size * 0.1} rx={size * 0.6} ry={size * 0.45}
              fill="none" stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={strokeLength - drawn} />
            {/* Head turned back */}
            <circle cx={-size * 0.4} cy={-size * 0.5} r={size * 0.25}
              fill="none" stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.3)} />
            {/* Neck curve */}
            <path d={`M -${size * 0.2} -${size * 0.1} Q -${size * 0.5} -${size * 0.2} -${size * 0.4} -${size * 0.25}`}
              fill="none" stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.5)} />
            {/* Tail feathers */}
            <path d={`M ${size * 0.5} 0 Q ${size * 0.85} -${size * 0.3} ${size * 0.9} ${size * 0.1}`}
              fill="none" stroke={C.goldLight} strokeWidth={2}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.7)} />
            {/* Egg (wisdom) */}
            <ellipse cx={0} cy={-size * 0.3} rx={size * 0.18} ry={size * 0.22}
              fill="none" stroke={C.goldPale} strokeWidth={2}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 2)} />
          </g>
        );
      case "dwennimmen":
        // "Ram's horns" — strength with humility
        return (
          <g>
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
              <path key={i}
                d={`M 0 0 Q ${sx * size * 0.6} ${sy * size * 0.2} ${sx * size * 0.6} ${sy * size * 0.7} Q ${sx * size * 0.3} ${sy * size * 1.0} 0 ${sy * size * 0.7}`}
                fill="none" stroke={C.gold} strokeWidth={3}
                strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * (1 + i * 0.3))} />
            ))}
            <circle cx={0} cy={0} r={size * 0.15} fill={C.gold} opacity={progress} />
          </g>
        );
      case "funtunfunefu":
        // "Siamese crocodiles" — democracy, unity
        return (
          <g>
            <ellipse cx={0} cy={0} rx={size * 0.9} ry={size * 0.45}
              fill="none" stroke={C.gold} strokeWidth={3}
              strokeDasharray={strokeLength} strokeDashoffset={strokeLength - drawn} />
            <ellipse cx={0} cy={0} rx={size * 0.55} ry={size * 0.28}
              fill="none" stroke={C.goldLight} strokeWidth={2}
              strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * 1.3)} />
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = angle * Math.PI / 180;
              return (
                <line key={i}
                  x1={Math.cos(rad) * size * 0.55} y1={Math.sin(rad) * size * 0.28}
                  x2={Math.cos(rad) * size * 0.9} y2={Math.sin(rad) * size * 0.45}
                  stroke={C.goldPale} strokeWidth={2}
                  strokeDasharray={strokeLength} strokeDashoffset={Math.max(0, strokeLength - drawn * (1.5 + i * 0.1))} />
              );
            })}
            <circle cx={0} cy={0} r={size * 0.12} fill={C.gold} opacity={progress} />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {/* Background circle */}
      <circle cx={0} cy={0} r={size * 1.1} fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} opacity={0.8} />
      {renderSymbol()}
      {/* Labels */}
      <g opacity={labelOp}>
        <text x={0} y={size * 1.35} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
          fill={C.gold} letterSpacing={2}>{name}</text>
        <text x={0} y={size * 1.6} textAnchor="middle" fontSize={11} fontFamily={GARAMOND}
          fill={C.ivoryDim} fontStyle="italic">"{meaning}"</text>
      </g>
    </g>
  );
};

// Kente cloth pattern
const KentePattern: React.FC<{ frame: number }> = ({ frame }) => {
  const reveal = interpolate(frame, [30, 160], [0, 1], { extrapolateRight: "clamp", easing: ease });

  const colors = [C.gold, C.red, C.forest, C.goldPale, C.amber, C.goldDark];
  const stripeW = 24;
  const totalStripes = 22;

  return (
    <g transform="translate(60, 130)" opacity={reveal}>
      <rect x={0} y={0} width={totalStripes * stripeW + 20} height={420} rx={4}
        fill={C.blackSoft} stroke={C.goldDark} strokeWidth={1} />
      <clipPath id="kenteClip">
        <rect x={0} y={0} width={totalStripes * stripeW + 20} height={420} rx={4} />
      </clipPath>
      <g clipPath="url(#kenteClip)">
        {/* Vertical stripes */}
        {Array.from({ length: totalStripes }, (_, i) => (
          <rect key={i} x={i * stripeW + 10} y={0} width={stripeW} height={420}
            fill={colors[i % colors.length]} opacity={0.3} />
        ))}
        {/* Horizontal weave bands */}
        {Array.from({ length: 10 }, (_, row) => (
          Array.from({ length: totalStripes }, (_, col) => {
            const isActive = (row + col) % 3 !== 0;
            return isActive ? (
              <rect key={`${row}-${col}`}
                x={col * stripeW + 10} y={row * 42}
                width={stripeW} height={stripeW}
                fill={colors[(row * 3 + col) % colors.length]}
                opacity={0.6} />
            ) : null;
          })
        ))}
      </g>
      <text x={(totalStripes * stripeW + 20) / 2} y={450} textAnchor="middle"
        fontSize={13} fontFamily={CINZEL} fill={C.gold} letterSpacing={3}>
        KENTE CLOTH
      </text>
      <text x={(totalStripes * stripeW + 20) / 2} y={472} textAnchor="middle"
        fontSize={11} fontFamily={GARAMOND} fill={C.ivoryDim} fontStyle="italic">
        Woven into Ghanaian identity
      </text>
    </g>
  );
};

// Modern Ghana connection
const GhanaConnection: React.FC<{ frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [340, 420], [0, 1], { extrapolateRight: "clamp", easing: ease });

  return (
    <g opacity={appear} transform="translate(60, 620)">
      <rect x={0} y={0} width={600} height={320} rx={8}
        fill={C.blackSoft} stroke={C.gold} strokeWidth={1} />
      <rect x={0} y={0} width={4} height={320} rx={2} fill={C.gold} />

      <text x={30} y={36} fontSize={14} fontFamily={CINZEL} fill={C.gold} letterSpacing={3}>
        ASHANTI LEGACY IN GHANA TODAY
      </text>
      <line x1={20} y1={48} x2={580} y2={48} stroke={C.goldDark} strokeWidth={0.5} opacity={0.5} />

      {[
        { label: "Language", value: "Twi — spoken by 8+ million" },
        { label: "Culture", value: "Kente cloth · Adinkra symbols" },
        { label: "Royalty", value: "Asantehene still reigns in Kumasi" },
        { label: "Stool", value: "Golden Stool preserved, never sat upon" },
        { label: "Identity", value: "Ashanti — largest ethnic group in Ghana" },
      ].map(({ label, value }, i) => {
        const lineOp = interpolate(frame, [400 + i * 20, 430 + i * 20], [0, 1], { extrapolateRight: "clamp" });
        return (
          <g key={i} opacity={lineOp} transform={`translate(20, ${70 + i * 50})`}>
            <circle cx={6} cy={-4} r={5} fill={C.gold} />
            <text x={22} y={0} fontSize={13} fontFamily={CINZEL}
              fill={C.goldLight} letterSpacing={1}>{label}</text>
            <text x={22} y={18} fontSize={14} fontFamily={GARAMOND}
              fill={C.ivory}>{value}</text>
          </g>
        );
      })}
    </g>
  );
};

export const LegacyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  const titleOp = interpolate(frame, [15, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#080C08", opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />
        <defs>
          <radialGradient id="legacyBg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={C.forest} stopOpacity={0.1} />
            <stop offset="100%" stopColor="#080C08" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill="#080C08" />
        <rect width={1920} height={1080} fill="url(#legacyBg)" />

        {/* Title */}
        <g opacity={titleOp}>
          <text x={960} y={55} textAnchor="middle" fontSize={12} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6}>THE LIVING LEGACY · ASHANTI TODAY</text>
        </g>

        {/* Kente cloth panel */}
        <KentePattern frame={frame} />

        {/* Ghana modern connection */}
        <GhanaConnection frame={frame} />

        {/* Adinkra symbols — drawing themselves */}
        <AdinkraSymbol cx={870} cy={240} size={75} name="GYE NYAME" meaning="Except God"
          frame={frame} startFrame={60} symbol="gye-nyame" />
        <AdinkraSymbol cx={1120} cy={240} size={75} name="SANKOFA" meaning="Return and get it"
          frame={frame} startFrame={140} symbol="sankofa" />
        <AdinkraSymbol cx={1370} cy={240} size={75} name="DWENNIMMEN" meaning="Strength with humility"
          frame={frame} startFrame={220} symbol="dwennimmen" />
        <AdinkraSymbol cx={1620} cy={240} size={75} name="FUNTUNFUNEFU" meaning="Unity in diversity"
          frame={frame} startFrame={300} symbol="funtunfunefu" />

        {/* Section label */}
        {interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <text x={1245} y={90} textAnchor="middle" fontSize={13} fontFamily={CINZEL}
            fill={C.goldDark} letterSpacing={4}
            opacity={interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" })}>
            ADINKRA SYMBOLS · ASHANTI VISUAL PHILOSOPHY
          </text>
        )}

        {/* Stats */}
        <StatCard x={820} y={420} label="TWI SPEAKERS" value="8 million+" w={280} startFrame={160} />
        <StatCard x={1120} y={420} label="ASANTEHENE" value="Still reigns" w={260} startFrame={200} />
        <StatCard x={1400} y={420} label="INDEPENDENCE" value="Ghana · 1957" w={260} startFrame={240} />

        {/* Closing reflection */}
        {interpolate(frame, [420, 500], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <g opacity={interpolate(frame, [420, 500], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={820} y={570} width={1060} height={120} rx={6}
              fill={C.blackSoft} stroke={C.forest} strokeWidth={1} />
            <rect x={820} y={570} width={4} height={120} rx={2} fill={C.forest} />
            <text x={1350} y={615} textAnchor="middle" fontSize={18} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">
              The Ashanti were not just a conquered people.
            </text>
            <text x={1350} y={643} textAnchor="middle" fontSize={18} fontFamily={GARAMOND}
              fill={C.ivory} fontStyle="italic">
              They were — and remain — a civilization.
            </text>
            <text x={1350} y={672} textAnchor="middle" fontSize={14} fontFamily={CINZEL}
              fill={C.gold} letterSpacing={3}>
              WOVEN INTO THE FABRIC OF WEST AFRICA
            </text>
          </g>
        )}

        {/* Bottom ghana flag colors hint */}
        <rect x={820} y={730} width={355} height={12} rx={2} fill="#006B3F" opacity={0.7} />
        <rect x={1175} y={730} width={355} height={12} rx={2} fill={C.goldLight} opacity={0.7} />
        <rect x={1530} y={730} width={350} height={12} rx={2} fill={C.redBright} opacity={0.7} />
        {interpolate(frame, [500, 560], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <text x={1350} y={760} textAnchor="middle" fontSize={11} fontFamily={CINZEL}
            fill={C.ivoryDim} letterSpacing={3}
            opacity={interpolate(frame, [500, 560], [0, 1], { extrapolateRight: "clamp" })}>
            THE COLOURS OF GHANA · INDEPENDENCE 1957
          </text>
        )}

        <rect width={1920} height={1080} fill="url(#vignette)" />
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
