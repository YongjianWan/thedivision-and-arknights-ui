# Table（数据表格）

## 基础用法

```tsx
import { Table, TableColumn, TableRow } from '@/components';

interface NodeData extends TableRow {
  id: string;
  name: string;
  type: string;
  status: string;
  _status?: 'ok' | 'warn' | 'err';
}

const columns: TableColumn<NodeData>[] = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => <span>{value as string}</span>
  },
];

const data: NodeData[] = [
  { id: '001', name: 'Node-A', type: 'HTTP', status: 'OK', _status: 'ok' },
  { id: '002', name: 'Node-B', type: 'WS', status: 'WARN', _status: 'warn' },
  { id: '003', name: 'Node-C', type: 'TCP', status: 'ERR', _status: 'err' },
];

<Table
  columns={columns}
  data={data}
  selectedId={selectedId}
  onSelect={(row) => setSelectedId(row.id)}
/>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columns` | `TableColumn[]` | 必填 | 列定义 |
| `data` | `TableRow[]` | 必填 | 数据数组 |
| `selectedId` | `string` | - | 选中行 ID |
| `onSelect` | `(row: T) => void` | - | 选中回调 |
| `sortable` | `boolean` | `true` | 启用排序 |
| `loading` | `boolean` | `false` | 加载状态 |
| `emptyText` | `string` | `'No data available'` | 空状态文案 |

---

## 类型定义

```tsx
interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

interface TableRow {
  id: string;
  [key: string]: unknown;
  _status?: 'ok' | 'warn' | 'err';  // 行状态色
  _disabled?: boolean;               // 禁用行
}
```

---

## 特性

- 点击表头排序（asc → desc → 无）
- 行选中高亮 + 左侧 accent 条
- 支持自定义渲染 (`render` prop)
- 加载态骨架屏
- 空状态显示

---

## 动效

- 行淡入：每行延迟 20ms
- 排序切换：整表淡出淡入
- 骨架屏：呼吸动画 (1.5s 循环)

---

## 示例

### 自定义渲染

```tsx
const columns = [
  { key: 'name', label: 'Name' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value, row) => (
      <Tag variant={row._status}>{value}</Tag>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <Button size="sm" onClick={() => handleEdit(row.id)}>Edit</Button>
    )
  }
];
```

### 加载态

```tsx
<Table columns={columns} data={data} loading={isLoading} />
```

### 空状态

```tsx
<Table 
  columns={columns} 
  data={[]} 
  emptyText="NO_RECORDS_FOUND (NULL_PTR)"
/>
```
