import type { Theme } from '../../types/theme';

export const darkTheme: Theme = {
  id: 'dark',
  name: '深色主题',
  isDark: true,
  colors: {
    // 基础色
    primary: '#177ddc',
    secondary: '#9254de',
    accent: '#36cfc9',
    background: '#141414',
    surface: '#1f1f1f',
    text: '#ffffff',
    textSecondary: '#a6a6a6',
    border: '#434343',

    // 语义色
    success: '#49aa19',
    warning: '#d89614',
    error: '#a8071a',
    info: '#177ddc',

    // 状态色
    hover: '#262626',
    active: '#303030',
    disabled: '#434343',
  },
};
