import type { Theme } from '../../types/theme';
import { lightTheme } from './light';
import { darkTheme } from './dark';
import { brandTheme } from './brand';

export const themes: Theme[] = [lightTheme, darkTheme, brandTheme];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};

export const getDefaultTheme = (): Theme => {
  // 优先从 localStorage 读取
  const savedThemeId = localStorage.getItem('app-theme');
  if (savedThemeId) {
    const theme = getThemeById(savedThemeId);
    if (theme) return theme;
  }

  // 其次检测系统偏好
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return darkTheme;
  }

  // 默认使用浅色主题
  return lightTheme;
};

export { lightTheme, darkTheme, brandTheme };
