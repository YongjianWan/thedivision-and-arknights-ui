# Typewriter（打字机效果）

## 基础用法

```tsx
import { Typewriter, TypewriterLines } from '@/components';

// 单行打字机
<Typewriter 
  text="SYSTEM INITIALIZING..."
  speed={50}
  delay={200}
  cursor={true}
  onComplete={() => console.log('Done')}
/>

// 多行打字机
<TypewriterLines 
  lines={[
    'Loading modules...',
    'Connecting to server...',
    'Authentication successful.',
    'Ready.',
  ]}
  speed={40}
  lineDelay={200}
/>
```

---

## Typewriter Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | 必填 | 要显示的文字 |
| `speed` | `number` | `50` | 每个字符延迟（ms） |
| `delay` | `number` | `0` | 开始前延迟（ms） |
| `cursor` | `boolean` | `true` | 显示光标 |
| `onComplete` | `() => void` | - | 打字完成回调 |

---

## TypewriterLines Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lines` | `string[]` | 必填 | 行数组 |
| `speed` | `number` | `40` | 每个字符延迟（ms） |
| `lineDelay` | `number` | `200` | 行与行之间延迟（ms） |
| `lineClassName` | `string` | - | 每行的样式类 |

---

## 特性

- 单行：逐字出现 + 光标闪烁（530ms 间隔）
- 多行：一行打完再打下一行，已完成的行变为次要色
- 光标：2px 宽，与文字同色

---

## 用途

- 系统启动/初始化提示
- Terminal 输出模拟
- 动态消息展示

---

## 示例

### 启动序列

```tsx
<TypewriterLines
  lines={[
    '> INITIALIZING SYSTEM...',
    '> LOADING MODULES... OK',
    '> CONNECTING TO SERVER... OK',
    '> AUTHENTICATING... OK',
    '> SYSTEM READY',
  ]}
  speed={30}
  lineDelay={150}
/>
```

### 单行提示

```tsx
<Typewriter
  text="ESTABLISHING UPLINK..."
  speed={60}
  delay={500}
  cursor={true}
  onComplete={() => setStatus('connected')}
/>
```

### Terminal 风格

```tsx
<div className="font-mono text-sm">
  <TypewriterLines
    lines={[
      '$ npm install',
      '$ npm run build',
      'Build completed in 2.3s',
    ]}
    speed={20}
    lineDelay={300}
    lineClassName="text-green-400"
  />
</div>
```
