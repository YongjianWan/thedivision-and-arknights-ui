# Input（输入框）

## 基础用法

```tsx
import { Input } from '@/components';

<Input 
  label="Username"
  placeholder="Enter username..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | - | 标签 |
| `placeholder` | `string` | - | 占位符 |
| `value` | `string` | - | 值 |
| `onChange` | `ChangeEventHandler` | - | 变化回调 |
| `type` | `string` | `'text'` | 输入类型 |
| `disabled` | `boolean` | `false` | 禁用 |
| `error` | `string` | - | 错误信息 |

---

## 状态

- default：细边框 (0.5px)
- focus：accent 边框 (2px) + focus ring
- error：danger 边框 (2px)
- disabled：降低透明度

---

## 示例

### 基础输入

```tsx
<Input 
  label="Email" 
  type="email"
  placeholder="user@example.com"
/>
```

### 密码输入

```tsx
<Input 
  label="Password" 
  type="password"
  placeholder="Enter password"
/>
```

### 错误状态

```tsx
<Input 
  label="API Key" 
  value={apiKey}
  error="Invalid API key format"
/>
```

### 禁用状态

```tsx
<Input 
  label="System ID" 
  value="SYS-001"
  disabled
/>
```
