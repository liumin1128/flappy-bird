"use client";

// Flappy Bird 主页面 🐱 喵～
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Bird } from "./_components/bird";
import { Ground } from "./_components/ground";
import { StartButton } from "./_components/start-button";
import { ObstacleList } from "./_components/obstacle";
import { ScoreBoard } from "./_components/score-board";
import { useBird } from "./_components/useBird";
import { useObstacle } from "./_components/useObstacle";
import { Leaderboard } from "./_components/leaderboard";
import { ShareButton } from "./_components/share-button";

export default function FlappyBirdPage() {
  const { state, startGame, flap, reset } = useBird();
  const birdRef = useRef<HTMLDivElement>(null);
  const [birdRect, setBirdRect] = useState<DOMRect | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [fps, setFps] = useState(0);

  // FPS 统计
  useEffect(() => {
    let last = performance.now();
    let frames = 0;
    let lastFps = 0;
    let raf: number;
    function loop(now: number) {
      frames++;
      if (now - last >= 1000) {
        lastFps = frames;
        setFps(lastFps);
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 游戏结束回调
  const handleGameOver = useCallback(() => {
    setGameOver(true);
  }, []);
  // 障碍物与分数逻辑
  const {
    obstacles,
    score,
    reset: resetObstacle,
    gapHeight,
  } = useObstacle(
    state.isStarted,
    state.isGameOver || gameOver,
    birdRect,
    handleGameOver
  );

  // birdRect 跟踪
  useEffect(() => {
    if (!state.isStarted || !birdRef.current) return;
    const update = () => {
      setBirdRect(birdRef.current!.getBoundingClientRect());
      requestAnimationFrame(update);
    };
    update();
    return () => {};
  }, [state.isStarted]);

  // 游戏重置时障碍物也重置
  useEffect(() => {
    if (!state.isStarted) {
      resetObstacle();
      setGameOver(false);
    }
  }, [state.isStarted, resetObstacle]);

  // 新增视差背景组件
  const ParallaxBg: React.FC<{
    src: string;
    speed: number;
    height?: number;
    zIndex?: number;
    opacity?: number;
    bottom?: number;
  }> = ({ src, speed, height, zIndex = 0, opacity = 1, bottom }) => {
    const [offset, setOffset] = useState(0);
    const widthRef = useRef(
      typeof window !== "undefined" ? window.innerWidth : 1920
    );
    useEffect(() => {
      function handleResize() {
        widthRef.current = window.innerWidth;
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
      let raf: number;
      let last = performance.now();
      function loop(now: number) {
        const dt = now - last;
        last = now;
        setOffset((prev) => (prev + speed * dt * 0.06) % widthRef.current);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [speed]);
    return (
      <>
        <img
          src={src}
          alt="bg"
          style={{
            position: "absolute",
            left: -offset,
            top: bottom === 0 ? undefined : 0,
            bottom: bottom ?? undefined,
            width: "100vw",
            height: height ?? "100vh",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex,
            opacity,
            userSelect: "none",
          }}
          aria-hidden="true"
        />
        <img
          src={src}
          alt="bg-repeat"
          style={{
            position: "absolute",
            left: widthRef.current - offset,
            top: bottom === 0 ? undefined : 0,
            bottom: bottom ?? undefined,
            width: "100vw",
            height: height ?? "100vh",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex,
            opacity,
            userSelect: "none",
          }}
          aria-hidden="true"
        />
      </>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#87ceeb",
        overflow: "hidden",
        position: "relative",
        fontFamily: "sans-serif",
        userSelect: "none",
      }}
      tabIndex={0}
      onClick={() => {
        if (state.isGameOver) return;
        if (state.isStarted) flap();
      }}
    >
      {/* 视差背景分层循环平铺 */}
      <ParallaxBg src="/images/city.png" speed={0.2} zIndex={0} opacity={0.7} />
      <ParallaxBg
        src="/images/trees.png"
        speed={0.5}
        zIndex={1}
        opacity={0.85}
      />
      <ParallaxBg
        src="/images/ground.png"
        speed={1.2}
        zIndex={2}
        height={120}
        bottom={0}
      />
      {/* FPS 显示 */}
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 8,
          fontSize: 16,
          color: "#fff",
          background: "rgba(33,150,243,0.7)",
          borderRadius: 6,
          padding: "2px 12px",
          zIndex: 100,
          fontWeight: 700,
          letterSpacing: 1,
          boxShadow: "0 1px 4px #1976d2",
          userSelect: "none",
        }}
        aria-label="fps"
      >
        FPS: {fps}
      </div>
      {/* Header & Start Button */}
      {(!state.isStarted || state.isGameOver || gameOver) && (
        <>
          <h1
            style={{
              textAlign: "center",
              marginTop: 32,
              fontSize: 40,
              color: "#1976d2",
              fontWeight: 900,
              letterSpacing: 2,
              textShadow: "0 2px 8px #fff",
              zIndex: 10,
              position: "relative",
            }}
          >
            Flappy Bird
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "32px 0 0 0",
              position: "relative",
              zIndex: 11,
            }}
          >
            <Leaderboard myScore={score} />
          </div>
        </>
      )}
      <StartButton
        onClick={startGame}
        visible={!state.isStarted || state.isGameOver || gameOver}
      />
      {/* 分数板 */}
      {state.isStarted && (
        <ScoreBoard score={score} isGameOver={state.isGameOver || gameOver} />
      )}
      {/* Bird & Obstacle & Ground */}
      {state.isStarted && (
        <div
          ref={birdRef}
          style={{
            position: "absolute",
            left: "25%",
            top: state.position,
          }}
        >
          <Bird position={0} isGameOver={state.isGameOver || gameOver} />
        </div>
      )}
      {/* 障碍物 */}
      <ObstacleList obstacles={obstacles} gapHeight={gapHeight} />
      <Ground />
      {/* Game Over 弹窗 */}
      {(state.isGameOver || gameOver) && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            color: "#d32f2f",
            padding: "32px 48px",
            borderRadius: 16,
            fontSize: 28,
            fontWeight: 700,
            boxShadow: "0 4px 24px #bbb",
            zIndex: 20,
            textAlign: "center",
            minWidth: 400,
            maxWidth: "90vw",
          }}
        >
          游戏失败！🐱 喵～
          <br />
          <div
            style={{
              fontSize: 22,
              color: "#1976d2",
              margin: "16px 0 0",
            }}
          >
            总分：{score}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <ShareButton myScore={score} />
            <div style={{ marginTop: 16 }}>
              <Leaderboard myScore={score} />
            </div>
          </div>
          <button
            style={{
              marginTop: 24,
              padding: "8px 32px",
              fontSize: 20,
              borderRadius: 8,
              border: "1px solid #1976d2",
              background: "#1976d2",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={reset}
          >
            重开
          </button>
        </div>
      )}
    </div>
  );
}
// 🐱 喵～
