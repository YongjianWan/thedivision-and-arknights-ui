# Button（按钮）

## 基础用法

```tsx
import { Button } from '@/components';

<Button variant="primary" size="md">
  Execute
</Button>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'secondary'` | 按钮类型 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按钮尺寸 |
| `loading` | `boolean` | `false` | 加载状态 |
| `disabled` | `boolean` | `false` | 禁用状态 |

---

## Variants

- **primary**：主操作，橙色填充（`#FF6A00`）
- **secondary**：次要操作，透明底+边框
- **ghost**：无边框，用于工具栏
- **danger**：危险操作，红色填充（`#FF3B30`）

---

## 动效

- 点击：`scale 0.98` (80ms)
- Loading 状态：旋转 Spinner (800ms/圈)

---

## 示例

### 基础按钮

```tsx
<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Danger</Button>
</div>
```

### 尺寸

```tsx
<div className="flex gap-2 items-end">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>
```

### 加载状态

```tsx
<Button variant="primary" loading>
  Processing...
</Button>
```

### 禁用状态

```tsx
<Button disabled>Disabled</Button>
```
