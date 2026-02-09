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
        {(pub.doi || pub.newsLink) && (
          <div className={styles.links}>
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
            {pub.newsLink && (
              <a
                href={pub.newsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsLink}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                </svg>
                Press
              </a>
            )}
          </div>
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
