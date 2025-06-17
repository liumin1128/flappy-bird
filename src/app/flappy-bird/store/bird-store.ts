// bird 状态管理（可选 store 方案，当前用 useBird hook 也可）🐱 喵～
import { BirdState } from "../types/bird-types";

export interface BirdStore extends BirdState {
  startGame: () => void;
  flap: () => void;
  updatePhysics: () => void;
  reset: () => void;
}
// ... 🐱 喵～
