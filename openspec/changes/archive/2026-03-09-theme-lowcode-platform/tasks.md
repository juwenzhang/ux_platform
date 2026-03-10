# Tasks: 企业级主题低代码配置平台

## 任务清单

### Phase 1: 数据层扩展

- [x] **T1.1** 扩展主题类型定义
  - 文件: `src/types/theme.ts`
  - 新增 `ThemeConfig`（含 version/createdAt/updatedAt/description/author/tags）
  - 新增 `ThemeExportJSON` 导出格式接口
  - 新增 `EditorState` 编辑器状态接口

- [x] **T1.2** 实现 useThemeEditor Hook
  - 文件: `src/hooks/useThemeEditor.ts`
  - 基于 useReducer 管理编辑器状态
  - 实现: selectTheme / updateToken / createTheme / duplicateTheme / deleteTheme / renameTheme
  - 主题数据持久化到 localStorage

- [x] **T1.3** 实现 JSON 导入导出工具
  - 文件: `src/utils/themeExport.ts`
  - 文件: `src/utils/themeImport.ts`
  - 导出: 生成 ThemeExportJSON + 触发下载
  - 导入: 文件读取 + JSON 解析 + 结构校验

### Phase 2: 核心 UI 组件

- [x] **T2.1** 创建 ThemeStudio 主布局
  - 文件: `src/components/ThemeStudio/ThemeStudio.tsx`
  - 文件: `src/components/ThemeStudio/ThemeStudio.module.css`
  - 三栏布局：左侧 Token 编辑 + 中间画布 + 右侧列表
  - 顶部工具栏 + 底部状态栏

- [x] **T2.2** 创建 TokenEditor 颜色编辑面板
  - 文件: `src/components/ThemeStudio/TokenEditor.tsx`
  - 文件: `src/components/ThemeStudio/ColorPicker.tsx`
  - 按分组（基础色/语义色/状态色）展示所有 token
  - 每个 token: 颜色选择器 + HEX 输入 + 预览色块
  - isDark 开关 + 主题名称编辑

- [x] **T2.3** 创建 CanvasPreview 画布预览
  - 文件: `src/components/ThemeStudio/CanvasPreview.tsx`
  - 文件: `src/components/ThemeStudio/PreviewComponents.tsx`
  - 预览组件: Button / Input / Card / Badge / Alert / Switch / Table / Nav
  - 全部使用 CSS Variables 驱动，实时响应主题变化
  - 支持单屏和对比模式

### Phase 3: 管理面板与工具栏

- [x] **T3.1** 创建 TopBar 工具栏
  - 文件: `src/components/ThemeStudio/TopBar.tsx`
  - 主题选择下拉 + 新建/复制/删除按钮
  - 导入 JSON / 导出 JSON 按钮
  - 对比模式切换

- [x] **T3.2** 创建 ThemeListPanel + JsonPreview
  - 文件: `src/components/ThemeStudio/ThemeListPanel.tsx`
  - 文件: `src/components/ThemeStudio/JsonPreview.tsx`
  - 主题列表含缩略色板，点击切换
  - JSON 实时预览当前主题配置

- [x] **T3.3** 创建 StatusBar 状态栏
  - 文件: `src/components/ThemeStudio/StatusBar.tsx`
  - 显示当前主题名 / token 数 / 修改状态

### Phase 4: 集成与路由

- [x] **T4.1** 更新 App.tsx 接入 ThemeStudio
  - 通过 hash 路由切换：`#/` 原始应用，`#/studio` 主题工作台
  - 创建导出文件 `src/components/ThemeStudio/index.ts`
  - 添加从首页跳转到 Studio 的入口按钮

---

## 实现顺序

1. T1.1 → T1.2 → T1.3（数据层扩展）
2. T2.1 → T2.2 → T2.3（核心 UI 组件）
3. T3.1 → T3.2 → T3.3（管理面板与工具栏）
4. T4.1（集成与路由）

## 估计时间

- Phase 1: 2 小时
- Phase 2: 4 小时
- Phase 3: 2.5 小时
- Phase 4: 1 小时

**总计: 约 9.5 小时**
