import styles from './SectionHeading.module.css';

export default function SectionHeading({ title }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.underline} />
    </div>
  );
}
