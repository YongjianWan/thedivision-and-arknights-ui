# Tabs（标签页）

## 基础用法

```tsx
import { Tabs } from '@/components';
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'logs', label: 'Logs', disabled: true },
];

function MyTabs() {
  const [active, setActive] = useState('overview');
  
  return (
    <Tabs tabs={tabs} activeTab={active} onChange={setActive}>
      {active === 'overview' && <div>Overview content</div>}
      {active === 'details' && <div>Details content</div>}
    </Tabs>
  );
}
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tabs` | `Tab[]` | 必填 | 标签数组 |
| `activeTab` | `string` | - | 当前激活标签 |
| `onChange` | `(tabId: string) => void` | - | 切换回调 |
| `onTabChange` | `(tabId: string) => void` | - | 切换回调（别名） |
| `children` | `ReactNode` | - | 内容区 |

---

## 类型定义

```tsx
interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}
```

---

## 动效

- 切换：下划线滑动 (180ms) + 内容淡出淡入交替 (220ms)
- hover：淡入灰色下划线 (100ms)

---

## 示例

```tsx
const [activeTab, setActiveTab] = useState('system');

const tabs = [
  { id: 'system', label: 'System' },
  { id: 'network', label: 'Network' },
  { id: 'security', label: 'Security' },
  { id: 'logs', label: 'Logs' },
];

<Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
  {activeTab === 'system' && <SystemPanel />}
  {activeTab === 'network' && <NetworkPanel />}
  {activeTab === 'security' && <SecurityPanel />}
  {activeTab === 'logs' && <LogsPanel />}
</Tabs>
```
