# TechDecor 装饰性技术文本

> P2: 补丁包 v1.1 - 装饰性技术文本（Tech Decor）
>
> 用"无意义"的技术参数填充留白，制造"系统正在运行"的氛围感

---

## 设计原理

"正在运行的系统"需要视觉证据。跳动的十六进制、闪烁的状态码，这些"无意义"的信息作为**纹理**存在，暗示后台有数据在流动。

**规则**：
- 字号 9-10px，不要求阅读
- 等宽字体（JetBrains Mono）
- 透明度 0.15-0.30
- 放置在角落/边缘，不遮挡主内容

---

## 基础用法

```tsx
import { TechDecor, TechDecorBlock } from '@/components';

// 单个装饰文本
<div className="relative p-4">
  <TechDecor position="bottom-right" variant="status" />
  {/* 主内容 */}
</div>

// 多行装饰块
<div className="relative p-4">
  <TechDecorBlock position="top-left" lines={3} />
  {/* 主内容 */}
</div>
```

---

## TechDecor Props

| Prop | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'custom'` | `'bottom-right'` | 位置预设 |
| `variant` | `'status' \| 'hex' \| 'coord' \| 'dynamic'` | `'status'` | 词库类型 |
| `combine` | `TechDecorVariant[]` | - | 组合多个词库随机选择 |
| `active` | `boolean` | - | 强制激活跳动 |
| `hoverActive` | `boolean` | `true` | 是否响应 hover 激活 |
| `interval` | `number` | `150` | 跳动间隔 (ms) |
| `prefix` | `string` | - | 自定义前缀 |
| `suffix` | `string` | - | 自定义后缀 |
| `className` | `string` | - | 自定义类名 |

---

## TechDecorBlock Props

| Prop | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `lines` | `number` | `3` | 行数 |
| `position` | `string` | `'bottom-right'` | 位置预设 |
| `active` | `boolean` | `false` | 是否激活跳动 |
| `align` | `'left' \| 'right'` | `'right'` | 对齐方式 |
| `className` | `string` | - | 自定义类名 |

---

## 词库变体

### `status` - 状态词
```
SYSTEM_OK | BUFFER_READY | NODE_ACTIVE | LINK_STABLE | NOMINAL
PROXY_INIT | CACHE_HIT | AUTH_VALID | SYNC_DONE | STANDBY
```

### `hex` - 十六进制
```
0x7F3A2E | 0xAB12CF | 0x00FF91 | 0xE7D4B2
0x1A2B3C | 0xDEADBEEF | 0xCAFEBABE | 0xFF6A00
```

### `coord` - 坐标/编码
```
LAT 31.2304 | LNG 121.4737 | ALT 4.2M | ZONE_7
SEC_LEVEL_3 | CLEARANCE_ALPHA | NODE_ID:7F3A
```

### `dynamic` - 动态值
```
127.0.0.1:8080 | [OK] | ████░░ | REF#4A2F
T+00:42:17 | 98.7% | >> | ...
```

---

## 示例

### 在面板内使用

```tsx
<TacticalPanel title="System Monitor" level="L2">
  <TechDecor position="top-right" variant="hex" />
  <TechDecorBlock position="bottom-left" lines={2} />
  
  <div className="p-4">
    {/* 主内容 */}
  </div>
</TacticalPanel>
```

### 组合多个词库

```tsx
<TechDecor 
  position="bottom-right"
  combine={['status', 'hex']}
  prefix="SYS::"
/>
// 输出类似: SYS::0x7F3A2E 或 SYS::SYSTEM_OK
```

### Loading 状态高频跳动

```tsx
<TechDecor 
  position="bottom-right"
  variant="dynamic"
  active={isLoading}
  interval={80}  // 高频
/>
```

### 自定义位置

```tsx
<TechDecor 
  position="custom"
  className="absolute left-4 top-1/2 -translate-y-1/2"
  variant="coord"
/>
```

---

## useTechDecor Hook

如果需要更精细的控制，可以直接使用 hook：

```tsx
import { useTechDecor } from '@/hooks/useTechDecor';

function CustomDecor() {
  const text = useTechDecor({
    variant: 'status',
    active: true,
    interval: 100,
  });

  return <span className="font-mono text-xs opacity-20">{text}</span>;
}
```

### Hook Options

| Option | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `variant` | `TechDecorVariant` | `'status'` | 词库类型 |
| `active` | `boolean` | `false` | 是否激活跳动 |
| `interval` | `number` | `150` | 跳动间隔 (ms) |
| `combine` | `TechDecorVariant[]` | - | 组合多个词库 |

---

## 动态行为

| 状态 | 行为 |
|------|------|
| 静态 | 极慢呼吸（4s 更新一次），透明度 0.20 |
| Hover | 开始跳动（150ms 间隔），透明度 0.35 |
| Loading | 高频跳动（80-100ms 间隔） |
| Error | 可配合 `SoftGlitch` 使用 |

---

## 设计规范

### 放置原则
- ✓ 面板内边缘（padding 区域内）
- ✓ 大片留白区
- ✓ 角落
- ✗ **永远不要放在视觉焦点位置**

### 视觉规范
- 字号: 9-10px
- 字体: 等宽（font-mono）
- 字重: Light (300)
- 透明度: 静态 0.20，激活 0.35
- 大小写: UPPERCASE

---

## 相关组件

- [TacticalPanel](./tactical-panel.md) - 战术面板
- [SoftGlitch](./soft-glitch.md) - 软故障效果
- [NoiseOverlay](./noise-overlay.md) - 全局噪点层
