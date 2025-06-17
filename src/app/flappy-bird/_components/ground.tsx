// 地面组件 🐱 喵～
import React from "react";

export const Ground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 80,
        background: "linear-gradient(to top, #4caf50 80%, #388e3c 100%)",
        zIndex: 1,
      }}
      aria-label="ground"
    />
  );
};
// 🐱 喵～
