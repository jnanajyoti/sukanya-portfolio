import { useState } from 'react';
import { awards, travelAwards } from '../../data/awards';
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

function TravelAwardTile({ expanded, onToggle }) {
  return (
    <article
      className={`${styles.card} ${styles.travelCard}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      aria-expanded={expanded}
    >
      <div className={styles.icon} aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      </div>
      <div className={styles.travelHeader}>
        <h3 className={styles.title}>Travel Awards & Grants</h3>
        <svg
          className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <p className={styles.org}>{travelAwards.length} awards · 2019–2025</p>

      <div className={`${styles.travelList} ${expanded ? styles.travelListOpen : ''}`}>
        {travelAwards.map((award, i) => (
          <div key={i} className={styles.travelItem}>
            <span className={styles.travelItemTitle}>{award.title}</span>
            <span className={styles.travelItemOrg}>{award.org}</span>
            <span className={styles.travelItemYear}>{award.year}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Awards() {
  const ref = useFadeIn();
  const [travelExpanded, setTravelExpanded] = useState(false);

  /* Insert the travel tile after the first 2 regular awards (chronological flow) */
  const before = awards.slice(0, 2);
  const after = awards.slice(2);

  return (
    <section id="awards" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Awards & Honors" />
        <div className={styles.grid}>
          {before.map((award, i) => (
            <AwardCard key={i} award={award} />
          ))}
          <TravelAwardTile
            expanded={travelExpanded}
            onToggle={() => setTravelExpanded(!travelExpanded)}
          />
          {after.map((award, i) => (
            <AwardCard key={`after-${i}`} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}
