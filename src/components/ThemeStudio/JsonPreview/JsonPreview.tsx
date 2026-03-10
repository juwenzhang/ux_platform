import React, { useMemo } from 'react';
import type { EditorProps } from '../types';
import styles from './JsonPreview.module.css';

export const JsonPreview: React.FC<EditorProps> = ({ editor }) => {
  const { activeTheme } = editor;

  const jsonStr = useMemo(() => {
    const { isPreset, ...exportData } = activeTheme;
    void isPreset; // suppress unused warning
    return JSON.stringify(exportData, null, 2);
  }, [activeTheme]);

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>JSON 预览</h4>
      <pre className={styles.code}>{jsonStr}</pre>
    </div>
  );
};
