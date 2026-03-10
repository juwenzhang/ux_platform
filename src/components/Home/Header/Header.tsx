import { ThemeSwitcher } from '../../ThemeSwitcher';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🎨</span>
        <span className={styles.logoText}>OpenSpec</span>
      </div>
      <div className={styles.actions}>
        <ThemeSwitcher />
        <a
          href="https://github.com/juwenzhang"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
