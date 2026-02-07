# PIL 核心规范 v3.0

> Personal Interface Language —— 战术终端风格设计系统

---

## 一句话定位

**不是网页，是你的系统。**

像一个正在运行的个人终端、战术地图、指挥界面。用户不是在"浏览"，是在"操作系统"。

---

## 不可妥协的设计宪法

### 1. 界面是"系统"，不是"页面"
- 有状态（在线/离线/同步中/异常）
- 有反馈（操作后系统响应）
- 有层级（可深入、可返回、有上下文）

### 2. 强调色只用于焦点
- ✅ 当前可操作的元素
- ✅ 被选中/聚焦的状态
- ✅ 关键告警
- ❌ 禁止当背景铺满

### 3. 结构稳定
空/加载/错误/有数据——**只换内容，不换骨架**。肌肉记忆是神圣的。

### 4. 三层信息层级
| 层级 | 作用 | 规则 |
|------|------|------|
| 读数层 | 关键数值、状态 | 最稳定、最醒目 |
| 操作层 | 当前焦点、可交互 | 强调色在这里 |
| 背景层 | 环境、氛围 | 永远不抢戏 |

### 5. 硬朗，不软糯
- 边角：小圆角或直角，**不要大圆角**
- 动效：短促、干脆，**不要弹跳、不要果冻**
- 反馈：即时、明确

### 6. 炫但不吵
- 同时动的东西 ≤ 2
- 动效短（大多 <300ms）
- 无意义循环 = 0
- 背景层永远安静

---

## 标志性视觉语法

### 边框系统：外粗内细（L0-L3）

```
┏━━━━━━━━━━━━━━━━━━━━━━━━┓  ← 外框：粗（2-3px）
┃ ┌──────────────────┐  ┃
┃ │                  │  ┃  ← 内框：细（1px）
┃ │     内容区域      │  ┃
┃ │                  │  ┃
┃ └──────────────────┘  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛
```

| 等级 | 边框处理 | 使用场景 | 同屏限制 |
|------|----------|----------|----------|
| **L0** | 无边框 | 普通内容块 | 不限 |
| **L1** | 细边框 1px | 普通 Panel | 不限 |
| **L2** | 外粗(2px) + 内细 + 2px间隙 | 关键容器、主画布 | ≤3个 |
| **L3** | 外粗(accent色) + 内细 | **仅限当前焦点模块** | **≤1个** |

**关键规则**：
- accent 外框只给 L3（焦点/告警）
- 双层边框的 2px 间隙创造"物理厚度感"
- L3 容器应有锚点装饰（4×4px 角落方块）

### Z-Depth 层次

```
Z-10  base      → 贴地，稳定，无阴影
Z-15  raised    → 凸起，基础阴影，主要面板
Z-20  floating  → 悬浮，强调阴影+blur，弹窗/详情
```

### 圆角规则
| 场景 | 圆角 |
|------|------|
| 大容器/面板 | 0-4px |
| 按钮/输入框 | 2-4px |
| 标签/徽章 | 2px |
| 需要"硬"的地方 | **0px** |

**原则**：宁方勿圆。

---

## Design Tokens

以 `tokens.json` 为唯一真源：

### 颜色
```
accent:       #FF6A00 (橙，焦点/告警)
accent-alt:   #18D1FF (青，科技/辅助)
bg-base:      #070A0E (深黑蓝，页面背景)
bg-elevated:  #151D2E (提亮，面板背景)
text-primary: #E6EDF3
text-secondary: #9AA6B2
border-strong: #3A4A5A
border-weak: rgba(42, 58, 70, 0.5)
danger:       #FF3B30
success:      #32D74B
warning:      #B8860B
```

### 间距（8pt 系统）
```
micro:  4px  (仅组件内部微调)
sm:     8px  (布局起点)
md:     16px
lg:     24px
xl:     32px
2xl:    48px
```

### 动效时长
```
instant: 80ms   (点击反馈)
fast:    140ms  (hover/focus)
base:    220ms  (面板展开)
slow:    320ms  (页面切换)
```

**缓动**：
- 标准：`cubic-bezier(0.4, 0, 0.2, 1)` —— 干脆，不弹跳
- 量化：`steps(5-10)` —— 模拟老式设备数据刷新

---

## 输入与交互

### 最小命中区域
| 场景 | 最小尺寸 |
|------|----------|
| 移动端/触屏 | 44×44px |
| 桌面（有 hover 辅助） | 32×32px |
| 密集工具栏（桌面） | 28×28px（必须有 hover 态） |

### 键盘焦点
- **必须可见**：accent 细边框 或 左侧 accent 条
- 不能只靠颜色变化，必须有形状/位置变化

### 状态优先级
```
Idle < Hover < Focus < Active < Loading < Warning < Error < Critical
```
高优先级覆盖低优先级的视觉表现。

### 状态双重编码
色盲用户分不清红绿，状态必须同时有**颜色+形状**：

| 状态 | 颜色 | 图标 |
|------|------|------|
| OK/Success | 绿色 | ✓ 勾号 |
| Warning | 黄/橙 | ⚠ 三角 |
| Error | 红色 | ✕ 叉号 |
| Loading | 灰/accent | ◌ 旋转 |
| Offline | 灰色 | 断开图标 |

---

## 组件速查

### 面板 TacticalPanel
```tsx
<TacticalPanel level="L2" elevation="raised">
  {/* 内容 */}
</TacticalPanel>
```
- `level`: L0/L1/L2/L3 边框等级
- `elevation`: base/raised/floating Z轴层次

### 按钮 Button
| 类型 | 用途 | 样式 |
|------|------|------|
| primary | 主操作（一屏≤1区域）| accent 填充 |
| secondary | 次要操作 | 边框 + 透明底 |
| ghost | 工具栏/密集区 | 纯文字 |
| danger | 危险操作 | danger 填充 |
| invert | 高对比强调 | 黑底白字 ↔ 白底黑字反转 |

**Invert 变体**（临床精密感）：
- 默认：黑底 + 白字 + 白边框
- Hover：白底 + 黑字（颜色反转）
- 过渡：0.3s 标准过渡
- 适用：仪式感按钮、模态确认键

### 列表行 ListRow
```
[ 图标 ] | [ 标题 + 副信息 ] | [ 数值/状态 ]
```
- 焦点行：左侧 2px accent 条 + 背景亮一档

### HUD 读数 HUDMeter
```
  12,847
━━━━━━━━━━━━ 78%
 POWER LEVEL
```
- 数字：大、亮、等宽字体 + `tabular-nums`
- 进度条：细（2-3px），使用量化缓动

### 长按确认 HoldButton
危险操作（删除、重置等）不使用弹窗，用 **长按 1.5 秒填满进度条** 的方式：

```tsx
<HoldButton onConfirm={handleDelete} holdDuration={1500}>
  HOLD TO CONFIRM
</HoldButton>

// 预设
<HoldToDelete onConfirm={handleDelete} />
```

| 属性 | 值 |
|------|-----|
| 默认时长 | 1500ms |
| 进度分段 | 10 格 (量化缓动) |
| 边框颜色 | danger |
| 完成反馈 | 闪烁 + 短暂 glitch |

---

## 排版系统

### 极端对比原则 (Extreme Contrast)
制造"信息即装饰"的视觉张力：

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| 超大标题 | 36-48px | 700-800 | 页面主标题、品牌标识 |
| 正文 | 14px | 400 | 说明文本 |
| Meta 文本 | 9-11px | 300 | 坐标、版本号、技术参数 |

**规则**：
- 标题字号 ≥ 正文的 **1.5 倍** 以上
- Meta 文本透明度 0.3-0.5，仅用于装饰填充
- 数字永远等宽 (`tabular-nums`)

### 字重信息层级
| 等级 | 字重 | 用途 |
|------|------|------|
| Critical | 700-800 | 弹药数、HP、关键告警 |
| Primary | 500-600 | 标题、名字 |
| Secondary | 400 | 正文、描述 |
| Ambient | 300 | 装饰文本、背景大字 |

---

## 动效系统

### 核心效果

| 效果 | 用途 | 参数 |
|------|------|------|
| **LineDraw** | 边框/内容构建出现 | 140-240ms |
| **Ping** | 点击/选中确认 | 150ms, 1次 |
| **ScanSweep** | 页面进入/数据刷新 | 800-1200ms, 1次 |
| **DataTick** | 数值变更 | 数字滚动 + 高亮衰减 |
| **Glitch** | 错误/受击反馈 | 100ms, 1-2px 位移 |

### 量化缓动 (Quantized Easing)
模拟老式设备的数据刷新，一格一格跳：

| 场景 | 步数 |
|------|------|
| Progress 进度条 | steps(8-10) |
| 数字滚动 | steps(5) |
| 透明度变化 | steps(4) |
| Loading 状态 | steps(3) |

**不用于**：页面滚动、拖拽交互、自然物理动画

### 构建式出现 (Construction)
全息界面是"绘制"出来的，不是"淡入"的：

**三阶段** (总时长 400-500ms)：
1. **Phase 1** (0-100ms): 锚点缩放出现
2. **Phase 2** (100-250ms): 边框线延伸闭合 (SVG stroke-dashoffset)
3. **Phase 3** (200-400ms): 内容填充显现

### 错层淡入 (Staggered Fade)
列表/卡片组入场时使用错层延迟，制造信息逐个加载的系统感：

```css
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: 0.1s; }
.item:nth-child(3) { animation-delay: 0.2s; }
```

| 属性 | 值 |
|------|-----|
| 起始状态 | opacity: 0, translateX(20%) |
| 结束状态 | opacity: 1, translateX(0) |
| 单次时长 | 0.6s |
| 错层间隔 | 0.1s |

### 状态互斥规则
```
Loading  →  禁止 Glitch, 允许多处 Ping
Error    →  禁止背景动效, 允许 1次 Glitch
Modal打开 → 冻结所有循环/环境动效
Drag/Resize → 冻结 ScanSweep
```

### 禁止事项
- ❌ 无意义循环动画
- ❌ 弹跳/果冻/软糯缓动
- ❌ 同时 >2 个动效
- ❌ 动效影响可读性

---

## 性能降级

### 三档渲染模式

通过 `usePerformanceMode()` hook 自动检测设备能力：

| 效果 | full | reduced | minimal |
|------|------|---------|---------|
| backdrop-filter 模糊 | ✓ 实时 | ✗ 静态图 | ✗ 纯色 |
| NoiseOverlay 噪点 | ✓ | ✗ | ✗ |
| 粒子数量 | 12 | 6 | 0 |
| 构建式动画 | ✓ 完整序列 | ✗ 简化淡入 | ✗ 直接显示 |
| 动效时长 | 100% | 70% | 0% (瞬时) |

### 检测策略
```typescript
const isLowEnd = 
  navigator.hardwareConcurrency <= 4 ||
  navigator.deviceMemory <= 4 ||
  /Android|iPhone|iPad/.test(navigator.userAgent);
```

**用户偏好优先**: `prefers-reduced-motion: reduce` → 直接 minimal 模式

---

## 装饰系统

### Tech Decor (技术装饰文本)
用"无意义"的技术参数填充留白，制造系统运行感：

**规范**：
- 字号: 9-11px
- 字体: 必须等宽
- 透明度: 0.2
- 位置: 角落、边缘，不遮挡内容

**词库**：
```
状态词: SYSTEM_OK | BUFFER_READY | NODE_ACTIVE | LINK_STABLE
动态值: 0x7F3A2E | 127.0.0.1:8080 | [OK] | ████░░
坐标: LAT 31.2304 | LNG 121.4737 | SEC_LEVEL_3
```

### 锚点与连接线
**锚点**：
- 位置: L2/L3 面板四角
- 尺寸: 3×3px (L2) / 4×4px (L3)
- 颜色: border-strong (L2) / accent (L3)
- 动效: L3 锚点出现时 scale 0→1

**引导线**：
- 宽度: 0.5px
- 颜色: border-weak 或 accent@0.3
- 样式: solid 或 dashed (4px 间隔)

### 切角与切割装饰 (Geometric Cut)
**45度切角**（工业印刷感）：
```css
.panel-notch {
  clip-path: polygon(
    0 0, calc(100% - 1rem) 0, 
    100% 1rem, 100% 100%, 0 100%
  );
}
```
- 适用: L2/L3 面板右上角或左下角
- 尺寸: 1rem (16px) 切角
- 配合: 切角处放置 4×4px accent 色锚点块

**三角形装饰**（无需图片）：
```css
/* 用 border 技巧生成 */
.arrow-up::before {
  content: "";
  border: 1rem solid transparent;
  border-bottom-color: var(--accent);
}
```
- 优势: 兼容性好，可动态变色
- 适用: 面板指示器、下拉箭头、装饰标记

### 材质叠加
**全局噪点** (NoiseOverlay):
- 64×64px 平铺图
- 透明度: 0.03
- 混合模式: overlay
- 性能: 静态图片，不用 JS 生成

**扫描线**：
- 仅用于 HUDMeter / 全屏展示
- 间距: 2-3px
- 透明度: 0.03-0.05

### 投影系统 (Shadow)
拒绝柔和弥散投影，使用深且明确的投影：

| 层级 | 投影值 | 用途 |
|------|--------|------|
| 浅 | `0 0.75rem 0.5rem rgba(0,0,0,0.5)` | 标签、按钮 |
| 深 | `0 1rem 2rem rgba(0,0,0,0.8)` | 面板、抽屉 |

**参数规范**：
- Y偏移: 12-16px (0.75-1rem)
- 模糊: 8-32px (0.5-2rem)
- 颜色: rgba(0,0,0,0.5) 或更深

---

## 临床文风 (Clinical Copy)

用"机器语言"替代人类语言，制造冷酷、精确、工业化的氛围。

### 替换规则

| 常规文案 | 临床文案 |
|----------|----------|
| Loading... | ESTABLISHING UPLINK... |
| Error | FATAL EXCEPTION |
| Success | OPERATION COMPLETE |
| Not found | TARGET NOT_FOUND (NULL_PTR) |
| Login | INITIALIZE SESSION |
| Logout | TERMINATE SESSION |
| Delete | PURGE |
| Save | COMMIT |
| Cancel | ABORT |
| Submit | EXECUTE |
| Empty | NO_RECORDS_FOUND (NULL_PTR) |

### 使用方式
```tsx
import { CLINICAL_STATUS, CLINICAL_ACTIONS } from '@/lib/clinical-copy';

<Spinner label={CLINICAL_STATUS.loading} />
<Button>{CLINICAL_ACTIONS.submit}</Button>
```

---

## 验收清单

### 视觉层面
- [ ] 边框是否清晰区分 L0-L3？
- [ ] L3 同屏是否 ≤1 个？
- [ ] Accent 色是否只用于焦点/告警/关键读数？
- [ ] 同屏高饱和色是否 ≤2 种？
- [ ] HUD 数字是否有 Ghost Layer？
- [ ] 是否有 Tech Decor 装饰文本且不抢戏？

### 交互层面
- [ ] 所有可点击元素 ≥32×32px (桌面) 或 44×44px (移动)？
- [ ] 焦点是否通过形状/位置明显可见？
- [ ] 危险操作是否用 HoldButton？
- [ ] 状态是否同时有颜色+图标？

### 动效层面
- [ ] 同屏动效是否 ≤2 个？
- [ ] Progress/Loading 是否用量化缓动？
- [ ] Modal/Drawer 打开时背景动效是否冻结？
- [ ] L2/L3 面板是否有构建式动画？

### 性能层面
- [ ] 是否实现三档降级模式？
- [ ] 背景模糊是否在低端设备关闭？
- [ ] 动效是否在 prefers-reduced-motion 时禁用？

### 工程层面
- [ ] tokens.json 是否为唯一颜色真源？
- [ ] CSS 变量是否自动生成？
- [ ] 组件 API 是否与文档一致？
- [ ] 是否有类型定义？

### 整体感觉
- [ ] 感觉像"系统/终端"，不是网页？
- [ ] 硬朗不软糯？

---

## 风格边界（不是什么）

| ❌ 不是 | 为什么 |
|--------|--------|
| 赛博朋克 | 太混乱、太颓废 |
| 魔法UI | 没有凭空出现的光效 |
| 游戏cos | 是你的系统，不是抄袭 |
| 特效展示 | 功能优先，炫是附带的 |

**调性关键词**：战术 · 终端 · 控制台 · 硬朗 · 精确 · 克制

---

## 参考文档

| 文档 | 内容 |
|------|------|
| [EVOLUTION.md](./EVOLUTION.md) | 项目演进史、技术债务、路线图 |
| [设定总纲1](./achieved/设定总纲1.md) | 完整设计规范（600+行）| 已整合，不再维护 | 删除了
| [设定总纲2](./achieved/设定总纲2.md) | 组件详细规范（500+行）| 已整合，不再维护 | 删除了
| [设计原则整合.old.md](./achieved/设计原则整合.old.md) | 历史整合版（615行）| 已整合到本文件 | 删除了
| [参考/全境封锁设定稿.txt](./参考/全境封锁设定稿.txt) | 官方设计圣经（英文）| 
| [参考/明日方舟风格集成指南.md](./参考/明日方舟风格集成指南.md) | 临床精密感参考（已整合）|
| [components/](./components/) | 组件详细文档 |
| [src/lib/clinical-copy.ts](../src/lib/clinical-copy.ts) | 临床文风词库 |
| [tokens.json](../tokens.json) | Design Tokens 真源 |

---

*精简版 v3.0 — 提取自 1100+ 行历史文档的核心精华*
