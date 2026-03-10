import type { Theme } from '../../types/theme';

export const lightTheme: Theme = {
  id: 'light',
  name: '浅色主题',
  isDark: false,
  colors: {
    // 基础色
    primary: '#1890ff',
    secondary: '#722ed1',
    accent: '#13c2c2',
    background: '#ffffff',
    surface: '#fafafa',
    text: '#262626',
    textSecondary: '#8c8c8c',
    border: '#d9d9d9',

    // 语义色
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',

    // 状态色
    hover: '#f5f5f5',
    active: '#e6e6e6',
    disabled: '#d9d9d9',
  },
};
