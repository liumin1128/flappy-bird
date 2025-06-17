export interface Score {
  name: string;
  value: number;
}

export interface LeaderboardState {
  scores: Score[];
  myScore: number;
  isShared: boolean;
}

// 🐱 喵～
