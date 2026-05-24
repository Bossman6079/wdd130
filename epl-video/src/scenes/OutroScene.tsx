import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const PURPLE = "#37003c";
const BLUE = "#00c7ff";
const GOLD = "#f0c050";

export const OutroScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const scale = interpolate(frame, [0, 30], [0.85, 1], { extrapolateRight: "clamp" });
  const contentOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateRight: "clamp" });

  const lineWidth = interpolate(frame, [40, 80], [0, 300], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PURPLE,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <div style={{
        position: "absolute",
        width: 600,
        height: 600,
        borderRadius: "50%",
        border: `1px solid rgba(0,199,255,0.1)`,
        transform: `scale(${scale})`,
      }} />
      <div style={{
        position: "absolute",
        width: 400,
        height: 400,
        borderRadius: "50%",
        border: `1px solid rgba(240,192,80,0.08)`,
        transform: `scale(${scale})`,
      }} />

      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity: contentOpacity,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 24 }}>⚽</div>

        <div style={{
          fontFamily: "sans-serif",
          fontSize: 52,
          fontWeight: 900,
          color: "white",
          letterSpacing: 4,
          lineHeight: 1.2,
        }}>
          The Beautiful Game
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}>
          <div style={{
            width: lineWidth,
            height: 2,
            backgroundColor: GOLD,
          }} />
        </div>

        <div style={{
          fontFamily: "sans-serif",
          fontSize: 20,
          color: BLUE,
          letterSpacing: 8,
        }}>
          CONTINUES
        </div>

        <div style={{
          fontFamily: "sans-serif",
          fontSize: 14,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: 5,
          marginTop: 32,
        }}>
          premierleague.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
