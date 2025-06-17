# [FLAPPY-3] Flappy Bird - Leaderboard and Social Implementation Planning

## User Story

As a player, I want to view the leaderboard and share my score, so that I can compare with others and increase engagement.

## Pre-conditions
- 游戏已结束并生成分数

## Design
### Visual Layout
- 结果页显示分数和“分享”按钮
- 排行榜区域展示玩家分数列表
- 分享按钮支持复制分数或生成分享链接

### Color and Typography
- 排行榜背景色：浅灰或白色
- 分数字体：大号无衬线字体
- 分享按钮：蓝色高亮

### Interaction Patterns
- 点击“分享”可复制分数或生成分享链接
- 排行榜自动刷新

### Measurements and Spacing
- 排行榜宽度：320px
- 行高：48px
- 按钮高度：40px

### Responsive Behavior
- 排行榜与结果页自适应移动端与桌面端

## Technical Requirements
### Component Structure
```
src/app/flappy-bird/
├── page.tsx
└── _components/
    ├── leaderboard.tsx      # 排行榜组件
    ├── share-button.tsx     # 分享按钮组件
    └── useLeaderboard.ts    # 排行榜与分享逻辑 Hook
```

### Required Components
- leaderboard ⬜
- share-button ⬜
- useLeaderboard ⬜

### State Management Requirements
```typescript
interface LeaderboardState {
  scores: Score[];
  myScore: number;
  isShared: boolean;
}

const actions = {
  fetchLeaderboard: () => void;
  shareScore: () => void;
  reset: () => void;
}
```

## Acceptance Criteria
### Layout & Content
1. 结果页显示分数与分享按钮
2. 排行榜展示玩家分数

### Functionality
1. 排行榜逻辑
   - [ ] 拉取并展示分数列表
   - [ ] 我的分数高亮显示
2. 分享逻辑
   - [ ] 点击按钮可复制分数或生成分享链接
   - [ ] 分享后提示成功

### Navigation Rules
- 结果页与排行榜同页展示

### Error Handling
- 排行榜拉取失败时重试
- 分享失败时提示

## Modified Files
```
src/app/flappy-bird/
├── page.tsx ⬜
└── _components/
    ├── leaderboard.tsx ⬜
    ├── share-button.tsx ⬜
    └── useLeaderboard.ts ⬜
├── store/
│   └── leaderboard-store.ts ⬜
└── types/
    └── leaderboard-types.ts ⬜
```

## Status
🟨 IN PROGRESS

1. Setup & Configuration
   - [ ] 组件结构搭建
2. Layout Implementation
   - [ ] 排行榜与分享按钮布局
3. Feature Implementation
   - [ ] 排行榜拉取与展示
   - [ ] 分享逻辑实现
4. Testing
   - [ ] 排行榜与分享测试

## Dependencies
- React/Next.js
- 状态管理库（可选）

## Related Stories
- FLAPPY-2 (障碍与得分)

## Notes
### Technical Considerations
1. 排行榜数据可本地存储或后端接口
2. 分享功能需兼容移动端与桌面端
3. 排行榜刷新需防抖
4. 组件解耦，便于维护
5. UI 需自适应不同屏幕

### Business Requirements
- 排行榜激励玩家竞争
- 分享功能提升传播性

### API Integration
如有后端接口，需定义分数结构

### Custom Hook Implementation
详见 useLeaderboard.ts

## Testing Requirements
- 排行榜与分享逻辑单元测试
- 响应式与边界测试
- 可访问性测试

🐱 喵～
