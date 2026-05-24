import "./index.css";
import { Composition } from "remotion";
import { AshantEpisode, TOTAL_FRAMES } from "./AshantEpisode";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AshantEpisode"
    component={AshantEpisode}
    durationInFrames={TOTAL_FRAMES}
    fps={30}
    width={1920}
    height={1080}
  />
);
