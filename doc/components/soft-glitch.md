# SoftGlitch（软故障效果）

轻微的文字偏移动画，用于错误/异常状态。

---

## 基础用法

```tsx
import { SoftGlitch } from '@/components';

<SoftGlitch>
  ERROR: CONNECTION_LOST
</SoftGlitch>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | 必填 | 内容 |
| `intensity` | `number` | `2` | 偏移强度（px） |

---

## 动效

- X 轴：±intensity 随机偏移
- 持续时间：100ms/次
- 间隔：随机 800-2000ms

---

## 用途

- 错误消息
- 系统异常提示
- 故障状态标记

---

## 示例

### 错误提示

```tsx
{error && (
  <SoftGlitch>
    <p className="text-danger">
      FATAL_ERROR: {error.message}
    </p>
  </SoftGlitch>
)}
```

### 状态指示

```tsx
<div className="flex items-center gap-2">
  <div className={cn(
    "w-2 h-2 rounded-full",
    status === 'err' && 'bg-danger'
  )} />
  {status === 'err' ? (
    <SoftGlitch intensity={1}>
      <span className="text-danger">CONNECTION LOST</span>
    </SoftGlitch>
  ) : (
    <span>ONLINE</span>
  )}
</div>
```

### 故障文字

```tsx
<SoftGlitch intensity={3}>
  <h1 className="text-4xl font-bold text-danger">
    SYSTEM_FAILURE
  </h1>
</SoftGlitch>
```
