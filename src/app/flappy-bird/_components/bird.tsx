// 小鸟组件，负责渲染和动画 🐱 喵～
import React, { useEffect, useRef, useState } from "react";

interface BirdProps {
  position: number;
  isGameOver?: boolean;
}

const BIRD_FRAMES = [
  "/images/bird1.png",
  "/images/bird2.png",
  "/images/bird3.png",
];

export const Bird: React.FC<BirdProps> = ({ position, isGameOver }) => {
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isGameOver) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    // 只创建一个 interval，始终保持动画
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setFrame((f) => (f + 1) % BIRD_FRAMES.length);
      }, 120);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isGameOver]);

  return (
    <div
      style={{
        position: "absolute",
        left: "25%",
        top: position,
        width: 40,
        height: 40,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isGameOver ? 0.7 : 1,
        pointerEvents: "none",
      }}
      aria-label="bird"
    >
      <img
        src={BIRD_FRAMES[frame]}
        alt="bird"
        width={40}
        height={40}
        style={{
          objectFit: "contain",
          filter: isGameOver ? "grayscale(0.7)" : undefined,
          transition: "filter 0.2s",
        }}
      />
    </div>
  );
};
// 🐱 喵～
