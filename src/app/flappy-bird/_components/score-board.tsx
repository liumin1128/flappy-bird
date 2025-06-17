// 分数显示组件 🐱 喵～
import React from "react";

interface ScoreBoardProps {
  score: number;
  isGameOver: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  isGameOver,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: 40,
        fontWeight: 900,
        color: isGameOver ? "#d32f2f" : "#fff",
        textShadow: "2px 2px 8px #1976d2, 0 0 2px #000",
        background: "rgba(33,150,243,0.15)",
        borderRadius: 12,
        padding: "4px 32px",
        zIndex: 20,
        minWidth: 120,
        textAlign: "center",
        userSelect: "none",
      }}
      aria-label="score-board"
    >
      {score}
    </div>
  );
};
// 🐱 喵～
