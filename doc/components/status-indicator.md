# StatusIndicator

状态指示器组件，采用 **颜色+图标双重编码** 以满足无障碍设计要求（WCAG 2.1）。

## 设计原则

- **双重编码**：色盲用户无法仅通过颜色区分状态，必须同时有图标辅助
- **Filled 图标**：使用填充风格图标（禁止纯线性），通过眯眼测试
- **语义化**：每个状态有明确的 ARIA 标签

## 状态映射

| 状态 | 颜色 | 图标 | 用途 |
|------|------|------|------|
| `ok` | `--success` (绿色) | ✓ CheckCircle | 正常/在线/成功 |
| `warn` | `--warning` (黄色) | ⚠ AlertTriangle | 警告/需关注 |
| `err` | `--danger` (红色) | ✕ XCircle | 错误/失败 |
| `busy` | `--accent` (橙色) | ◌ Loader (旋转) | 加载中/处理中 |
| `offline` | `--text-disabled` (灰色) | 📶 WifiOff | 离线/断开连接 |

## 基础用法

```tsx
import { StatusIndicator } from '@/components';

// 基础用法
<StatusIndicator status="ok" />
<StatusIndicator status="warn" />
<StatusIndicator status="err" />
<StatusIndicator status="busy" />
<StatusIndicator status="offline" />

// 带标签
<StatusIndicator status="ok" showLabel />
// 渲染: ✓ OK

// 尺寸变体
<StatusIndicator status="err" size="sm" />  // 12px
<StatusIndicator status="err" size="md" />  // 16px
<StatusIndicator status="err" size="lg" />  // 20px
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `status` | `'ok' \| 'warn' \| 'err' \| 'busy' \| 'offline'` | **必填** | 状态类型 |
| `showLabel` | `boolean` | `false` | 是否显示文字标签 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | 图标尺寸 |
| `dotOnly` | `boolean` | `false` | 仅显示圆点（向后兼容模式） |
| `pulse` | `boolean` | 自动 | 脉冲动画（busy 默认开启） |
| `className` | `string` | - | 自定义样式类 |

## 变体组件

### StatusBadge

带背景的状态徽章，适合表格行或列表项：

```tsx
import { StatusBadge } from '@/components';

<StatusBadge status="ok" />
// 渲染: [✓ OK] (带背景)
```

### 快捷组件

预设状态的快捷组件：

```tsx
import { StatusOk, StatusWarn, StatusError, StatusBusy, StatusOffline } from '@/components';

<StatusOk showLabel />
<StatusError size="lg" />
```

## 与 TacticalPanel 集成

`dotOnly` 模式用于向后兼容 TacticalPanel 的简化状态点：

```tsx
// TacticalPanel 内部使用
<StatusIndicator status="ok" dotOnly />
// 仅渲染一个绿色圆点，与原有行为一致
```

## 无障碍

- 所有状态都有 `role="status"` 和 `aria-label`
- 图标+颜色双重编码，符合 WCAG 2.1 AA 级标准
- busy 状态的 Loader 图标有旋转动画，提供视觉反馈

## 相关组件

- [TacticalPanel](./tactical-panel.md) - 使用 StatusIndicator 显示面板状态
- [Table](./table.md) - 行状态可使用 StatusBadge
- [Toast](./toast.md) - 消息类型与状态对应
