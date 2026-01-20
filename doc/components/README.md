# 战术界面组件库

> Personal Interface System Components
> 
> 基于 React + TypeScript + Framer Motion 实现的"近未来科幻风"组件库

---

## 快速开始

### 安装依赖

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

### 基础用法

```tsx
import { Button, TacticalPanel, Select } from '@/components';

function App() {
  return (
    <TacticalPanel title="Control Center" level="L2">
      <Button variant="primary">Execute</Button>
    </TacticalPanel>
  );
}
```

---

## 组件清单

### 布局与容器
- [TacticalPanel](./tactical-panel.md) - 战术面板，支持 L0-L3 边框等级
- [Card](./card.md) - 卡片容器，支持选中态和标签
- [GridBackground](./grid-background.md) - 全屏网格背景层

### 基础控件
- [Button](./button.md) - 按钮，支持 primary/secondary/ghost/danger
- [Input](./input.md) - 输入框
- [Select](./select.md) - 下拉选择器，带 LineDraw 动效
- [Checkbox/Radio/Switch](./form-controls.md) - 表单控件三件套

### 反馈与交互
- [Modal](./modal.md) - 弹窗，支持焦点锁定
- [Drawer](./drawer.md) - 抽屉，左/右滑入
- [Tooltip](./tooltip.md) - 提示气泡
- [Toast](./toast.md) - 轻提示（TODO）
- [Progress](./progress.md) - 进度条
- [Spinner](./spinner.md) - 加载器

### 数据展示
- [Table](./table.md) - 数据表格，支持排序和行状态
- [HUDMeter](./hudmeter.md) - 仪表读数组件
- [StatusBar](./status-bar.md) - 状态栏

### 导航
- [Tabs](./tabs.md) - 标签页切换
- [Breadcrumb](./breadcrumb.md) - 面包屑导航

### 效果组件
- [ScanSweep](./scan-sweep.md) - 扫描效果
- [Typewriter](./typewriter.md) - 打字机效果
- [ParticleField](./particle-field.md) - Three.js 粒子场
- [Ping](./ping.md) - 脉冲动画
- [SoftGlitch](./soft-glitch.md) - 软故障效果
- [NoiseOverlay](./noise-overlay.md) - 全局噪点层 (P4 美学补丁)

---

## 设计原则

### 1. 信息层级

- **Level 0 (Metadata)**: 小字 (9-11px)，低透明度 (0.15-0.3)，技术细节
- **Level 1 (Content)**: 标准边框 (0.5px)，常规内容
- **Level 2 (Focus)**: 粗边框 (2px outer + 0.5px inner)，重要容器
- **Level 3 (Critical)**: Accent 边框 (2px)，焦点/告警

### 2. Ghost Layer 系统

HUD 数值/标题使用三层投影模拟全息效果：
- Main Layer: 文字本体
- Shadow Layer: 黑色阴影 (Y+2px, blur 3px, opacity 0.3)
- Ghost Layer: Accent 色重影 (Y-2px, X+1px, blur 5px, opacity 0.1)

### 3. 动效时长

| 场景 | 时长 | 常量 |
|------|------|------|
| Hover/Focus | 100-150ms | `MOTION.duration.fast` |
| 点击反馈 | 80ms | `MOTION.duration.instant` |
| 面板展开 | 220ms | `MOTION.duration.base` |
| 页面切换 | 320ms | `MOTION.duration.slow` |

### 4. 强调色规则

**Accent (`#FF6A00`) 只用于：**
- 当前焦点/可操作项
- 关键告警
- 选中状态
- 关键数值指示

**禁止：**
- 大面积背景填充
- 装饰性图形
- 次要信息

### 5. 性能降级

通过 `usePerformanceMode()` 实现三档渲染：
- **full**: 噪点纹理 + 模糊 + 12 粒子 + 完整动效
- **reduced**: 无噪点 + 静态模糊 + 6 粒子
- **minimal**: 纯色背景 + 瞬时过渡

---

## 颜色系统

```typescript
// 背景
bg.base: #0B0E12
bg.elevated: #101622

// 文字
text.primary: #E6EDF3
text.secondary: #9AA6B2
text.disabled: #4A5568

// 边框
border.strong: #3A4A5A
border.weak: rgba(42, 58, 70, 0.5)

// 强调色
accent: #FF6A00
danger: #FF3B30
success: #32D74B
warning: #B8860B
```

所有颜色定义在 `tokens.json`，通过 `generate-tokens.mjs` 生成到 `src/app/tokens.css` 和 `tailwind.config.js`。

---

## 工具函数

### cn(...inputs)

类名合并工具，基于 `clsx` 和 `tailwind-merge`。

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  className
)} />
```

### MOTION

动效配置常量。

```tsx
import { MOTION } from '@/lib/motion';

transition={{ 
  duration: MOTION.duration.base, 
  ease: MOTION.easing.default 
}}
```

### 预设动效

```tsx
import { fadeIn, slideInFromRight, scaleIn, ping } from '@/lib/motion';

<motion.div {...fadeIn}>
  Content
</motion.div>
```

---

## 最佳实践

### 1. 组件命中区域

- 移动端/触屏：最小 **44×44px**
- 桌面（有 hover）：最小 **32×32px**
- 密集工具栏：最小 **28×28px**（必须有 hover 态）

### 2. 同屏动效数量

**≤ 2 个动效同时播放**

### 3. Modal/Drawer 打开时

**冻结所有背景层动效**（已在 Modal 组件中实现 `overflow: hidden`）

### 4. Loading 完成反馈

加载完成瞬间：**Ping 一次 (120ms)**

```tsx
<motion.div animate={loading ? {} : ping}>
  {content}
</motion.div>
```

---

## 扩展开发

### 添加新组件

1. 在 `src/components/` 创建文件 `ComponentName.tsx`
2. 遵循设计规范（边框、动效、状态）
3. 使用 Framer Motion 实现动效
4. 导出到 `src/components/index.ts`
5. 在 `doc/components/` 创建对应文档

### 自定义 Token

修改 `tokens.json`，然后运行：

```bash
node scripts/generate-tokens.mjs
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-15 | 初始发布：基础控件 + 布局容器 |
| 1.1 | 2026-01-16 | Table/Tooltip/Drawer/Breadcrumb，改进焦点管理 |
| 1.2 | 2026-01-17 | ParticleField (Three.js) |
