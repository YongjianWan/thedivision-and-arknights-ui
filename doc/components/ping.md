# Ping（脉冲动画）

辅助工具函数，用于 Framer Motion 的脉冲反馈。

---

## 基础用法

```tsx
import { ping } from '@/lib/motion';
import { motion } from 'framer-motion';

<motion.div animate={loading ? {} : ping}>
  {content}
</motion.div>
```

---

## 定义

```typescript
export const ping = {
  scale: [1, 1.05, 1],
  transition: { duration: 0.12 }
};
```

---

## 用途

- 加载完成反馈
- 操作成功提示
- 数据更新闪烁

---

## 示例

### 加载完成

```tsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().then(() => setLoading(false));
}, []);

<motion.div animate={loading ? {} : ping}>
  <Card title="Data">
    {data}
  </Card>
</motion.div>
```

### 点击反馈

```tsx
const [clicked, setClicked] = useState(false);

const handleClick = () => {
  setClicked(true);
  setTimeout(() => setClicked(false), 120);
};

<motion.button 
  onClick={handleClick}
  animate={clicked ? ping : {}}
>
  Click me
</motion.button>
```

### 数据刷新

```tsx
const [refreshKey, setRefreshKey] = useState(0);

<motion.div key={refreshKey} animate={ping}>
  <p>Last updated: {timestamp}</p>
</motion.div>

<Button onClick={() => setRefreshKey(k => k + 1)}>
  Refresh
</Button>
```
