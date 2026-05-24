import "./index.css";
import { Composition } from "remotion";
import { MansaMusaVideo, TOTAL_FRAMES } from "./MansaMusaVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MansaMusa"
        component={MansaMusaVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
