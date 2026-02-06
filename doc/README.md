# 📚 文档中心

> UI 母版项目所有文档的入口和导航

---

## 🚀 快速开始

| 你想了解什么？ | 去看这里 |
|---------------|---------|
| 项目演进历史 | [EVOLUTION.md](./EVOLUTION.md) |
| 组件怎么用 | [components/README.md](./components/README.md) |
| 设计理念 | [设计原则整合.md](./设计原则整合.md) |
| 技术实现 | [技术参考手册.md](./技术参考手册.md) |

---

## 📂 文档结构

```
doc/
├── README.md                    ← 你在这里（文档导航）
├── EVOLUTION.md                 ← 项目演进史、版本记录 ⭐
├── 技术参考手册.md              ← 技术实现细节
├── 设计原则整合.md              ← 设计系统总览
├── 理想和现实的差别.md          ← 设计反思与权衡
│
├── components/                  ← 33个组件文档
│   ├── README.md               ← 组件总览
│   └── ...
│
├── 设定文档/                    ← 设计规范（5个文件）
│
├── 参考/                        ← 外部参考（3个文件）
│
└── achieved/                    ← 归档文档（不活跃）
    ├── 修改过程.txt             ← Claude 聊天记录（5MB）
    └── *.old.md
```

---

## 📖 按场景阅读

### 场景 1：刚接手项目，想了解全貌
阅读顺序：
1. [EVOLUTION.md](./EVOLUTION.md) — 了解项目怎么走到今天的
2. [设计原则整合.md](./设计原则整合.md) — 理解设计哲学
3. [components/README.md](./components/README.md) — 看看有什么组件

### 场景 2：要写新组件
阅读顺序：
1. [设定文档/设定总纲2.md](./设定文档/设定总纲2.md) — 设计规范
2. [技术参考手册.md](./技术参考手册.md) — 技术约束
3. [参考/全境封锁设定稿.txt](./参考/全境封锁设定稿.txt) — 美学参考

### 场景 3：修复 Bug / 优化性能
阅读顺序：
1. [EVOLUTION.md#技术债务清单](./EVOLUTION.md#技术债务清单) — 已知问题
2. [理想和现实的差别.md](./理想和现实的差别.md) — 理解当时的权衡

### 场景 4：与后端联调（Gateway）
阅读顺序：
1. [EVOLUTION.md#下一步行动](./EVOLUTION.md#下一步行动) — 当前优先级
2. `gateway-ui-theme-v2.user.js` — 主题注入脚本（根目录）

---

## 🎯 关键文档速查

### 设计规范
| 文档 | 内容 |
|------|------|
| [设定总纲1.md](./设定文档/设定总纲1.md) | 基础视觉规范（颜色、字体、间距） |
| [设定总纲2.md](./设定文档/设定总纲2.md) | 扩展规范（边框、动效、层级） |
| [美学补丁包 v1.1.md](./设定文档/美学补丁包%20v1.1.md) | P1-P9 补丁详细定义 |
| [全境封锁设定稿.txt](./参考/全境封锁设定稿.txt) | 官方 UI Style Guide |

### 组件文档
| 组件 | 文档 | 关键概念 |
|------|------|---------|
| TacticalPanel | [tactical-panel.md](./components/tactical-panel.md) | L1/L2/L3 层级、边框系统 |
| HoldButton | [hold-button.md](./components/hold-button.md) | 长按确认、临床文案 |
| Schematic | [schematic.md](./components/schematic.md) | 线框图、动画 |
| TechDecor | [tech-decor.md](./components/tech-decor.md) | 角落装饰、参数显示 |

---

## 🗑 废弃/归档文档

| 文档 | 状态 | 说明 |
|------|------|------|
| `achieved/战术界面组件库技术文档.old.md` | 归档 | 早期文档，内容已分散到各组件文档 |
| `components/noise-overlay.md` | 保留但废弃 | NoiseOverlay 组件已移除，文档保留作参考 |
| `修改过程.txt` | 归档 | Claude 聊天记录，用于追溯决策过程 |

---

## 📝 文档命名规范

- **英文文件名**: 组件文档（与组件名对应）
- **中文文件名**: 设计理念、参考文档
- **`.txt` 后缀**: 聊天记录、临时归档
- **`README.md`**: 目录入口

---

## 🔍 搜索关键词

在文档中快速定位：

```
P1 = Ghost Layer      (幽灵层)
P2 = Interaction      (交互)
P3 = Anchor Points    (锚点)
P4 = Atmosphere       (氛围)
P5 = Icons            (图标)
Z-Depth               (Z轴层次)
Clinical Copy         (临床文风)
Diagetic UI           (叙事化UI)
```

---

## 📌 维护者注意

新增文档时请：
1. 在此 README 添加链接
2. 在 EVOLUTION.md 记录变更
3. 保持命名规范一致

*Last updated: 2026-02-07*
