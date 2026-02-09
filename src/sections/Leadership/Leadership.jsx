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
          {entry.link && (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.extLink}
              aria-label="View details"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Read more
            </a>
          )}
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
