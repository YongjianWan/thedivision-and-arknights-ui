# Spinner（加载器）

## 基础用法

```tsx
import { Spinner } from '@/components';

<Spinner size={24} />
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number` | `20` | 直径(px) |

---

## 动效

- 匀速旋转：800ms/圈

---

## 示例

### 不同尺寸

```tsx
<div className="flex gap-4 items-center">
  <Spinner size={16} />
  <Spinner size={24} />
  <Spinner size={32} />
  <Spinner size={48} />
</div>
```

### 按钮中使用

```tsx
<Button loading>
  Processing...
</Button>
```

### 全屏加载

```tsx
<div className="fixed inset-0 flex items-center justify-center bg-black/50">
  <Spinner size={48} />
</div>
```
