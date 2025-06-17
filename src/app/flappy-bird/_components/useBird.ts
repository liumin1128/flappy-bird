// 小鸟物理与事件的自定义 Hook 🐱 喵～
import { useCallback, useEffect, useRef, useState } from "react";

export interface BirdState {
  isStarted: boolean;
  isFalling: boolean;
  position: number;
  velocity: number;
  isGameOver: boolean;
}

const GRAVITY = 0.12;
const FLAP_STRENGTH = -6;
const GROUND_HEIGHT = 80;
const BIRD_SIZE = 40;
const GAME_HEIGHT = 600;
const INIT_POSITION = GAME_HEIGHT / 2 - BIRD_SIZE / 2;

export function useBird() {
  const [state, setState] = useState<BirdState>({
    isStarted: false,
    isFalling: false,
    position: INIT_POSITION,
    velocity: 0,
    isGameOver: false,
  });
  const animationRef = useRef<number | undefined>(undefined);

  // 物理更新 🐱 喵～
  const updatePhysics = useCallback(() => {
    setState((prev) => {
      if (!prev.isStarted || prev.isGameOver) return prev;
      const velocity = prev.velocity + GRAVITY;
      let position = prev.position + velocity;
      let isGameOver = false;
      const gameHeight =
        typeof window !== "undefined" ? window.innerHeight : GAME_HEIGHT;
      if (position + BIRD_SIZE >= gameHeight - GROUND_HEIGHT) {
        position = gameHeight - GROUND_HEIGHT - BIRD_SIZE;
        isGameOver = true;
      }
      return {
        ...prev,
        position,
        velocity: isGameOver ? 0 : velocity,
        isGameOver,
        isFalling: !isGameOver,
      };
    });
  }, []);

  // 动画循环 🐱 喵～
  useEffect(() => {
    if (!state.isStarted || state.isGameOver) return;
    function loop() {
      updatePhysics();
      animationRef.current = requestAnimationFrame(loop);
    }
    animationRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [state.isStarted, state.isGameOver, updatePhysics]);

  // 扑腾 🐱 喵～
  const flap = useCallback(() => {
    if (!state.isStarted || state.isGameOver) return;
    setState((prev) => ({ ...prev, velocity: FLAP_STRENGTH }));
  }, [state.isStarted, state.isGameOver]);

  // 开始游戏 🐱 喵～
  const startGame = useCallback(() => {
    setState({
      isStarted: true,
      isFalling: true,
      position: INIT_POSITION,
      velocity: 0,
      isGameOver: false,
    });
  }, []);

  // 重置 🐱 喵～
  const reset = useCallback(() => {
    setState({
      isStarted: false,
      isFalling: false,
      position: INIT_POSITION,
      velocity: 0,
      isGameOver: false,
    });
  }, []);

  // 键盘/触摸事件 🐱 喵～
  useEffect(() => {
    function handleFlap(e: KeyboardEvent | TouchEvent) {
      if (
        (e instanceof KeyboardEvent && (e.code === "Space" || e.key === " ")) ||
        e instanceof TouchEvent
      ) {
        flap();
      }
    }
    window.addEventListener("keydown", handleFlap);
    window.addEventListener("touchstart", handleFlap);
    return () => {
      window.removeEventListener("keydown", handleFlap);
      window.removeEventListener("touchstart", handleFlap);
    };
  }, [flap]);

  return {
    state,
    startGame,
    flap,
    updatePhysics,
    reset,
  };
}
// 🐱 喵～
