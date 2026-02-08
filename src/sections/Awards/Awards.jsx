import { awards } from '../../data/awards';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Awards.module.css';

function AwardCard({ award }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>
      <h3 className={styles.title}>{award.title}</h3>
      <p className={styles.org}>{award.org}</p>
      <span className={styles.year}>{award.year}</span>
    </article>
  );
}

export default function Awards() {
  const ref = useFadeIn();

  return (
    <section id="awards" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Awards & Honors" />
        <div className={styles.grid}>
          {awards.map((award, i) => (
            <AwardCard key={i} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}
