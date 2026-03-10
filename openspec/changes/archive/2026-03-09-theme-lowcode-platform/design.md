# Design: 企业级主题低代码配置平台

## 整体架构

采用经典低代码平台三栏布局，在现有主题基础设施（Theme types / Context / CSS Variables）之上构建可视化配置层。

```
┌─────────────────────────────────────────────────────────────────┐
│  顶部工具栏 (TopBar)                                            │
│  [主题列表下拉] [新建] [复制] [删除]  [导入JSON] [导出JSON]       │
├──────────────┬───────────────────────────┬──────────────────────┤
│  左侧面板     │  中间画布预览区            │  右侧属性面板         │
│  TokenEditor │  CanvasPreview            │  ThemeListPanel      │
│              │                           │                      │
│  ┌──────────┐│  ┌───────────────────┐    │  ┌────────────────┐  │
│  │基础色     ││  │  Button  Input    │    │  │ 浅色主题 ✓     │  │
│  │ primary  ││  │  Card   Badge     │    │  │ 深色主题       │  │
│  │ secondary││  │  Table  Alert     │    │  │ 品牌主题       │  │
│  │ accent   ││  │  Tag    Switch    │    │  │ 自定义主题 1   │  │
│  │ ...      ││  │                   │    │  │               │  │
│  ├──────────┤│  │  实时预览区域       │    │  ├────────────────┤  │
│  │语义色     ││  │                   │    │  │ JSON 预览      │  │
│  │ success  ││  │                   │    │  │ {              │  │
│  │ warning  ││  └───────────────────┘    │  │   "id": "...",│  │
│  │ error    ││                           │  │   "colors":...│  │
│  │ info     ││                           │  │ }              │  │
│  ├──────────┤│                           │  └────────────────┘  │
│  │状态色     ││                           │                      │
│  │ hover    ││                           │                      │
│  │ active   ││                           │                      │
│  │ disabled ││                           │                      │
│  └──────────┘│                           │                      │
├──────────────┴───────────────────────────┴──────────────────────┤
│  底部状态栏: 当前主题名称 | Token 数量 | 最后修改时间               │
└─────────────────────────────────────────────────────────────────┘
```

## 核心数据模型

### 1. 扩展后的主题数据结构

复用现有 `Theme` / `ThemeColors` 类型，新增元数据用于平台管理：

```typescript
interface ThemeConfig extends Theme {
  version: number;          // 主题版本号
  createdAt: string;        // ISO 8601 创建时间
  updatedAt: string;        // ISO 8601 更新时间
  description?: string;     // 主题描述
  author?: string;          // 作者
  tags?: string[];          // 标签
}

// JSON 导出格式
interface ThemeExportJSON {
  $schema: string;          // JSON Schema 版本标识
  version: '1.0.0';
  themes: ThemeConfig[];
  exportedAt: string;
}
```

### 2. 编辑器状态

```typescript
interface EditorState {
  activeThemeId: string;           // 当前正在编辑的主题
  themes: ThemeConfig[];           // 所有可管理的主题
  isDirty: boolean;                // 是否有未保存的修改
  previewMode: 'single' | 'compare'; // 预览模式
  compareThemeId?: string;         // 对比模式下的另一个主题
}
```

## 模块设计

### Module 1: TopBar — 顶部工具栏

**职责**：主题选择、CRUD 操作、导入导出

| 控件 | 功能 |
|------|------|
| 主题下拉 | 切换当前编辑的主题 |
| 新建按钮 | 从模板创建新主题 |
| 复制按钮 | 复制当前主题 |
| 删除按钮 | 删除当前主题（保护预设主题不可删） |
| 导入 JSON | 从 JSON 文件导入主题 |
| 导出 JSON | 将选中/全部主题导出为 JSON |
| 主题名编辑 | 双击修改主题名称 |

### Module 2: TokenEditor — 左侧 Token 编辑器

**职责**：按分类展示和编辑所有 CSS 变量 token

- 分组展示：基础色 / 语义色 / 状态色 / 暗色标识
- 每个 token 提供：
  - 颜色选择器（native `<input type="color">`）
  - HEX 输入框（手动输入精确色值）
  - 实时预览色块
- 修改任意值时立刻更新画布预览（通过 `applyTheme()` 注入 CSS 变量）
- isDark 切换开关

### Module 3: CanvasPreview — 中间画布预览

**职责**：使用当前编辑中的主题变量渲染一组典型 UI 组件

**预览组件列表**：

| 组件 | 展示要素 |
|------|---------|
| Button | primary / secondary / danger 按钮 |
| Input | 输入框 + placeholder + focus 状态 |
| Card | 带阴影的卡片，含标题和内容 |
| Badge / Tag | 各语义色标签 |
| Alert | success / warning / error / info 提示框 |
| Switch / Toggle | 开关状态 |
| Table | 简单表格（表头、行、悬浮行） |
| Navigation | 导航栏样例 |

所有组件 **不依赖第三方 UI 库**，使用纯 CSS Variables 驱动样式，确保精确反映当前主题。

**对比模式**：左右分屏显示两套主题的同一组组件。

### Module 4: ThemeListPanel — 右侧主题列表 + JSON 预览

**职责**：
- 可视化展示所有主题列表及其缩略色板
- 点击切换到对应主题编辑
- 下方 JSON 预览区：实时显示当前主题的 JSON 输出（只读代码框）

### Module 5: StatusBar — 底部状态栏

显示当前主题名 / token 数量 / 修改状态 / 快捷操作。

## 目录结构

```
src/
├── types/
│   └── theme.ts           # 扩展 ThemeConfig / ThemeExportJSON
├── styles/
│   ├── themes/            # 保留原有主题数据
│   └── variables.css      # 保留 CSS 变量基础
├── context/
│   └── ThemeContext.ts     # 保留，供画布预览使用
├── hooks/
│   ├── useTheme.ts        # 保留
│   └── useThemeEditor.ts  # 新增：编辑器状态管理
├── components/
│   ├── ThemeSwitcher/     # 保留
│   └── ThemeStudio/       # 新增：低代码主题工作台
│       ├── index.ts
│       ├── ThemeStudio.tsx          # 主页面布局（三栏）
│       ├── ThemeStudio.module.css
│       ├── TopBar.tsx               # 顶部工具栏
│       ├── TopBar.module.css
│       ├── TokenEditor.tsx          # 左侧 token 编辑面板
│       ├── TokenEditor.module.css
│       ├── ColorPicker.tsx          # 单个颜色选择器
│       ├── ColorPicker.module.css
│       ├── CanvasPreview.tsx        # 中间画布预览
│       ├── CanvasPreview.module.css
│       ├── PreviewComponents.tsx    # 预览用的 UI 组件集
│       ├── PreviewComponents.module.css
│       ├── ThemeListPanel.tsx       # 右侧主题列表
│       ├── ThemeListPanel.module.css
│       ├── JsonPreview.tsx          # JSON 预览
│       ├── JsonPreview.module.css
│       └── StatusBar.tsx            # 底部状态栏
├── utils/
│   ├── themeExport.ts     # JSON 导出逻辑
│   └── themeImport.ts     # JSON 导入 + 校验逻辑
└── App.tsx                # 路由：/ → 原始应用，/studio → 主题工作台
```

## 关键交互流程

### 流程 1: 编辑主题颜色
1. 在 TokenEditor 中点击 primary 颜色选择器
2. 选色器变化 → `dispatch({ type: 'UPDATE_TOKEN', token: 'primary', value: '#ff0000' })`
3. EditorState 更新 → `applyTheme(editingTheme)` 实时注入 CSS 变量
4. CanvasPreview 所有使用 `var(--color-primary)` 的组件立即更新
5. JsonPreview 同步更新输出

### 流程 2: 导出 JSON
1. 用户点击 TopBar "导出 JSON"
2. 选择导出范围（当前主题 / 全部主题）
3. 生成 `ThemeExportJSON` 对象
4. 调用 `URL.createObjectURL + <a download>` 触发下载

### 流程 3: 导入 JSON
1. 用户点击 TopBar "导入 JSON"
2. 弹出文件选择器 (`<input type="file">`)
3. 读取文件 → JSON.parse → 校验结构
4. 将导入的主题合并到 EditorState.themes

## 状态管理

使用 `useReducer` 管理编辑器状态，通过独立的 `useThemeEditor` hook 暴露 API：

```typescript
const {
  state,              // EditorState
  selectTheme,        // (id: string) => void
  updateToken,        // (token: keyof ThemeColors, value: string) => void
  createTheme,        // (name: string, base?: string) => void
  duplicateTheme,     // (id: string) => void
  deleteTheme,        // (id: string) => void
  renameTheme,        // (id: string, name: string) => void
  importThemes,       // (json: ThemeExportJSON) => void
  exportThemes,       // (ids?: string[]) => ThemeExportJSON
  toggleCompare,      // (id?: string) => void
} = useThemeEditor();
```

## 性能策略

1. TokenEditor 颜色修改使用 `requestAnimationFrame` 节流，保证 60fps
2. CanvasPreview 组件使用 `React.memo` 避免无关重渲染
3. JSON 预览使用 `useMemo` 延迟序列化
4. 大量颜色选择器使用原生 `<input type="color">`，无需额外依赖

## JSON 导出格式示例

```json
{
  "$schema": "theme-lowcode/1.0.0",
  "version": "1.0.0",
  "exportedAt": "2026-03-09T12:00:00Z",
  "themes": [
    {
      "id": "custom-dark",
      "name": "自定义深色",
      "isDark": true,
      "version": 1,
      "createdAt": "2026-03-09T10:00:00Z",
      "updatedAt": "2026-03-09T11:30:00Z",
      "description": "为营销页面定制的深色主题",
      "colors": {
        "primary": "#1890ff",
        "secondary": "#722ed1",
        "accent": "#13c2c2",
        "background": "#141414",
        "surface": "#1f1f1f",
        "text": "#ffffff",
        "textSecondary": "#a6a6a6",
        "border": "#434343",
        "success": "#49aa19",
        "warning": "#d89614",
        "error": "#a8071a",
        "info": "#177ddc",
        "hover": "#262626",
        "active": "#303030",
        "disabled": "#434343"
      }
    }
  ]
}
```

## 技术选型

| 领域 | 方案 | 理由 |
|------|------|------|
| 框架 | React 19 | 现有技术栈 |
| 状态 | useReducer + Context | 轻量，无需引入新库 |
| 样式 | CSS Modules + CSS Variables | 与现有主题系统一致 |
| 颜色选择器 | 原生 `<input type="color">` | 零依赖 |
| 路由 | 简单条件渲染 (hash) | 仅两个页面，不引入路由库 |
| JSON 操作 | 原生 JSON API | 无需额外库 |
| 文件 I/O | File API + Blob/URL | 浏览器原生 |
