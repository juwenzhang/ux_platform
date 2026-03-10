import type { Theme } from '../../types/theme';

export const brandTheme: Theme = {
  id: 'brand',
  name: '品牌主题',
  isDark: false,
  colors: {
    // 基础色
    primary: '#722ed1',
    secondary: '#eb2f96',
    accent: '#fa541c',
    background: '#fdf5ff',
    surface: '#f9f0ff',
    text: '#391085',
    textSecondary: '#b37feb',
    border: '#d3adf7',

    // 语义色
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',

    // 状态色
    hover: '#ef93ec',
    active: '#d48cf1',
    disabled: '#d3adf7',
  },
};
