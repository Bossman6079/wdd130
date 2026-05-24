import { useCurrentFrame, interpolate } from "remotion";
import React from "react";

interface TrophyPanelProps {
  count: number;
  label: string;
  color: string;
}

export const TrophyPanel: React.FC<TrophyPanelProps> = ({ count, label, color }) => {
  const frame = useCurrentFrame();

  const cols = count <= 3 ? count : count <= 6 ? 3 : count <= 9 ? 3 : 5;

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 12,
        marginBottom: 8,
      }}>
        {Array.from({ length: count }).map((_, i) => {
          const delay = i * 5;
          const trophyOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: "clamp" });
          const trophyScale = interpolate(frame, [delay, delay + 15], [0.3, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                fontSize: count > 9 ? 36 : count > 6 ? 44 : 56,
                opacity: trophyOpacity,
                transform: `scale(${trophyScale})`,
                lineHeight: 1,
                filter: `drop-shadow(0 0 12px ${color}80)`,
              }}
            >
              🏆
            </div>
          );
        })}
      </div>
      <div style={{
        fontFamily: "sans-serif",
        fontSize: 13,
        color: "rgba(255,255,255,0.4)",
        letterSpacing: 6,
        textTransform: "uppercase",
        textAlign: "center",
      }}>
        {label}
      </div>
    </div>
  );
};
