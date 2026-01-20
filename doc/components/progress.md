# Progress（进度条）

## 基础用法

```tsx
import { Progress } from '@/components';

<Progress value={67} showLabel variant="accent" />
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | 必填 | 进度值 (0-100) |
| `showLabel` | `boolean` | `false` | 显示百分比 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度 |
| `variant` | `'default' \| 'accent' \| 'danger'` | `'accent'` | 颜色 |
| `color` | `string` | - | 自定义颜色，覆盖variant |

---

## 动效

- 填充动画：easing `cubic-bezier(0.4, 0, 0.2, 1)` (320ms)

---

## 示例

### 不同变体

```tsx
<div className="space-y-4">
  <Progress value={30} variant="default" showLabel />
  <Progress value={67} variant="accent" showLabel />
  <Progress value={95} variant="danger" showLabel />
</div>
```

### 不同尺寸

```tsx
<div className="space-y-4">
  <Progress value={50} size="sm" />
  <Progress value={50} size="md" />
  <Progress value={50} size="lg" />
</div>
```

### 实时更新

```tsx
const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress(p => p >= 100 ? 0 : p + 1);
  }, 100);
  return () => clearInterval(interval);
}, []);

<Progress value={progress} showLabel />
```
