# UI 母版 演进史 (Evolution Log)

> 记录从 "丑UI" 到 "战术界面系统" 的进化过程

---

## 📌 当前版本

**v2.1.0** — 基础设施修复完成，视觉层次重构中

---

## 🗓 演进时间线

### Phase 0: 原型混沌期 (v1.x)
**时间**: 2026-01-15 ~ 01-20  
**状态**: ✅ 已归档

- Next.js 项目初始化
- Tailwind + Tokens 系统搭建
- 33个基础组件野蛮生长
- **问题**: 各自为政，没有统一视觉语言

**关键提交**: `d07d3f8` "已修复：TOKEN 动效同一控制..."

---

### Phase 1: 美学补丁包 v1.1
**时间**: 2026-01-21  
**代号**: "幽灵层" (Ghost Layer)  
**状态**: ✅ 已完成

| 补丁 | 内容 | 组件 |
|------|------|------|
| **P1** | Ghost Layer | HUDMeter, TacticalPanel title |
| **P3** | Anchor Points | TacticalPanel L2/L3 边框层级 |
| **P4** | NoiseOverlay | 全局噪点层 |
| **P9** | Quantized Easing | Progress 组件步进动画 |

**关键提交**: `76c2d45` "feat: implement aesthetic patch v1.1"

**遗留问题**: 
- ❌ NoiseOverlay 后被移除，但导出未清理
- ❌ P1 Ghost Layer 只在部分组件实现

---

### Phase 2: 架构修复期 (v2.0)
**时间**: 2026-02-07  
**状态**: ⚠️ **部分完成，文档记录中**

#### Fix 1: 字体系统统一 ✅
- **问题**: layout.tsx CSS 变量与 tokens.css 冲突
- **修复**: 删除 tokens.css 字体变量，统一用 Next.js font loader
- **状态**: 完成

#### Fix 2: 边框渲染修复 ✅
- **问题**: `border-thin: 0.5px` 在非 Retina 屏消失
- **修复**: 改为 `1px`，用 opacity 区分层级
- **状态**: 完成

#### Fix 3: 背景色层级拉开 ✅
- **问题**: base `#0B0E12` 与 elevated `#101622` 几乎一样
- **修复**: 
  - base → `#070A0E` (更黑)
  - elevated → `#151D2E` (更亮，带蓝调)
- **状态**: 完成

#### Fix 4: 全屏叠加层清理 ⚠️
- **问题**: scanline + NoiseOverlay 双层叠加，画面脏
- **修复**: 从 layout.tsx 移除 NoiseOverlay
- **遗留**: 
  - ❌ `src/components/index.ts` 仍导出 NoiseOverlay (死代码)
  - ❌ `globals.css` 仍有 `.noise-global` 样式未清理
- **状态**: **未完成**

#### Fix 5: 组件库统一 ✅
- **问题**: page.tsx 自己写内联 TacticalPanel
- **修复**: 改用 `src/components/TacticalPanel`
- **状态**: 完成

#### Fix 6: Tailwind 补全 ✅
- **问题**: accent-alt 在 tokens 但不在 tailwind config
- **修复**: 添加 `accent-alt` colors 映射
- **状态**: 完成

**关键提交**: `c00d180` "feat: update UI components and add new tactical elements"

---

### Phase 3: 补丁包 v2 (进行中)
**时间**: 2026-02-07 ~  
**代号**: "深度与氛围"

#### 补丁包 2: 交互增强
| 组件 | 状态 | 说明 |
|------|------|------|
| `HoldButton` | ✅ | 长按确认按钮 |
| `Schematic` | ✅ | 线框图装饰 |
| `usePerformanceMode` | ✅ | 性能自适应 |
| `clinical-copy` | ✅ | 临床文风词库 |

#### 补丁包 3: 故障美学
| 组件 | 状态 | 说明 |
|------|------|------|
| `useGlitch` | ✅ | 可控故障 Hook |
| `StatusIndicator` | ✅ | 双重编码状态指示器 |
| `TacticalIcons` | ✅ | 战术图标系统 |

#### 待完成 (Z-Depth 重构)
| 任务 | 优先级 | 状态 |
|------|--------|------|
| TacticalPanel elevation 系统 | P0 | ⏳ 待设计 |
| TechDecor 角落装饰扩展 | P1 | ⏳ 待设计 |
| 三层文字渲染 (Main/Shadow/Ghost) | P1 | ⏳ 待设计 |
| 临床文风组件落地 | P2 | ⏳ 待设计 |
| 清理 NoiseOverlay 死代码 | P2 | ❌ 未开始 |

---

## 🎯 设计原则演进

### v1.x: "看起来像"
- 橙色主题 ✅
- 扫描线 ✅
- 边框装饰 ✅

### v2.x: "感觉对"
- **Z-Depth 层次** ⏳ — 从平面到立体
- **不完美软件** ⏳ — glitch、加载感、故障
- **临床文风** ⏳ — 工业化文案
- **点线面构成** ⏳ — 数学化、非有机

### v3.x: "沉浸其中" (愿景)
- Diagetic UI — UI 是世界的一部分
- 实时数据感 — 内存、CPU、网络延迟显示
- 响应式氛围 — 根据系统状态改变整体色调

---

## 📁 补丁包命名规范

```
P1 = Ghost Layer      (幽灵层/文字效果)
P2 = Interaction      (交互增强)
P3 = Anchor Points    (锚点/角落装饰)
P4 = Atmosphere       (氛围层/噪点/扫描线)
P5 = Icons            (图标系统)
P6 = Animation        (动效系统)
P7 = Typography       (排版系统)
P8 = Color            (色彩系统)
P9 = Easing           (缓动函数)
```

---

## 🔧 技术债务清单

### 高优先级
- [ ] **NoiseOverlay 死代码清理**
  - `src/components/NoiseOverlay.tsx` 文件保留但无用
  - `src/components/index.ts` 第 47 行导出需删除
  - `src/app/globals.css` `.noise-global` 样式需删除
  
### 中优先级
- [ ] NodeGraph.tsx 硬编码字体 `'var(--font-mono)'`
- [ ] 组件 showcase 页面 (`app/components/page.tsx`) 硬编码字体过多

### 低优先级
- [ ] 评估 NoiseOverlay 是否值得复活（性能开销 vs 视觉效果）

---

## 🚀 下一步行动

### 立即 (今天)
1. 关闭 NoiseOverlay 死代码清理循环
2. 创建 Z-Depth 设计文档

### 短期 (本周)
1. TacticalPanel elevation 系统实现
2. TechDecor 角落装饰扩展

### 中期 (本月)
1. 临床文风组件落地 (Button clinical variant)
2. 三层文字渲染系统

### 长期 (愿景)
1. 与 Gateway 后端联调
2. 动态主题切换 (温度/湿度/威胁等级)

---

## 📝 参考文档

- `doc/参考/全境封锁设定稿.txt` — 官方设计圣经
- `doc/设定文档/补丁包3.txt` — P3 设计规范
- `doc/理想和现实的差别.md` — 设计反思
- `src/lib/clinical-copy.ts` — 临床文风词库

---

*Last updated: 2026-02-07*
*Next review: Phase 3 完成后*
