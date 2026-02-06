# Schematic 行为信息图

> 补丁包2: 行为信息图 (Behavioural Infographics)
>
> 展示"变化的过程"而非仅"状态的快照"

---

## 设计原理

战术 UI 的精髓在于展示 **"变化的过程"** 和 **"物体的逻辑"**。不是只显示"弹药剩余 30"，而是显示"弹药正在被装填到弹匣的动作"；不是只显示"服务器负载 80%"，而是显示"流量正在通过哪个节点传输"。

Schematic 组件使用 SVG 线框 + 流动光点来模拟数据传输过程。

---

## 基础用法

```tsx
import { Schematic, ServerTopology, DataFlow } from '@/components';

// 预设：服务器拓扑
<ServerTopology />

// 预设：数据流
<DataFlow stages={['INPUT', 'PROCESS', 'OUTPUT']} activeStage={1} />

// 自定义原理图
<Schematic
  nodes={[
    { id: 'a', label: 'SOURCE', x: 50, y: 50, type: 'source' },
    { id: 'b', label: 'TARGET', x: 200, y: 50, type: 'target' },
  ]}
  edges={[
    { from: 'a', to: 'b', animated: true },
  ]}
/>
```

---

## Schematic Props

| Prop | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `nodes` | `SchematicNode[]` | - | 节点列表 |
| `edges` | `SchematicEdge[]` | - | 连线列表 |
| `width` | `number` | `300` | SVG 宽度 |
| `height` | `number` | `200` | SVG 高度 |
| `showLabels` | `boolean` | `true` | 是否显示节点标签 |
| `flowSpeed` | `number` | `2` | 流动动画速度（秒） |
| `paused` | `boolean` | `false` | 是否暂停动画 |
| `className` | `string` | - | 自定义类名 |

### SchematicNode

```typescript
interface SchematicNode {
  id: string;
  label?: string;
  x: number;
  y: number;
  type?: 'default' | 'source' | 'target' | 'active' | 'error';
  size?: number;
}
```

### SchematicEdge

```typescript
interface SchematicEdge {
  from: string;
  to: string;
  animated?: boolean;
  style?: 'solid' | 'dashed';
}
```

---

## 节点类型

| Type | 描述 | 样式 |
|------|------|------|
| `default` | 默认节点 | 深色填充 + 边框 |
| `source` | 数据源 | accent 填充 + 发光 + 呼吸动画 |
| `target` | 目标节点 | 深色填充 + accent 边框 |
| `active` | 激活状态 | accent 填充 + 发光 |
| `error` | 错误状态 | danger 填充 + 发光 |

---

## 预设组件

### ServerTopology

服务器拓扑图，中心辐射布局。

```tsx
<ServerTopology
  servers={[
    { id: 'srv1', label: 'NODE_A', status: 'online' },
    { id: 'srv2', label: 'NODE_B', status: 'busy' },
    { id: 'srv3', label: 'NODE_C', status: 'offline' },
  ]}
  centerLabel="HUB"
  width={240}
  height={180}
/>
```

| Prop | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `servers` | `Array<{id, label, status}>` | 4 个默认节点 | 服务器列表 |
| `centerLabel` | `string` | `'HUB'` | 中心节点标签 |
| `width` | `number` | `240` | 宽度 |
| `height` | `number` | `180` | 高度 |

服务器状态：
- `online` → 显示为 target 节点，有流动动画
- `busy` → 显示为 active 节点，有流动动画
- `offline` → 显示为 error 节点，虚线连接，无动画

### DataFlow

数据流图，线性阶段布局。

```tsx
<DataFlow
  stages={['INPUT', 'VALIDATE', 'PROCESS', 'OUTPUT']}
  activeStage={2}
  width={320}
  height={60}
/>
```

| Prop | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `stages` | `string[]` | 4 个默认阶段 | 阶段列表 |
| `activeStage` | `number` | `1` | 当前激活阶段（0-based） |
| `width` | `number` | `320` | 宽度 |
| `height` | `number` | `60` | 高度 |

---

## 示例

### 自定义网络拓扑

```tsx
<Schematic
  width={400}
  height={200}
  nodes={[
    { id: 'client', label: 'CLIENT', x: 50, y: 100, type: 'source' },
    { id: 'proxy', label: 'PROXY', x: 200, y: 50, type: 'active' },
    { id: 'cache', label: 'CACHE', x: 200, y: 150, type: 'default' },
    { id: 'server', label: 'SERVER', x: 350, y: 100, type: 'target' },
  ]}
  edges={[
    { from: 'client', to: 'proxy', animated: true },
    { from: 'client', to: 'cache', animated: false, style: 'dashed' },
    { from: 'proxy', to: 'server', animated: true },
    { from: 'cache', to: 'server', animated: false },
  ]}
/>
```

### 在面板中使用

```tsx
<TacticalPanel title="NETWORK TOPOLOGY" level="L2">
  <ServerTopology
    servers={networkNodes}
    centerLabel="GATEWAY"
  />
</TacticalPanel>
```

### 配合 TechDecor

```tsx
<div className="relative">
  <DataFlow stages={stages} activeStage={current} />
  <TechDecor position="bottom-right" variant="hex" />
</div>
```

---

## 动画控制

### 暂停动画

当 Modal/Drawer 打开时，建议暂停背景动画：

```tsx
const [overlayOpen, setOverlayOpen] = useState(false);

<Schematic
  {...props}
  paused={overlayOpen}
/>
```

### 调整速度

```tsx
// 快速流动（1 秒完成一次）
<Schematic flowSpeed={1} {...props} />

// 慢速流动（3 秒完成一次）
<Schematic flowSpeed={3} {...props} />
```

---

## 设计规范

### 何时使用

✅ **应该使用**：
- 展示服务器/网络拓扑
- 展示数据处理流程
- 展示文件传输状态
- 展示系统架构

❌ **不应该使用**：
- 仅展示静态数据
- 需要精确点击交互的场景
- 小尺寸空间

---

## 相关组件

- [TacticalPanel](./tactical-panel.md) - 战术面板
- [HUDMeter](./hudmeter.md) - 数值读数
- [TechDecor](./tech-decor.md) - 装饰性技术文本
- [Progress](./progress.md) - 进度条
