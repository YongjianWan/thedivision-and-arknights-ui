# ParticleField（粒子场）

基于 Three.js 的粒子效果组件，可将图片、文字、网格或随机分布转换为动态粒子。

---

## 安装依赖

```bash
npm install three @types/three
```

---

## 基础用法

```tsx
import { ParticleField, ParticleSource } from '@/components';

// 从图片生成粒子
<ParticleField
  source={{ type: 'image', src: '/logo.png', sampleStep: 2 }}
  color="#FF6A00"
/>

// 从文字生成粒子
<ParticleField
  source={{ type: 'text', text: 'HELLO', fontSize: 100 }}
  color="#18D1FF"
/>

// 网格粒子
<ParticleField
  source={{ type: 'grid', cols: 40, rows: 25, spacing: 8 }}
  color={(i, total) => `hsl(${(i/total)*60+15}, 100%, 50%)`}
/>

// 随机分布粒子
<ParticleField
  source={{ type: 'random', count: 2000, spread: 200 }}
  color={() => `hsl(${Math.random()*40+10}, 100%, 50%)`}
/>

// 自定义点位
<ParticleField
  source={{ type: 'points', points: [{x: 0, y: 0}, {x: 10, y: 10}] }}
  color="#FF6A00"
/>
```

---

## 数据源类型

| 类型 | 属性 | 说明 |
|------|------|------|
| `image` | `src`, `sampleStep?` | 从透明PNG提取粒子 |
| `text` | `text`, `fontSize?`, `fontFamily?` | 文字转粒子 |
| `grid` | `cols`, `rows`, `spacing?` | 规则网格 |
| `random` | `count`, `spread?` | 球形随机分布 |
| `points` | `points: {x,y,z?}[]` | 自定义点位 |

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `source` | `ParticleSource` | 必填 | 粒子数据源 |
| `color` | `string \| (i,total)=>string` | `'#FF6A00'` | 颜色或渐变函数 |
| `backgroundColor` | `string \| null` | `'#0B0E12'` | 背景色，null为透明 |
| `particleSize` | `number` | `2` | 粒子大小 |
| `speed` | `number` | `0.02` | 聚合速度 (0-1) |
| `enableSwap` | `boolean` | `true` | 粒子交换动画 |
| `swapInterval` | `number` | `100` | 交换间隔 (ms) |
| `cameraSwaySpeed` | `number` | `5000` | 相机摇摆速度，0禁用 |
| `cameraSwayAmount` | `number` | `100` | 摇摆幅度 |
| `initialSpread` | `number` | `500` | 初始散布范围 |
| `scale` | `number` | `1` | 缩放比例 |
| `onSettled` | `() => void` | - | 粒子就位回调 |

---

## 动效

- 初始：粒子从随机位置散布
- 聚合：平滑移动到目标位置
- 交换：随机粒子互换位置
- 相机：缓慢左右摇摆

---

## 用途

- 启动页/登录页背景
- 地图可视化
- 文字特效
- 数据粒子化展示

---

## 示例

### Logo 粒子化

```tsx
<ParticleField
  source={{ type: 'image', src: '/logo.png', sampleStep: 2 }}
  color="#FF6A00"
  particleSize={2.5}
  speed={0.03}
  enableSwap={true}
/>
```

### 文字粒子

```tsx
<ParticleField
  source={{ 
    type: 'text', 
    text: 'DIVISION', 
    fontSize: 120,
    fontFamily: 'Orbitron'
  }}
  color={(i, total) => {
    const hue = 15 + (i / total) * 30;
    return `hsl(${hue}, 100%, 50%)`;
  }}
  backgroundColor={null}
  speed={0.015}
/>
```

### 网格可视化

```tsx
<ParticleField
  source={{ type: 'grid', cols: 50, rows: 30, spacing: 10 }}
  color={(i, total) => {
    const intensity = Math.sin((i / total) * Math.PI * 4) * 0.5 + 0.5;
    return `rgba(255, 106, 0, ${intensity})`;
  }}
  particleSize={3}
  cameraSwaySpeed={8000}
/>
```
