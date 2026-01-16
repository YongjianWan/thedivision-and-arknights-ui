# 战术界面组件库技术文档

> Personal Interface System Components
> 
> 基于 React + TypeScript + Framer Motion 实现的"近未来科幻风"组件库

---

## 快速开始

### 安装依赖

本组件库依赖以下包（已在项目中安装）：

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

## 核心组件

### Button（按钮）

**基础用法**

```tsx
import { Button } from '@/components';

<Button variant="primary" size="md">
  Execute
</Button>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'secondary'` | 按钮类型 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按钮尺寸 |
| `loading` | `boolean` | `false` | 加载状态 |
| `disabled` | `boolean` | `false` | 禁用状态 |

**Variants**

- **primary**：主操作，橙色填充（`#FF6A00`）
- **secondary**：次要操作，透明底+边框
- **ghost**：无边框，用于工具栏
- **danger**：危险操作，红色填充（`#FF3B30`）

**动效**

- 点击：`scale 0.98` (80ms)
- Loading 状态：旋转 Spinner (800ms/圈)

---

### TacticalPanel（战术面板）

**基础用法**

```tsx
import { TacticalPanel } from '@/components';

<TacticalPanel 
  title="System Monitor" 
  level="L2"
  statusIndicator="ok"
>
  <p>Panel content here</p>
</TacticalPanel>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 面板标题 |
| `level` | `'L0' \| 'L1' \| 'L2' \| 'L3'` | `'L1'` | 边框等级 |
| `statusIndicator` | `'ok' \| 'warn' \| 'err' \| 'busy'` | - | 状态指示点 |
| `children` | `ReactNode` | - | 内容 |

**边框等级**

- **L0**：无边框
- **L1**：细边框 (0.5px)
- **L2**：外粗 (2px) + 内细 (0.5px)，关键容器
- **L3**：橙色外框 (2px) + 内细 (0.5px)，焦点/告警

**动效**

- 进入：淡入 + scale 0.98→1.0 (220ms)
- busy 状态：指示点呼吸（1.5s 循环）

---

### Select（选择器）

**基础用法**

```tsx
import { Select } from '@/components';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B', disabled: true },
];

<Select 
  options={options} 
  value={value}
  onChange={setValue}
  placeholder="Select..."
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `SelectOption[]` | 必填 | 选项数组 |
| `value` | `string` | - | 当前值 |
| `onChange` | `(value: string) => void` | - | 变化回调 |
| `placeholder` | `string` | `'Select...'` | 占位符 |
| `disabled` | `boolean` | `false` | 禁用 |

**类型定义**

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

**交互**

- 点击/Enter 展开
- 方向键导航（TODO）
- Esc 关闭
- 选中后自动关闭

**动效**

- 展开：LineDraw 边框 (150ms) + 选项错开淡入（每项延迟 40ms）
- 选中：Ping 一次 (100ms)

---

### Checkbox / Radio / Switch（表单控件）

**Checkbox**

```tsx
import { Checkbox } from '@/components';

<Checkbox 
  checked={checked}
  onChange={setChecked}
  label="Accept terms"
/>
```

**Radio**

```tsx
import { Radio } from '@/components';

<Radio 
  checked={selected === 'a'}
  onChange={() => setSelected('a')}
  label="Option A"
  name="choice"
  value="a"
/>
```

**Switch**

```tsx
import { Switch } from '@/components';

<Switch 
  checked={enabled}
  onChange={setEnabled}
  label="Enable feature"
/>
```

**共同 Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | 选中状态 |
| `onChange` | `(checked: boolean) => void` | - | 变化回调 |
| `label` | `string` | - | 标签文字 |
| `disabled` | `boolean` | `false` | 禁用 |

**动效**

- Checkbox 选中：勾形 LineDraw (80ms)
- Radio 选中：中心点 scale 0→1 (100ms)
- Switch 切换：滑块滑动 (150ms) + 背景色渐变 (150ms)
- 所有点击：Ping 一次 (100ms)

---

### Modal（弹窗）

**基础用法**

```tsx
import { Modal, Button } from '@/components';

<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isOpen` | `boolean` | 必填 | 是否打开 |
| `onClose` | `() => void` | 必填 | 关闭回调 |
| `title` | `string` | - | 标题 |
| `footer` | `ReactNode` | - | 底部操作区 |
| `closeOnOverlay` | `boolean` | `true` | 点击遮罩关闭 |
| `children` | `ReactNode` | - | 内容 |

**交互**

- Esc 关闭
- 遮罩点击关闭（可配置）
- 打开时锁定 body 滚动
- 焦点锁定（简化版）

**动效**

- 打开：遮罩淡入 (150ms) + 面板 scale 0.96→1.0 (200ms)
- 关闭：面板 scale 1.0→0.96 (150ms) + 遮罩淡出 (150ms)
- **打开后自动冻结所有背景层动效**（按规范）

---

### Tabs（标签页）

**基础用法**

```tsx
import { Tabs } from '@/components';
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'logs', label: 'Logs', disabled: true },
];

function MyTabs() {
  const [active, setActive] = useState('overview');
  
  return (
    <Tabs tabs={tabs} activeTab={active} onChange={setActive}>
      {active === 'overview' && <div>Overview content</div>}
      {active === 'details' && <div>Details content</div>}
    </Tabs>
  );
}
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tabs` | `Tab[]` | 必填 | 标签数组 |
| `activeTab` | `string` | - | 当前激活标签 |
| `onChange` | `(tabId: string) => void` | - | 切换回调 |
| `children` | `ReactNode` | - | 内容区 |

**类型定义**

```tsx
interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}
```

**动效**

- 切换：下划线滑动 (180ms) + 内容淡出淡入交替 (220ms)
- hover：淡入灰色下划线 (100ms)

---

### Progress（进度条）

**基础用法**

```tsx
import { Progress } from '@/components';

<Progress value={67} showLabel variant="accent" />
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | 必填 | 进度值 (0-100) |
| `showLabel` | `boolean` | `false` | 显示百分比 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度 |
| `variant` | `'default' \| 'accent' \| 'danger'` | `'accent'` | 颜色 |

**动效**

- 填充动画：easing `cubic-bezier(0.4, 0, 0.2, 1)` (320ms)

---

### Spinner（加载器）

**基础用法**

```tsx
import { Spinner } from '@/components';

<Spinner size={24} />
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number` | `20` | 直径(px) |

**动效**

- 匀速旋转：800ms/圈

---

### Card（卡片）

**基础用法**

```tsx
import { Card } from '@/components';

<Card 
  title="Node-A" 
  meta="Last updated: 2min ago"
  tags={['ACTIVE', 'HTTP']}
  selected={selected === 'a'}
  onClick={() => setSelected('a')}
>
  <p>Connection status: OK</p>
</Card>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 标题 |
| `meta` | `string` | - | 副信息 |
| `tags` | `string[]` | - | 标签数组 |
| `footer` | `ReactNode` | - | 底部操作区 |
| `selected` | `boolean` | `false` | 选中状态 |
| `onClick` | `() => void` | - | 点击回调 |
| `children` | `ReactNode` | - | 内容 |

**状态**

- default：细边框 (0.5px)
- hover：边框加粗 + 背景亮一档 (100ms)
- selected：左侧 accent 条 2px

**动效**

- 进入：淡入 + scale 0.98→1.0 (220ms)
- hover：上移 2px (100ms)
- 点击：scale 0.99 (100ms)

---

### HUDMeter（仪表读数）

**基础用法**

```tsx
import { HUDMeter } from '@/components';

<HUDMeter 
  value={12847}
  max={20000}
  label="POWER LEVEL"
  unit="W"
  variant="accent"
  size="md"
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | 必填 | 当前值 |
| `max` | `number` | `100` | 最大值 |
| `label` | `string` | 必填 | 标签文字 |
| `unit` | `string` | `''` | 单位 |
| `variant` | `'default' \| 'accent' \| 'warn' \| 'danger'` | `'accent'` | 颜色变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

**设计结构**

```
  12,847 W
━━━━━━━━━━━━ 64%
 POWER LEVEL
```

- 数字：大、亮、等宽、tabular-nums
- 进度条：细（2-4px）
- 标签：display 字体、uppercase、tracking 宽

**动效**

- 数值变化：淡入 (0.5s)
- 进度条：宽度动画 (0.5s, cubic-bezier)

---

### StatusBar（状态栏）

**基础用法**

```tsx
import { StatusBar } from '@/components';

<StatusBar />
```

**Props**

无props，显示固定内容：
- 左侧：系统状态（SYSTEM ONLINE + 呼吸点）+ 节点信息
- 中间：标识文字（TACTICAL INTERFACE）
- 右侧：日期 + 时间（实时更新）

**特性**

- 自动更新时间（每秒刷新）
- 状态点呼吸动画（2s 循环）
- 半透明背景 + backdrop-blur

**动效**

- 进入：从上淡入 + 下移 (300ms)
- 状态点：opacity 0.5↔1 (2s 循环)

---

### ScanSweep（扫描效果）

**基础用法**

```tsx
import { ScanSweep } from '@/components';

<ScanSweep 
  duration={1.2}
  onComplete={() => console.log('Scan complete')}
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `duration` | `number` | `1.2` | 扫描时长（秒） |
| `onComplete` | `() => void` | - | 完成回调 |

**用途**

- 页面进入时触发一次
- 加载完成时触发一次
- 数据刷新时触发一次

**规则**

- 全屏覆盖，z-index 40
- 从上往下扫描
- 扫描完成后自动淡出并销毁
- **不要常驻循环**

**动效**

- 扫描带：从 top: -40px → 100% (线性)
- 结束淡出：300ms

---

### GridBackground（网格背景）

**基础用法**

```tsx
import { GridBackground } from '@/components';

<GridBackground />
```

**Props**

无props，提供固定的背景层效果。

**包含元素**

1. **透视网格地面**：3D 旋转网格，营造深度感
2. **水平扫描线**：从上往下循环扫描（8s/次）
3. **数据流粒子**：垂直下落的细线（12条，随机参数）
4. **六边形装饰**：两个六边形边框动画
5. **角落瞄准框**：左上角 L 形框架

**规则**

- 固定定位，z-index: 0
- 所有动画用 CSS 实现（降低 JS 负担）
- 确定性伪随机（避免 SSR/CSR 不一致）
- **Modal/Drawer 打开时应该被遮罩覆盖**

**性能优化**

- 使用 CSS 动画而非 Framer Motion
- 粒子数量控制在 12 条
- 透明度低，不影响可读性

---

### Typewriter（打字机效果）

**基础用法**

```tsx
import { Typewriter, TypewriterLines } from '@/components';

// 单行打字机
<Typewriter 
  text="SYSTEM INITIALIZING..."
  speed={50}
  delay={200}
  cursor={true}
  onComplete={() => console.log('Done')}
/>

// 多行打字机
<TypewriterLines 
  lines={[
    'Loading modules...',
    'Connecting to server...',
    'Authentication successful.',
    'Ready.',
  ]}
  speed={40}
  lineDelay={200}
/>
```

**Typewriter Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | 必填 | 要显示的文字 |
| `speed` | `number` | `50` | 每个字符延迟（ms） |
| `delay` | `number` | `0` | 开始前延迟（ms） |
| `cursor` | `boolean` | `true` | 显示光标 |
| `onComplete` | `() => void` | - | 打字完成回调 |

**TypewriterLines Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lines` | `string[]` | 必填 | 行数组 |
| `speed` | `number` | `40` | 每个字符延迟（ms） |
| `lineDelay` | `number` | `200` | 行与行之间延迟（ms） |
| `lineClassName` | `string` | - | 每行的样式类 |

**特性**

- 单行：逐字出现 + 光标闪烁（530ms 间隔）
- 多行：一行打完再打下一行，已完成的行变为次要色
- 光标：2px 宽，与文字同色

**用途**

- 系统启动/初始化提示
- Terminal 输出模拟
- 动态消息展示

---

### Table（数据表格）

**基础用法**

```tsx
import { Table, TableColumn, TableRow } from '@/components';

interface NodeData extends TableRow {
  id: string;
  name: string;
  type: string;
  status: string;
  _status?: 'ok' | 'warn' | 'err';
}

const columns: TableColumn<NodeData>[] = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => <span>{value as string}</span>
  },
];

const data: NodeData[] = [
  { id: '001', name: 'Node-A', type: 'HTTP', status: 'OK', _status: 'ok' },
  { id: '002', name: 'Node-B', type: 'WS', status: 'WARN', _status: 'warn' },
  { id: '003', name: 'Node-C', type: 'TCP', status: 'ERR', _status: 'err' },
];

<Table
  columns={columns}
  data={data}
  selectedId={selectedId}
  onSelect={(row) => setSelectedId(row.id)}
/>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columns` | `TableColumn[]` | 必填 | 列定义 |
| `data` | `TableRow[]` | 必填 | 数据数组 |
| `selectedId` | `string` | - | 选中行 ID |
| `onSelect` | `(row: T) => void` | - | 选中回调 |
| `sortable` | `boolean` | `true` | 启用排序 |
| `loading` | `boolean` | `false` | 加载状态 |
| `emptyText` | `string` | `'No data available'` | 空状态文案 |

**类型定义**

```tsx
interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

interface TableRow {
  id: string;
  [key: string]: unknown;
  _status?: 'ok' | 'warn' | 'err';  // 行状态色
  _disabled?: boolean;               // 禁用行
}
```

**特性**

- 点击表头排序（asc → desc → 无）
- 行选中高亮 + 左侧 accent 条
- 支持自定义渲染 (`render` prop)
- 加载态骨架屏
- 空状态显示

**动效**

- 行淡入：每行延迟 20ms
- 排序切换：整表淡出淡入
- 骨架屏：呼吸动画 (1.5s 循环)

---

### Tooltip（提示）

**基础用法**

```tsx
import { Tooltip } from '@/components';

<Tooltip content="This is a hint message">
  <button>Hover me</button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <span>Bottom</span>
</Tooltip>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `ReactNode` | 必填 | 提示内容 |
| `children` | `ReactElement` | 必填 | 触发元素 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 位置 |
| `delay` | `number` | `500` | 显示延迟 (ms) |

**交互**

- Hover 延迟 500ms 后显示
- 离开立即隐藏
- 支持 focus 触发（无障碍）

**动效**

- 出现：淡入 + 微移 4px (140ms)
- 消失：淡出 (80ms)

---

### Drawer（抽屉）

**基础用法**

```tsx
import { Drawer, Button } from '@/components';

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Detail Panel"
  side="right"
  width="400px"
  footer={
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  }
>
  <p>Drawer content here</p>
</Drawer>
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isOpen` | `boolean` | 必填 | 是否打开 |
| `onClose` | `() => void` | 必填 | 关闭回调 |
| `side` | `'left' \| 'right'` | `'right'` | 滑入方向 |
| `title` | `string` | - | 标题 |
| `footer` | `ReactNode` | - | 底部操作区 |
| `width` | `string` | `'400px'` | 宽度 |
| `closeOnOverlay` | `boolean` | `true` | 点击遮罩关闭 |

**交互**

- Esc 关闭
- 遮罩点击关闭（可配置）
- 完整焦点锁定（Tab 循环）
- 关闭后恢复之前焦点

**动效**

- 打开：从边缘滑入 (220ms) + 遮罩淡入
- 关闭：滑出 (220ms) + 遮罩淡出

---

### Breadcrumb（面包屑）

**基础用法**

```tsx
import { Breadcrumb, BreadcrumbItem } from '@/components';

const items: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', onClick: () => navigate('/') },
  { id: 'dashboard', label: 'Dashboard', onClick: () => navigate('/dashboard') },
  { id: 'node', label: 'Node Details' },  // 当前页，不可点击
];

<Breadcrumb items={items} />

// 使用链接
const itemsWithHref: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'settings', label: 'Settings', href: '/settings' },
  { id: 'profile', label: 'Profile' },
];

<Breadcrumb items={itemsWithHref} />
```

**Props**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `BreadcrumbItem[]` | 必填 | 层级数组 |
| `separator` | `ReactNode` | `<ChevronRight />` | 分隔符 |

**类型定义**

```tsx
interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;      // 使用 <a> 标签
  onClick?: () => void;  // 使用 <button> 标签
}
```

**规则**

- 最后一项为当前页，不可点击，accent 下划线
- 其他项可点击，hover 变亮
- 分隔符颜色 `text.disabled`

**动效**

- 新增层级：从右滑入 (140ms)
- 每级延迟 50ms

---

## 设计原则

### 动效时长

| 场景 | 时长 | 常量 |
|------|------|------|
| Hover/Focus | 100-150ms | `MOTION.duration.fast` |
| 点击反馈 | 80ms | `MOTION.duration.instant` |
| 面板展开 | 220ms | `MOTION.duration.base` |
| 页面切换 | 320ms | `MOTION.duration.slow` |

### 缓动曲线

```typescript
MOTION.easing = {
  default: [0.4, 0, 0.2, 1],  // 通用
  enter: [0, 0, 0.2, 1],       // 进入
  exit: [0.4, 0, 1, 1],        // 退出
}
```

### 边框规则

- **细边框**：`0.5px`，颜色 `rgba(42, 58, 70, 0.5)`
- **标准边框**：`1px`，颜色 `#3A4A5A`
- **粗边框**：`2px`，L2/L3 级容器
- **Accent 边框**：`2px`，颜色 `#FF6A00`，仅焦点/告警

### 颜色系统

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

### 4. 强调色使用

- **只用于**：焦点、告警、关键读数、当前可操作元素
- **禁止**：当背景铺、当装饰撒

### 5. Loading 完成反馈

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
5. 更新本文档

### 自定义 Token

修改 `tokens.json`，然后重新生成 Tailwind 配置：

```json
{
  "color": {
    "accent": "#YOUR_COLOR"
  }
}
```

---

## 已知限制

- **Toast 组件**：未实现（TODO）- 可用 Modal 临时替代
- **图表组件**：未封装，建议使用 recharts 或 visx 配合设计规范自定义样式

---

## 许可证

本组件库遵循项目整体许可证。

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0  | 2026-01-15 | 初始发布：Button, Panel, Select, FormControls, Modal, Tabs, Progress, Card |
| 1.1  | 2026-01-16 | 新增 Table, Tooltip, Drawer, Breadcrumb；改进 Select 键盘导航；改进 Modal 焦点锁定 |
