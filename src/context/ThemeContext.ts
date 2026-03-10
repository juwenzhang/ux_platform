import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Theme, ThemeContextValue } from '../types/theme';
import { themes, getDefaultTheme, getThemeById } from '../styles/themes';

const STORAGE_KEY = 'app-theme';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  const {
    primary,
    secondary,
    accent,
    background,
    surface,
    text,
    textSecondary,
    border,
    success,
    warning,
    error,
    info,
    hover,
    active,
    disabled,
  } = theme.colors;

  // 设置 CSS 变量
  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-secondary', secondary);
  root.style.setProperty('--color-accent', accent);
  root.style.setProperty('--color-background', background);
  root.style.setProperty('--color-surface', surface);
  root.style.setProperty('--color-text', text);
  root.style.setProperty('--color-text-secondary', textSecondary);
  root.style.setProperty('--color-border', border);
  root.style.setProperty('--color-success', success);
  root.style.setProperty('--color-warning', warning);
  root.style.setProperty('--color-error', error);
  root.style.setProperty('--color-info', info);
  root.style.setProperty('--color-hover', hover);
  root.style.setProperty('--color-active', active);
  root.style.setProperty('--color-disabled', disabled);

  // 设置 data-theme 属性
  root.setAttribute('data-theme', theme.id);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme: defaultThemeId,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // 优先使用指定的默认主题
    if (defaultThemeId) {
      const theme = getThemeById(defaultThemeId);
      if (theme) return theme;
    }
    return getDefaultTheme();
  });

  // 初始化时应用主题
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // 持久化主题偏好
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentTheme.id);
  }, [currentTheme]);

  const setTheme = useCallback((themeId: string) => {
    const theme = getThemeById(themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme =
      currentTheme.id === 'light'
        ? getThemeById('dark')
        : getThemeById('light');
    if (nextTheme) {
      setCurrentTheme(nextTheme);
    }
  }, [currentTheme.id]);

  return (
    // <ThemeContext.Provider
    //   value={{
    //     currentTheme,
    //     themes,
    //     setTheme,
    //     toggleTheme,
    //   }}
    // >
    //   {children}
    // </ThemeContext.Provider>
    React.createElement(ThemeContext.Provider, {
      value: {
        currentTheme,
        themes,
        setTheme,
        toggleTheme,
      },
      children,
    })
  );
};
