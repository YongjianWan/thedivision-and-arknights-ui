# Personal Interface Language — 美学与交互规范 v2.0

> 文件状态：Ready for Implementation  
> 适用版本：基于 COMPONENTS.md v1.2  
> 核心目标：注入"光学纵深"、"硬件质感"、"终端氛围"与"交互深度"

---

## 工程现状诊断

基于 COMPONENTS.md v1.2，目前处于"功能完备但缺乏灵魂"的阶段：

| 组件/系统 | 当前状态 | 补丁目标 | 优先级 |
|-----------|----------|----------|--------|
| HUDMeter | 纯数字显示 | 添加幽灵层、扫描线 | 🔴 High |
| TacticalPanel | 只有边框 | L2/L3 级锚点系统 | 🔴 High |
| Progress | 默认缓动 | 量化缓动 (steps) | 🟨 Med |
| 装饰系统 | 无 | TechDecor 组件 | 🔴 High |
| 环境氛围 | 干净背景 | 全局噪点层 | 🟨 Med |
| 故障效果 | 已移除 | 仅在 Error/Critical 受控开启 | 🟩 Low |

---

## 第一章：视觉美学系统

### 1.1 视觉纵深系统（Ghost Layer System）

**原理**：全息投影是有光学厚度的。通过"主层+阴影层+幽灵层"模拟投影在玻璃介质上的折射感。

#### 三层结构定义

| 层 | 不透明度 | 模糊 | 偏移 | 颜色 | z-index |
|----|----------|------|------|------|---------|
| 主层 (Main) | 0.85-1.0 | 0 | 0 | 原色 | 0 |
| 阴影层 (Shadow) | 0.25-0.40 | 2-4px | Y +2px | `#000000` | -2 |
| 幽灵层 (Ghost) | 0.08-0.12 | 4-8px | Y -2px 或 X ±2px | 原色或 accent | -1 |

#### CSS 实现

```css
/* globals.css */
.text-ghost {
  position: relative;
  z-index: 1;
}

.text-ghost::before { /* 阴影层 */
  content: attr(data-text);
  position: absolute;
  top: 2px; left: 0;
  color: #000;
  opacity: 0.3;
  filter: blur(3px);
  z-index: -2;
}

.text-ghost::after { /* 幽灵层 */
  content: attr(data-text);
  position: absolute;
  top: -2px; left: 1px;
  color: var(--accent);
  opacity: 0.1;
  filter: blur(5px);
  z-index: -1;
}
```

#### 应用场景

| 场景 | 启用 | 备注 |
|------|------|------|
| HUD 读数 | ✅ | 必须，核心氛围 |
| L2/L3 面板标题 | ✅ | 制造厚重感 |
| 关键数值 | ✅ | 大号数字 |
| 正文文本 | ❌ | 太杂乱 |
| 按钮文字 | ❌ | 保持清晰 |

#### 幽灵层色相偏移（Chromatic Aberration）

**原理**：《全境封锁》UI 指南指出，UI 是投射在 3D 空间中的。幽灵层应该带有轻微的色相偏移，模拟透镜的色散效果。

**实现**：
```css
.text-ghost-chromatic::after {
  content: attr(data-text);
  position: absolute;
  top: -2px; left: 1px;
  /* 主层白色 → 幽灵层青色/品红 */
  color: transparent;
  background: linear-gradient(90deg, cyan, magenta);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0.15;
  filter: blur(6px);
  z-index: -1;
}
```

**动态分离**：在鼠标快速移动或页面滚动时，让"幽灵层"产生比"主层"稍慢的惯性延迟：
```typescript
// hooks/useGhostLag.ts
export function useGhostLag(intensity: number = 0.3) {
  const [lagOffset, setLagOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    let animationId: number;
    
    const updateLag = () => {
      setLagOffset(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.1 * intensity,
        y: prev.y + (targetRef.current.y - prev.y) * 0.1 * intensity,
      }));
      animationId = requestAnimationFrame(updateLag);
    };
    
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.movementX * 2, y: e.movementY * 2 };
    };
    
    window.addEventListener('mousemove', handleMove);
    animationId = requestAnimationFrame(updateLag);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);
  
  return lagOffset;
}
```

#### Token 扩展

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
      "offsetY": "-2px",
      "color": "var(--accent)"
    },
    "chromatic": {
      "enabled": true,
      "colors": ["cyan", "magenta"],
      "opacity": 0.15,
      "blur": "6px"
    },
    "lag": {
      "intensity": 0.3,
      "smoothing": 0.1
    }
  }
}
```

---

### 1.2 装饰性技术文本（Tech Decor）

**原理**：用"无意义"的技术参数填充留白。瑞士平面设计原则——字也是纹理。

#### 设计规则

| 属性 | 值 | 备注 |
|------|-----|------|
| 字号 | 9-11px | 不要求阅读 |
| 字体 | 等宽 (JetBrains Mono) | 必须 |
| 透明度 | 0.15-0.30 | 静态时 |
| 行高 | 1.2 | 紧凑 |
| 字重 | Light (300) | 不抢戏 |
| 大小写 | UPPERCASE | 更"系统" |

#### 内容词库

```typescript
const POOLS = {
  status: ['SYSTEM_OK', 'BUFFER_READY', 'NODE_ACTIVE', 'LINK_STABLE', 'NOMINAL'],
  hex: ['0x7F3A2E', '0xAB12CF', '0x00FF91', '0xE7D4B2'],
  coord: ['LAT 31.2304', 'LNG 121.4737', 'ALT 4.2M', 'ZONE_7'],
};
```

#### 位置规则

- 面板内边缘（padding 区域内）
- 大片留白区
- 角落（不遮挡主内容）
- **永远不要放在视觉焦点位置**

#### 动态行为

| 状态 | 行为 |
|------|------|
| 静态 | 不动，或极慢呼吸（透明度 0.15↔0.25，周期 4s） |
| Hover | 字符开始跳动，150-200ms 间隔 |
| Loading | 高频跳动，80-100ms 间隔 |
| Error | 闪烁 + 变红，500ms 周期 |

#### 组件实现

```tsx
// components/TechDecor.tsx
interface TechDecorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  active?: boolean;
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
      'absolute text-[10px] font-mono font-light',
      'uppercase tracking-wider opacity-20',
      active && 'opacity-35',
      positionClasses[position]
    )}>
      {text}
    </span>
  );
}

// hooks/useTechDecor.ts
interface UseTechDecorOptions {
  variant?: 'status' | 'hex' | 'coord';
  active?: boolean;
  interval?: number;
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

---

### 1.3 锚点与连接线系统（Anchor & Guideline）

**原理**：UI 不应悬浮，应看起来是被"挂载"在某个逻辑结构上。

#### 锚点（Anchor）

**位置**：L2/L3 级容器的四角，距容器角 4-6px

| 容器等级 | 锚点尺寸 | 颜色 | 动态 |
|----------|----------|------|------|
| L2 | 3×3px | `border.strong` | 无 |
| L3 (焦点) | 4×4px | `accent` | scale 0→1 动画 |
| L3 (告警) | 4×4px | `danger` | 呼吸 (opacity 0.6↔1) |

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

#### 引导线（Guideline）

**用途**：连接父子面板、选中项与详情面板、指示数据流向

| 属性 | 值 |
|------|-----|
| 宽度 | 0.5px |
| 颜色 | `border.weak` 或 `accent`@0.3 |
| 样式 | solid 或 dashed (间隔 4px) |
| 端点 | 可加小圆点 2px |

```tsx
// components/Guideline.tsx
interface GuidelineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  variant?: 'default' | 'accent';
  animated?: boolean;
}
```

---

### 1.4 材质与瑕疵系统（Texture & Imperfection）

**原理**：完美的纯色是"软件"，带有噪点和扫描线的是"硬件"。

#### 全局噪点层（NoiseOverlay）

| 属性 | 值 |
|------|-----|
| 位置 | 全局最顶层 |
| 透明度 | 0.02-0.05 |
| 混合模式 | `overlay` |
| 交互 | `pointer-events: none` |
| 尺寸 | 64×64px 平铺 |

```tsx
// components/NoiseOverlay.tsx
export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        backgroundImage: 'url(/textures/noise-64.png)',
        backgroundRepeat: 'repeat',
        opacity: 0.03,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
```

**性能注意**：使用 CSS 平铺图片，不要用 JS 生成。

#### 扫描线（Scanlines）

仅用于 HUDMeter 或 Map 等特定高科技组件背景。

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

#### 色差（Chromatic Aberration）

**触发时机**（严格限定）：
- 组件出现的瞬间（<100ms）
- 错误/告警状态
- 强交互（按钮按下）

```css
.chromatic-flash {
  animation: chromatic 80ms linear;
}

@keyframes chromatic {
  0% { text-shadow: -2px 0 rgba(255,0,0,0.5), 2px 0 rgba(0,255,255,0.5); }
  100% { text-shadow: none; }
}
```

---

### 1.6 内容锚点系统（ContentAnchor）

**原理**：在网页/应用场景中，真正的 Diegetic UI 意味着 UI 应该"附着"在内容上，像 AR 标签一样"钉"在特定元素旁边。

#### AR 注释感

设计一种组件，它可以"钉"在网页的特定段落、图片或代码块旁边：
- 当你滚动页面时，标签跟随内容移动
- 有微小的物理延迟（类似弹簧），产生"悬浮在内容之上"的错觉

```tsx
// components/ContentAnchor.tsx
interface ContentAnchorProps {
  targetRef: RefObject<HTMLElement>;
  panelContent: React.ReactNode;
  offset?: { x: number; y: number };
}

export function ContentAnchor({ 
  targetRef, 
  panelContent,
  offset = { x: 20, y: 0 }
}: ContentAnchorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [springPos, setSpringPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          x: rect.right + offset.x,
          y: rect.top + offset.y
        });
      }
    };
    
    // 弹簧物理延迟
    const animateSpring = () => {
      setSpringPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      requestAnimationFrame(animateSpring);
    };
    
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    updatePosition();
    const animId = requestAnimationFrame(animateSpring);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      cancelAnimationFrame(animId);
    };
  }, [targetRef, offset, position]);
  
  return (
    <>
      {/* 连接线 */}
      <svg className="fixed inset-0 pointer-events-none z-40">
        <line
          x1={springPos.x}
          y1={springPos.y + 20}
          x2={position.x - offset.x}
          y2={position.y + 20}
          stroke="var(--border-weak)"
          strokeWidth="0.5"
          strokeDasharray="4 2"
        />
      </svg>
      {/* 浮动面板 */}
      <div 
        className="fixed z-50"
        style={{ 
          left: springPos.x, 
          top: springPos.y,
          transition: 'none'
        }}
      >
        <TacticalPanel level="L2">
          {panelContent}
        </TacticalPanel>
      </div>
    </>
  );
}
```

#### 世界连接器（WorldConnector）

**用途**：如果你的应用场景包含图片、3D 模型或地图，设计一个组件，它的一端"钉"在内容主体上（如地图上的某个点），另一端连接到你的 UI 面板。

**动态连线**：
- 线条必须是动态绘制的
- 随着页面滚动或鼠标移动，线条应该像弹簧一样有物理反馈
- 不是死板的直线

```tsx
// components/WorldConnector.tsx
interface WorldConnectorProps {
  worldPoint: { x: number; y: number };  // 内容上的点（如地图坐标）
  panelPoint: { x: number; y: number };  // 面板连接点
  animated?: boolean;
}

export function WorldConnector({ 
  worldPoint, 
  panelPoint,
  animated = true 
}: WorldConnectorProps) {
  // 使用弹簧物理计算中间点
  const midPoint = {
    x: (worldPoint.x + panelPoint.x) / 2,
    y: (worldPoint.y + panelPoint.y) / 2 + Math.sin(Date.now() / 500) * 5
  };
  
  const path = animated 
    ? `M ${worldPoint.x} ${worldPoint.y} Q ${midPoint.x} ${midPoint.y} ${panelPoint.x} ${panelPoint.y}`
    : `M ${worldPoint.x} ${worldPoint.y} L ${panelPoint.x} ${panelPoint.y}`;
  
  return (
    <svg className="world-connector">
      <path
        d={path}
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.5"
        fill="none"
      />
      {/* 端点 */}
      <circle cx={worldPoint.x} cy={worldPoint.y} r="3" fill="var(--accent)" />
      <circle cx={panelPoint.x} cy={panelPoint.y} r="3" fill="var(--border-strong)" />
    </svg>
  );
}
```

---

### 1.5 字重信息层级（Typography Weight Hierarchy）

**原理**：字重不只是"好看"，是信息优先级的视觉编码。粗 = 重要，细 = 次要。

#### 等级定义

| 等级 | 字重 | 用途 | 示例 |
|------|------|------|------|
| Critical | 700-800 | 弹药数、HP、关键告警 | `12,847` |
| Primary | 500-600 | 标题、名字、主要数值 | `SYSTEM MONITOR` |
| Secondary | 400 | 正文、描述 | `Connection established` |
| Ambient | 300 | 装饰文本、背景大字 | `0x7F3A | SYS_OK` |

#### 字号与字重配合

| 场景 | 字号 | 字重 |
|------|------|------|
| HUD 大数字 | 36-48px | 700 |
| 面板标题 | 16-20px | 600 |
| 列表标题 | 14px | 500 |
| 正文 | 14px | 400 |
| 标签/元信息 | 12px | 400 |
| 装饰文本 | 9-11px | 300 |
| 背景大字 | 48-72px | 300 |

#### 规则

1. **字号越大，字重可以越轻**（笔画已经够粗）
2. **字号越小，字重必须越重**（防止模糊消失）
3. **装饰性大字用 Light**（作为纹理）
4. **功能性小字用 Medium+**（确保可读）

#### 衬线体装饰字

**用途**：背景超大装饰字，制造"骑士精神 × 冷酷科技"的张力。

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

**使用时机**：
- ✅ 页面背景的超大标题（如 "TACTICAL"、"SYSTEM"）
- ✅ 登录页的品牌感装饰
- ❌ 功能性文字、小字号、需要快速阅读的场景

---

## 第二章：动效系统

### 2.1 构建式出现动画（Construction Animation）

**原理**：全息界面是被"计算"和"绘制"出来的，不是"淡入"的。

#### 三阶段模型

```
阶段1: 点 (Points)     → 锚点/关键位置先出现 (80ms)
阶段2: 线 (Lines)      → 边框/轮廓从点延伸绘制 (150-200ms)
阶段3: 面 (Surfaces)   → 内容填充/文字显现 (180-250ms)
总时长: 400-500ms
```

#### 组件改造：TacticalPanel

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

---

### 2.2 透视与视差系统（Perspective & Parallax）

**原理**：Diegetic UI（画内界面）的核心——UI 不是贴在屏幕上的平面，是悬浮在 3D 空间中的投影。

#### 静态透视

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
- ✅ 装饰性背景可以加
- ❌ 功能性 UI 不加（影响点击）
- ❌ 一个页面最多 1-2 个透视元素

#### 动态视差（useParallax Hook）

**适用**：英雄区域、登录页、大屏展示

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
    }, 16);
    
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

---

### 2.3 量化缓动系统（Quantized Easing）

**原理**：模拟老式电子设备的数据刷新——不是平滑流动，是一格一格跳变的。

#### CSS 实现

```css
/* 进度条 - 一格一格充能 */
.progress-quantized {
  transition: width 0.3s steps(10);
}

/* 数字滚动 - 跳变而非流动 */
.number-tick {
  transition: transform 0.3s steps(5);
}

/* 透明度变化 - 模拟信号传输 */
.fade-quantized {
  transition: opacity 0.2s steps(4);
}

/* HUDMeter 数值更新 */
.hud-value-update {
  animation: value-flash 0.3s steps(3);
}

@keyframes value-flash {
  0%, 100% { opacity: 1; }
  33% { opacity: 0.6; }
  66% { opacity: 0.85; }
}

/* Skeleton 呼吸 - 不要太平滑 */
.skeleton-pulse {
  animation: skeleton-quantized 1.5s steps(8) infinite;
}

@keyframes skeleton-quantized {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
```

#### Framer Motion 配置

```typescript
// lib/motion.ts
export const quantizedTransition = {
  duration: 0.3,
  ease: (t: number) => Math.floor(t * 6) / 6, // 6步量化
};
```

#### 适用场景

| 场景 | 推荐缓动 | 原因 |
|------|----------|------|
| 文件下载进度 | `steps(10)` | 模拟数据包到达 |
| 技能冷却 | `linear` | 均匀消耗 |
| 能量充填 | `cubic-bezier` | 物理加速感 |
| 加载百分比 | `steps(5)` | 阶段式反馈 |

---

### 2.4 受控故障效果（Controlled Glitch）

**原理**：模拟信号干扰或数据传输错误，但**严格受控**，不能滥用。

#### ⚠️ 触发规则（严格限定）

| 场景 | 允许 | 强度 |
|------|------|------|
| 网络断开 / API Error | ✅ | 轻微 (1次) |
| Critical Alert | ✅ | 中等 (2次) |
| 执行不可逆操作瞬间 | ✅ | 轻微 (1次) |
| 常规 Hover | ❌ | - |
| 页面加载 | ❌ | - |
| 常驻循环 | ❌ | - |

#### Hook 实现

```typescript
// hooks/useGlitch.ts
interface GlitchOptions {
  intensity?: 'light' | 'medium';
  duration?: number;
}

export function useGlitch() {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(({ 
    intensity = 'light', 
    duration = 150 
  }: GlitchOptions = {}) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), duration);
  }, []);

  return { isGlitching, triggerGlitch };
}
```

#### CSS 实现

```css
/* globals.css */
.glitch-active {
  animation: glitch-shake 50ms steps(2) 3;
}

@keyframes glitch-shake {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-2px, 1px); }
  50% { transform: translate(2px, -1px); }
  75% { transform: translate(-1px, -1px); }
}

/* 色差效果 - 仅用于文字 */
.glitch-text-active {
  text-shadow: 
    -2px 0 theme('colors.danger'),
    2px 0 theme('colors.accent');
  animation: glitch-text 100ms steps(2) 1;
}

@keyframes glitch-text {
  0%, 100% { text-shadow: none; transform: translate(0); }
  50% { 
    text-shadow: -2px 0 theme('colors.danger'), 2px 0 cyan;
    transform: translate(1px, 0);
  }
}
```

---

### 2.5 行为信息图（Schematic）

**原理**：《全境封锁》设定集强调 "行为信息图 (Behavioural Infographics)" 的概念。战术 UI 的精髓在于展示 **"变化的过程"** 和 **"物体的逻辑"**，而不仅仅是静态数据快照。

> 例如：不是只显示"弹药剩余 30"，而是显示"弹药正在被装填到弹匣的动作"；不是只显示"服务器负载 80%"，而是显示"流量正在通过哪个节点传输"。

#### Schematic 组件

利用 SVG 绘制简单的线框结构（如服务器拓扑、枪械结构、文件系统树），让高亮节点在路径上移动，模拟"数据传输"的过程。

```tsx
// components/Schematic.tsx
interface SchematicNode {
  id: string;
  x: number;
  y: number;
  label?: string;
  status?: 'active' | 'idle' | 'error';
}

interface SchematicEdge {
  from: string;
  to: string;
  animated?: boolean;
  speed?: number; // 粒子移动速度
}

interface SchematicProps {
  nodes: SchematicNode[];
  edges: SchematicEdge[];
  width?: number;
  height?: number;
  className?: string;
}

export function Schematic({ 
  nodes, 
  edges, 
  width = 400, 
  height = 300,
  className 
}: SchematicProps) {
  const [particles, setParticles] = useState<Array<{
    id: string;
    edgeId: string;
    progress: number;
  }>>([]);
  
  // 粒子动画
  useEffect(() => {
    const animatedEdges = edges.filter(e => e.animated);
    const interval = setInterval(() => {
      setParticles(prev => {
        // 移动现有粒子
        const updated = prev.map(p => {
          const edge = edges.find(e => 
            `${e.from}-${e.to}` === p.edgeId
          );
          const speed = edge?.speed || 0.02;
          return { ...p, progress: p.progress + speed };
        }).filter(p => p.progress < 1);
        
        // 在激活的边上生成新粒子
        animatedEdges.forEach(edge => {
          if (Math.random() < 0.3) {
            updated.push({
              id: Math.random().toString(36).substr(2, 9),
              edgeId: `${edge.from}-${edge.to}`,
              progress: 0,
            });
          }
        });
        
        return updated;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [edges]);
  
  // 计算粒子位置
  const getParticlePosition = (edgeId: string, progress: number) => {
    const edge = edges.find(e => `${e.from}-${e.to}` === edgeId);
    if (!edge) return { x: 0, y: 0 };
    
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return { x: 0, y: 0 };
    
    return {
      x: fromNode.x + (toNode.x - fromNode.x) * progress,
      y: fromNode.y + (toNode.y - fromNode.y) * progress,
    };
  };
  
  return (
    <svg 
      width={width} 
      height={height} 
      className={cn('schematic', className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* 边线 */}
      {edges.map(edge => {
        const from = nodes.find(n => n.id === edge.from);
        const to = nodes.find(n => n.id === edge.to);
        if (!from || !to) return null;
        
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke="var(--border-weak)"
            strokeWidth="1"
            strokeDasharray={edge.animated ? "4 2" : undefined}
          />
        );
      })}
      
      {/* 移动粒子 */}
      {particles.map(p => {
        const pos = getParticlePosition(p.edgeId, p.progress);
        return (
          <circle
            key={p.id}
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill="var(--accent)"
            className="particle-glow"
          />
        );
      })}
      
      {/* 节点 */}
      {nodes.map(node => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r="6"
            fill={node.status === 'error' ? 'var(--danger)' : 
                  node.status === 'active' ? 'var(--accent)' : 
                  'var(--border-strong)'}
            stroke="var(--bg-base)"
            strokeWidth="2"
          />
          {node.label && (
            <text
              x={node.x}
              y={node.y - 12}
              textAnchor="middle"
              className="text-[10px] fill-text-secondary uppercase"
            >
              {node.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
```

#### 使用示例

```tsx
// 服务器拓扑图
<Schematic
  width={300}
  height={200}
  nodes={[
    { id: 'client', x: 50, y: 100, label: 'CLIENT', status: 'active' },
    { id: 'gateway', x: 150, y: 100, label: 'GATEWAY', status: 'active' },
    { id: 'db1', x: 250, y: 60, label: 'DB-01', status: 'idle' },
    { id: 'db2', x: 250, y: 140, label: 'DB-02', status: 'error' },
  ]}
  edges={[
    { from: 'client', to: 'gateway', animated: true, speed: 0.03 },
    { from: 'gateway', to: 'db1', animated: true, speed: 0.02 },
    { from: 'gateway', to: 'db2', animated: false },
  ]}
/>
```

#### 扇区扫描（Sector Sweep）

《全境封锁》标志性的图表样式——像雷达一样不断扫描更新：

```tsx
// components/SectorChart.tsx
interface SectorChartProps {
  value: number; // 0-100
  max?: number;
  size?: number;
  animated?: boolean;
}

export function SectorChart({ 
  value, 
  max = 100, 
  size = 120,
  animated = true 
}: SectorChartProps) {
  const percentage = (value / max) * 100;
  const sweepAngle = (percentage / 100) * 360;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        {/* 背景圆环 */}
        <circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke="var(--border-weak)"
          strokeWidth="8"
        />
        
        {/* 扇区填充 */}
        <circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeDasharray={`${(percentage / 100) * 314} 314`}
          strokeLinecap="butt"
          transform="rotate(-90 60 60)"
        />
        
        {/* 扫描线 */}
        {animated && (
          <line
            x1="60" y1="60"
            x2="60" y2="10"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 60 60"
              to="360 60 60"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
        )}
      </svg>
      
      {/* 中心数值 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold tabular-nums">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
```

---

## 第三章：交互系统

### 3.1 长按确认按钮（HoldButton）

**原理**：危险操作需要仪式感，模拟战术设备的保险开关。

```tsx
// components/HoldButton.tsx
interface HoldButtonProps {
  onConfirm: () => void;
  holdDuration?: number; // ms, 默认 1500ms
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function HoldButton({
  onConfirm,
  holdDuration = 1500,
  children,
  disabled = false,
  className,
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = useCallback(() => {
    if (disabled) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        cancelHold();
        onConfirm();
      }
    }, 16);
  }, [disabled, holdDuration, onConfirm]);

  const cancelHold = useCallback(() => {
    setIsHolding(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <button
      className={cn(
        'relative overflow-hidden',
        'h-11 px-6',
        'bg-danger/20 border-2 border-danger',
        'text-danger font-medium uppercase tracking-wider',
        'transition-colors duration-150',
        'hover:bg-danger/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      disabled={disabled}
    >
      {/* 进度填充 */}
      <motion.div
        className="absolute inset-0 bg-danger/40 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0, ease: 'linear' }}
      />

      {/* 文字 */}
      <span className="relative z-10 flex items-center gap-2">
        {isHolding ? (
          <>
            <span className="text-xs tabular-nums">
              {Math.round(progress)}%
            </span>
            <span>HOLD TO CONFIRM</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* 量化进度指示（steps效果） */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 border-r border-bg-base last:border-r-0',
              progress >= (i + 1) * 10 ? 'bg-danger' : 'bg-transparent'
            )}
          />
        ))}
      </div>
    </button>
  );
}
```

#### 设计规范

- 默认持续时间：**1500ms**（危险操作可延长到 2000-3000ms）
- 进度条样式：**量化分段**（10格），不是平滑填充
- 颜色：强制使用 **danger** 色系
- 触发后反馈：Ping 一次 + 短暂的 glitch 闪烁

---

### 3.2 声音系统（Sound System）

**原理**：根据《全境封锁》GDC 演讲，"声音是体验的 50% (Sound is 50% of the experience)"。没有声音的战术 UI 只是"默片"；有了声音，它才是"实体"。

#### 三类核心音效

| 类型 | 场景 | 特征 | 时长 |
|------|------|------|------|
| **High-Pitch Chirps** | Hover | 极短高频电子"叽"声，模拟光标扫描过数据 | <50ms |
| **Heavy Thuds/Clicks** | Click/Confirm | 带有重低音的机械闭合声，模拟物理开关 | 50-100ms |
| **Ambient Hum** | 菜单打开 | 极低音量的电流白噪音，暗示设备高负荷运转 | 循环/长音 |

#### Hook 实现

```typescript
// hooks/useSound.ts
type SoundType = 'hover' | 'click' | 'confirm' | 'error' | 'ambient';

interface SoundConfig {
  src: string;
  volume: number;
  preload?: boolean;
}

const SOUND_LIBRARY: Record<SoundType, SoundConfig> = {
  hover: { src: '/sounds/chirp.mp3', volume: 0.1 },
  click: { src: '/sounds/thud.mp3', volume: 0.3 },
  confirm: { src: '/sounds/confirm.mp3', volume: 0.4 },
  error: { src: '/sounds/error.mp3', volume: 0.5 },
  ambient: { src: '/sounds/hum.mp3', volume: 0.05, preload: true },
};

export function useSound() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    hover: null, click: null, confirm: null, error: null, ambient: null,
  });
  const [enabled, setEnabled] = useState(true);
  
  useEffect(() => {
    // 初始化音频对象
    (Object.keys(SOUND_LIBRARY) as SoundType[]).forEach(type => {
      const config = SOUND_LIBRARY[type];
      const audio = new Audio(config.src);
      audio.volume = config.volume;
      if (config.preload) {
        audio.loop = true;
        audio.load();
      }
      audioRefs.current[type] = audio;
    });
    
    return () => {
      (Object.values(audioRefs.current) as HTMLAudioElement[]).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);
  
  const play = useCallback((type: SoundType) => {
    if (!enabled) return;
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {}); // 忽略自动播放策略错误
    }
  }, [enabled]);
  
  const startAmbient = useCallback(() => {
    if (!enabled) return;
    const audio = audioRefs.current.ambient;
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
  }, [enabled]);
  
  const stopAmbient = useCallback(() => {
    const audio = audioRefs.current.ambient;
    if (audio && !audio.paused) {
      audio.pause();
    }
  }, []);
  
  return { play, startAmbient, stopAmbient, enabled, setEnabled };
}
```

#### 与组件集成

```tsx
// components/SoundButton.tsx
interface SoundButtonProps extends ButtonProps {
  soundType?: 'click' | 'confirm';
}

export function SoundButton({ 
  soundType = 'click',
  onClick,
  ...props 
}: SoundButtonProps) {
  const { play } = useSound();
  
  const handleClick = (e: React.MouseEvent) => {
    play(soundType);
    onClick?.(e);
  };
  
  return (
    <Button
      onMouseEnter={() => play('hover')}
      onClick={handleClick}
      {...props}
    />
  );
}
```

#### 设计要点

- **声音必须极短**（<100ms），高频操作不会让人烦躁
- **音量要低**（0.05-0.3），作为潜意识反馈而非主导
- **尊重用户偏好**：检测 `prefers-reduced-motion` 时自动禁用
- **优雅降级**：音频加载失败不应阻断交互

---

## 第四章：工程与性能

### 4.1 性能降级系统（Performance Degradation）

**原理**：再炫的效果，卡了就是垃圾。

#### 检测策略

```typescript
// hooks/usePerformanceMode.ts
type PerformanceMode = 'full' | 'reduced' | 'minimal';

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>('full');

  useEffect(() => {
    // 1. 用户偏好（最高优先级）
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMode('minimal');
      return;
    }

    // 2. 设备能力检测
    const isLowEnd = 
      navigator.hardwareConcurrency <= 4 ||
      // @ts-ignore - 实验性API
      navigator.deviceMemory <= 4 ||
      /Android|iPhone|iPad/.test(navigator.userAgent);

    if (isLowEnd) {
      setMode('reduced');
      return;
    }
  }, []);

  return mode;
}
```

#### 降级矩阵

| 效果 | full | reduced | minimal |
|------|------|---------|---------|
| GridBackground 粒子 | 12条 | 6条 | 关闭 |
| backdrop-filter: blur | 开启 | 静态模糊图 | 纯色 |
| NoiseOverlay | 开启 | 关闭 | 关闭 |
| ScanSweep | 开启 | 简化 | 关闭 |
| 构建式动画 | 完整序列 | 简化淡入 | 直接显示 |
| ParticleField | 完整 | 粒子数减半 | 静态图 |

#### Context Provider

```tsx
// contexts/PerformanceContext.tsx
const PerformanceContext = createContext<PerformanceMode>('full');

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const mode = usePerformanceMode();
  return (
    <PerformanceContext.Provider value={mode}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformance = () => useContext(PerformanceContext);
```

#### 组件适配示例

```tsx
// GridBackground 适配
export function GridBackground() {
  const mode = usePerformance();
  
  if (mode === 'minimal') return null;
  
  const particleCount = mode === 'full' ? 12 : 6;
  
  return (
    <div className="grid-background">
      {/* 根据 particleCount 渲染粒子 */}
    </div>
  );
}
```

---

### 4.2 渲染优化建议

#### 背景模糊优化

| 方案 | 适用场景 |
|------|----------|
| 实时 `backdrop-filter` | 动态变化的背景 |
| 预渲染模糊图片 | 静态背景 |
| 纯色 + 透明度 | 低端设备 |

#### 噪点层优化

- ✅ 使用 CSS 平铺图片
- ✅ 设置 `will-change: transform`
- ❌ 不要用 Canvas 每帧重绘
- ❌ 不要用 JS 生成噪点

---

## 第五章：无障碍与规范

### 5.1 双重编码（Dual Encoding）

**原理**：色盲用户分不清红绿。状态变化必须同时有**颜色+形状/图标**。

#### 状态编码规则

| 状态 | 颜色 | 必须伴随的图标 |
|------|------|----------------|
| OK/Success | 绿色 | ✓ 勾号 |
| Warning | 黄色/橙色 | ⚠ 三角警告 |
| Error/Danger | 红色 | ✕ 叉号 或 ⊘ 禁止符 |
| Loading | 灰色/accent | ◌ 旋转图标 |
| Offline | 灰色 | ◇ 空心菱形 |

#### StatusIndicator 组件

```tsx
// components/StatusIndicator.tsx
import { CheckIcon, AlertTriangleIcon, XIcon, LoaderIcon, WifiOffIcon } from 'lucide-react';

type Status = 'ok' | 'warn' | 'err' | 'busy' | 'offline';

const statusConfig: Record<Status, { 
  icon: typeof CheckIcon; 
  color: string;
  label: string;
}> = {
  ok: { icon: CheckIcon, color: 'text-success', label: 'OK' },
  warn: { icon: AlertTriangleIcon, color: 'text-warning', label: 'Warning' },
  err: { icon: XIcon, color: 'text-danger', label: 'Error' },
  busy: { icon: LoaderIcon, color: 'text-accent', label: 'Loading' },
  offline: { icon: WifiOffIcon, color: 'text-disabled', label: 'Offline' },
};

interface StatusIndicatorProps {
  status: Status;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function StatusIndicator({ 
  status, 
  showLabel = false,
  size = 'sm' 
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 16;
  
  return (
    <span 
      className={cn('inline-flex items-center gap-1', config.color)}
      role="status"
      aria-label={config.label}
    >
      <Icon 
        size={iconSize} 
        className={status === 'busy' ? 'animate-spin' : ''} 
      />
      {showLabel && (
        <span className="text-xs uppercase tracking-wider">
          {config.label}
        </span>
      )}
    </span>
  );
}
```

#### Table 行状态增强

```tsx
// 之前：只有颜色
<tr className={row._status === 'err' ? 'text-danger' : ''}>

// 之后：颜色 + 图标
<tr>
  <td>
    <StatusIndicator status={row._status} />
    {row.name}
  </td>
</tr>
```

---

### 5.2 图标规范

**原则**：《全境封锁》UI 指南——图标必须通过 "眯眼测试"，必须是 "单色白" 且 "像一块固态平板"。

#### 规范

| 属性 | 要求 |
|------|------|
| 风格 | **Filled/Solid** 优先，禁止纯线性 |
| 颜色 | 单色白或单色强调色 |
| 复杂度 | 通过"眯眼测试"——眯眼看5秒还能认出来 |
| 边角 | 锐利优先，避免过圆润 |

#### 推荐图标库

1. **Lucide Icons (Filled 变体)** - 已集成
2. **Phosphor Icons (Fill)** - 备选
3. **Material Symbols (Sharp + Filled)** - 备选

#### 自定义战术图标

```tsx
// components/icons/TacticalIcons.tsx

// 锁定目标
export function TargetLockIcon({ size = 24, className }: IconProps) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      {/* 四角框 + 中心点 */}
      <path d="M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zM3 15v6h6v-2H5v-4H3zm18 0v6h-6v-2h4v-4h2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// 信号强度
export function SignalIcon({ level = 3, size = 24, className }: { level: 0|1|2|3 } & IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <rect x="2" y="16" width="4" height="6" fill="currentColor" opacity={level >= 1 ? 1 : 0.2} />
      <rect x="8" y="12" width="4" height="10" fill="currentColor" opacity={level >= 2 ? 1 : 0.2} />
      <rect x="14" y="8" width="4" height="14" fill="currentColor" opacity={level >= 3 ? 1 : 0.2} />
    </svg>
  );
}
```

---

### 5.3 临床文风与内容策略

**原理**：参考《明日方舟》的档案设计和 SCP 基金会的 clinical tone，让界面文案更具"冷酷科技感"和"机器语言"特征。

#### 文案改写规则

| 常见文案 | 临床文风替代 | 说明 |
|----------|--------------|------|
| Loading... | ESTABLISHING UPLINK... | 暗示建立连接的过程 |
| Error | FATAL EXCEPTION / SIGNAL LOST | 更具技术感 |
| Success | OPERATION COMPLETE / SYNC VERIFIED | 强调系统验证 |
| Save | COMMIT TO STORAGE | 数据库存储术语 |
| Delete | PURGE / TERMINATE RECORD | 彻底清除的意味 |
| Cancel | ABORT SEQUENCE | 中止序列 |
| Retry | RE-ESTABLISH CONNECTION | 重建连接 |
| Searching... | SCANNING SECTORS... | 扫描扇区 |
| No Data | NULL REFERENCE / BUFFER EMPTY | 空引用/空缓冲区 |

#### 伪技术文本填充

在无关紧要的角落填充大量伪逻辑文本，让界面看起来"比实际功能更复杂"：

```
MEM_USAGE: 42% | SYNC_RATE: 60Hz
LATENCY: 12ms | UPLINK: STABLE
REF# 4A2F-9E | CHECKSUM: OK
```

#### TechDecor 增强词库

```typescript
const CLINICAL_TERMS = {
  system: ['NOMINAL', 'OPTIMAL', 'DEGRADED', 'CRITICAL', 'OFFLINE'],
  operations: ['SYNCING', 'BUFFERING', 'ALLOCATING', 'PURGING', 'INDEXING'],
  protocols: ['HANDSHAKE_OK', 'ENCRYPTION_ACTIVE', 'AUTH_VALIDATED'],
  diagnostics: ['SELF_TEST_PASSED', 'CALIBRATION_REQUIRED', 'ANOMALY_DETECTED'],
};
```

---

### 5.4 RTL 支持与国际化

**原理**：GDC 演讲提到的 "隐形力量 (Invisible Forces)"——本地化对 UI 的破坏。德语或俄语文本往往比英语长 40%。

#### 弹性布局规则

| 组件 | 固定宽度 | 推荐方案 |
|------|----------|----------|
| Button | ❌ 禁止 | min-width + padding，允许自适应增长 |
| Panel Header | ❌ 禁止 | 预留 30%-50% 额外空间 |
| Sidebar | ⚠️ 谨慎 | 最小宽度 + 可调整，或文本截断+tooltip |
| HUDMeter | ✅ 允许 | 数值区域固定，标签自适应 |

#### 文本溢出处理

```tsx
// 自动缩放而非换行
.truncate-adaptive {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 或：字号自动缩小
.text-fit {
  display: inline-block;
  white-space: nowrap;
  transform-origin: left center;
}

// Hook 检测文本溢出
function useTextOverflow(ref: RefObject<HTMLElement>) {
  const [isOverflow, setIsOverflow] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const check = () => {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    };
    
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [ref]);
  
  return isOverflow;
}
```

#### RTL 适配基础

```css
/* 使用逻辑属性 */
.start-margin {
  margin-inline-start: 1rem; /* 替代 margin-left */
}

.text-align-start {
  text-align: start; /* 替代 text-align: left */
}

/* 方向感知边框 */
.logical-border {
  border-inline-start: 1px solid var(--border);
}
```

---

## 实施路线图

### Phase 1：核心氛围（1-2 天）

| 任务 | 改动量 | 效果 |
|------|--------|------|
| HUDMeter 加幽灵层 | 小 | 立竿见影 |
| 全局 NoiseOverlay | 新增 1 组件 | 整体质感提升 |
| Progress 改 steps() | 1 行 CSS | 硬件感增强 |

### Phase 2：结构强化（2-3 天）

| 任务 | 改动量 | 效果 |
|------|--------|------|
| TacticalPanel L2/L3 加锚点 | 中 | 战术感显著提升 |
| TacticalPanel 构建动画 | 中 | 从"网页"变"终端" |
| 字重系统化 | Token + 微调 | 信息层级更清晰 |

### Phase 3：交互与性能（2 天）

| 任务 | 改动量 | 效果 |
|------|--------|------|
| HoldButton 组件 | 新增 | 危险操作仪式感 |
| 性能降级系统 | 新增 Context | 保障低端设备体验 |
| 双重编码/图标规范 | 重构 | 无障碍支持 |

### Phase 4：氛围点缀（按需）

| 任务 | 改动量 | 效果 |
|------|--------|------|
| TechDecor 组件 | 新增 | 填充感、运行感 |
| Guideline 组件 | 新增 | 连接逻辑可视化 |
| useParallax Hook | 新增 | 英雄区域沉浸感 |

---

## 验收清单

### 视觉纵深感
- [ ] HUDMeter 数值有幽灵层？
- [ ] L2/L3 面板标题有幽灵层？

### 装饰文本
- [ ] 有适量的技术装饰文字？
- [ ] 装饰文字没有抢戏？
- [ ] 透明度足够低（≤0.3）？

### 锚点与连接
- [ ] L2/L3 容器有角落锚点？
- [ ] 锚点有出现动画？

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
- [ ] HoldButton 进度条使用量化分段？

### 无障碍
- [ ] 状态指示同时有颜色+图标？
- [ ] 图标使用 Filled 风格？

### 性能
- [ ] 有性能降级策略？
- [ ] 低端设备体验流畅？

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.0 | 2026-02-07 | 整合 Patch v1.1 + v1.2 + v2，去除冗余，统一规范 |
| 1.2 | 2026-01-17 | 补丁包3：性能降级、HoldButton、受控故障、双重编码 |
| 1.1 | 2026-01-17 | 补丁包1：幽灵层、TechDecor、锚点、材质、字重、视差、构建动画、故障、量化缓动 |

---

## 附录：废弃内容备忘

以下功能在原始补丁包中被讨论，但**当前版本已整合**进主文档：

| 功能 | 所在章节 | 说明 |
|------|----------|------|
| ✅ 声音系统 (useSound) | 3.2 | 已整合进交互系统 |
| ✅ 行为信息图 (Schematic) | 2.5 | 已整合进动效系统 |
| ✅ 内容锚点 (ContentAnchor) | 1.6 | 已整合进视觉美学系统 |
| ✅ 世界连接器 (WorldConnector) | 1.6 | 已整合进内容锚点系统 |
| ✅ 临床文风/文案策略 | 5.3 | 已整合进无障碍与规范 |
| ✅ RTL 支持 | 5.4 | 已整合进无障碍与规范 |
| ✅ 幽灵层色相偏移 | 1.1 | 已整合进视觉纵深系统 |
