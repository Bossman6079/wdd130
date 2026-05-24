import { Audio, Sequence, staticFile, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { WorldMapScene } from "./scenes/WorldMapScene";
import { EmpireScene } from "./scenes/EmpireScene";
import { PilgrimageScene } from "./scenes/PilgrimageScene";
import { CairoScene } from "./scenes/CairoScene";
import { ReturnScene } from "./scenes/ReturnScene";
import { LegacyScene } from "./scenes/LegacyScene";
import { WealthScene } from "./scenes/WealthScene";
import { OutroScene } from "./scenes/OutroScene";

// Scene durations in frames (30fps)
// Based on VO durations + 2s breathing room
export const SCENE_DURATIONS = [
  390,  // 0 Hook       10.26s VO
  690,  // 1 World      20.43s VO
  1080, // 2 Empire     32.76s VO
  1110, // 3 Pilgrimage 34.12s VO
  1140, // 4 Cairo      34.97s VO
  810,  // 5 Return     23.55s VO
  1260, // 6 Legacy     38.85s VO
  840,  // 7 Wealth     25.18s VO
  1110, // 8 Outro      34.08s VO
] as const;

export const TOTAL_FRAMES = SCENE_DURATIONS.reduce((a, b) => a + b, 0); // 8430

function starts(): number[] {
  const s: number[] = [];
  let acc = 0;
  for (const d of SCENE_DURATIONS) { s.push(acc); acc += d; }
  return s;
}
export const SCENE_STARTS = starts();

const VO = ({ n }: { n: number }) => (
  <Audio src={staticFile(`vo/scene-${n}.wav`)} volume={1.0} />
);

// Cross-dissolve overlay between scenes
const CrossDissolve: React.FC<{ duration?: number }> = ({ duration = 20 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, duration], [1, 0], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: "#0A0A0A", opacity, zIndex: 100, pointerEvents: "none" }} />;
};

export const MansaMusaVideo: React.FC = () => {
  return (
    <>
      {SCENE_STARTS.map((start, i) => (
        <Sequence key={i} from={start} durationInFrames={SCENE_DURATIONS[i]}>
          <VO n={i} />
          <CrossDissolve />
          {i === 0 && <HookScene />}
          {i === 1 && <WorldMapScene />}
          {i === 2 && <EmpireScene />}
          {i === 3 && <PilgrimageScene />}
          {i === 4 && <CairoScene />}
          {i === 5 && <ReturnScene />}
          {i === 6 && <LegacyScene />}
          {i === 7 && <WealthScene />}
          {i === 8 && <OutroScene />}
        </Sequence>
      ))}
    </>
  );
};
