# Tasks: 首页重构实现计划

## 任务清单

### Phase 1: 目录结构创建

- [x] **T1.1** 创建 `src/components/Home/` 目录
- [x] **T1.2** 将现有 `App.tsx` 首页逻辑迁移到 `Home/Home.tsx`
- [x] **T1.3** 创建 `Home.module.css` 基础样式文件
- [x] **T1.4** 更新 `App.tsx` 引入 Home 组件

### Phase 2: Header 组件

- [x] **T2.1** 创建 `components/Home/Header/` 子目录
- [x] **T2.2** 创建 `Header.tsx` - 导航栏组件
- [x] **T2.3** 创建 `Header.module.css` - 导航栏样式
- [x] **T2.4** 实现 Logo + 项目名 + 主题切换

### Phase 3: Hero 区域

- [x] **T3.1** 创建 `components/Home/Hero/` 子目录
- [x] **T3.2** 创建 `Hero.tsx` - Hero 区域组件
- [x] **T3.3** 创建 `Hero.module.css` - Hero 样式
- [x] **T3.4** 实现主标题 + Slogan + CTA 按钮
- [x] **T3.5** 实现功能预览迷你组件（色板 + 示例按钮）

### Phase 4: 功能卡片区域

- [x] **T4.1** 创建 `components/Home/FeatureCard/` 子目录
- [x] **T4.2** 创建 `FeatureCard.tsx` - 功能卡片组件
- [x] **T4.3** 创建 `FeatureCard.module.css` - 功能卡片样式
- [x] **T4.4** 实现 4 个功能卡片（可视化配置、实时预览、多主题、JSON导出）

### Phase 5: 产品矩阵区域

- [x] **T5.1** 创建 `components/Home/ProductCard/` 子目录
- [x] **T5.2** 创建 `ProductCard.tsx` - 产品卡片组件
- [x] **T5.3** 创建 `ProductCard.module.css` - 产品卡片样式
- [x] **T5.4** 在 Home 组件中集成产品卡片列表

### Phase 6: 集成与优化

- [x] **T6.1** 在 Home.tsx 中集成所有区域组件
- [x] **T6.2** 实现路由配置（#/home 为默认首页）
- [x] **T6.3** 优化暗色主题适配
- [x] **T6.4** 构建验证

---

## 实现顺序

1. T1.1 → T1.2 → T1.3 → T1.4（目录结构 + 基础迁移）
2. T2.1 → T2.2 → T2.3 → T2.4（Header 导航栏）
3. T3.1 → T3.2 → T3.3 → T3.4 → T3.5（Hero 区域）
4. T4.1 → T4.2 → T4.3 → T4.4（功能卡片）
5. T5.1 → T5.2 → T5.3 → T5.4（产品卡片）
6. T6.1 → T6.2 → T6.3 → T6.4（集成优化）

## 估计时间

- Phase 1: 20 分钟
- Phase 2: 30 分钟
- Phase 3: 45 分钟
- Phase 4: 30 分钟
- Phase 5: 25 分钟
- Phase 6: 30 分钟

**总计: 约 3 小时**
