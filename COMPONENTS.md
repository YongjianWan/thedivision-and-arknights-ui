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

- **Table 组件**：未实现（TODO）
- **Tooltip 组件**：未实现（TODO）
- **Drawer 组件**：未实现（TODO）
- **Breadcrumb 组件**：未实现（TODO）
- **键盘导航**：Select 未完全实现方向键导航
- **焦点锁定**：Modal 仅简化实现

---

## 许可证

本组件库遵循项目整体许可证。

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0  | 2026-01-15 | 初始发布：Button, Panel, Select, FormControls, Modal, Tabs, Progress, Card |
