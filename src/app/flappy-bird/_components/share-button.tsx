import React from "react";
import { useLeaderboard } from "./useLeaderboard";

interface ShareButtonProps {
  myScore: number;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ myScore }) => {
  const { state, shareScore } = useLeaderboard(myScore);

  return (
    <button
      style={{
        height: 40,
        background: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        width: "100%",
        marginTop: 16,
        zIndex: 9999,
        position: "relative",
      }}
      onClick={shareScore}
      disabled={state.isShared}
    >
      {state.isShared ? "已分享！" : "分享我的分数"}
    </button>
  );
};
// 🐱 喵～
