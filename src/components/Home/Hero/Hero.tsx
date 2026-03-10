import { useCallback } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const goToStudio = useCallback(() => {
    window.location.hash = '#/studio';
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          低代码主题配置平台
        </h1>
        <p className={styles.slogan}>
          可视化配置、实时预览、多主题支持，让主题定制变得简单高效
        </p>
        <button className={styles.ctaButton} onClick={goToStudio}>
          Theme Studio
        </button>
      </div>
      <div className={styles.preview}>
        <div className={styles.previewCard}>
          <div className={styles.previewTitle}>主题预览</div>
          <div className={styles.colorSwatches}>
            <div className={styles.swatch} style={{ background: '#1677ff' }} />
            <div className={styles.swatch} style={{ background: '#52c41a' }} />
            <div className={styles.swatch} style={{ background: '#faad14' }} />
            <div className={styles.swatch} style={{ background: '#f5222d' }} />
          </div>
          <div className={styles.previewButtons}>
            <button className={styles.previewButtonPrimary}>主要按钮</button>
            <button className={styles.previewButtonSecondary}>次要按钮</button>
          </div>
        </div>
      </div>
    </section>
  );
}
