import { ThemeProvider } from '../../context/ThemeContext';
import { Header } from './Header';
import { Hero } from './Hero';
import { Features } from './Features';
import { Products } from './Products';
import styles from './Home.module.css';

export function Home() {
  return (
    <ThemeProvider>
      <div className={styles.home}>
        <Header />
        <main className={styles.main}>
          <Hero />
          <Features />
          <Products />
        </main>
        <footer className={styles.footer}>
          <p>Powered by Vite + React</p>
          <p>© 2026 OpenSpec. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
