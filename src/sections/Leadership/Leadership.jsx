import { leadership } from '../../data/leadership';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Leadership.module.css';

function LeadershipCard({ entry }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.role}>{entry.role}</h3>
        <span className={styles.date}>{entry.dateRange}</span>
      </div>
      <p className={styles.org}>{entry.organization}</p>
      {entry.description && (
        <p className={styles.description}>{entry.description}</p>
      )}
      {entry.awards.length > 0 && (
        <div className={styles.awards}>
          {entry.awards.map((award) => (
            <span key={award} className={styles.award}>
              {award}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Leadership() {
  const ref = useFadeIn();

  return (
    <section id="leadership" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Leadership & Service" />
        <div className={styles.cards}>
          {leadership.map((entry, i) => (
            <LeadershipCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
