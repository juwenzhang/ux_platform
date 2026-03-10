import styles from './ProductCard.module.css';

interface ProductCardProps {
  icon: string;
  name: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

export function ProductCard({ icon, name, description, href, comingSoon }: ProductCardProps) {
  const handleClick = () => {
    if (!comingSoon) {
      window.location.hash = href;
    }
  };

  return (
    <div className={`${styles.card} ${comingSoon ? styles.comingSoon : ''}`} onClick={handleClick}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      {comingSoon ? (
        <span className={styles.badge}>即将上线</span>
      ) : (
        <span className={styles.enterBtn}>进入 →</span>
      )}
    </div>
  );
}
