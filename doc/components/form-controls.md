# Checkbox / Radio / Switch（表单控件）

## Checkbox

```tsx
import { Checkbox } from '@/components';

<Checkbox 
  checked={checked}
  onChange={setChecked}
  label="Accept terms"
/>
```

---

## Radio

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

---

## Switch

```tsx
import { Switch } from '@/components';

<Switch 
  checked={enabled}
  onChange={setEnabled}
  label="Enable feature"
/>
```

---

## 共同 Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | 选中状态 |
| `onChange` | `(checked: boolean) => void` | - | 变化回调 |
| `label` | `string` | - | 标签文字 |
| `disabled` | `boolean` | `false` | 禁用 |

---

## 动效

- Checkbox 选中：勾形 LineDraw (80ms)
- Radio 选中：中心点 scale 0→1 (100ms)
- Switch 切换：滑块滑动 (150ms) + 背景色渐变 (150ms)
- 所有点击：Ping 一次 (100ms)

---

## 示例

### Checkbox 组

```tsx
const [checks, setChecks] = useState({ a: false, b: true, c: false });

<div className="space-y-2">
  <Checkbox 
    checked={checks.a} 
    onChange={(v) => setChecks({...checks, a: v})}
    label="Feature A"
  />
  <Checkbox 
    checked={checks.b} 
    onChange={(v) => setChecks({...checks, b: v})}
    label="Feature B"
  />
  <Checkbox 
    checked={checks.c} 
    onChange={(v) => setChecks({...checks, c: v})}
    label="Feature C"
  />
</div>
```

### Radio 组

```tsx
const [choice, setChoice] = useState('a');

<div className="space-y-2">
  <Radio checked={choice === 'a'} onChange={() => setChoice('a')} label="Option A" name="group" value="a" />
  <Radio checked={choice === 'b'} onChange={() => setChoice('b')} label="Option B" name="group" value="b" />
  <Radio checked={choice === 'c'} onChange={() => setChoice('c')} label="Option C" name="group" value="c" />
</div>
```

### Switch

```tsx
const [enabled, setEnabled] = useState(false);

<Switch 
  checked={enabled} 
  onChange={setEnabled}
  label={enabled ? 'Notifications On' : 'Notifications Off'}
/>
```
