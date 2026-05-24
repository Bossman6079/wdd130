import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const PURPLE = "#37003c";
const BLUE = "#00c7ff";
const GOLD = "#f0c050";

const RECORDS = [
  { stat: "100", unit: "PTS", label: "Most points in a season", holder: "Manchester City, 2017–18" },
  { stat: "49", unit: "GAMES", label: "Longest unbeaten run", holder: "Arsenal, May 2003 – Oct 2004" },
  { stat: "38", unit: "GOALS", label: "Most goals in a season (player)", holder: "Mohamed Salah, 2017–18" },
  { stat: "31", unit: "GOALS", label: "Most goals in a season (36-game era)", holder: "Luis Suárez, 2013–14" },
  { stat: "5000/1", unit: "", label: "Longest title-winning odds", holder: "Leicester City, 2015–16" },
  { stat: "93:20", unit: "", label: "Most dramatic title-winning goal", holder: "Sergio Agüero vs QPR, 2012" },
];

export const RecordsScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const hY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });
  const hOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE, opacity }}>
      <div style={{ padding: "70px 100px" }}>
        <div style={{ opacity: hOp, transform: `translateY(${hY}px)`, marginBottom: 44 }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 14, color: BLUE, letterSpacing: 7, marginBottom: 10 }}>
            PREMIER LEAGUE
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 52, fontWeight: 900, color: "white" }}>
            Iconic Records
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
          {RECORDS.map((rec, i) => {
            const rOp = interpolate(frame, [15 + i * 8, 32 + i * 8], [0, 1], { extrapolateRight: "clamp" });
            const rY = interpolate(frame, [15 + i * 8, 32 + i * 8], [30, 0], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                opacity: rOp, transform: `translateY(${rY}px)`,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "24px 28px",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                  <div style={{
                    fontFamily: "sans-serif", fontSize: 48, fontWeight: 900,
                    color: GOLD, lineHeight: 1,
                  }}>
                    {rec.stat}
                  </div>
                  {rec.unit && (
                    <div style={{ fontFamily: "sans-serif", fontSize: 16, color: BLUE, letterSpacing: 3 }}>
                      {rec.unit}
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: "sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", marginBottom: 6, lineHeight: 1.4 }}>
                  {rec.label}
                </div>
                <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>
                  {rec.holder}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
