export interface ThemeColors {
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

export interface Theme {
  id: string;
  name: string;
  isDark: boolean;
  colors: ThemeColors;
}

export interface ThemeContextValue {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => void;
  toggleTheme: () => void;
}

// ──── 低代码平台扩展类型 ────

/** 带元数据的主题配置（用于编辑器管理） */
export interface ThemeConfig extends Theme {
  version: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  author?: string;
  tags?: string[];
  isPreset?: boolean; // 预设主题不可删除
}

/** JSON 导出格式 */
export interface ThemeExportJSON {
  $schema: string;
  version: '1.0.0';
  themes: ThemeConfig[];
  exportedAt: string;
}

/** 编辑器状态 */
export interface EditorState {
  activeThemeId: string;
  themes: ThemeConfig[];
  isDirty: boolean;
  previewMode: 'single' | 'compare';
  compareThemeId?: string;
}

/** 编辑器 Action 类型 */
export type EditorAction =
  | { type: 'SELECT_THEME'; id: string }
  | { type: 'UPDATE_TOKEN'; token: keyof ThemeColors; value: string }
  | { type: 'CREATE_THEME'; name: string; baseId?: string }
  | { type: 'DUPLICATE_THEME'; id: string }
  | { type: 'DELETE_THEME'; id: string }
  | { type: 'RENAME_THEME'; id: string; name: string }
  | { type: 'UPDATE_DESCRIPTION'; id: string; description: string }
  | { type: 'TOGGLE_DARK'; id: string }
  | { type: 'IMPORT_THEMES'; themes: ThemeConfig[] }
  | { type: 'SET_COMPARE'; id?: string }
  | { type: 'TOGGLE_COMPARE' }
  | { type: 'MARK_SAVED' };

/** Token 分组定义 */
export interface TokenGroup {
  label: string;
  tokens: (keyof ThemeColors)[];
}

/** 颜色 Token 分组 */
export const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: '基础色',
    tokens: ['primary', 'secondary', 'accent', 'background', 'surface', 'text', 'textSecondary', 'border'],
  },
  {
    label: '语义色',
    tokens: ['success', 'warning', 'error', 'info'],
  },
  {
    label: '状态色',
    tokens: ['hover', 'active', 'disabled'],
  },
];

/** Token 显示名映射 */
export const TOKEN_LABELS: Record<keyof ThemeColors, string> = {
  primary: '主色',
  secondary: '次要色',
  accent: '强调色',
  background: '背景色',
  surface: '表面色',
  text: '文本色',
  textSecondary: '次要文本',
  border: '边框色',
  success: '成功',
  warning: '警告',
  error: '错误',
  info: '信息',
  hover: '悬浮态',
  active: '激活态',
  disabled: '禁用态',
};
