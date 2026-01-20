# Modal（弹窗）

## 基础用法

```tsx
import { Modal, Button } from '@/components';

<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isOpen` | `boolean` | 必填 | 是否打开 |
| `onClose` | `() => void` | 必填 | 关闭回调 |
| `title` | `string` | - | 标题 |
| `footer` | `ReactNode` | - | 底部操作区 |
| `closeOnOverlay` | `boolean` | `true` | 点击遮罩关闭 |
| `children` | `ReactNode` | - | 内容 |

---

## 交互

- Esc 关闭
- 遮罩点击关闭（可配置）
- 打开时锁定 body 滚动
- 焦点锁定（简化版）

---

## 动效

- 打开：遮罩淡入 (150ms) + 面板 scale 0.96→1.0 (200ms)
- 关闭：面板 scale 1.0→0.96 (150ms) + 遮罩淡出 (150ms)
- **打开后自动冻结所有背景层动效**（按规范）

---

## 示例

### 确认对话框

```tsx
const [isOpen, setIsOpen] = useState(false);

<>
  <Button onClick={() => setIsOpen(true)}>Delete Item</Button>
  
  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirm Deletion"
    footer={
      <>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </>
    }
  >
    <p>This action cannot be undone. Are you sure?</p>
  </Modal>
</>
```

### 表单弹窗

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="New Connection"
  footer={
    <Button variant="primary" onClick={handleSubmit}>Create</Button>
  }
>
  <div className="space-y-4">
    <Input label="Name" placeholder="Node-A" />
    <Select label="Type" options={typeOptions} />
  </div>
</Modal>
```
