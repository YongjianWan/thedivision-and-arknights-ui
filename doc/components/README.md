# 组件索引

> 代码即文档。AI 会自动跳转到对应源码区域。

---

## 布局与容器

| 组件 | 源码 | 说明 |
|------|------|------|
| TacticalPanel | [src/components/TacticalPanel.tsx](../../src/components/TacticalPanel.tsx) | 战术面板，L0-L3 边框等级 + Z-Depth |
| Card | [src/components/Card.tsx](../../src/components/Card.tsx) | 卡片容器，支持选中态 |
| GridBackground | [src/components/GridBackground.tsx](../../src/components/GridBackground.tsx) | 全屏网格背景 + 粒子 |

## 基础控件

| 组件 | 源码 | 说明 |
|------|------|------|
| Button | [src/components/Button.tsx](../../src/components/Button.tsx) | 按钮，6种变体 |
| Input | [src/components/Input.tsx](../../src/components/Input.tsx) | 输入框 |
| Select | [src/components/Select.tsx](../../src/components/Select.tsx) | 下拉选择，LineDraw动效 |
| Checkbox/Radio/Switch | [src/components/FormControls.tsx](../../src/components/FormControls.tsx) | 表单三件套 |

## 反馈与交互

| 组件 | 源码 | 说明 |
|------|------|------|
| Modal | [src/components/Modal.tsx](../../src/components/Modal.tsx) | 弹窗，焦点锁定 |
| Drawer | [src/components/Drawer.tsx](../../src/components/Drawer.tsx) | 抽屉，左右滑入 |
| Tooltip | [src/components/Tooltip.tsx](../../src/components/Tooltip.tsx) | 提示气泡 |
| Toast | [src/components/Toast.tsx](../../src/components/Toast.tsx) | 轻提示 |
| Progress/Spinner | [src/components/Progress.tsx](../../src/components/Progress.tsx) | 进度条/加载器 |

## 数据展示

| 组件 | 源码 | 说明 |
|------|------|------|
| Table | [src/components/Table.tsx](../../src/components/Table.tsx) | 数据表格，支持排序 |
| HUDMeter | [src/components/HUDMeter.tsx](../../src/components/HUDMeter.tsx) | 仪表读数，Ghost Layer |
| StatusBar | [src/components/StatusBar.tsx](../../src/components/StatusBar.tsx) | 顶部状态栏 |
| ListRow | [src/components/ListRow.tsx](../../src/components/ListRow.tsx) | 列表行 |

## 导航

| 组件 | 源码 | 说明 |
|------|------|------|
| Tabs | [src/components/Tabs.tsx](../../src/components/Tabs.tsx) | 标签页 |
| Breadcrumb | [src/components/Breadcrumb.tsx](../../src/components/Breadcrumb.tsx) | 面包屑 |
| NavLinkLine | [src/components/NavLinkLine.tsx](../../src/components/NavLinkLine.tsx) | 导航链接（带线条动效）|

## 效果组件

| 组件 | 源码 | 说明 |
|------|------|------|
| ScanSweep | [src/components/ScanSweep.tsx](../../src/components/ScanSweep.tsx) | 入场扫描效果 |
| Typewriter | [src/components/Typewriter.tsx](../../src/components/Typewriter.tsx) | 打字机效果 |
| ParticleField | [src/components/ParticleField.tsx](../../src/components/ParticleField.tsx) | Three.js 粒子场 |
| Ping | [src/components/Ping.tsx](../../src/components/Ping.tsx) | 脉冲动画 |
| SoftGlitch | [src/components/SoftGlitch.tsx](../../src/components/SoftGlitch.tsx) | 软故障效果 |

## 交互增强 (补丁包2)

| 组件 | 源码 | 说明 |
|------|------|------|
| HoldButton | [src/components/HoldButton.tsx](../../src/components/HoldButton.tsx) | 长按确认（危险操作）|
| Schematic | [src/components/Schematic.tsx](../../src/components/Schematic.tsx) | 行为信息图 |
| TechDecor | [src/components/TechDecor.tsx](../../src/components/TechDecor.tsx) | 装饰性技术文本 |

## 补丁包3/4

| 组件 | 源码 | 说明 |
|------|------|------|
| StatusIndicator | [src/components/StatusIndicator.tsx](../../src/components/StatusIndicator.tsx) | 状态指示器（双重编码）|
| TacticalIcons | [src/components/TacticalIcons.tsx](../../src/components/TacticalIcons.tsx) | 战术图标集 |

---

## Hooks

| Hook | 源码 | 说明 |
|------|------|------|
| usePerformanceMode | [src/hooks/usePerformanceMode.ts](../../src/hooks/usePerformanceMode.ts) | 三档性能降级 |
| useTechDecor | [src/hooks/useTechDecor.ts](../../src/hooks/useTechDecor.ts) | 技术装饰文本生成 |
| useGlitch | [src/hooks/useGlitch.ts](../../src/hooks/useGlitch.ts) | 受控故障效果 |

---

*详细设计规范见 [CORE.md](../CORE.md)*
