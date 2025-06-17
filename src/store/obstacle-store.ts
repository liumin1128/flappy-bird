// 障碍物与分数状态管理，使用简单的全局 store 🐱 喵～

import { useState } from "react";
import type { Obstacle } from "../app/flappy-bird/types/obstacle-types";

// ObstacleState 类型定义，便于 store 使用 🐱 喵～
interface ObstacleState {
  obstacles: Obstacle[];
  score: number;
  isGameOver: boolean;
}

// 这里可替换为 Zustand、Redux 等状态库，当前用 useState 方案演示 🐱 喵～

export function useObstacleStore(initialState?: Partial<ObstacleState>) {
  const [obstacles, setObstacles] = useState<Obstacle[]>(
    initialState?.obstacles || []
  );
  const [score, setScore] = useState<number>(initialState?.score || 0);
  const [isGameOver, setIsGameOver] = useState<boolean>(
    initialState?.isGameOver || false
  );

  return {
    obstacles,
    setObstacles,
    score,
    setScore,
    isGameOver,
    setIsGameOver,
  };
}
// 🐱 喵～
