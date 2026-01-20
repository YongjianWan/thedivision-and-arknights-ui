# StatusBar（状态栏）

## 基础用法

```tsx
import { StatusBar } from '@/components';

<StatusBar />
```

---

## Props

无props，显示固定内容：
- 左侧：系统状态（SYSTEM ONLINE + 呼吸点）+ 节点信息
- 中间：标识文字（TACTICAL INTERFACE）
- 右侧：日期 + 时间（实时更新）

---

## 特性

- 自动更新时间（每秒刷新）
- 状态点呼吸动画（2s 循环）
- 半透明背景 + backdrop-blur

---

## 动效

- 进入：从上淡入 + 下移 (300ms)
- 状态点：opacity 0.5↔1 (2s 循环)

---

## 示例

### 全局布局

```tsx
export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <StatusBar />
      <main className="relative z-10 pt-12">
        {children}
      </main>
    </div>
  );
}
```

### 固定顶部

```tsx
<div className="relative">
  <StatusBar />
  <div className="pt-8">
    {/* 内容向下偏移，避免被状态栏遮挡 */}
  </div>
</div>
```
