import { FeatureCard } from '../FeatureCard';
import styles from './Features.module.css';

const features = [
  {
    icon: '🎨',
    title: '可视化配置',
    description: '通过直观的 UI 界面配置主题颜色、字体、间距等参数，无需编写代码',
  },
  {
    icon: '⚡',
    title: '实时预览',
    description: '修改即时生效，所见即所得，支持多种组件的实时效果预览',
  },
  {
    icon: '🌙',
    title: '多主题支持',
    description: '一键切换亮色/暗色主题，自动适配所有组件，满足不同场景需求',
  },
  {
    icon: '📦',
    title: 'JSON 导出',
    description: '标准格式 JSON 导出，便于项目集成和团队协作分享',
  },
];

export function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.sectionTitle}>核心功能</h2>
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
