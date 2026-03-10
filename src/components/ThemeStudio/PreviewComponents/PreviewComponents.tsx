import React from 'react';
import styles from './PreviewComponents.module.css';

/**
 * 8 种典型 UI 组件预览集合
 * 全部使用 CSS Variables 驱动，实时反映当前主题
 */
export const PreviewComponents: React.FC = React.memo(() => {
  return (
    <div className={styles.grid}>
      {/* 1. Buttons */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Button 按钮</h3>
        <div className={styles.row}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>主要按钮</button>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>次要按钮</button>
          <button className={`${styles.btn} ${styles.btnDanger}`}>危险按钮</button>
          <button className={`${styles.btn} ${styles.btnDisabled}`} disabled>禁用按钮</button>
        </div>
      </section>

      {/* 2. Input 输入框 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Input 输入框</h3>
        <div className={styles.col}>
          <input className={styles.input} placeholder="请输入内容..." />
          <input className={styles.input} value="已填写内容" readOnly />
          <input className={styles.inputDisabled} placeholder="禁用状态" disabled />
        </div>
      </section>

      {/* 3. Card 卡片 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Card 卡片</h3>
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>卡片标题</h4>
          <p className={styles.cardContent}>
            这是一个示例卡片组件，用于展示当前主题的 surface 颜色、边框和文本样式。
          </p>
          <div className={styles.cardFooter}>
            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}>操作</button>
          </div>
        </div>
      </section>

      {/* 4. Badge / Tag 标签 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Badge 标签</h3>
        <div className={styles.row}>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>成功</span>
          <span className={`${styles.badge} ${styles.badgeWarning}`}>警告</span>
          <span className={`${styles.badge} ${styles.badgeError}`}>错误</span>
          <span className={`${styles.badge} ${styles.badgeInfo}`}>信息</span>
          <span className={`${styles.badge} ${styles.badgePrimary}`}>主色</span>
          <span className={`${styles.badge} ${styles.badgeSecondary}`}>次要</span>
        </div>
      </section>

      {/* 5. Alert 提示框 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Alert 提示</h3>
        <div className={styles.col}>
          <div className={`${styles.alert} ${styles.alertSuccess}`}>✓ 操作成功！数据已保存。</div>
          <div className={`${styles.alert} ${styles.alertWarning}`}>⚠ 警告：即将达到存储上限。</div>
          <div className={`${styles.alert} ${styles.alertError}`}>✕ 错误：网络连接失败。</div>
          <div className={`${styles.alert} ${styles.alertInfo}`}>ℹ 提示：新版本已发布。</div>
        </div>
      </section>

      {/* 6. Switch 开关 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Switch 开关</h3>
        <div className={styles.col}>
          <label className={styles.switchRow}>
            <span>开启通知</span>
            <span className={`${styles.switch} ${styles.switchOn}`}>
              <span className={styles.switchKnob} />
            </span>
          </label>
          <label className={styles.switchRow}>
            <span>自动更新</span>
            <span className={styles.switch}>
              <span className={styles.switchKnob} />
            </span>
          </label>
        </div>
      </section>

      {/* 7. Table 表格 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Table 表格</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>名称</th>
              <th>状态</th>
              <th>更新时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>浅色主题</td>
              <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>启用</span></td>
              <td>2026-03-09</td>
            </tr>
            <tr>
              <td>深色主题</td>
              <td><span className={`${styles.badge} ${styles.badgeInfo}`}>默认</span></td>
              <td>2026-03-09</td>
            </tr>
            <tr>
              <td>品牌主题</td>
              <td><span className={`${styles.badge} ${styles.badgeWarning}`}>草稿</span></td>
              <td>2026-03-08</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 8. Navigation 导航 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Navigation 导航</h3>
        <nav className={styles.nav}>
          <a className={`${styles.navItem} ${styles.navActive}`} href="#preview">首页</a>
          <a className={styles.navItem} href="#preview">主题管理</a>
          <a className={styles.navItem} href="#preview">设置</a>
          <a className={styles.navItem} href="#preview">帮助</a>
        </nav>
      </section>
    </div>
  );
});

PreviewComponents.displayName = 'PreviewComponents';
