import { useState } from 'react';
import { conferences } from '../../data/conferences';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Conferences.module.css';

const INITIAL_COUNT = 6;

function ConferenceItem({ entry }) {
  return (
    <article className={styles.item}>
      <span className={styles.year}>{entry.year}</span>
      <div className={styles.content}>
        <h3 className={styles.name}>{entry.name}</h3>
        <p className={styles.location}>{entry.location}</p>
        {entry.presentation && (
          <span className={styles.presentation}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            {entry.presentation}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Conferences() {
  const ref = useFadeIn();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? conferences : conferences.slice(0, INITIAL_COUNT);

  return (
    <section id="conferences" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Conferences & Presentations" />
        <div className={styles.list}>
          {visible.map((entry, i) => (
            <ConferenceItem key={i} entry={entry} />
          ))}
        </div>
        {conferences.length > INITIAL_COUNT && (
          <button
            className={styles.toggle}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show fewer' : `Show all ${conferences.length} conferences`}
          </button>
        )}
      </div>
    </section>
  );
}
