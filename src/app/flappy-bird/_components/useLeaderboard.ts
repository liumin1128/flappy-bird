import { LeaderboardState, Score } from "../types/leaderboard-types";
import { useState } from "react";

export function useLeaderboard(initialScore: number) {
  const [state, setState] = useState<LeaderboardState>({
    scores: [],
    myScore: initialScore,
    isShared: false,
  });

  // 拉取排行榜数据
  const fetchLeaderboard = async () => {
    // TODO: 替换为真实 API
    const mockScores: Score[] = [
      { name: "Alice", value: 120 },
      { name: "Bob", value: 100 },
      { name: "You", value: initialScore },
    ];
    setState((prev) => ({ ...prev, scores: mockScores }));
  };

  // 分享分数
  const shareScore = async () => {
    try {
      await navigator.clipboard.writeText(
        `I scored ${state.myScore} in Flappy Bird!`
      );
      setState((prev) => ({ ...prev, isShared: true }));
    } catch {
      alert("分享失败，请手动复制分数");
    }
  };

  // 重置
  const reset = () => {
    setState({ scores: [], myScore: 0, isShared: false });
  };

  return {
    state,
    fetchLeaderboard,
    shareScore,
    reset,
  };
}
// 🐱 喵～
