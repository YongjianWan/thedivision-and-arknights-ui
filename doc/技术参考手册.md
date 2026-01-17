# Personal Interface System - 技术参考手册

> Technical Reference Manual v2.0
> 
> 完整的 Token 规范、组件 API、CSS 工具类、效果使用说明

---

## 目录

1. [Design Tokens 规范](#1-design-tokens-规范)
2. [CSS 变量映射](#2-css-变量映射)
3. [组件 API 参考](#3-组件-api-参考)
4. [CSS 工具类清单](#4-css-工具类清单)
5. [特效系统](#5-特效系统)
6. [字体系统](#6-字体系统)
7. [动画系统](#7-动画系统)

---

## 1. Design Tokens 规范

所有设计值的单一真相源：`tokens.json`

### 1.1 颜色 (Color)

#### 背景色
| Token | 值 | 用途 |
|-------|-----|------|
| `color.bg.base` | `#0B0E12` | 页面底层背景 |
| `color.bg.elevated` | `#101622` | 卡片/面板背景 |
| `color.bg.overlay` | `rgba(10, 14, 18, 0.75)` | 遮罩层 |

#### 文字色
| Token | 值 | 用途 |
|-------|-----|------|
| `color.text.primary` | `#E6EDF3` | 主要文字 |
| `color.text.secondary` | `#9AA6B2` | 次要/辅助文字 |
| `color.text.disabled` | `#4A5568` | 禁用状态文字 |

#### 边框色
| Token | 值 | 用途 |
|-------|-----|------|
| `color.border.strong` | `#3A4A5A` | 明显边框 |
| `color.border.weak` | `rgba(42, 58, 70, 0.5)` | 弱化边框 |

#### 强调色
| Token | 值 | 用途 |
|-------|-----|------|
| `color.accent` | `#FF6A00` | 主强调色（橙） |
| `color.accentHover` | `#FF7A1A` | 主强调色悬停态 |
| `color.accentAlt` | `#18D1FF` | 备选强调色（青蓝，明日方舟风格） |
| `color.accentAltHover` | `#4ADCFF` | 备选强调色悬停态 |

#### 语义色
| Token | 值 | 用途 |
|-------|-----|------|
| `color.danger` | `#FF3B30` | 危险/错误 |
| `color.dangerMuted` | `#CC2F28` | 危险色悬停态 |
| `color.success` | `#32D74B` | 成功 |
| `color.successMuted` | `#1A5C28` | 成功色低调版 |
| `color.warning` | `#B8860B` | 警告 |
| `color.warningMuted` | `#8B6914` | 警告色低调版 |

#### 反色（明日方舟风格 hover 效果）
| Token | 值 | 用途 |
|-------|-----|------|
| `color.invert.fg` | `#000000` | 反色前景 |
| `color.invert.bg` | `#FFFFFF` | 反色背景 |

### 1.2 间距 (Spacing)

| Token | 值 | 用途 |
|-------|-----|------|
| `spacing.micro` | `4px` | 最小间距 |
| `spacing.sm` | `8px` | 小间距 |
| `spacing.md` | `16px` | 标准间距 |
| `spacing.lg` | `24px` | 大间距 |
| `spacing.xl` | `32px` | 超大间距 |
| `spacing.2xl` | `48px` | 极大间距 |

### 1.3 边框 (Border)

#### 宽度
| Token | 值 | 用途 |
|-------|-----|------|
| `border.width.thin` | `0.5px` | 细线（L1 面板） |
| `border.width.base` | `1px` | 标准边框 |
| `border.width.thick` | `2px` | 粗边框（L2 面板） |
| `border.width.heavy` | `3px` | 重边框（L3 面板） |

#### 圆角
| Token | 值 | 用途 |
|-------|-----|------|
| `border.radius.none` | `0` | 无圆角（战术风格） |
| `border.radius.sm` | `2px` | 微圆角 |
| `border.radius.md` | `4px` | 标准圆角 |
| `border.radius.lg` | `6px` | 大圆角 |

### 1.4 排版 (Typography)

#### 字体族
| Token | 值 | 用途 |
|-------|-----|------|
| `typography.fontFamily.sans` | Inter, system fonts | 正文 |
| `typography.fontFamily.mono` | JetBrains Mono | 代码/数据 |
| `typography.fontFamily.display` | DIN Alternate, Roboto Condensed | 标题 |

#### 字号
| Token | 值 | 用途 |
|-------|-----|------|
| `typography.fontSize.micro` | `11px` | 最小文字 |
| `typography.fontSize.meta` | `12px` | 元信息 |
| `typography.fontSize.body` | `14px` | 正文 |
| `typography.fontSize.h3` | `16px` | 三级标题 |
| `typography.fontSize.h2` | `20px` | 二级标题 |
| `typography.fontSize.h1` | `28px` | 一级标题 |
| `typography.fontSize.display` | `36px` | 展示级 |

### 1.5 过渡 (Transition)

| Token | 值 | 用途 |
|-------|-----|------|
| `transition.fast` | `0.2s` | 快速反馈（hover） |
| `transition.base` | `0.3s` | 标准过渡 |
| `transition.slow` | `0.6s` | 慢速过渡（模态/大型动画） |

---

## 2. CSS 变量映射

在 `globals.css` 中定义，可直接在 CSS/Tailwind 中使用：

```css
:root {
  /* 背景 */
  --bg-base: #0B0E12;
  --bg-elevated: #101622;
  --bg-overlay: rgba(10, 14, 18, 0.75);

  /* 文字 */
  --text-primary: #E6EDF3;
  --text-secondary: #9AA6B2;
  --text-disabled: #4A5568;

  /* 边框 */
  --border-strong: #3A4A5A;
  --border-weak: rgba(42, 58, 70, 0.5);

  /* 强调色 */
  --accent: #FF6A00;
  --accent-hover: #FF7A1A;
  --accent-alt: #18D1FF;
  --accent-alt-hover: #4ADCFF;

  /* 语义色 */
  --danger: #FF3B30;
  --danger-muted: #CC2F28;
  --success: #32D74B;
  --success-muted: #1A5C28;
  --warning: #B8860B;
  --warning-muted: #8B6914;

  /* 反色 */
  --invert-fg: #000000;
  --invert-bg: #ffffff;

  /* RGB 分量（用于 rgba()） */
  --bg-base-rgb: 11 14 18;
  --border-strong-rgb: 58 74 90;
  --accent-rgb: 255 106 0;
  --accent-alt-rgb: 24 209 255;

  /* 过渡 */
  --transition-fast: 0.2s;
  --transition-base: 0.3s;
  --transition-slow: 0.6s;
}
```

### 使用方式

```css
/* CSS */
.my-element {
  background-color: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  color: var(--accent);
}

/* Tailwind */
<div className="bg-[var(--bg-elevated)] border-[var(--border-strong)] text-[var(--accent)]" />
```

---

## 3. 组件 API 参考

### 3.1 Button

```tsx
import { Button } from '@/components';
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'tactical' \| 'inverted'` | `'secondary'` | 按钮样式 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（均为 44px 高） |
| `loading` | `boolean` | `false` | 加载状态 |
| `disabled` | `boolean` | `false` | 禁用状态 |

#### Variants

| Variant | 描述 | 颜色 |
|---------|------|------|
| `primary` | 主操作 | 橙色填充 `--accent` |
| `secondary` | 次要操作 | 透明 + 边框 |
| `ghost` | 无边框 | 纯文字 |
| `danger` | 危险操作 | 红色填充 `--danger` |
| `tactical` | 科技风格（新） | 青蓝填充 `--accent-alt` |
| `inverted` | 反色（新） | 白边框，hover 反转黑白 |

#### 示例

```tsx
<Button variant="primary">Execute</Button>
<Button variant="tactical">Tactical</Button>
<Button variant="inverted">Inverted</Button>
<Button loading>Loading</Button>
```

---

### 3.2 TacticalPanel

```tsx
import { TacticalPanel } from '@/components';
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 面板标题 |
| `level` | `'L0' \| 'L1' \| 'L2' \| 'L3'` | `'L1'` | 边框等级 |
| `statusIndicator` | `'ok' \| 'warn' \| 'err' \| 'busy'` | - | 状态指示点 |
| `className` | `string` | - | 自定义类名 |
| `children` | `ReactNode` | - | 内容 |

#### 边框等级

- **L0**：无边框
- **L1**：细边框 (0.5px)
- **L2**：双层边框（外粗内细）
- **L3**：强调色边框

---

### 3.3 HUDMeter

```tsx
import { HUDMeter } from '@/components';
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | - | 当前值 |
| `max` | `number` | `100` | 最大值 |
| `label` | `string` | - | 标签 |
| `unit` | `string` | `''` | 单位 |
| `variant` | `'default' \| 'accent' \| 'warn' \| 'danger'` | `'accent'` | 颜色变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

#### 示例

```tsx
<HUDMeter value={12847} max={20000} label="REQUESTS" unit="/min" variant="accent" />
```

---

### 3.4 Typewriter（新）

```tsx
import { Typewriter, TypewriterLines } from '@/components';
```

#### Typewriter Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | - | 要打印的文字 |
| `speed` | `number` | `50` | 每字符毫秒数 |
| `delay` | `number` | `0` | 开始前延迟(ms) |
| `cursor` | `boolean` | `true` | 显示光标 |
| `onComplete` | `() => void` | - | 完成回调 |

#### TypewriterLines Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lines` | `string[]` | - | 多行文字数组 |
| `speed` | `number` | `40` | 每字符毫秒数 |
| `lineDelay` | `number` | `200` | 行间延迟(ms) |

#### 示例

```tsx
{/* 单行打字机 */}
<Typewriter text="SYSTEM ONLINE." speed={40} />

{/* 多行打字机 */}
<TypewriterLines 
  lines={[
    '> Initializing...',
    '> Loading modules...',
    '> System ready.',
  ]}
  speed={30}
  lineDelay={300}
/>
```

---

### 3.5 其他组件

| 组件 | 导入 | 用途 |
|------|------|------|
| `Select` | `@/components` | 下拉选择 |
| `Checkbox` | `@/components` | 复选框 |
| `Radio` | `@/components` | 单选框 |
| `Switch` | `@/components` | 开关 |
| `Modal` | `@/components` | 模态框 |
| `Tabs` | `@/components` | 标签页 |
| `Progress` | `@/components` | 进度条 |
| `Spinner` | `@/components` | 加载指示器 |
| `Card` | `@/components` | 卡片 |
| `StatusBar` | `@/components` | 顶部状态栏 |
| `ScanSweep` | `@/components` | 入场扫描效果 |
| `GridBackground` | `@/components` | 战术网格背景 |

---

## 4. CSS 工具类清单

### 4.1 过渡时长

```css
.transition-fast   /* 0.2s */
.transition-base   /* 0.3s */
.transition-slow   /* 0.6s */
```

### 4.2 发光效果

```css
.glow-accent       /* 主强调色发光 */
.glow-accent-alt   /* 青蓝色发光 */
.border-glow-pulse /* 边框呼吸发光动画 */
```

### 4.4 毛玻璃

```css
.backdrop-blur-panel  /* 12px 模糊 */
```

### 4.3 切角形状

| 类名 | 效果 |
|------|------|
| `.clip-corner-tr` | 右上角切 12px |
| `.clip-corner-br` | 右下角切 12px |
| `.clip-corner-both` | 右上+右下切角 |
| `.clip-chevron` | 箭头形（右侧 16px 箭头） |

```html
<div class="clip-corner-both bg-[var(--bg-elevated)] p-4">
  切角卡片
</div>
```

### 4.4 边框扫描动画

```css
.border-scan  /* 光线沿边框扫描 */
```

需要在元素上设置 `position: relative` 和 `overflow: hidden`（类已包含）。

### 4.5 噪点叠加

```css
.noise-overlay  /* 静态噪点纹理 */
```

```html
<div class="noise-overlay bg-[var(--bg-elevated)] p-6">
  <span class="relative z-10">内容在噪点上方</span>
</div>
```

### 4.9 字体类

```css
.font-hud       /* Orbitron - HUD 数字字体 */
.font-tactical  /* Rajdhani - 战术风格字体 */
```

---

## 5. 特效系统

### 5.1 入场扫描 (ScanSweep)

```tsx
import { ScanSweep } from '@/components';

const [showScan, setShowScan] = useState(true);

{showScan && <ScanSweep onComplete={() => setShowScan(false)} />}
```

### 5.2 战术网格背景 (GridBackground)

```tsx
import { GridBackground } from '@/components';

<GridBackground />
```

包含：
- 网格线
- 浮动粒子（12个，CSS 动画驱动）
- 扫描线
- 雷达指示器
- 渐变边缘

### 5.3 扫描线覆盖 (Scanline Overlay)

已在 `layout.tsx` 全局应用：

```html
<div class="scanline-overlay">
  <div class="absolute inset-0" />
</div>
```

---

## 6. 字体系统

### 6.1 已加载字体

| 字体 | CSS 变量 | 类名 | 用途 |
|------|----------|------|------|
| Roboto Condensed | `--font-display` | - | 标题 |
| JetBrains Mono | `--font-mono` | - | 代码/等宽 |
| Orbitron | `--font-hud` | `.font-hud` | HUD 数字 |
| Rajdhani | `--font-tactical` | `.font-tactical` | 战术文字 |

### 6.2 使用方式

```tsx
{/* Tailwind style 属性 */}
<span style={{ fontFamily: 'var(--font-hud)' }}>12,847</span>

{/* 或使用工具类 */}
<span className="font-hud">12,847</span>
```

---

## 7. 动画系统

### 7.1 Framer Motion 预设

定义在 `src/lib/motion.ts`：

```ts
export const MOTION = {
  duration: {
    instant: 0.08,
    fast: 0.15,
    base: 0.22,
    slow: 0.4,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    out: [0, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
  },
};
```

### 7.2 CSS Keyframes

| 动画名 | 用途 |
|--------|------|
| `grid-scan` | 背景扫描线移动 |
| `grid-particle-fall` | 粒子下落 |
| `border-glow` | 边框呼吸发光 |
| `border-scan-h` | 水平边框扫描 |
| `border-scan-v` | 垂直边框扫描 |

### 7.3 使用建议

| 场景 | 推荐方案 |
|------|----------|
| 组件交互（点击、hover） | Framer Motion |
| 持续循环动画 | CSS Keyframes |
| 入场动画 | Framer Motion `AnimatePresence` |
| 性能敏感场景 | CSS Keyframes |

---

## 附录：文件结构

```
src/
├── app/
│   ├── globals.css          # CSS 变量 + 工具类
│   ├── layout.tsx            # 字体加载 + 全局布局
│   ├── page.tsx              # 首页
│   ├── login/page.tsx        # 登录页
│   ├── dashboard/page.tsx    # 监控面板
│   ├── operator/page.tsx     # 干员详情
│   ├── battle/page.tsx       # 作战准备
│   └── particle/page.tsx     # 粒子效果演示
├── components/
│   ├── index.ts              # 统一导出
│   ├── Button.tsx
│   ├── TacticalPanel.tsx
│   ├── HUDMeter.tsx
│   ├── Typewriter.tsx
│   ├── Modal.tsx
│   ├── Select.tsx
│   ├── Tabs.tsx
│   ├── Progress.tsx
│   ├── Card.tsx
│   ├── FormControls.tsx
│   ├── StatusBar.tsx
│   ├── ScanSweep.tsx
│   ├── GridBackground.tsx
│   ├── Table.tsx
│   ├── Tooltip.tsx
│   ├── Drawer.tsx
│   ├── Breadcrumb.tsx
│   └── ParticleField.tsx     # Three.js 粒子效果
├── lib/
│   ├── motion.ts             # 动画预设
│   └── utils.ts              # 工具函数
└── tokens.json               # Design Tokens 源
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.0.0 | 2026-01-15 | 初始版本 |
| 2.1.0 | 2026-01-15 | 新增 accentAlt、transition tokens、Typewriter 组件、切角/边框扫描效果 |
| 2.2.0 | 2026-01-16 | 新增 Table/Tooltip/Drawer/Breadcrumb/ParticleField 组件；移除 glitch/clip-diamond/clip-hexagon/hover-invert |

---

*Generated by Personal Interface System*
