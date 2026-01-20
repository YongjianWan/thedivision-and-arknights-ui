# NoiseOverlay（全局噪点层）

> P4 美学补丁包组件

## 基础用法

```tsx
import { NoiseOverlay } from '@/components';

// 在 layout.tsx 或 App 根组件中使用
function RootLayout({ children }) {
  return (
    <>
      <NoiseOverlay />
      {children}
    </>
  );
}
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `opacity` | `number` | `0.03` | 透明度 (0.01-0.05) |
| `enabled` | `boolean` | `true` | 是否启用 |
| `className` | `string` | - | 自定义类名 |

---

## 设计原理

纯色背景是"数字"的，叠加噪点是"硬件"的。这些微小的瑕疵让界面看起来像是显示在真实设备上。

### 技术实现

- 使用 SVG `feTurbulence` 生成噪点（无需额外图片资源）
- `mix-blend-mode: overlay` 叠加效果
- `pointer-events: none` 不影响交互
- 固定定位在最顶层 (`z-index: 9999`)

---

## 参数建议

| 透明度 | 效果 | 使用场景 |
|--------|------|----------|
| 0.01-0.02 | 极轻微 | 强调内容可读性 |
| 0.03 | 标准（推荐） | 大多数场景 |
| 0.04-0.05 | 明显 | 强调硬件质感 |

---

## 性能说明

- 使用 CSS 实现，无 JS 运行时开销
- SVG 噪点通过 CSS 引用，由浏览器渲染
- 可通过 `enabled={false}` 在低端设备禁用

```tsx
// 配合性能模式使用
const performanceMode = usePerformanceMode();

<NoiseOverlay enabled={performanceMode !== 'minimal'} />
```

---

## 与其他效果配合

NoiseOverlay 应在所有内容之上，通常放在 layout 根层级：

```tsx
// src/app/layout.tsx
import { NoiseOverlay, GridBackground } from '@/components';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GridBackground />
        {children}
        <NoiseOverlay />
      </body>
    </html>
  );
}
```

---

## 参考

- 美学补丁包 v1.1 - P4 材质叠加系统
- 设定总纲 - 全息感与硬件质感
