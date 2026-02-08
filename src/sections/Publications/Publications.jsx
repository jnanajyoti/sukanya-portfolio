import { publications } from '../../data/publications';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Publications.module.css';

function highlightAuthor(authorStr, name) {
  const idx = authorStr.indexOf(name);
  if (idx === -1) return authorStr;
  return (
    <>
      {authorStr.slice(0, idx)}
      <strong>{name}</strong>
      {authorStr.slice(idx + name.length)}
    </>
  );
}

function PublicationCard({ pub, index }) {
  return (
    <article className={styles.card}>
      <span className={styles.number}>{index + 1}.</span>
      <div className={styles.body}>
        <p className={styles.authors}>
          {highlightAuthor(pub.authors, pub.highlightAuthor)}
        </p>
        <p className={styles.title}>{pub.title}</p>
        <p className={styles.journal}>
          <em>{pub.journal}</em>
          {pub.year && <>{typeof pub.year === 'number' ? ` ${pub.year}` : ''}</>}
          {pub.volume && <>, <em>{pub.volume}</em></>}
          {pub.issue && <> ({pub.issue})</>}
          {pub.pages && <>, {pub.pages}</>}
          {pub.status === 'submitted' && (
            <span className={styles.badge}>Submitted</span>
          )}
        </p>
        {pub.doi && (
          <a
            href={pub.doi}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.doi}
          >
            DOI
          </a>
        )}
      </div>
    </article>
  );
}

export default function Publications() {
  const ref = useFadeIn();

  return (
    <section id="publications" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Publications" />
        <div className={styles.list}>
          {publications.map((pub, i) => (
            <PublicationCard key={pub.id} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
