import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const PURPLE = "#37003c";
const BLUE = "#00c7ff";
const GOLD = "#f0c050";

interface MomentSceneProps {
  years: string;
  title: string;
  champion: string;
  championColor: string;
  facts: string[];
  visual: React.ReactNode;
  durationInFrames: number;
}

export const MomentScene: React.FC<MomentSceneProps> = ({
  years, title, champion, championColor, facts, visual, durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const headerX = interpolate(frame, [0, 25], [-90, 0], { extrapolateRight: "clamp" });
  const visualX = interpolate(frame, [0, 25], [90, 0], { extrapolateRight: "clamp" });

  const yearStr = years.split(/[–\-]/)[0].trim().replace(/\D.*/, "");

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE, opacity }}>
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 6,
        backgroundColor: championColor,
      }} />

      {/* Watermark year */}
      <div style={{
        position: "absolute", right: -10, bottom: -60,
        fontFamily: "sans-serif", fontSize: 300, fontWeight: 900,
        color: "rgba(255,255,255,0.025)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        {yearStr}
      </div>

      {/* Two-column layout */}
      <div style={{
        display: "flex", flexDirection: "row",
        height: "100%", padding: "70px 80px 70px 90px", gap: 60,
      }}>

        {/* LEFT: Text content */}
        <div style={{
          flex: "0 0 860px",
          display: "flex", flexDirection: "column",
          transform: `translateX(${headerX}px)`,
        }}>
          <div style={{
            fontFamily: "sans-serif", fontSize: 14, color: BLUE,
            letterSpacing: 7, textTransform: "uppercase", marginBottom: 10,
          }}>
            {years}
          </div>

          <div style={{
            fontFamily: "sans-serif", fontSize: 54, fontWeight: 900,
            color: "white", lineHeight: 1.15, marginBottom: 18, maxWidth: 820,
          }}>
            {title}
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: 30, padding: "6px 18px",
            border: `1px solid ${championColor}50`,
            alignSelf: "flex-start", marginBottom: 28,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              backgroundColor: championColor,
            }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
              {champion}
            </span>
          </div>

          <div style={{
            width: "100%", height: 1,
            backgroundColor: "rgba(255,255,255,0.08)", marginBottom: 26,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {facts.map((fact, i) => {
              const fOpacity = interpolate(frame, [20 + i * 11, 40 + i * 11], [0, 1], { extrapolateRight: "clamp" });
              const fX = interpolate(frame, [20 + i * 11, 40 + i * 11], [50, 0], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  opacity: fOpacity, transform: `translateX(${fX}px)`,
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    backgroundColor: GOLD, marginTop: 9, flexShrink: 0,
                  }} />
                  <div style={{
                    fontFamily: "sans-serif", fontSize: 20,
                    color: "rgba(255,255,255,0.85)", lineHeight: 1.55,
                  }}>
                    {fact}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Visual panel */}
        <div style={{
          flex: 1,
          backgroundColor: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          border: `1px solid rgba(255,255,255,0.07)`,
          overflow: "hidden",
          position: "relative",
          transform: `translateX(${visualX}px)`,
        }}>
          {/* Team color glow top-right */}
          <div style={{
            position: "absolute", top: -100, right: -100,
            width: 400, height: 400, borderRadius: "50%",
            background: `radial-gradient(circle, ${championColor}20 0%, transparent 60%)`,
            pointerEvents: "none",
          }} />
          {visual}
        </div>
      </div>
    </AbsoluteFill>
  );
};
