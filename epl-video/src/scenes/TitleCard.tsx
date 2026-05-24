import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const PURPLE = "#37003c";
const BLUE = "#00c7ff";
const GOLD = "#f0c050";

export const TitleCard: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const premierY = interpolate(frame, [5, 35], [80, 0], { extrapolateRight: "clamp" });
  const leagueY = interpolate(frame, [18, 48], [80, 0], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [35, 60], [40, 0], { extrapolateRight: "clamp" });
  const ballScale = interpolate(frame, [0, 35], [0, 1], { extrapolateRight: "clamp" });

  const ringScale1 = interpolate(frame, [0, 120], [0.8, 1.05], { extrapolateRight: "clamp" });
  const ringScale2 = interpolate(frame, [0, 120], [1.1, 0.95], { extrapolateRight: "clamp" });

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
      {/* Decorative rings */}
      <div style={{
        position: "absolute",
        width: 720,
        height: 720,
        borderRadius: "50%",
        border: `1px solid rgba(0,199,255,0.12)`,
        transform: `scale(${ringScale1})`,
      }} />
      <div style={{
        position: "absolute",
        width: 520,
        height: 520,
        borderRadius: "50%",
        border: `1px solid rgba(240,192,80,0.1)`,
        transform: `scale(${ringScale2})`,
      }} />

      {/* Ball */}
      <div style={{
        fontSize: 72,
        transform: `scale(${ballScale})`,
        marginBottom: 20,
        lineHeight: 1,
      }}>
        ⚽
      </div>

      {/* PREMIER */}
      <div style={{ transform: `translateY(${premierY}px)` }}>
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 108,
          fontWeight: 900,
          color: "white",
          letterSpacing: 12,
          lineHeight: 1,
          textAlign: "center",
        }}>
          PREMIER
        </div>
      </div>

      {/* LEAGUE */}
      <div style={{ transform: `translateY(${leagueY}px)` }}>
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 108,
          fontWeight: 900,
          color: BLUE,
          letterSpacing: 12,
          lineHeight: 1,
          textAlign: "center",
        }}>
          LEAGUE
        </div>
      </div>

      {/* Tagline */}
      <div style={{ transform: `translateY(${tagY}px)`, marginTop: 28, textAlign: "center" }}>
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 26,
          color: GOLD,
          letterSpacing: 16,
        }}>
          A HISTORY
        </div>
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 16,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: 8,
          marginTop: 10,
        }}>
          1992 — PRESENT
        </div>
      </div>
    </AbsoluteFill>
  );
};
