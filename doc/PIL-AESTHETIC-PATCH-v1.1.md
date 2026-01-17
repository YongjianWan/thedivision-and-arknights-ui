# Personal Interface Language — 美学补丁包 v1.1

> 对 PIL Specification v2.0 的补充
> 
> 聚焦"全息感"、"硬件质感"、"终端氛围"

---

## 补丁说明

本文档补充 v2.0 规范中缺失的美学维度。这些不是可选装饰，而是让界面从"网页"变成"终端"的关键要素。

**核心理念**：模拟光学和硬件的物理特性。

---

## 工程状态分析

> 基于 COMPONENTS.md v1.2（2026-01-17）

### 现有组件与补丁差距

| 组件 | P1 幽灵层 | P3 锚点 | P5 字重 | P7 构建动画 | 改造优先级 |
|------|----------|---------|---------|-------------|------------|
| **HUDMeter** | ❌ 缺失 | - | ⚠️ 未系统化 | - | 🔴 最高 |
| **TacticalPanel** | ❌ 标题缺 | ❌ L2/L3 缺 | - | ⚠️ 只有淡入 | 🔴 最高 |
| **Progress** | - | - | - | ⚠️ 非 steps() | 🟡 中 |
| **Card** | - | ⚠️ 可加 | - | ✓ 有 scale | 🟡 中 |
| **Modal** | - | ⚠️ 可加 | - | ⚠️ 只有 scale | 🟢 低 |
| **Table** | - | - | ⚠️ 表头可优化 | ✓ 有错开 | 🟢 低 |
| **StatusBar** | ⚠️ 可加 | - | - | ✓ 有淡入 | 🟢 低 |

### 完全缺失的系统

| 系统 | 状态 | 需要新增 |
|------|------|----------|
| P2 装饰性技术文本 | ❌ 完全缺失 | `TechDecor` 组件 + `useTechDecor` Hook |
| P4 全局噪点层 | ❌ 缺失 | `NoiseOverlay` 组件 |
| P6 透视视差 | ❌ 缺失 | `useParallax` Hook |
| P8 故障艺术 | ⚠️ 已移除 | 需重新定义触发条件后恢复 |

### 版本历史说明

v1.2 移除了 `glitch/hover-invert/clip-diamond/clip-hexagon`。这是对的——那些可能被滥用。本补丁的 P8 故障艺术有**严格的触发条件**，只在错误/告警时使用。

---

## P1：视觉纵深系统（Ghost Layer System）

### 原理

《全境封锁》的全息投影不是"贴纸"，是有厚度的光学投影。通过三层结构模拟这种纵深感。

### 三层结构

```
┌─────────────────────────────┐
│      幽灵层 (Ghost)         │  ← z-index: -1, blur, 极低透明度
│  ┌───────────────────────┐  │
│  │    主层 (Main)        │  │  ← z-index: 0, 正常渲染
│  │  ┌─────────────────┐  │  │
│  │  │  阴影层 (Shadow) │  │  │  ← z-index: -2, 黑色, 确保可读
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### 参数定义

| 层 | 不透明度 | 模糊 | 偏移 | 颜色 |
|----|----------|------|------|------|
| 主层 | 0.85-1.0 | 0 | 0 | 原色 |
| 阴影层 | 0.25-0.40 | 2-4px | Y +2px | `#000000` |
| 幽灵层 | 0.08-0.12 | 4-8px | Y -2px 或 X ±2px | 原色 或 accent |

### 应用场景

| 场景 | 是否启用 | 备注 |
|------|----------|------|
| HUD 读数 | ✓ | 必须，核心氛围 |
| 面板标题 | ✓ | L2/L3 级面板 |
| 关键数值 | ✓ | 大号数字 |
| 正文文本 | ✗ | 太杂乱 |
| 按钮文字 | ✗ | 保持清晰 |
| 装饰文本 | ✗ | 本身已经很淡 |

### 组件改造：HUDMeter

**当前状态**（v1.2）：
```tsx
// 只有基本的数字显示
<span className="text-4xl font-bold tabular-nums">
  {formattedValue}
</span>
```

**改造后**：
```tsx
<span 
  className="hud-value text-4xl font-bold tabular-nums"
  data-text={formattedValue}
>
  {formattedValue}
</span>

// CSS
.hud-value {
  position: relative;
}
.hud-value::before {
  content: attr(data-text);
  position: absolute;
  top: 2px;
  left: 0;
  color: #000;
  opacity: 0.3;
  filter: blur(3px);
  z-index: -2;
}
.hud-value::after {
  content: attr(data-text);
  position: absolute;
  top: -2px;
  left: 1px;
  color: var(--accent);
  opacity: 0.1;
  filter: blur(5px);
  z-index: -1;
}
```

### 组件改造：TacticalPanel 标题

**当前**：普通文字
**改造**：L2/L3 级面板的标题加幽灵层

```tsx
// TacticalPanel.tsx
{title && (level === 'L2' || level === 'L3') && (
  <h3 
    className="panel-title-ghost" 
    data-text={title}
  >
    {title}
  </h3>
)}
```

### Token 扩展

```json
{
  "ghost": {
    "shadow": {
      "opacity": 0.3,
      "blur": "3px",
      "offsetY": "2px",
      "color": "#000000"
    },
    "glow": {
      "opacity": 0.1,
      "blur": "5px",
      "offsetY": "-2px"
    }
  }
}
```

---

## P2：装饰性技术文本（Tech Decor）

### 原理

"正在运行的系统"需要视觉证据。跳动的十六进制、闪烁的状态码，这些"无意义"的信息作为**纹理**存在，暗示后台有数据在流动。

### 设计规则

| 属性 | 值 | 备注 |
|------|-----|------|
| 字号 | 9-11px | 不要求阅读 |
| 字体 | 等宽 (JetBrains Mono) | 必须 |
| 透明度 | 0.15-0.30 | 静态时 |
| 行高 | 1.2 | 紧凑 |
| 字重 | Light (300) | 不抢戏 |
| 大小写 | UPPERCASE | 更"系统" |

### 内容词库

**状态词**（静态或低频变化）：
```
SYSTEM_OK | BUFFER_READY | PROXY_INIT | CACHE_HIT
NODE_ACTIVE | LINK_STABLE | AUTH_VALID | SYNC_DONE
NULL_REF | IDLE_STATE | STANDBY | NOMINAL
```

**动态值**（可跳动）：
```
0x7F3A2E | 127.0.0.1:8080 | [OK] | ████░░
REF#4A2F | T+00:42:17 | 98.7% | >>
```

**坐标/编码**（填充用）：
```
LAT 31.2304 | LNG 121.4737 | ALT 4.2M
SEC_LEVEL_3 | CLEARANCE_ALPHA | ZONE_7
```

### 位置规则

```
┌────────────────────────────────────┐
│ SYS_OK  0x7F3A                     │  ← 顶部边缘
│ ┌────────────────────────────┐     │
│ │                            │     │
│ │       主内容区域            │     │
│ │                            │     │
│ └────────────────────────────┘     │
│                    NODE_7 | 127.0.0│  ← 底部边缘
└────────────────────────────────────┘
        ↑                        ↑
      角落                     角落
```

**放置原则**：
- 面板内边缘（padding 区域内）
- 大片留白区
- 角落（不遮挡主内容）
- **永远不要放在视觉焦点位置**

### 动态行为

| 状态 | 行为 |
|------|------|
| 静态 | 不动，或极慢呼吸（透明度 0.15↔0.25，周期 4s） |
| Hover | 字符开始跳动，150-200ms 间隔 |
| Loading | 高频跳动，80-100ms 间隔 |
| Error | 闪烁 + 变红，500ms 周期 |

### 新增组件：TechDecor

```tsx
// components/TechDecor.tsx
interface TechDecorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  active?: boolean;  // 是否激活跳动
  variant?: 'status' | 'hex' | 'coord';
  className?: string;
}

export function TechDecor({ 
  position = 'bottom-right',
  active = false,
  variant = 'status'
}: TechDecorProps) {
  const text = useTechDecor({ variant, active });
  return (
    <span className={cn(
      'tech-decor absolute text-[10px] font-mono font-light',
      'uppercase tracking-wider opacity-20',
      active && 'opacity-35',
      positionClasses[position]
    )}>
      {text}
    </span>
  );
}
```

### 新增 Hook：useTechDecor

```typescript
// hooks/useTechDecor.ts
const POOLS = {
  status: ['SYSTEM_OK', 'BUFFER_READY', 'NODE_ACTIVE', 'LINK_STABLE', 'NOMINAL'],
  hex: ['0x7F3A2E', '0xAB12CF', '0x00FF91', '0xE7D4B2'],
  coord: ['LAT 31.2304', 'LNG 121.4737', 'ALT 4.2M', 'ZONE_7'],
};

interface UseTechDecorOptions {
  variant?: 'status' | 'hex' | 'coord';
  active?: boolean;
  interval?: number;  // ms
}

export function useTechDecor(options: UseTechDecorOptions = {}): string {
  const { variant = 'status', active = false, interval = 150 } = options;
  const [text, setText] = useState(() => randomFrom(POOLS[variant]));

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setText(randomFrom(POOLS[variant]));
    }, interval);
    return () => clearInterval(timer);
  }, [active, variant, interval]);

  return text;
}
```

### Token 扩展

```json
{
  "techDecor": {
    "fontSize": "10px",
    "fontFamily": "var(--font-mono)",
    "fontWeight": 300,
    "opacity": {
      "static": 0.2,
      "hover": 0.35,
      "active": 0.45
    },
    "updateInterval": {
      "idle": 4000,
      "hover": 150,
      "loading": 80
    }
  }
}
```

---

## P3：锚点与连接线系统（Anchor & Guideline）

### 原理

战术界面的元素不是悬浮在虚空中的，它们被"锚定"在某个逻辑结构上。锚点和引导线暗示了这种连接关系。

### 锚点（Anchor）

**位置**：L2/L3 级容器的四角

```
┏━ ■                           ■ ━┓
┃                                 ┃
┃         容器内容                 ┃
┃                                 ┃
┗━ ■                           ■ ━┛
   ↑                           ↑
  锚点                        锚点
```

**尺寸与样式**：

| 容器等级 | 锚点尺寸 | 颜色 | 动态 |
|----------|----------|------|------|
| L2 | 3×3px | `border.strong` | 无 |
| L3 (焦点) | 4×4px | `accent` | 出现时 scale 0→1 |
| L3 (告警) | 4×4px | `danger` | 呼吸 (opacity 0.6↔1) |

**偏移**：距容器角 4-6px

### 组件改造：TacticalPanel

**当前**：只有边框
**改造**：L2/L3 加锚点

```tsx
// TacticalPanel.tsx 内部
{(level === 'L2' || level === 'L3') && (
  <>
    <span className="anchor anchor-tl" />
    <span className="anchor anchor-tr" />
    <span className="anchor anchor-bl" />
    <span className="anchor anchor-br" />
  </>
)}

// CSS
.anchor {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--border-strong);
}
.anchor-tl { top: 4px; left: 4px; }
.anchor-tr { top: 4px; right: 4px; }
.anchor-bl { bottom: 4px; left: 4px; }
.anchor-br { bottom: 4px; right: 4px; }

/* L3 焦点态 */
.panel-l3 .anchor {
  width: 4px;
  height: 4px;
  background: var(--accent);
  animation: anchor-appear 150ms ease-out;
}

@keyframes anchor-appear {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
```

### 引导线（Guideline）

**用途**：
- 连接父面板与子面板
- 连接选中项与详情面板
- 指示数据流向

**样式**：

| 属性 | 值 |
|------|-----|
| 宽度 | 0.5px |
| 颜色 | `border.weak` 或 `accent`@0.3 |
| 样式 | solid 或 dashed (间隔 4px) |
| 端点 | 可加小圆点 2px |

### 新增组件：Guideline

```tsx
// components/Guideline.tsx
interface GuidelineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  variant?: 'default' | 'accent';
  animated?: boolean;
}

export function Guideline({ from, to, variant = 'default', animated }: GuidelineProps) {
  // 计算路径（直角折线）
  const midY = (from.y + to.y) / 2;
  const path = `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
  
  return (
    <svg className="guideline-svg pointer-events-none absolute inset-0">
      <path
        d={path}
        stroke={variant === 'accent' ? 'var(--accent)' : 'var(--border-weak)'}
        strokeWidth="0.5"
        fill="none"
        strokeDasharray={animated ? '4 4' : 'none'}
        className={animated ? 'guideline-animated' : ''}
      />
      {/* 端点圆点 */}
      <circle cx={from.x} cy={from.y} r="2" fill="var(--border-strong)" />
      <circle cx={to.x} cy={to.y} r="2" fill="var(--border-strong)" />
    </svg>
  );
}
```

### Token 扩展

```json
{
  "anchor": {
    "size": {
      "default": "3px",
      "focused": "4px"
    },
    "offset": "4px",
    "color": {
      "default": "var(--border-strong)",
      "focused": "var(--accent)",
      "alert": "var(--danger)"
    }
  },
  "guideline": {
    "width": "0.5px",
    "color": "rgba(42, 58, 70, 0.5)",
    "dashArray": "4 4"
  }
}
```

---

## P4：材质叠加系统（Texture Overlay）

### 原理

纯色背景是"数字"的，叠加噪点和扫描线是"硬件"的。这些微小的瑕疵让界面看起来像是显示在真实设备上。

### 噪点层（Grain）

**作用**：模拟显示器像素颗粒感

| 属性 | 值 |
|------|-----|
| 位置 | 全局最顶层 |
| 透明度 | 0.02-0.05 |
| 混合模式 | `overlay` |
| 交互 | `pointer-events: none` |
| 尺寸 | 64×64px 平铺 |
| 动态 | 无（静态） |

**性能注意**：使用 CSS 平铺图片，不要用 JS 生成。

### 新增组件：NoiseOverlay

```tsx
// components/NoiseOverlay.tsx
export function NoiseOverlay() {
  return (
    <div 
      className="noise-overlay fixed inset-0 pointer-events-none z-[9999]"
      style={{
        backgroundImage: 'url(/textures/noise-64.png)',
        backgroundRepeat: 'repeat',
        opacity: 0.03,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// 在 App 根组件使用
function App() {
  return (
    <>
      <NoiseOverlay />
      {/* 其他内容 */}
    </>
  );
}
```

### 扫描线（Scanlines）

**作用**：模拟老式 CRT 显示器

| 属性 | 值 |
|------|-----|
| 方向 | 水平 |
| 间距 | 2px |
| 线宽 | 1px |
| 透明度 | 0.02-0.04 |
| 应用范围 | 仅特定组件（HUDMeter、全屏展示） |

**不要全局使用**——太多会让人眼花。

```css
.with-scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 3px
  );
}
```

### 色差（Chromatic Aberration）

**作用**：模拟镜头边缘 RGB 分离

**触发时机**（仅限以下场景）：
- 组件出现的瞬间（<100ms）
- 错误/告警状态
- 强交互（按钮按下）

**参数**：

| 属性 | 值 |
|------|-----|
| 位移 | 1-2px |
| 颜色 | 红/蓝分离 |
| 时长 | <100ms |
| 缓动 | linear 或 steps(2) |

```css
.chromatic-flash {
  animation: chromatic 80ms linear;
}

@keyframes chromatic {
  0% { text-shadow: -2px 0 rgba(255,0,0,0.5), 2px 0 rgba(0,255,255,0.5); }
  100% { text-shadow: none; }
}
```

### 暗角（Vignette）

**作用**：引导视线聚焦中心

**应用范围**：
- 全屏页面（登录、大屏展示）
- Modal 背景
- 不用于普通面板

```css
.vignette {
  box-shadow: inset 0 0 150px 50px rgba(0, 0, 0, 0.3);
}
```

### Token 扩展

```json
{
  "texture": {
    "grain": {
      "opacity": 0.03,
      "blendMode": "overlay",
      "image": "url(/textures/noise-64.png)"
    },
    "scanlines": {
      "opacity": 0.03,
      "spacing": "2px",
      "color": "rgba(0, 0, 0, 0.5)"
    },
    "chromatic": {
      "offset": "1px",
      "duration": "80ms"
    },
    "vignette": {
      "spread": "150px",
      "blur": "50px",
      "opacity": 0.3
    }
  }
}
```

---

## P5：字重信息等级映射（Typography Weight Hierarchy）

### 原理

字重不只是"好看不好看"，是信息优先级的视觉编码。粗 = 重要，细 = 次要。

### 等级定义

| 等级 | 字重 | 用途 | 抗缩放 |
|------|------|------|--------|
| Critical | 700-800 (Bold/Heavy) | 弹药数、HP、关键告警 | 极佳 |
| Primary | 500-600 (Medium) | 标题、名字、主要数值 | 良好 |
| Secondary | 400 (Regular) | 正文、描述、次要信息 | 一般 |
| Ambient | 300 (Light) | 装饰文本、背景大字 | 差（设计如此） |

### 字号与字重配合

| 场景 | 字号 | 字重 | 示例 |
|------|------|------|------|
| HUD 大数字 | 36-48px | 700 | `12,847` |
| 面板标题 | 16-20px | 600 | `SYSTEM MONITOR` |
| 列表标题 | 14px | 500 | `Node-Alpha` |
| 正文 | 14px | 400 | `Connection established` |
| 标签/元信息 | 12px | 400 | `Last updated: 2min ago` |
| 装饰文本 | 9-11px | 300 | `0x7F3A | SYS_OK` |
| 背景大字 | 48-72px | 300 | `TACTICAL` (作为纹理) |

### 规则

1. **字号越大，字重可以越轻**（因为笔画已经够粗）
2. **字号越小，字重必须越重**（防止模糊消失）
3. **装饰性大字用 Light**（不抢戏，作为纹理）
4. **功能性小字用 Medium+**（确保可读）

### 新增：衬线体装饰字

**用途**：背景超大装饰字，制造"骑士精神 × 冷酷科技"的张力。

```json
{
  "typography": {
    "fontFamily": {
      "sans": "Inter, -apple-system, sans-serif",
      "mono": "'JetBrains Mono', 'Fira Code', monospace",
      "display": "'DIN Alternate', 'Roboto Condensed', sans-serif",
      "decorSerif": "'Didot', 'Playfair Display', 'Times New Roman', serif"
    }
  }
}
```

**使用场景**：
```css
.ambient-title {
  font-family: var(--font-decor-serif);
  font-size: 64px;
  font-weight: 300;
  opacity: 0.05;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

**何时用**：
- 页面背景的超大标题（如 "TACTICAL"、"SYSTEM"）
- 登录页的品牌感装饰
- 英雄区域的氛围字

**何时不用**：
- 功能性文字
- 小字号
- 需要快速阅读的场景

### Token 扩展

```json
{
  "typography": {
    "weight": {
      "critical": 700,
      "primary": 500,
      "secondary": 400,
      "ambient": 300
    },
    "presets": {
      "hudValue": {
        "fontSize": "36px",
        "fontWeight": 700,
        "fontFamily": "var(--font-display)",
        "fontFeatureSettings": "'tnum' 1"
      },
      "panelTitle": {
        "fontSize": "16px",
        "fontWeight": 600,
        "textTransform": "uppercase",
        "letterSpacing": "0.05em"
      },
      "techDecor": {
        "fontSize": "10px",
        "fontWeight": 300,
        "fontFamily": "var(--font-mono)",
        "textTransform": "uppercase"
      },
      "ambientLarge": {
        "fontSize": "64px",
        "fontWeight": 300,
        "fontFamily": "var(--font-decor-serif)",
        "opacity": 0.05,
        "letterSpacing": "0.1em"
      }
    }
  }
}
```

---

## P6：透视与视差系统（Perspective & Parallax）

### 原理

Diegetic UI（画内界面）的核心：UI 不是贴在屏幕上的平面，是悬浮在 3D 空间中的投影。

### 静态透视

**适用**：装饰性面板、背景元素、非交互 UI

```css
.perspective-panel {
  transform: perspective(1000px) rotateY(-2deg) rotateX(1deg);
  transform-origin: center center;
}
```

**参数范围**：
- `rotateY`: -5° ~ +5°
- `rotateX`: -3° ~ +3°
- `perspective`: 800-1200px

**规则**：
- 功能性 UI 不加透视（影响点击）
- 装饰性背景可以加
- 一个页面最多 1-2 个透视元素

### 动态视差（鼠标跟随）

**适用**：英雄区域、登录页、大屏展示

**逻辑**：鼠标向左移 → UI 层向右微移（反向）

### 新增 Hook：useParallax

```typescript
// hooks/useParallax.ts
interface UseParallaxOptions {
  intensity?: number;  // 0-1, 默认 0.5
  enabled?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { intensity = 0.5, enabled = true } = options;
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!enabled) return;
    
    const handleMouseMove = throttle((e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = ((e.clientX - centerX) / centerX) * -20 * intensity;
      const y = ((e.clientY - centerY) / centerY) * -10 * intensity;
      setOffset({ x, y });
    }, 16); // 60fps
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity, enabled]);
  
  return {
    x: offset.x,
    y: offset.y,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: 'transform 0.1s ease-out',
    }
  };
}
```

**使用**：
```tsx
function HeroSection() {
  const parallax = useParallax({ intensity: 0.3 });
  
  return (
    <div className="hero-bg" style={parallax.style}>
      {/* 背景内容 */}
    </div>
  );
}
```

### 规则

| 场景 | 透视 | 视差 |
|------|------|------|
| 功能性 UI | ✗ | ✗ |
| 装饰性背景 | ✓ | ✓ |
| 英雄/展示区 | ✓ | ✓ |
| Modal/Drawer | ✗ | ✗ |

### Token 扩展

```json
{
  "parallax": {
    "intensity": {
      "foreground": 20,
      "midground": 10,
      "background": 5
    },
    "spring": {
      "stiffness": 100,
      "damping": 20
    }
  },
  "perspective": {
    "distance": "1000px",
    "maxRotateY": "5deg",
    "maxRotateX": "3deg"
  }
}
```

---

## P7：构建式出现（Construction Animation）

### 原理

全息投影和战术终端是"绘制"出来的，不是"淡入"的。

### 三阶段模型

```
阶段1: 点 (Points)     → 锚点/关键位置先出现
阶段2: 线 (Lines)      → 边框/轮廓从点延伸绘制
阶段3: 面 (Surfaces)   → 内容填充/文字显现
```

### 时序参考

| 阶段 | 时长 | 触发 |
|------|------|------|
| 锚点出现 | 80ms | 立即 |
| 边框绘制 | 150-200ms | 锚点后 |
| 内容填充 | 180-250ms | 边框完成后 |

**总时长**：400-500ms

### 组件改造：TacticalPanel

**当前**（v1.2）：
```tsx
// 只有淡入 + scale
initial={{ opacity: 0, scale: 0.98 }}
animate={{ opacity: 1, scale: 1 }}
```

**改造后**：
```tsx
const panelVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const anchorVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.08 } }
};

const borderVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.15 } }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } }
};
```

### SVG 边框绘制

```css
.line-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 150ms ease-out forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

---

## P8：故障艺术系统（Glitch System）

### 原理

《全境封锁》的设计哲学："UI 是有瑕疵的软件"。

### ⚠️ 重要：触发条件严格限定

v1.2 移除了 glitch 效果是正确的决定——滥用会很烦人。

**只在以下场景使用**：

| 场景 | 强度 | 时长 | 次数 |
|------|------|------|------|
| 网络错误/超时 | 中等 | 200ms | 1次 |
| 严重告警出现 | 强烈 | 300ms | 1次 |
| 数据损坏提示 | 强烈 | 400ms | 1次 |

**禁止使用**：
- 正常 hover
- 成功状态
- 常驻显示
- 大面积应用

### 效果类型

#### 色差抖动（仅错误时）

```css
@keyframes chromatic-error {
  0%, 100% { text-shadow: none; }
  25% { text-shadow: -2px 0 rgba(255,0,0,0.5), 2px 0 rgba(0,255,255,0.5); }
  50% { text-shadow: 2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,255,255,0.5); }
  75% { text-shadow: -1px 0 rgba(255,0,0,0.5), 1px 0 rgba(0,255,255,0.5); }
}

.error-glitch {
  animation: chromatic-error 200ms steps(4);
}
```

### 参数限制

| 参数 | 最大值 | 原因 |
|------|--------|------|
| 位移 | 3px | 保持可读 |
| 时长 | 400ms | 不能让人烦躁 |
| 频率 | 每状态变化最多 1 次 | 克制 |

### Token 扩展

```json
{
  "glitch": {
    "offset": {
      "light": "1px",
      "medium": "2px",
      "heavy": "3px"
    },
    "duration": {
      "flash": "80ms",
      "short": "200ms",
      "long": "400ms"
    },
    "timing": "steps(4)"
  }
}
```

---

## P9：量化缓动系统（Quantized Easing）

### 原理

真实的战术设备有数据传输的量化过程——不是平滑的，是一格一格跳的。

### steps() 缓动

**适用组件**：Progress、数值变化、加载指示

**当前 Progress**（v1.2）：
```css
transition: width 320ms cubic-bezier(0.4, 0, 0.2, 1);
```

**改造后**：
```css
/* 量化模式 - 适合"数据传输"感 */
.progress-quantized {
  transition: width 300ms steps(8);
}

/* 平滑模式 - 适合"能量充填"感 */
.progress-smooth {
  transition: width 320ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 组件改造：Progress

```tsx
interface ProgressProps {
  // ... 现有 props
  easing?: 'smooth' | 'quantized';
}

// 默认 quantized，更有"硬件感"
```

### 适用场景

| 场景 | 推荐缓动 | 原因 |
|------|----------|------|
| 文件下载进度 | `steps(10)` | 模拟数据包到达 |
| 技能冷却 | `linear` | 均匀消耗 |
| 能量充填 | `cubic-bezier` | 物理加速感 |
| 加载百分比 | `steps(5)` | 阶段式反馈 |

### Token 扩展

```json
{
  "motion": {
    "easing": {
      "default": "cubic-bezier(0.4, 0, 0.2, 1)",
      "enter": "cubic-bezier(0, 0, 0.2, 1)",
      "exit": "cubic-bezier(0.4, 0, 1, 1)",
      "quantized": "steps(8)",
      "quantizedFine": "steps(16)"
    }
  }
}
```

---

## 验收补充清单

在 v2.0 的验收清单基础上，增加以下检查项：

### 纵深感
- [ ] HUDMeter 数值有幽灵层？
- [ ] L2/L3 面板标题有幽灵层？

### 装饰文本
- [ ] 有适量的技术装饰文字？
- [ ] 装饰文字没有抢戏？
- [ ] 透明度足够低（≤0.3）？

### 锚点与连接
- [ ] L2/L3 容器有角落锚点？
- [ ] 父子面板有视觉连接（如需要）？

### 材质
- [ ] 全局噪点层存在但不明显？
- [ ] 色差只在错误时触发？

### 字重
- [ ] 信息等级通过字重区分？
- [ ] Critical 数值用 700？
- [ ] 装饰文本用 300？

### 构建动画
- [ ] L2/L3 面板是"绘制"而不是"淡入"？
- [ ] 有清晰的点→线→面节奏？

### 量化缓动
- [ ] Progress 使用了 steps()？
- [ ] 缓动选择符合场景语义？

---

## 改造优先级路线图

### Phase 1：核心氛围（1-2 天）

1. **HUDMeter 加幽灵层**
   - 改动量：小
   - 效果：立竿见影

2. **全局 NoiseOverlay**
   - 改动量：新增 1 个组件
   - 效果：整体质感提升

3. **Progress 改 steps()**
   - 改动量：1 行 CSS
   - 效果：硬件感增强

### Phase 2：结构强化（2-3 天）

4. **TacticalPanel L2/L3 加锚点**
   - 改动量：中
   - 效果：战术感显著提升

5. **TacticalPanel 构建动画**
   - 改动量：中
   - 效果：从"网页"变"终端"

6. **字重系统化**
   - 改动量：Token + 各组件微调
   - 效果：信息层级更清晰

### Phase 3：氛围点缀（按需）

7. **TechDecor 组件**
   - 改动量：新增组件 + Hook
   - 效果：填充感、运行感

8. **Guideline 组件**
   - 改动量：新增组件
   - 效果：连接逻辑可视化

9. **useParallax Hook**
   - 改动量：新增 Hook
   - 效果：英雄区域沉浸感

10. **故障艺术（错误态）**
    - 改动量：CSS + 触发逻辑
    - 效果：错误反馈更有冲击力

---

## 与 v2.0 的整合说明

本补丁不修改 v2.0 的任何现有规则，而是**补充**以下维度：

| v2.0 章节 | 本补丁补充 |
|-----------|-----------|
| 视觉语法 | P1 纵深系统, P3 锚点连接 |
| Design Tokens | 各章节的 Token 扩展 |
| 组件规范 | P2 TechDecor, P4 NoiseOverlay |
| 动效系统 | P7 构建动画, P8 故障艺术, P9 量化缓动 |
| 排版 | P5 字重等级映射 |
| - | P4 材质系统（新章节） |
| - | P6 透视视差（新章节） |

建议在 v2.1 中将本补丁内容整合进主规范。

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-17 | 初始发布：P1-P8 |
| 1.1 | 2026-01-17 | 新增 P9 量化缓动；新增工程状态分析；新增组件改造示例；新增衬线体装饰字；新增改造路线图 |
