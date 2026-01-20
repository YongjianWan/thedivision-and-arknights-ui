# GridBackground（网格背景）

## 基础用法

```tsx
import { GridBackground } from '@/components';

<GridBackground />
```

---

## Props

无props，提供固定的背景层效果。

---

## 包含元素

1. **透视网格地面**：3D 旋转网格，营造深度感
2. **水平扫描线**：从上往下循环扫描（8s/次）
3. **数据流粒子**：垂直下落的细线（12条，随机参数）
4. **六边形装饰**：两个六边形边框动画
5. **角落瞄准框**：左上角 L 形框架

---

## 规则

- 固定定位，z-index: 0
- 所有动画用 CSS 实现（降低 JS 负担）
- 确定性伪随机（避免 SSR/CSR 不一致）
- **Modal/Drawer 打开时应该被遮罩覆盖**

---

## 性能优化

- 使用 CSS 动画而非 Framer Motion
- 粒子数量控制在 12 条
- 透明度低，不影响可读性

---

## 示例

### 基础布局

```tsx
export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

### 配合 StatusBar

```tsx
<div className="relative min-h-screen">
  <GridBackground />
  <StatusBar />
  <main className="relative z-10 pt-12">
    {children}
  </main>
</div>
```
