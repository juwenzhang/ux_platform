import { ProductCard } from '../ProductCard';
import styles from './Products.module.css';

const products = [
  {
    icon: '🎨',
    name: 'Theme Studio',
    description: '可视化主题配置平台，支持实时预览和 JSON 导出',
    href: '#/studio',
  },
  {
    icon: '📝',
    name: 'Form Builder',
    description: '低代码表单构建器，快速创建复杂表单',
    href: '#/form-builder',
    comingSoon: true,
  },
  {
    icon: '📊',
    name: 'Chart Designer',
    description: '可视化图表设计工具',
    href: '#/chart-designer',
    comingSoon: true,
  },
];

export function Products() {
  return (
    <section className={styles.products}>
      <h2 className={styles.sectionTitle}>产品矩阵</h2>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}
