# PIL 核心规范 v3.0

> Personal Interface Language Core Specification
> 
> 个人界面语言 —— 从"网页"到"终端"的完整设计系统

---

## 一句话定义

**不是网页，不是 App，是你的系统。**

像一个正在运行的个人终端、战术地图、指挥界面。用户不是在"浏览"，是在"操作系统"。

---

## 风格基因

| 来源 | 贡献 |
|------|------|
| 《全境封锁》| 仪表盘现实主义：半透明、细线框、扫描动效 |
| 《明日方舟》| 平面化编辑设计：硬版式块面、强文字层级 |

---

## 设计支柱

### 1. Diagetic UI（叙事化界面）
UI 是世界的一部分，不是浮在上面的图层。

### 2. Z-Depth 层次
```
Z-10  base      → 地面层，稳定
Z-15  raised    → 凸起，主要面板
Z-20  floating  → 悬浮，弹窗/详情
```

### 3. 不完美软件
MYSTECH OS 是匆忙部署的，有 glitch、加载感、故障美学。

---

## 视觉原子

### 颜色
```
Accent:       #FF6A00 (橙，希望/温暖)
Accent-Alt:   #18D1FF (青，科技/冷)
BG-Base:      #070A0E (深黑蓝)
BG-Elevated:  #151D2E (提亮)
Text-Primary: #E6EDF3
Text-Second:  #9AA6B2
```

### 边框
```
thin:   1px  (border-weak)
thick:  2px  (border-strong) + 2px padding = 物理厚度
heavy:  3px  (accent，强调)
```

### 字体
```
Display:  Roboto Condensed / DIN Alternate (标题)
Mono:     JetBrains Mono (数据)
Sans:     Inter (正文)
```

---

## 补丁系统 (P1-P9)

| 补丁 | 名称 | 状态 | 说明 |
|------|------|------|------|
| P1 | Ghost Layer | ✅ | 三层文字渲染 (Main/Shadow/Ghost) |
| P2 | Tech Decor | ✅ | 角落装饰、技术参数 |
| P3 | Anchor Points | ✅ | 面板四角锚点标记 |
| P4 | Atmosphere | ⚠️ | 扫描线保留，噪点已移除 |
| P5 | Icons | ✅ | TacticalIcons 系统 |
| P6 | Motion | ✅ | 量化缓动、机械感动画 |
| P7 | Typography | ⏳ | 临床文风落地中 |
| P8 | Glitch | ✅ | 受控故障 (错误时触发) |
| P9 | Easing | ✅ | steps() 量化动效 |

---

## 组件层级

### 容器
- `TacticalPanel` — 核心面板，L1/L2/L3 三级边框
- `PanelBase/PanelRaised/PanelFloating` — Z-Depth 快捷版

### 输入
- `Button` — 需要添加 clinical variant (EXECUTE/ABORT)
- `HoldButton` — 长按确认
- `Input/Select` — 基础表单

### 展示
- `HUDMeter` — 大数字仪表盘
- `StatusIndicator` — 双重编码状态
- `Schematic` — 线框图装饰
- `TechDecor` — 技术参数角落装饰

### 反馈
- `Progress` — 量化步进动画
- `Toast` — 临床风格通知
- `SoftGlitch` — 故障效果

---

## 临床文风 (Clinical Copy)

用工业化文案替代日常用语：

| 日常 | 临床 |
|------|------|
| 加载中... | ESTABLISHING UPLINK... |
| 保存 | COMMIT |
| 删除 | PURGE |
| 确定/取消 | CONFIRM / ABORT |
| 用户名 | OPERATOR ID |
| 连接超时 | UPLINK SEVERED |

完整词库：`src/lib/clinical-copy.ts`

---

## 动效语言

### 入场
```css
/* 逐行加载感，像终端输出 */
animation: fade-in 0.3s steps(4);
```

### 交互
```css
/* 机械响应，不是弹性 */
transition: all 0.2s steps(3);
```

### 故障
```css
/* 只在错误时触发 */
.glitch-active { animation: glitch-shake 60ms steps(3) 3; }
```

---

## 文件索引

| 要看什么 | 去哪找 |
|---------|--------|
| 演进历史 | EVOLUTION.md |
| 组件详情 | components/*.md |
| 官方参考 | 参考/全境封锁设定稿.txt |
| 实现代码 | src/components/*.tsx |
| 文案词库 | src/lib/clinical-copy.ts |

---

*精简版 v3.0 — 合并了设定总纲1/2 + 美学补丁包 + 补丁包2/3*
