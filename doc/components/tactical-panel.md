# TacticalPanel（战术面板）

## 基础用法

```tsx
import { TacticalPanel } from '@/components';

<TacticalPanel 
  title="System Monitor" 
  level="L2"
  statusIndicator="ok"
>
  <p>Panel content here</p>
</TacticalPanel>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 面板标题 |
| `level` | `'L0' \| 'L1' \| 'L2' \| 'L3'` | `'L1'` | 边框等级 |
| `statusIndicator` | `'ok' \| 'warn' \| 'err' \| 'busy'` | - | 状态指示点 |
| `headerRight` | `ReactNode` | - | 标题栏右侧内容 |
| `className` | `string` | - | 自定义类名 |
| `children` | `ReactNode` | - | 内容 |

---

## 边框等级

- **L0**：无边框
- **L1**：细边框 (0.5px)
- **L2**：外粗 (2px) + 内细 (0.5px)，关键容器
- **L3**：橙色外框 (2px) + 内细 (0.5px)，焦点/告警

---

## 动效

- 进入：淡入 + scale 0.98→1.0 (220ms)
- busy 状态：指示点呼吸（1.5s 循环）

---

## 示例

### 不同等级

```tsx
<div className="grid grid-cols-2 gap-4">
  <TacticalPanel title="L0 Panel" level="L0">
    Minimal, no border
  </TacticalPanel>
  
  <TacticalPanel title="L1 Panel" level="L1">
    Standard border
  </TacticalPanel>
  
  <TacticalPanel title="L2 Panel" level="L2">
    Emphasized container
  </TacticalPanel>
  
  <TacticalPanel title="L3 Panel" level="L3">
    Critical or focused
  </TacticalPanel>
</div>
```

### 状态指示

```tsx
<div className="space-y-4">
  <TacticalPanel title="System OK" level="L2" statusIndicator="ok">
    All systems operational
  </TacticalPanel>
  
  <TacticalPanel title="Warning" level="L2" statusIndicator="warn">
    High memory usage detected
  </TacticalPanel>
  
  <TacticalPanel title="Error" level="L2" statusIndicator="err">
    Connection failed
  </TacticalPanel>
  
  <TacticalPanel title="Processing" level="L2" statusIndicator="busy">
    Syncing data...
  </TacticalPanel>
</div>
```
