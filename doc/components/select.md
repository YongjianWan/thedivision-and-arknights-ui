# Select（选择器）

## 基础用法

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

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `SelectOption[]` | 必填 | 选项数组 |
| `value` | `string` | - | 当前值 |
| `onChange` | `(value: string) => void` | - | 变化回调 |
| `placeholder` | `string` | `'Select...'` | 占位符 |
| `disabled` | `boolean` | `false` | 禁用 |

---

## 类型定义

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

---

## 交互

- 点击/Enter 展开
- 方向键导航（TODO）
- Esc 关闭
- 选中后自动关闭

---

## 动效

- 展开：LineDraw 边框 (150ms) + 选项错开淡入（每项延迟 40ms）
- 选中：Ping 一次 (100ms)

---

## 示例

```tsx
const [value, setValue] = useState('');

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'svelte', label: 'Svelte' },
];

<Select
  options={frameworks}
  value={value}
  onChange={setValue}
  placeholder="Choose framework..."
/>
```
