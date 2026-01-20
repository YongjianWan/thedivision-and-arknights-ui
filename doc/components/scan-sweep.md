# ScanSweep（扫描效果）

## 基础用法

```tsx
import { ScanSweep } from '@/components';

<ScanSweep 
  duration={1.2}
  onComplete={() => console.log('Scan complete')}
/>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `duration` | `number` | `1.2` | 扫描时长（秒） |
| `color` | `string` | `'var(--accent)'` | 扫描线颜色 |
| `interval` | `number` | - | 循环间隔(ms)，不传则只扫描一次 |
| `onComplete` | `() => void` | - | 完成回调 |

---

## 用途

- 页面进入时触发一次
- 加载完成时触发一次
- 数据刷新时触发一次

---

## 规则

- 全屏覆盖，z-index 40
- 从上往下扫描
- 扫描完成后自动淡出并销毁
- **不要常驻循环**

---

## 动效

- 扫描带：从 top: -40px → 100% (线性)
- 结束淡出：300ms

---

## 示例

### 页面加载完成

```tsx
const [showScan, setShowScan] = useState(false);

useEffect(() => {
  // 数据加载完成后触发扫描
  if (dataLoaded) {
    setShowScan(true);
  }
}, [dataLoaded]);

{showScan && (
  <ScanSweep 
    duration={1.0}
    onComplete={() => setShowScan(false)}
  />
)}
```

### 路由切换

```tsx
const [scanning, setScanning] = useState(true);

useEffect(() => {
  setScanning(true);
}, [pathname]);

{scanning && (
  <ScanSweep 
    duration={0.8}
    onComplete={() => setScanning(false)}
  />
)}
```

### 数据刷新

```tsx
function DataPanel() {
  const [scanning, setScanning] = useState(false);
  
  const handleRefresh = async () => {
    await fetchData();
    setScanning(true);
  };
  
  return (
    <>
      <Button onClick={handleRefresh}>Refresh</Button>
      {scanning && (
        <ScanSweep 
          onComplete={() => setScanning(false)}
        />
      )}
    </>
  );
}
```
