import React, { useCallback } from 'react';
import { useThemeEditor } from '../../../hooks/useThemeEditor';
import { TopBar } from '../TopBar/TopBar';
import { TokenEditor } from '../TokenEditor/TokenEditor';
import { CanvasPreview } from '../CanvasPreview/CanvasPreview';
import { ThemeListPanel } from '../ThemeListPanel/ThemeListPanel';
import { StatusBar } from '../StatusBar/StatusBar';
import styles from './ThemeStudio.module.css';

export const ThemeStudio: React.FC = () => {
  const editor = useThemeEditor();

  const handleBack = useCallback(() => {
    window.location.hash = '#/';
  }, []);

  return (
    <div className={styles.studio}>
      <TopBar editor={editor} onBack={handleBack} />
      <div className={styles.workspace}>
        <aside className={styles.leftPanel}>
          <TokenEditor editor={editor} />
        </aside>
        <main className={styles.canvas}>
          <CanvasPreview editor={editor} />
        </main>
        <aside className={styles.rightPanel}>
          <ThemeListPanel editor={editor} />
        </aside>
      </div>
      <StatusBar editor={editor} />
    </div>
  );
};

export default ThemeStudio;
