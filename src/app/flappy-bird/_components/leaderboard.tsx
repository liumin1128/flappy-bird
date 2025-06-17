import React, { useEffect } from "react";
import { useLeaderboard } from "./useLeaderboard";

interface LeaderboardProps {
  myScore: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ myScore }) => {
  const { state, fetchLeaderboard } = useLeaderboard(myScore);

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: 320,
        background: "rgba(250,251,252,0.7)",
        borderRadius: 12,
        padding: 16,
        zIndex: 9999,
        position: "relative",
        boxShadow: "0 2px 16px rgba(33,150,243,0.08)",
        backdropFilter: "blur(2px)",
        border: "none",
        fontFamily:
          "Comic Sans MS, Comic Sans, Chalkboard, fantasy, sans-serif", // 卡通字体
      }}
    >
      <h3
        style={{
          marginBottom: 16,
          fontSize: 32,
          fontWeight: 900,
          color: "#1976d2",
          letterSpacing: 2,
          textShadow: "0 2px 8px #fff",
          fontFamily: "inherit",
        }}
      >
        Leaderboard
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {state.scores.map((score, idx) => (
          <li
            key={score.name + idx}
            style={{
              height: 48,
              lineHeight: "48px",
              fontWeight: score.value === myScore ? "bold" : 700,
              fontSize: 24,
              fontFamily: "inherit",
              background: score.value === myScore ? "#e3f2fd" : "transparent",
              borderRadius: 4,
              marginBottom: 4,
              padding: "0 12px",
              display: "flex",
              justifyContent: "space-between",
              color: score.value === myScore ? "#1976d2" : "#333",
              textShadow:
                score.value === myScore ? "0 2px 8px #fff" : "0 1px 2px #fff",
              transition: "background 0.2s",
            }}
          >
            <span>{score.name}</span>
            <span>{score.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// 🐱 喵～
