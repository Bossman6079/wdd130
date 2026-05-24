import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const PURPLE = "#37003c";
const BLUE = "#00c7ff";
const GOLD = "#f0c050";

const teams = [
  { name: "Manchester United", titles: 13, color: "#DA020E", trophies: "1993, 94, 96, 97, 99, 00, 01, 03, 07, 08, 09, 11, 13" },
  { name: "Manchester City", titles: 7, color: "#6CABDD", trophies: "2012, 14, 18, 19, 21, 22, 23" },
  { name: "Chelsea", titles: 5, color: "#4F7FBE", trophies: "2005, 06, 10, 15, 17" },
  { name: "Arsenal", titles: 3, color: "#EF4444", trophies: "1998, 2002, 04" },
  { name: "Liverpool", titles: 1, color: "#C8102E", trophies: "2020" },
  { name: "Leicester City", titles: 1, color: "#FDBE11", trophies: "2016" },
  { name: "Blackburn Rovers", titles: 1, color: "#009EE0", trophies: "1995" },
];

const MAX_TITLES = 13;
const MAX_BAR_WIDTH = 580;

export const ChampionsScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const headerOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE, opacity }}>
      <div style={{ padding: "70px 100px" }}>
        {/* Header */}
        <div style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)`, marginBottom: 44 }}>
          <div style={{
            fontFamily: "sans-serif",
            fontSize: 14,
            color: BLUE,
            letterSpacing: 7,
            textTransform: "uppercase",
            marginBottom: 10,
          }}>
            PREMIER LEAGUE CHAMPIONS
          </div>
          <div style={{
            fontFamily: "sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: "white",
          }}>
            Title Count · 1992–2024
          </div>
        </div>

        {/* Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {teams.map((team, i) => {
            const barWidth = interpolate(
              frame,
              [20 + i * 8, 52 + i * 8],
              [0, (team.titles / MAX_TITLES) * MAX_BAR_WIDTH],
              { extrapolateRight: "clamp" }
            );
            const itemOpacity = interpolate(frame, [15 + i * 8, 30 + i * 8], [0, 1], { extrapolateRight: "clamp" });
            const countOpacity = interpolate(frame, [52 + i * 8, 62 + i * 8], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div
                key={team.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: itemOpacity,
                }}
              >
                {/* Team name */}
                <div style={{
                  fontFamily: "sans-serif",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.85)",
                  width: 200,
                  flexShrink: 0,
                }}>
                  {team.name}
                </div>

                {/* Bar container */}
                <div style={{
                  width: MAX_BAR_WIDTH,
                  height: 34,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: barWidth,
                    height: "100%",
                    backgroundColor: team.color,
                    borderRadius: 4,
                  }} />
                </div>

                {/* Title count */}
                <div style={{
                  fontFamily: "sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: GOLD,
                  width: 28,
                  opacity: countOpacity,
                }}>
                  {team.titles}
                </div>

                {/* Trophy years */}
                <div style={{
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                  opacity: countOpacity,
                }}>
                  {team.trophies}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
