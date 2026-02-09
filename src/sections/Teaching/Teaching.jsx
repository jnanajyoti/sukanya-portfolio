import { teaching } from '../../data/teaching';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Teaching.module.css';

function TeachingCard({ entry }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.role}>{entry.role}</h3>
        <span className={styles.date}>{entry.dateRange}</span>
      </div>
      <p className={styles.org}>{entry.org}</p>
      <ul className={styles.items}>
        {entry.items.map((item, i) => (
          <li key={i} className={styles.item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Teaching() {
  const ref = useFadeIn();

  return (
    <section id="teaching" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Teaching & Mentorship" />
        <div className={styles.cards}>
          {teaching.map((entry, i) => (
            <TeachingCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
