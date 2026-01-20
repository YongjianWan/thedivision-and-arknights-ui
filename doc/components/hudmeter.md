# HUDMeter（仪表读数）

## 基础用法

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

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | 必填 | 当前值 |
| `max` | `number` | `100` | 最大值 |
| `label` | `string` | 必填 | 标签文字 |
| `unit` | `string` | `''` | 单位 |
| `variant` | `'default' \| 'accent' \| 'warn' \| 'danger'` | `'accent'` | 颜色变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `segments` | `number` | - | 分段数量（可选），显示分段进度条 |
| `color` | `string` | - | 自定义颜色，覆盖variant |

---

## 设计结构

```
  12,847 W
━━━━━━━━━━━━ 64%
 POWER LEVEL
```

- 数字：大、亮、等宽、tabular-nums
- 进度条：细（2-4px）
- 标签：display 字体、uppercase、tracking 宽

---

## 动效

- 数值变化：淡入 (0.5s)
- 进度条：宽度动画 (0.5s, cubic-bezier)

---

## 示例

### 不同变体

```tsx
<div className="grid grid-cols-2 gap-4">
  <HUDMeter value={45} max={100} label="CPU USAGE" unit="%" variant="default" />
  <HUDMeter value={78} max={100} label="MEMORY" unit="%" variant="accent" />
  <HUDMeter value={87} max={100} label="TEMPERATURE" unit="°C" variant="warn" />
  <HUDMeter value={95} max={100} label="DISK" unit="%" variant="danger" />
</div>
```

### 不同尺寸

```tsx
<div className="space-y-4">
  <HUDMeter value={1234} max={2000} label="BANDWIDTH" unit="Mbps" size="sm" />
  <HUDMeter value={1234} max={2000} label="BANDWIDTH" unit="Mbps" size="md" />
  <HUDMeter value={1234} max={2000} label="BANDWIDTH" unit="Mbps" size="lg" />
</div>
```

### 实时监控

```tsx
const [power, setPower] = useState(5000);

useEffect(() => {
  const interval = setInterval(() => {
    setPower(Math.random() * 10000 + 5000);
  }, 1000);
  return () => clearInterval(interval);
}, []);

<HUDMeter 
  value={Math.round(power)} 
  max={20000} 
  label="POWER OUTPUT" 
  unit="W"
  variant="accent"
/>
```
