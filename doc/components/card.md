# Card（卡片）

## 基础用法

```tsx
import { Card } from '@/components';

<Card 
  title="Node-A" 
  meta="Last updated: 2min ago"
  tags={['ACTIVE', 'HTTP']}
  selected={selected === 'a'}
  onClick={() => setSelected('a')}
>
  <p>Connection status: OK</p>
</Card>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 标题 |
| `meta` | `string` | - | 副信息 |
| `tags` | `string[]` | - | 标签数组 |
| `footer` | `ReactNode` | - | 底部操作区 |
| `selected` | `boolean` | `false` | 选中状态 |
| `onClick` | `() => void` | - | 点击回调 |
| `children` | `ReactNode` | - | 内容 |

---

## 状态

- default：细边框 (0.5px)
- hover：边框加粗 + 背景亮一档 (100ms)
- selected：左侧 accent 条 2px

---

## 动效

- 进入：淡入 + scale 0.98→1.0 (220ms)
- hover：上移 2px (100ms)
- 点击：scale 0.99 (100ms)

---

## 示例

### 基础卡片

```tsx
<Card title="System Status">
  <p>All systems operational</p>
</Card>
```

### 可选中卡片

```tsx
const [selected, setSelected] = useState<string | null>(null);

<div className="grid grid-cols-3 gap-4">
  {nodes.map(node => (
    <Card
      key={node.id}
      title={node.name}
      meta={`Last ping: ${node.lastPing}`}
      tags={[node.type, node.status]}
      selected={selected === node.id}
      onClick={() => setSelected(node.id)}
    >
      <p>Uptime: {node.uptime}</p>
    </Card>
  ))}
</div>
```

### 带操作按钮

```tsx
<Card 
  title="Node-A"
  meta="192.168.1.100"
  footer={
    <div className="flex gap-2">
      <Button size="sm" variant="ghost">View</Button>
      <Button size="sm" variant="ghost">Edit</Button>
    </div>
  }
>
  <p>Connection: Stable</p>
</Card>
```
