# Toast（轻提示）

> **状态：TODO** - 尚未实现

## 计划特性

- 右上角弹出提示
- 支持 success/warning/error 类型
- 自动消失（可配置时长）
- 支持堆叠显示
- 可手动关闭

---

## 临时替代方案

使用 Modal 实现简单提示：

```tsx
<Modal
  isOpen={showToast}
  onClose={() => setShowToast(false)}
  title="Success"
  closeOnOverlay={true}
>
  <p>Operation completed successfully.</p>
</Modal>
```

---

## 预期 API（待实现）

```tsx
import { toast } from '@/components';

// 使用
toast.success('Operation completed');
toast.warning('High memory usage');
toast.error('Connection failed');

// JSX 组件
<Toast
  type="success"
  message="File saved"
  duration={3000}
  onClose={() => {}}
/>
```
