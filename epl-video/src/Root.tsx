import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { EPLVideo, TITLE_DUR, ERA_DUR, CHAMPS_DUR, OUTRO_DUR } from "./EPLVideo";

const TOTAL_FRAMES = TITLE_DUR + ERA_DUR * 6 + CHAMPS_DUR + OUTRO_DUR; // 2220 frames = 74s

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EPLHistory"
        component={EPLVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
