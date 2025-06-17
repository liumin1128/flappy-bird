# [FLAPPY-2] Flappy Bird - Obstacles and Scoring Implementation Planning

## User Story

As a player, I want obstacles to appear and move from right to left, and score points by passing through them, so that I can challenge myself and compete for high scores.

## Pre-conditions
- 游戏已开始，小鸟已在飞行

## Design
### Visual Layout
- 屏幕右侧不断生成障碍物（如管道），障碍物从右向左移动
- 障碍物有上下两部分，中间有空隙
- 分数显示在屏幕上方中央
- 游戏结束后显示总分和结果页

### Color and Typography
- 障碍物：绿色管道或简化色块
- 分数字体：大号无衬线字体，白色描边

### Interaction Patterns
- 小鸟穿越障碍物空隙得分
- 碰撞障碍物判定为失败
- 游戏结束弹窗显示分数

### Measurements and Spacing
- 管道宽度：60px，高度随机
- 空隙高度：120px
- 分数区域高度：48px

### Responsive Behavior
- 障碍物和分数自适应缩放，移动端与桌面端一致

## Technical Requirements
### Component Structure
```
src/app/flappy-bird/
├── page.tsx
└── _components/
    ├── obstacle.tsx         # 障碍物组件，负责渲染和移动
    ├── score-board.tsx      # 分数显示组件
    └── useObstacle.ts       # 控制障碍物生成与碰撞检测的 Hook
```

### Required Components
- obstacle ⬜
- score-board ⬜
- useObstacle ⬜

### State Management Requirements
```typescript
interface ObstacleState {
  obstacles: Obstacle[];
  score: number;
  isGameOver: boolean;
}

const actions = {
  generateObstacle: () => void;
  moveObstacles: () => void;
  checkCollision: () => void;
  addScore: () => void;
  reset: () => void;
}
```

## Acceptance Criteria
### Layout & Content
1. 障碍物生成与移动
2. 分数实时显示
3. 游戏结束显示总分

### Functionality
1. 障碍物逻辑
   - [ ] 障碍物定时生成并移动
   - [ ] 障碍物高度随机，空隙固定
   - [ ] 小鸟穿越障碍物得分
   - [ ] 碰撞障碍物判定失败
2. 分数逻辑
   - [ ] 分数实时更新
   - [ ] 游戏结束显示分数

### Navigation Rules
- 游戏主界面内完成所有交互

### Error Handling
- 障碍物生成异常时重置
- 分数异常时回退

## Modified Files
```
src/app/flappy-bird/
├── page.tsx ⬜
└── _components/
    ├── obstacle.tsx ⬜
    ├── score-board.tsx ⬜
    └── useObstacle.ts ⬜
├── store/
│   └── obstacle-store.ts ⬜
└── types/
    └── obstacle-types.ts ⬜
```

## Status
🟨 IN PROGRESS

1. Setup & Configuration
   - [ ] 组件结构搭建
2. Layout Implementation
   - [ ] 障碍物与分数布局
3. Feature Implementation
   - [ ] 障碍物生成与移动
   - [ ] 碰撞检测与得分
4. Testing
   - [ ] 障碍物逻辑测试
   - [ ] 分数逻辑测试

## Dependencies
- React/Next.js
- 状态管理库（可选）

## Related Stories
- FLAPPY-1 (基本玩法)
- FLAPPY-3 (排行榜与社交)

## Notes
### Technical Considerations
1. 障碍物高度需随机生成，避免重复
2. 碰撞检测需高效，防止性能瓶颈
3. 分数判定需准确，防作弊
4. 组件解耦，便于维护
5. UI 需自适应不同屏幕

### Business Requirements
- 游戏难度随时间递增
- 分数激励玩家持续挑战

### API Integration
无

### Custom Hook Implementation
详见 useObstacle.ts

## Testing Requirements
- 障碍物生成与移动单元测试
- 碰撞检测与分数测试
- 响应式与边界测试
- 可访问性测试

🐱 喵～
