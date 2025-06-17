// 控制障碍物生成与移动的自定义 Hook 🐱 喵～
import { useCallback, useEffect, useState } from "react";
import type { Obstacle } from "../types/obstacle-types";

const PIPE_WIDTH = 60;
const GAP_HEIGHT = 120;
const OBSTACLE_SPEED = 1.5; // px/step

// 修改 getRandomTop 支持动态 gap
function getRandomTop(gap: number) {
  const min = 60;
  const max = window.innerHeight - gap - 60;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let obstacleId = 0;

// 新增：动态调整间隔和空隙
function getDynamicParams(score: number) {
  // 间隔最小 3000ms，最大 4800ms，随分数线性递减
  const minInterval = 2000 * 1.5;
  const maxInterval = 3200 * 1.5;
  const interval = Math.max(
    minInterval,
    maxInterval - Math.floor(score * 20 * 1.5)
  );
  // 空隙最小 165px，最大 270px，随分数线性递减
  const minGap = 110 * 1.5;
  const maxGap = 180 * 1.5;
  const gap = Math.max(minGap, maxGap - Math.floor(score * 2 * 1.5));
  return { interval, gap };
}

export function useObstacle(
  isStarted: boolean,
  isGameOver: boolean,
  birdRect: DOMRect | null,
  onGameOver?: () => void
) {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [gapHeight, setGapHeight] = useState(GAP_HEIGHT);
  const [obstacleInterval, setObstacleInterval] = useState(1600);

  // 生成障碍物，x 为屏幕最右侧 🐱 喵～
  const generateObstacle = useCallback(() => {
    setObstacles((prev) => {
      const { gap } = getDynamicParams(score);
      setGapHeight(gap);
      // 防止障碍物重叠：新障碍物与上一个障碍物距离需大于 PIPE_WIDTH + 80
      const minDistance = PIPE_WIDTH + 80;
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        if (
          last.x >
          (typeof window !== "undefined" ? window.innerWidth : 400) -
            minDistance
        ) {
          // 距离不够，不生成
          return prev;
        }
      }
      return [
        ...prev,
        {
          id: obstacleId++,
          x: typeof window !== "undefined" ? window.innerWidth : 400,
          top: getRandomTop(gap),
          passed: false,
        },
      ];
    });
  }, [score]);

  // 随分数动态调整障碍物生成间隔 🐱 喵～
  useEffect(() => {
    const { interval } = getDynamicParams(score);
    setObstacleInterval(interval);
  }, [score]);

  // 定时生成障碍物 🐱 喵～
  useEffect(() => {
    if (!isStarted || isGameOver) return;
    generateObstacle(); // 立即生成第一个
    const interval = setInterval(() => {
      generateObstacle();
    }, obstacleInterval);
    return () => clearInterval(interval);
  }, [isStarted, isGameOver, generateObstacle, obstacleInterval]);

  // 移动障碍物 🐱 喵～
  const moveObstacles = useCallback(() => {
    setObstacles(
      (prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
          .filter((obs) => obs.x + PIPE_WIDTH > 0) // 超出屏幕左侧则销毁
    );
  }, []);

  // 障碍物移动动画 🐱 喵～
  useEffect(() => {
    if (!isStarted || isGameOver) return;
    const interval = setInterval(() => {
      moveObstacles();
    }, 16);
    return () => clearInterval(interval);
  }, [isStarted, isGameOver, moveObstacles]);

  // 得分与碰撞判定 🐱 喵～
  useEffect(() => {
    if (!isStarted || isGameOver || !birdRect) return;
    setObstacles((prev) =>
      prev.map((obs) => {
        if (!obs.passed && obs.x + PIPE_WIDTH < birdRect.left) {
          setScore((s) => s + 1);
          return { ...obs, passed: true };
        }
        return obs;
      })
    );
    // 修正碰撞检测：只有小鸟完全在 gap 区域才算通过，否则判定为碰撞
    for (const obs of obstacles) {
      const pipeLeft = obs.x;
      const pipeRight = obs.x + PIPE_WIDTH;
      const gapTop = obs.top;
      const gapBottom =
        obs.top + (typeof gapHeight === "number" ? gapHeight : GAP_HEIGHT);
      // 小鸟与障碍物 x 区域重叠
      if (birdRect.right > pipeLeft && birdRect.left < pipeRight) {
        // 只要有一部分超出 gap 区域就算碰撞
        if (birdRect.top < gapTop || birdRect.bottom > gapBottom) {
          if (onGameOver) {
            onGameOver();
            return;
          }
        }
      }
    }
  }, [isStarted, isGameOver, birdRect, obstacles, gapHeight, onGameOver]);

  // 重置 🐱 喵～
  const reset = useCallback(() => {
    setObstacles([]);
    setScore(0);
    obstacleId = 0;
  }, []);

  return {
    obstacles,
    score,
    generateObstacle,
    moveObstacles,
    reset, // 确保 reset 导出
    gapHeight,
  };
}
