// 开始按钮组件 🐱 喵～
import React from "react";

interface StartButtonProps {
  onClick: () => void;
  visible: boolean;
}

export const StartButton: React.FC<StartButtonProps> = ({
  onClick,
  visible,
}) => {
  if (!visible) return null;
  return (
    <button
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
        padding: "0 32px",
        height: 48,
        fontSize: 24,
        fontWeight: 700,
        background: "#fff",
        color: "#1976d2",
        border: "2px solid #1976d2",
        borderRadius: 24,
        cursor: "pointer",
        zIndex: 10,
        boxShadow: "0 2px 8px #bbb",
      }}
      onClick={onClick}
      aria-label="start-game"
    >
      开始游戏
    </button>
  );
};
// 🐱 喵～
