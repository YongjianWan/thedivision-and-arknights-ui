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
| `easing` | `'quantized' \| 'smooth'` | `'quantized'` | 缓动模式 (P9 美学补丁) |
| `color` | `string` | - | 自定义颜色，覆盖variant |

---

## 动效

### 缓动模式 (P9 美学补丁)

| 模式 | 效果 | 适用场景 |
|------|------|----------|
| `quantized` | steps(8) 离散跳动 | 数据传输、文件下载 |
| `smooth` | cubic-bezier 平滑 | 能量充填、技能冷却 |

```tsx
// 量化模式（默认）- 硬件感
<Progress value={67} easing="quantized" />

// 平滑模式 - 流畅感
<Progress value={67} easing="smooth" />
```

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
