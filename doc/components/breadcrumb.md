# Breadcrumb（面包屑）

## 基础用法

```tsx
import { Breadcrumb, BreadcrumbItem } from '@/components';

const items: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', onClick: () => navigate('/') },
  { id: 'dashboard', label: 'Dashboard', onClick: () => navigate('/dashboard') },
  { id: 'node', label: 'Node Details' },  // 当前页，不可点击
];

<Breadcrumb items={items} />

// 使用链接
const itemsWithHref: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'settings', label: 'Settings', href: '/settings' },
  { id: 'profile', label: 'Profile' },
];

<Breadcrumb items={itemsWithHref} />
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `BreadcrumbItem[]` | 必填 | 层级数组 |
| `separator` | `ReactNode` | `<ChevronRight />` | 分隔符 |

---

## 类型定义

```tsx
interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;      // 使用 <a> 标签
  onClick?: () => void;  // 使用 <button> 标签
}
```

---

## 规则

- 最后一项为当前页，不可点击，accent 下划线
- 其他项可点击，hover 变亮
- 分隔符颜色 `text.disabled`

---

## 动效

- 新增层级：从右滑入 (140ms)
- 每级延迟 50ms

---

## 示例

### 基础导航

```tsx
const items = [
  { id: '1', label: 'System', onClick: () => navigate('/') },
  { id: '2', label: 'Network', onClick: () => navigate('/network') },
  { id: '3', label: 'Nodes', onClick: () => navigate('/network/nodes') },
  { id: '4', label: 'Node-A' },
];

<Breadcrumb items={items} />
```

### 使用 href

```tsx
const items = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Settings', href: '/settings' },
  { id: '3', label: 'Profile' },
];

<Breadcrumb items={items} />
```

### 自定义分隔符

```tsx
<Breadcrumb 
  items={items} 
  separator={<span className="text-accent">/</span>}
/>
```
