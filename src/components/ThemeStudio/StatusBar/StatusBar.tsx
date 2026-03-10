import React from 'react';
import type { EditorProps } from '../types';
import styles from './StatusBar.module.css';

export const StatusBar: React.FC<EditorProps> = ({ editor }) => {
  const { activeTheme, state } = editor;

  const tokenCount = Object.keys(activeTheme.colors).length;

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.item}>
          🎨 <strong>{activeTheme.name}</strong>
        </span>
        <span className={styles.separator}>|</span>
        <span className={styles.item}>{activeTheme.isDark ? '🌙 深色' : '☀️ 浅色'}</span>
        <span className={styles.separator}>|</span>
        <span className={styles.item}>{tokenCount} 个 Token</span>
        <span className={styles.separator}>|</span>
        <span className={styles.item}>{state.themes.length} 套主题</span>
      </div>
      <div className={styles.right}>
        {state.isDirty && <span className={styles.dirty}>● 已修改</span>}
        {state.previewMode === 'compare' && (
          <span className={styles.compareTag}>对比模式</span>
        )}
        <span className={styles.item}>v{activeTheme.version}</span>
      </div>
    </div>
  );
};
