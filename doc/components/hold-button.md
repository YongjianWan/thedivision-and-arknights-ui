# HoldButton 长按确认按钮

> 补丁包2: 交互增强
>
> 用于危险操作（删除、重置等）的长按确认按钮

---

## 设计原理

危险操作（如删除数据、系统重置）不应该用弹窗确认。**长按 1.5 秒填满进度条** 的方式更符合"操作精密仪器"的感觉，模拟战术设备上的保险开关。

---

## 基础用法

```tsx
import { HoldButton, HoldToDelete, HoldToReset } from '@/components';

// 自定义按钮
<HoldButton onConfirm={() => console.log('Confirmed!')}>
  HOLD TO CONFIRM
</HoldButton>

// 预设变体
<HoldToDelete onConfirm={handleDelete} />
<HoldToReset onConfirm={handleReset} />
```

---

## Props

| Prop | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 按钮文字 |
| `onConfirm` | `() => void` | - | 长按完成后的回调 |
| `holdDuration` | `number` | `1500` | 长按时长 (ms) |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `segments` | `number` | `10` | 进度分段数（量化缓动） |
| `flashOnComplete` | `boolean` | `true` | 完成时是否闪烁 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按钮尺寸 |
| `icon` | `ReactNode` | - | 图标 |
| `holdingText` | `string` | - | 长按中的提示文字 |
| `className` | `string` | - | 自定义类名 |

---

## 视觉规范

| 属性 | 值 |
|------|-----|
| 边框 | 2px danger 色 |
| 进度填充 | danger 色从左到右 |
| 分段线 | 10 格，模拟量化充能 |
| 完成反馈 | 闪烁 + 短暂 glitch |
| 文字变化 | 进度 > 50% 时变白色 |

---

## 示例

### 自定义时长

```tsx
// 2 秒长按
<HoldButton onConfirm={handleAction} holdDuration={2000}>
  HOLD FOR 2 SECONDS
</HoldButton>
```

### 带图标

```tsx
import { Trash2 } from 'lucide-react';

<HoldButton onConfirm={handleDelete} icon={<Trash2 size={16} />}>
  DELETE ALL
</HoldButton>
```

### 长按中切换文字

```tsx
<HoldButton 
  onConfirm={handleReset}
  holdingText="RESETTING SYSTEM..."
>
  HOLD TO RESET
</HoldButton>
```

### 不同尺寸

```tsx
<HoldButton size="sm" onConfirm={fn}>SMALL</HoldButton>
<HoldButton size="md" onConfirm={fn}>MEDIUM</HoldButton>
<HoldButton size="lg" onConfirm={fn}>LARGE</HoldButton>
```

---

## 交互行为

1. **按下**: 开始计时，进度条从 0 开始填充
2. **持续按住**: 进度条以 10 格跳变方式填充（量化缓动）
3. **松开（未完成）**: 进度条归零，不触发回调
4. **松开（已完成）**: 触发 `onConfirm`，按钮闪烁反馈
5. **移出按钮**: 视为松开，进度归零

---

## 设计规范

### 何时使用

✅ **应该使用**：
- 删除数据
- 重置系统/配置
- 清空缓存
- 终止进程
- 任何不可逆操作

❌ **不应该使用**：
- 普通表单提交
- 导航操作
- 可撤销的操作
- 频繁执行的操作

### 时长建议

| 操作危险程度 | 建议时长 |
|-------------|----------|
| 中等（删除单项） | 1000-1500ms |
| 较高（批量删除） | 1500-2000ms |
| 极高（系统重置） | 2000-3000ms |

---

## 相关组件

- [Button](./button.md) - 普通按钮
- [Modal](./modal.md) - 弹窗（传统确认方式，不推荐用于危险操作）
- [Progress](./progress.md) - 进度条
