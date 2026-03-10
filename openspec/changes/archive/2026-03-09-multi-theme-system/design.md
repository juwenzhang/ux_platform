# Design: 多套主题系统

## 技术架构

### 1. 主题数据结构

```typescript
interface Theme {
  id: string;           // 主题唯一标识
  name: string;         // 主题显示名称
  isDark: boolean;      // 是否为深色主题
  colors: ThemeColors;  // 主题颜色变量
}

interface ThemeColors {
  // 基础色
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  
  // 语义色
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // 状态色
  hover: string;
  active: string;
  disabled: string;
}
```

### 2. 主题上下文 (Theme Context)

使用 React Context 提供主题状态管理：

```typescript
interface ThemeContextValue {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => void;
  toggleTheme: () => void;
}
```

### 3. 主题存储

- 使用 `localStorage` 持久化用户主题偏好
- key: `app-theme`
- 首次访问时使用系统偏好或默认主题

### 4. 预设主题

| 主题 ID | 名称 | 类型 | 描述 |
|---------|------|------|------|
| `light` | 浅色主题 | light | 默认浅色主题 |
| `dark` | 深色主题 | dark | 深色主题 |
| `brand` | 品牌主题 | light | 品牌定制主题 |

### 5. 主题应用机制

- 使用 CSS 变量（Custom Properties）存储颜色值
- 在 `document.documentElement` 上设置 `data-theme` 属性
- 组件通过 CSS 变量引用颜色，而非硬编码

### 6. 组件集成

```tsx
// 使用主题的示例
const Button = ({ children }) => (
  <button style={{
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-text)',
  }}>
    {children}
  </button>
);
```

### 7. 主题切换动画

- 使用 CSS transition 实现平滑过渡
- 过渡时长: 200ms
- 过渡属性: `background-color`, `color`, `border-color`

## 目录结构

```
src/
  styles/
    themes/
      index.ts        # 主题配置导出
      light.ts        # 浅色主题
      dark.ts         # 深色主题
      brand.ts        # 品牌主题
    variables.css     # CSS 变量定义
  context/
    ThemeContext.tsx  # 主题上下文
  hooks/
    useTheme.ts       # 主题 Hook
  components/
    ThemeSwitcher/    # 主题切换组件
```

## API 设计

### useTheme Hook

```typescript
const {
  currentTheme,
  themes,
  setTheme,
  toggleTheme
} = useTheme();
```

### ThemeProvider

```tsx
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>
```

## 性能考虑

1. 主题配置使用常量而非运行时计算
2. CSS 变量使用 `var()` 引用，避免大量内联样式
3. 主题切换仅修改 `data-theme` 属性，触发 CSS 变量重计算
4. 使用 `React.memo` 避免不必要的重渲染

## 兼容性

- 支持现代浏览器（Chrome 80+, Firefox 75+, Safari 13.1+）
- 深色主题支持 `@media (prefers-color-scheme: dark)` 自动检测
