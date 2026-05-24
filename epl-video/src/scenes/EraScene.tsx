import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const PURPLE = "#37003c";
const BLUE = "#00c7ff";
const GOLD = "#f0c050";

interface EraSceneProps {
  years: string;
  title: string;
  champion: string;
  championColor: string;
  facts: string[];
  durationInFrames: number;
}

export const EraScene: React.FC<EraSceneProps> = ({
  years,
  title,
  champion,
  championColor,
  facts,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const headerX = interpolate(frame, [0, 28], [-100, 0], { extrapolateRight: "clamp" });

  const yearStr = years.split(/[–\-]/)[0].trim();

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE, opacity }}>
      {/* Side accent bar */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
        backgroundColor: championColor,
      }} />

      {/* Watermark year */}
      <div style={{
        position: "absolute",
        right: 20,
        bottom: -60,
        fontFamily: "sans-serif",
        fontSize: 320,
        fontWeight: 900,
        color: "rgba(255,255,255,0.03)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>
        {yearStr}
      </div>

      {/* Content */}
      <div style={{ padding: "80px 100px" }}>
        {/* Header */}
        <div style={{ transform: `translateX(${headerX}px)` }}>
          <div style={{
            fontFamily: "sans-serif",
            fontSize: 15,
            color: BLUE,
            letterSpacing: 7,
            textTransform: "uppercase",
            marginBottom: 12,
          }}>
            {years}
          </div>

          <div style={{
            fontFamily: "sans-serif",
            fontSize: 60,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}>
            {title}
          </div>

          {/* Champion chip */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: 30,
            padding: "7px 20px",
            border: `1px solid ${championColor}55`,
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: championColor,
            }} />
            <span style={{
              fontFamily: "sans-serif",
              fontSize: 15,
              color: "rgba(255,255,255,0.8)",
            }}>
              {champion}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: 1,
          backgroundColor: "rgba(255,255,255,0.08)",
          margin: "36px 0",
        }} />

        {/* Facts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {facts.map((fact, i) => {
            const factOpacity = interpolate(
              frame,
              [22 + i * 12, 44 + i * 12],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const factX = interpolate(
              frame,
              [22 + i * 12, 44 + i * 12],
              [60, 0],
              { extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 18,
                  opacity: factOpacity,
                  transform: `translateX(${factX}px)`,
                }}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: GOLD,
                  marginTop: 10,
                  flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: "sans-serif",
                  fontSize: 21,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.55,
                }}>
                  {fact}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
