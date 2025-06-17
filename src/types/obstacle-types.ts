// 定义障碍物和游戏状态相关类型 🐱 喵～

export interface Obstacle {
  id: string;
  x: number; // 障碍物横坐标
  height: number; // 上管道高度
  gapY: number; // 空隙顶部坐标
  passed: boolean; // 是否已被小鸟通过
}

export interface ObstacleState {
  obstacles: Obstacle[];
  score: number;
  isGameOver: boolean;
}

// 🐱 喵～
