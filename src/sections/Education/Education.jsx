import { education } from '../../data/education';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Education.module.css';

function TimelineItem({ entry }) {
  return (
    <article className={styles.item}>
      <div className={styles.dateCol}>
        <span className={styles.date}>{entry.date}</span>
      </div>
      <div className={styles.dotCol}>
        <div className={styles.dot} />
      </div>
      <div className={styles.card} data-date={entry.date}>
        <h3 className={styles.degree}>{entry.degree}</h3>
        <p className={styles.institution}>
          {entry.institution}, {entry.location}
        </p>
        <p className={styles.gpa}>GPA: {entry.gpa}</p>
        {entry.note && (
          <p className={styles.note}>{entry.note}</p>
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
      </div>
    </article>
  );
}

export default function Education() {
  const ref = useFadeIn();

  return (
    <section id="education" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Education" />
        <div className={styles.timeline}>
          {education.map((entry, i) => (
            <TimelineItem key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
