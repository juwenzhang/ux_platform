# OpenSpec 低代码平台

> 基于 AI 辅助开发的低代码主题配置平台

## 技术栈

| 类别 | 技术 |
|------|------|
| **前端框架** | React 19 + TypeScript |
| **构建工具** | Vite 8 |
| **样式方案** | CSS Modules |
| **状态管理** | React useState / useReducer |
| **开发流程** | OpenSpec 工作流 |

## 项目简介

这是一个 **AI 驱动的低代码主题配置平台**，支持：

- 🎨 **可视化主题配置** - 通过 UI 界面直观配置主题颜色、字体、间距
- ⚡ **实时预览** - 修改即时生效，所见即所得
- 🌙 **多主题支持** - 亮色/暗色主题一键切换
- 📦 **JSON 导出** - 标准格式导出，便于项目集成
- 🔌 **可扩展架构** - 预留产品矩阵，未来可接入更多低代码工具

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 项目结构

```
src/
├── components/       # UI 组件
│   ├── Home/        # 首页（低代码平台门户）
│   ├── ThemeStudio/ # 主题配置工作台
│   └── ThemeSwitcher/ # 主题切换组件
├── context/         # React Context
├── hooks/          # 自定义 Hooks
├── styles/         # 全局样式
├── types/          # TypeScript 类型定义
└── utils/          # 工具函数
```

## OpenSpec 工作流

本项目采用 **OpenSpec** 规范进行需求管理和开发：

| 命令 | 说明 |
|------|------|
| `/opsx:propose` | 创建新需求，生成 proposal → design → tasks |
| `/opsx:apply` | 开始实现任务 |
| `/opsx:archive` | 归档完成的需求 |

### 开发流程

1. **需求提出** - 使用 `/opsx:propose <需求描述>` 创建新 change
2. **设计评审** - AI 自动生成 proposal、design、tasks artifacts
3. **任务实现** - 使用 `/opsx:apply` 开始实现，自动追踪进度
4. **归档完成** - 使用 `/opsx:archive` 归档已完成的需求

## AI 辅助开发

本项目的核心开发工作由 **AI Agent** 驱动：

- 自动生成技术设计方案
- 智能拆分任务列表
- 代码实现与质量把控
- 项目文档自动维护

通过 OpenSpec 工作流，AI 能够：
- 理解业务需求和技术约束
- 生成结构化的设计文档
- 逐步完成功能实现
- 确保代码质量和一致性

## 路由说明

- `#/` - 首页（低代码平台门户）
- `#/studio` - Theme Studio（主题配置工作台）

## 许可证

MIT License
