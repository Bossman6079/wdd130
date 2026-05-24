import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { EPLVideo, TOTAL_FRAMES } from "./EPLVideo";

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
