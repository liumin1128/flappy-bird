# [FLAPPY-1] Flappy Bird - Basic Mechanics Implementation Planning

## User Story

As a player, I want to control a bird that falls due to gravity and can flap upwards by tapping, so that I can keep the bird flying and avoid falling.

## Pre-conditions

- 游戏已加载并显示“开始游戏”按钮
- 用户已点击“开始游戏”

## Design

### Visual Layout
- 主界面包含：背景、地面、小鸟、开始按钮
- 小鸟位于屏幕中央偏左
- 开始按钮居中显示，点击后消失

### Color and Typography
- 背景色：天蓝色
- 地面：绿色
- 小鸟：黄色或表情包/圆形占位
- 字体：无衬线字体，按钮大号字体

### Interaction Patterns
- 点击屏幕/空格键：小鸟向上扑腾
- 未操作时小鸟持续下坠
- 游戏失败弹窗提示

### Measurements and Spacing
- 小鸟尺寸：40x40px
- 地面高度：80px
- 按钮高度：48px

### Responsive Behavior
- 桌面端与移动端均居中显示，元素自适应缩放

## Technical Requirements

### Component Structure
```
src/app/flappy-bird/
├── page.tsx
└── _components/
    ├── bird.tsx           # 小鸟组件，负责渲染和动画
    ├── ground.tsx         # 地面组件
    ├── start-button.tsx   # 开始按钮组件
    └── useBird.ts         # 控制小鸟物理与事件的自定义 Hook
```

### Required Components
- bird ⬜
- ground ⬜
- start-button ⬜
- useBird ⬜

### State Management Requirements
```typescript
interface BirdState {
  isStarted: boolean;
  isFalling: boolean;
  position: number;
  velocity: number;
  isGameOver: boolean;
}

const actions = {
  startGame: () => void;
  flap: () => void;
  updatePhysics: () => void;
  reset: () => void;
}
```

## Acceptance Criteria

### Layout & Content
1. Header Section
   - 显示游戏标题和开始按钮
2. Main Content Area
   - 居中显示小鸟和地面
3. Component Layout
   - 小鸟与地面分层渲染，按钮悬浮

### Functionality
1. 基本操作
   - [ ] 点击开始后小鸟出现并下坠
   - [ ] 点击屏幕/空格小鸟向上扑腾
   - [ ] 未操作时小鸟持续下坠
   - [ ] 小鸟掉落地面判定为失败

2. 状态管理
   - [ ] 游戏状态切换（未开始/进行中/失败）
   - [ ] 失败后弹窗提示并可重开

### Navigation Rules
- 仅主界面，无多页面跳转

### Error Handling
- 游戏异常时重置所有状态
- 防止多次点击导致状态错乱

## Modified Files
```
src/app/flappy-bird/
├── page.tsx ⬜
└── _components/
    ├── bird.tsx ⬜
    ├── ground.tsx ⬜
    ├── start-button.tsx ⬜
    └── useBird.ts ⬜
├── store/
│   └── bird-store.ts ⬜
└── types/
    └── bird-types.ts ⬜
```

## Status
🟨 IN PROGRESS

1. Setup & Configuration
   - [ ] 初始化项目结构
   - [ ] 配置基础样式
2. Layout Implementation
   - [ ] 小鸟与地面布局
   - [ ] 按钮布局
3. Feature Implementation
   - [ ] 小鸟物理与事件
   - [ ] 状态切换与判定
4. Testing
   - [ ] 交互测试
   - [ ] 状态测试

## Dependencies
- React/Next.js
- 状态管理库（可选）

## Related Stories
- FLAPPY-2 (障碍与得分)

## Notes
### Technical Considerations
1. 小鸟物理模拟需考虑重力与速度叠加
2. 事件监听需兼容移动端与桌面端
3. 状态切换需防止竞态
4. 组件解耦，便于后续扩展
5. UI 需自适应不同屏幕

### Business Requirements
- 游戏体验流畅，操作简单
- 失败后可快速重开

### API Integration
无

### Custom Hook Implementation
详见 useBird.ts

## Testing Requirements
- 交互与物理逻辑单元测试，覆盖率 80%+
- 响应式与边界测试
- 失败与重开流程测试
- 可访问性测试

🐱 喵～
