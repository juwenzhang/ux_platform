import React, { useCallback, useRef } from 'react';
import type { EditorProps } from '../types';
import { readThemeFile } from '../../../utils/themeImport';
import { downloadThemeJSON } from '../../../utils/themeExport';
import styles from './TopBar.module.css';

interface TopBarProps extends EditorProps {
  onBack?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ editor, onBack }) => {
  const {
    state,
    activeTheme,
    selectTheme,
    createTheme,
    duplicateTheme,
    deleteTheme,
    importThemes,
    exportThemes,
    toggleCompare,
  } = editor;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = useCallback(() => {
    const name = prompt('请输入新主题名称:', '新主题');
    if (name) {
      createTheme(name, activeTheme.id);
    }
  }, [createTheme, activeTheme.id]);

  const handleDuplicate = useCallback(() => {
    duplicateTheme(activeTheme.id);
  }, [duplicateTheme, activeTheme.id]);

  const handleDelete = useCallback(() => {
    if (activeTheme.isPreset) {
      alert('预设主题不可删除');
      return;
    }
    if (confirm(`确定删除主题「${activeTheme.name}」?`)) {
      deleteTheme(activeTheme.id);
    }
  }, [deleteTheme, activeTheme]);

  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const result = await readThemeFile(file);
      if (result.error) {
        alert(`导入失败: ${result.error}`);
      } else if (result.themes) {
        importThemes(result.themes);
        alert(`成功导入 ${result.themes.length} 套主题`);
      }
      // 清空 input 以允许重复导入同一文件
      e.target.value = '';
    },
    [importThemes]
  );

  const handleExportCurrent = useCallback(() => {
    const data = exportThemes([activeTheme.id]);
    downloadThemeJSON(data, `theme-${activeTheme.id}.json`);
  }, [exportThemes, activeTheme.id]);

  const handleExportAll = useCallback(() => {
    const data = exportThemes();
    downloadThemeJSON(data);
  }, [exportThemes]);

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack} title="返回首页">
            ← 返回
          </button>
        )}
        <span className={styles.logo}>🎨 Theme Studio</span>

        <select
          className={styles.themeSelect}
          value={state.activeThemeId}
          onChange={(e) => selectTheme(e.target.value)}
        >
          {state.themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} {t.isPreset ? '(预设)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.center}>
        <button className={styles.actionBtn} onClick={handleCreate} title="新建主题">
          ＋ 新建
        </button>
        <button className={styles.actionBtn} onClick={handleDuplicate} title="复制当前主题">
          ⧉ 复制
        </button>
        <button
          className={`${styles.actionBtn} ${styles.dangerBtn}`}
          onClick={handleDelete}
          title="删除当前主题"
          disabled={activeTheme.isPreset}
        >
          🗑 删除
        </button>
        <div className={styles.separator} />
        <button className={styles.actionBtn} onClick={handleImport} title="导入 JSON">
          📥 导入
        </button>
        <button className={styles.actionBtn} onClick={handleExportCurrent} title="导出当前主题">
          📤 导出
        </button>
        <button className={styles.actionBtn} onClick={handleExportAll} title="导出全部主题">
          📦 全部导出
        </button>
        <div className={styles.separator} />
        <button
          className={`${styles.actionBtn} ${state.previewMode === 'compare' ? styles.activeBtn : ''}`}
          onClick={toggleCompare}
          title="对比模式"
        >
          ⬚ 对比
        </button>
      </div>

      <div className={styles.right}>
        {state.isDirty && <span className={styles.dirtyBadge}>未保存</span>}
      </div>

      {/* 隐藏的文件选择器 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </div>
  );
};
