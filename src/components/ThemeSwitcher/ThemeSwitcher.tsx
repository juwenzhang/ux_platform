import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, themes, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <label htmlFor="theme-select" className={styles.label}>
        主题:
      </label>
      <select
        id="theme-select"
        value={currentTheme.id}
        onChange={(e) => setTheme(e.target.value)}
        className={styles.select}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};
