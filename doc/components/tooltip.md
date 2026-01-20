# Tooltip（提示）

## 基础用法

```tsx
import { Tooltip } from '@/components';

<Tooltip content="This is a hint message">
  <button>Hover me</button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <span>Bottom</span>
</Tooltip>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `ReactNode` | 必填 | 提示内容 |
| `children` | `ReactElement` | 必填 | 触发元素 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 位置 |
| `delay` | `number` | `500` | 显示延迟 (ms) |

---

## 交互

- Hover 延迟 500ms 后显示
- 离开立即隐藏
- 支持 focus 触发（无障碍）

---

## 动效

- 出现：淡入 + 微移 4px (140ms)
- 消失：淡出 (80ms)

---

## 示例

### 不同位置

```tsx
<div className="flex gap-4 justify-center items-center">
  <Tooltip content="Top tooltip" placement="top">
    <Button>Top</Button>
  </Tooltip>
  
  <Tooltip content="Right tooltip" placement="right">
    <Button>Right</Button>
  </Tooltip>
  
  <Tooltip content="Bottom tooltip" placement="bottom">
    <Button>Bottom</Button>
  </Tooltip>
  
  <Tooltip content="Left tooltip" placement="left">
    <Button>Left</Button>
  </Tooltip>
</div>
```

### 自定义延迟

```tsx
<Tooltip content="Instant tooltip" delay={0}>
  <Button>No delay</Button>
</Tooltip>

<Tooltip content="Slow tooltip" delay={1000}>
  <Button>1s delay</Button>
</Tooltip>
```

### 富文本提示

```tsx
<Tooltip 
  content={
    <div className="space-y-1">
      <div className="font-bold">API Status</div>
      <div className="text-sm">Last ping: 23ms</div>
      <div className="text-sm">Uptime: 99.9%</div>
    </div>
  }
>
  <Button>Hover for details</Button>
</Tooltip>
```
