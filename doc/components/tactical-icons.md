# TacticalIcons

战术风格图标库，采用 **Filled/Solid** 风格，适用于近未来科幻 UI。

## 设计规范

| 属性 | 要求 |
|------|------|
| **风格** | Filled/Solid 优先，禁止纯线性 |
| **颜色** | 单色渲染，继承 `currentColor` |
| **复杂度** | 通过"眯眼测试"——眯眼看5秒还能认出来 |
| **边角** | 锐利优先，避免过圆润 |
| **尺寸** | 默认 24×24，支持自定义 |

## 图标列表

### 目标与定位

| 图标 | 组件名 | 用途 |
|------|--------|------|
| 🎯 | `TargetLockIcon` | 锁定目标、聚焦 |
| ⊕ | `CrosshairIcon` | 准心、瞄准 |
| 📍 | `LocationIcon` | GPS、定位 |

### 通信与信号

| 图标 | 组件名 | 用途 |
|------|--------|------|
| 📶 | `SignalIcon` | 信号强度（支持 level 0-3） |
| ⬆️ | `UplinkIcon` | 上行链路 |
| ⬇️ | `DownlinkIcon` | 下行链路 |
| 🔄 | `SyncIcon` | 同步、刷新 |

### 系统与数据

| 图标 | 组件名 | 用途 |
|------|--------|------|
| 📡 | `RadarIcon` | 雷达扫描 |
| 🔒 | `SecureIcon` | 安全、加密 |
| ⚠️ | `AlertIcon` | 警报、警戒 |
| 🔋 | `BatteryIcon` | 电池（支持 level 0-100） |
| 🖥️ | `ServerIcon` | 服务器、机架 |
| ⬡ | `NodeIcon` | 节点、终端 |
| ▦ | `DataStreamIcon` | 数据流 |

### 装饰

| 图标 | 组件名 | 用途 |
|------|--------|------|
| ⬢ | `HexIcon` | 六边形、蜂窝单元 |
| ◇ | `DiamondIcon` | 菱形装饰 |

## 基础用法

```tsx
import { 
  TargetLockIcon, 
  SignalIcon, 
  RadarIcon,
  TacticalIcons 
} from '@/components';

// 单独导入
<TargetLockIcon size={24} className="text-accent" />
<RadarIcon size={20} className="text-text-secondary" />

// 通过集合访问
<TacticalIcons.Signal level={2} size={24} />
<TacticalIcons.Battery level={75} size={20} />
```

## Props

### 通用属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number` | `24` | 图标尺寸（px） |
| `className` | `string` | - | 自定义样式类 |
| `aria-label` | `string` | 自动 | 无障碍标签 |

### SignalIcon 特有

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `level` | `0 \| 1 \| 2 \| 3` | `3` | 信号格数 |

### BatteryIcon 特有

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `level` | `number` | `100` | 电量百分比 (0-100) |

## 使用示例

### 状态栏

```tsx
<div className="flex items-center gap-3">
  <SignalIcon level={3} size={16} className="text-success" />
  <BatteryIcon level={85} size={16} className="text-text-primary" />
  <SecureIcon size={16} className="text-accent" />
</div>
```

### 面板装饰

```tsx
<TacticalPanel title="RADAR SCAN" level="L2">
  <div className="flex items-center gap-2">
    <RadarIcon size={20} className="text-accent animate-spin" />
    <span>SCANNING...</span>
  </div>
</TacticalPanel>
```

### 数据行

```tsx
<ListRow 
  icon={<ServerIcon size={16} />}
  title="NODE-ALPHA-01"
  meta="192.168.1.100"
  value={<StatusIndicator status="ok" />}
/>
```

## 与其他图标库对比

| 库 | 风格 | 推荐场景 |
|---|------|----------|
| **TacticalIcons** | Filled/Solid | 战术 UI、HUD |
| Lucide | 线性 | 通用 SaaS |
| Heroicons | 混合 | 通用 Web |
| Phosphor (Fill) | Filled | 备选方案 |

## 自定义图标

如需添加新图标，请遵循规范：

```tsx
export function CustomTacticalIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"  // 必须使用 currentColor
      className={className}
      aria-label="Custom Icon"
      {...props}
    >
      {/* SVG 路径 - 使用 fill 而非 stroke */}
      <path d="..." />
    </svg>
  );
}
```

## 相关组件

- [StatusIndicator](./status-indicator.md) - 内置 Filled 状态图标
- [Button](./button.md) - 可添加图标前缀
- [ListRow](./list-row.md) - 支持图标插槽
