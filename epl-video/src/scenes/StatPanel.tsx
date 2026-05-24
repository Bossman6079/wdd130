import { useCurrentFrame, interpolate } from "remotion";
import React from "react";

interface StatPanelProps {
  stat: string;
  label: string;
  color: string;
  subLabel?: string;
  emoji?: string;
}

export const StatPanel: React.FC<StatPanelProps> = ({ stat, label, color, subLabel, emoji }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 25], [0.6, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const statFontSize = stat.length > 6 ? 72 : stat.length > 4 ? 88 : 108;

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transform: `scale(${scale})`,
      opacity,
      gap: 12,
    }}>
      {/* Glow ring */}
      <div style={{
        position: "absolute",
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
      }} />

      {emoji && (
        <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 8 }}>{emoji}</div>
      )}

      <div style={{
        fontFamily: "sans-serif",
        fontSize: statFontSize,
        fontWeight: 900,
        color,
        lineHeight: 1,
        textAlign: "center",
        textShadow: `0 0 80px ${color}70`,
        letterSpacing: -2,
      }}>
        {stat}
      </div>

      <div style={{
        fontFamily: "sans-serif",
        fontSize: 14,
        color: "rgba(255,255,255,0.45)",
        letterSpacing: 7,
        textTransform: "uppercase",
        textAlign: "center",
      }}>
        {label}
      </div>

      {subLabel && (
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: 4,
          textAlign: "center",
        }}>
          {subLabel}
        </div>
      )}
    </div>
  );
};
