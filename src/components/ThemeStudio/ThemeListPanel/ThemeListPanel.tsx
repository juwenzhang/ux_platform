import React from 'react';
import type { EditorProps } from '../types';
import { JsonPreview } from '../JsonPreview/JsonPreview';
import styles from './ThemeListPanel.module.css';

export const ThemeListPanel: React.FC<EditorProps> = ({ editor }) => {
  const { state, selectTheme, setCompare } = editor;

  return (
    <div className={styles.panel}>
      {/* 主题列表 */}
      <div className={styles.listSection}>
        <h3 className={styles.sectionTitle}>主题列表</h3>
        <div className={styles.themeList}>
          {state.themes.map((theme) => {
            const isActive = theme.id === state.activeThemeId;
            const isCompare = theme.id === state.compareThemeId;
            return (
              <div
                key={theme.id}
                className={`${styles.themeItem} ${isActive ? styles.active : ''} ${isCompare ? styles.compare : ''}`}
                onClick={() => selectTheme(theme.id)}
              >
                <div className={styles.themeInfo}>
                  <span className={styles.themeName}>
                    {theme.name}
                    {theme.isPreset && <span className={styles.presetBadge}>预设</span>}
                  </span>
                  <span className={styles.themeMeta}>
                    {theme.isDark ? '深色' : '浅色'} · v{theme.version}
                  </span>
                </div>
                {/* 缩略色板 */}
                <div className={styles.colorSwatches}>
                  {['primary', 'secondary', 'accent', 'background', 'text'].map((key) => (
                    <div
                      key={key}
                      className={styles.swatch}
                      style={{ background: theme.colors[key as keyof typeof theme.colors] }}
                      title={key}
                    />
                  ))}
                </div>
                {/* 对比按钮 */}
                {state.previewMode === 'compare' && !isActive && (
                  <button
                    className={`${styles.compareBtn} ${isCompare ? styles.compareBtnActive : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompare(isCompare ? undefined : theme.id);
                    }}
                  >
                    {isCompare ? '取消对比' : '对比'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* JSON 预览 */}
      <div className={styles.jsonSection}>
        <JsonPreview editor={editor} />
      </div>
    </div>
  );
};
