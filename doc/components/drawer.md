# Drawer（抽屉）

## 基础用法

```tsx
import { Drawer, Button } from '@/components';

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Detail Panel"
  side="right"
  width="400px"
  footer={
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  }
>
  <p>Drawer content here</p>
</Drawer>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isOpen` | `boolean` | 必填 | 是否打开 |
| `onClose` | `() => void` | 必填 | 关闭回调 |
| `side` | `'left' \| 'right'` | `'right'` | 滑入方向 |
| `title` | `string` | - | 标题 |
| `footer` | `ReactNode` | - | 底部操作区 |
| `width` | `string` | `'400px'` | 宽度 |
| `closeOnOverlay` | `boolean` | `true` | 点击遮罩关闭 |

---

## 交互

- Esc 关闭
- 遮罩点击关闭（可配置）
- 完整焦点锁定（Tab 循环）
- 关闭后恢复之前焦点

---

## 动效

- 打开：从边缘滑入 (220ms) + 遮罩淡入
- 关闭：滑出 (220ms) + 遮罩淡出

---

## 示例

### 左侧抽屉

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  side="left"
  title="Filters"
  width="320px"
>
  <div className="space-y-4">
    <Select label="Status" options={statusOptions} />
    <Select label="Type" options={typeOptions} />
  </div>
</Drawer>
```

### 右侧详情面板

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  side="right"
  title={`Node ${selectedNode?.name}`}
  width="500px"
  footer={
    <div className="flex gap-2">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
      <Button variant="primary" onClick={handleUpdate}>Update</Button>
    </div>
  }
>
  <div className="space-y-4">
    <Input label="Name" value={selectedNode?.name} />
    <Input label="IP Address" value={selectedNode?.ip} />
    <Select label="Type" options={typeOptions} />
  </div>
</Drawer>
```
