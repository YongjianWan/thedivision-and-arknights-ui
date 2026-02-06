# UI 母版 (personal-interface-system)

一个用于探索“战术/控制台风格”界面的 Next.js UI 原型项目，包含组件、动效与设计 tokens 的快速迭代环境。

## 特性
- Next.js App Router 架构，基于 `src/app` 组织页面
- Tailwind CSS + tokens 驱动的主题与视觉规范
- Framer Motion 统一的动效配置与预设
- 三栏战术面板示例页面（见首页）
- 文档沉淀在 `doc/`

## 快速开始
```bash
npm install
npm run dev
```
访问 `http://localhost:3000`

## 设计 Tokens
- 源文件：`tokens.json`
- 生成命令：`npm run tokens:build`
- 产物：`src/app/tokens.css`（自动生成，不建议手改）

## 常用脚本
- `npm run dev` 本地开发
- `npm run build` 生产构建
- `npm run start` 生产运行
- `npm run lint` eslint 校验
- `npm run format` 代码格式化
- `npm run tokens:build` 生成 tokens

## 目录结构
```
src/
  app/            页面与全局样式
  components/     组件库
  hooks/          自定义 hooks
  lib/            动效与工具
doc/              设计/实现文档
scripts/          构建脚本
tokens.json       设计 tokens 源
```
