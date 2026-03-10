import React, { useRef, useEffect } from 'react';
import type { EditorProps } from '../types';
import type { ThemeConfig } from '../../../types/theme';
import { PreviewComponents } from '../PreviewComponents/PreviewComponents';
import styles from './CanvasPreview.module.css';

/**
 * 将主题颜色注入到指定容器元素的 CSS 变量
 */
function applyThemeVars(el: HTMLElement, theme: ThemeConfig) {
  const map: Record<string, string> = {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-secondary': theme.colors.textSecondary,
    '--color-border': theme.colors.border,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--color-info': theme.colors.info,
    '--color-hover': theme.colors.hover,
    '--color-active': theme.colors.active,
    '--color-disabled': theme.colors.disabled,
  };
  for (const [key, val] of Object.entries(map)) {
    el.style.setProperty(key, val);
  }
}

export const CanvasPreview: React.FC<EditorProps> = ({ editor }) => {
  const { activeTheme, compareTheme, state } = editor;
  const mainRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  // 注入主题变量到主预览区
  useEffect(() => {
    if (mainRef.current) {
      applyThemeVars(mainRef.current, activeTheme);
    }
  }, [activeTheme]);

  // 注入主题变量到对比预览区
  useEffect(() => {
    if (compareRef.current && compareTheme) {
      applyThemeVars(compareRef.current, compareTheme);
    }
  }, [compareTheme]);

  const isCompare = state.previewMode === 'compare' && compareTheme;

  return (
    <div className={styles.container}>
      <div className={styles.canvasHeader}>
        <span className={styles.canvasTitle}>
          画布预览
          {isCompare ? ' — 对比模式' : ''}
        </span>
      </div>

      <div className={`${styles.canvasBody} ${isCompare ? styles.compareMode : ''}`}>
        {/* 主预览区 */}
        <div
          ref={mainRef}
          className={styles.previewPane}
          style={{
            backgroundColor: activeTheme.colors.background,
            color: activeTheme.colors.text,
          }}
        >
          {isCompare && (
            <div className={styles.paneLabel}>{activeTheme.name}</div>
          )}
          <PreviewComponents />
        </div>

        {/* 对比预览区 */}
        {isCompare && compareTheme && (
          <div
            ref={compareRef}
            className={styles.previewPane}
            style={{
              backgroundColor: compareTheme.colors.background,
              color: compareTheme.colors.text,
            }}
          >
            <div className={styles.paneLabel}>{compareTheme.name}</div>
            <PreviewComponents />
          </div>
        )}
      </div>
    </div>
  );
};
