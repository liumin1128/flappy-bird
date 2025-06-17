// 障碍物状态管理（可选 store 方案，当前用 useObstacle hook 也可）🐱 喵～
import type { Obstacle } from "../types/obstacle-types";

export interface ObstacleStore {
  obstacles: Obstacle[];
  score: number;
  generateObstacle: () => void;
  moveObstacles: () => void;
  reset: () => void;
}
// 🐱 喵～
