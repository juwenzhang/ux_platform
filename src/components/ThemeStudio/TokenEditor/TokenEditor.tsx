import React, { useCallback } from 'react';
import type { ThemeColors } from '../../../types/theme';
import { TOKEN_GROUPS, TOKEN_LABELS } from '../../../types/theme';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import type { EditorProps } from '../types';
import styles from './TokenEditor.module.css';

export const TokenEditor: React.FC<EditorProps> = ({ editor }) => {
  const { activeTheme, updateToken, renameTheme, toggleDark } = editor;

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      renameTheme(activeTheme.id, e.target.value);
    },
    [renameTheme, activeTheme.id]
  );

  const handleDarkToggle = useCallback(() => {
    toggleDark(activeTheme.id);
  }, [toggleDark, activeTheme.id]);

  const handleTokenChange = useCallback(
    (token: keyof ThemeColors, value: string) => {
      updateToken(token, value);
    },
    [updateToken]
  );

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h3 className={styles.title}>Token 编辑器</h3>
      </div>

      {/* 主题名称 */}
      <div className={styles.section}>
        <label className={styles.nameLabel}>主题名称</label>
        <input
          className={styles.nameInput}
          value={activeTheme.name}
          onChange={handleNameChange}
          placeholder="输入主题名称..."
        />
      </div>

      {/* 暗色模式切换 */}
      <div className={styles.section}>
        <div className={styles.darkToggle}>
          <span className={styles.darkLabel}>深色模式</span>
          <button
            className={`${styles.toggleBtn} ${activeTheme.isDark ? styles.toggleActive : ''}`}
            onClick={handleDarkToggle}
            aria-label="切换深色模式"
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>

      {/* Token 分组 */}
      {TOKEN_GROUPS.map((group) => (
        <div key={group.label} className={styles.group}>
          <h4 className={styles.groupTitle}>{group.label}</h4>
          <div className={styles.tokenList}>
            {group.tokens.map((token) => (
              <ColorPicker
                key={token}
                token={token}
                label={TOKEN_LABELS[token]}
                value={activeTheme.colors[token]}
                onChange={handleTokenChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
