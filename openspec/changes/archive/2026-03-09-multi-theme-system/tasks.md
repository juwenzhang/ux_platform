# Tasks: 多套主题系统

## 任务清单

### Phase 1: 主题基础设施

- [x] **T1.1** 创建主题类型定义和接口
  - 文件: `src/types/theme.ts`
  - 定义 `Theme`, `ThemeColors` 接口

- [x] **T1.2** 创建预设主题配置
  - 文件: `src/styles/themes/light.ts`
  - 文件: `src/styles/themes/dark.ts`
  - 文件: `src/styles/themes/brand.ts`
  - 文件: `src/styles/themes/index.ts`

- [x] **T1.3** 创建 CSS 变量文件
  - 文件: `src/styles/variables.css`
  - 定义基础 CSS 变量映射

### Phase 2: 主题上下文

- [x] **T2.1** 实现 ThemeContext
  - 文件: `src/context/ThemeContext.tsx`
  - 提供主题状态和切换方法

- [x] **T2.2** 实现 useTheme Hook
  - 文件: `src/hooks/useTheme.ts`
  - 封装主题上下文使用

- [x] **T2.3** 实现主题持久化
  - 使用 localStorage 存储主题偏好
  - 支持系统偏好检测

### Phase 3: 组件集成

- [x] **T3.1** 创建 ThemeSwitcher 组件
  - 文件: `src/components/ThemeSwitcher/ThemeSwitcher.tsx`
  - 文件: `src/components/ThemeSwitcher/index.ts`
  - 支持主题选择下拉框

- [x] **T3.2** 更新全局样式
  - 文件: `src/index.css`
  - 引入 CSS 变量和主题类

### Phase 4: 示例与验证

- [x] **T4.1** 在 App.tsx 中集成主题系统
  - 添加 ThemeProvider 包装
  - 添加 ThemeSwitcher 组件

- [x] **T4.2** 验证主题切换功能
  - 测试浅色/深色/品牌主题切换
  - 测试页面刷新后主题持久化

---

## 实现顺序

1. T1.1 → T1.2 → T1.3 (主题基础设施)
2. T2.1 → T2.2 → T2.3 (主题上下文)
3. T3.1 → T3.2 (组件集成)
4. T4.1 → T4.2 (示例验证)

## 估计时间

- Phase 1: 1 小时
- Phase 2: 1.5 小时
- Phase 3: 1 小时
- Phase 4: 0.5 小时

**总计: 约 4 小时**
