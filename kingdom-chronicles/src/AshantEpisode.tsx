import { Audio, Sequence, staticFile, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { HookScene }      from "./scenes/HookScene";
import { FoundingScene }  from "./scenes/FoundingScene";
import { GoldenStoolScene } from "./scenes/GoldenStoolScene";
import { MilitaryScene }  from "./scenes/MilitaryScene";
import { War1Scene }      from "./scenes/War1Scene";
import { Wars23Scene }    from "./scenes/Wars23Scene";
import { KumasiScene }    from "./scenes/KumasiScene";
import { YaaScene }       from "./scenes/YaaScene";
import { AftermathScene } from "./scenes/AftermathScene";
import { LegacyScene }    from "./scenes/LegacyScene";
import { ClosingScene }   from "./scenes/ClosingScene";

// Scene durations in frames (30fps): VO duration + ~2-3s breathing room
export const SCENE_DURATIONS = [
  270,  // 0  Hook          6.11s VO → 9s
  810,  // 1  Founding     22.83s VO → 27s
  990,  // 2  Golden Stool 29.32s VO → 33s
  990,  // 3  Military     30.46s VO → 33s
  990,  // 4  War 1        30.24s VO → 33s
  720,  // 5  Wars 2&3     19.67s VO → 24s
  900,  // 6  Kumasi       27.10s VO → 30s
  990,  // 7  Yaa          28.94s VO → 33s
  900,  // 8  Aftermath    25.84s VO → 30s
  990,  // 9  Legacy       30.49s VO → 33s
  450,  // 10 Closing      12.50s VO → 15s
] as const;

export const TOTAL_FRAMES = SCENE_DURATIONS.reduce((a, b) => a + b, 0); // 9000 = 5m

function buildStarts(): number[] {
  const s: number[] = [];
  let acc = 0;
  for (const d of SCENE_DURATIONS) { s.push(acc); acc += d; }
  return s;
}
export const SCENE_STARTS = buildStarts();

const VO = ({ n }: { n: number }) => (
  <Audio src={staticFile(`vo/scene-${n}.wav`)} volume={1.0} />
);

const Dissolve = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 18], [1, 0], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: "#0A0A0A", opacity: op, zIndex: 200, pointerEvents: "none" }} />;
};

const SCENES = [
  HookScene, FoundingScene, GoldenStoolScene, MilitaryScene, War1Scene,
  Wars23Scene, KumasiScene, YaaScene, AftermathScene, LegacyScene, ClosingScene,
];

export const AshantEpisode: React.FC = () => (
  <>
    {SCENE_STARTS.map((start, i) => {
      const SceneComp = SCENES[i];
      return (
        <Sequence key={i} from={start} durationInFrames={SCENE_DURATIONS[i]}>
          <VO n={i} />
          <Dissolve />
          <SceneComp />
        </Sequence>
      );
    })}
  </>
);
