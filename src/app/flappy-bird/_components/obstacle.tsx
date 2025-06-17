// 障碍物组件，负责渲染和移动 🐱 喵～
import React from "react";
import type { Obstacle } from "../types/obstacle-types";

interface ObstacleProps {
  obstacles: Obstacle[];
  gapHeight?: number;
}

const PIPE_WIDTH = 60;
const GAP_HEIGHT = 120;
const GAME_HEIGHT = 600;

export const ObstacleList: React.FC<ObstacleProps> = ({
  obstacles,
  gapHeight,
}) => {
  const gameHeight =
    typeof window !== "undefined" ? window.innerHeight : GAME_HEIGHT;
  const gap = gapHeight ?? GAP_HEIGHT;
  return (
    <>
      {obstacles.map((obs) => (
        <React.Fragment key={obs.id}>
          {/* 上管道图片 pipe1.png */}
          <img
            src="/images/pipe1.png"
            alt="pipe-top"
            style={{
              position: "absolute",
              left: obs.x,
              top: 0,
              width: PIPE_WIDTH,
              height: obs.top,
              objectFit: "fill",
              zIndex: 3,
              transition: "left 0.04s linear",
              pointerEvents: "none",
              boxSizing: "border-box",
            }}
          />
          {/* 下管道图片 pipe2.png */}
          <img
            src="/images/pipe2.png"
            alt="pipe-bottom"
            style={{
              position: "absolute",
              left: obs.x,
              top: obs.top + gap,
              width: PIPE_WIDTH,
              height: gameHeight - (obs.top + gap),
              objectFit: "fill",
              zIndex: 3,
              transition: "left 0.04s linear",
              pointerEvents: "none",
              boxSizing: "border-box",
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
// 🐱 喵～
