import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SharedDefs, QuoteSlate, useFade } from "../components/shared";
import { C } from "../palette";
import { CINZEL } from "../fonts";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useFade();

  // Particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 137.5) % 1920,
    y: (i * 97.3) % 1080,
    r: 1 + (i % 3),
    phase: i * 0.8,
  }));

  return (
    <AbsoluteFill style={{ background: C.forest, opacity }}>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        <SharedDefs />

        {/* Deep background gradient */}
        <defs>
          <radialGradient id="hookBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={C.forestLight} stopOpacity={0.4} />
            <stop offset="100%" stopColor={C.forestDark} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={1920} height={1080} fill={C.forestDark} />
        <rect width={1920} height={1080} fill="url(#hookBg)" />

        {/* Gold particles */}
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={C.gold}
            opacity={0.08 + 0.07 * Math.sin(frame * 0.05 + p.phase)} />
        ))}

        {/* Kingdom Chronicles series label */}
        <g opacity={interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" })}>
          <text x={960} y={240} textAnchor="middle" fontSize={14} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={8} opacity={0.7}>KINGDOM CHRONICLES  ·  EPISODE 02</text>
          <line x1={600} y1={255} x2={1320} y2={255} stroke={C.gold} strokeWidth={1} opacity={0.3} />
        </g>

        {/* Main quote */}
        <QuoteSlate
          quote="The British tried to conquer them four times. They failed four times. This is the story of a kingdom that refused to kneel."
          accent={["failed", "four", "times."]}
          bgColor="transparent"
          accentColor={C.gold}
          framesPerWord={6}
          startFrame={20}
        />

        {/* Bottom flourish */}
        <g opacity={interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" })}>
          <text x={960} y={840} textAnchor="middle" fontSize={18} fontFamily={CINZEL}
            fill={C.gold} letterSpacing={6} opacity={0.6}>THE ASHANTI EMPIRE</text>
          <line x1={780} y1={858} x2={1140} y2={858} stroke={C.gold} strokeWidth={1} opacity={0.3} />
        </g>

        {/* Vignette */}
        <rect width={1920} height={1080} fill="url(#vignette)" />
        {/* Gold bottom bar */}
        <rect x={0} y={1068} width={1920} height={12} fill={C.gold} opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
