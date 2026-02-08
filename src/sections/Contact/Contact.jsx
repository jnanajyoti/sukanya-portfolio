import { profile } from '../../data/profile';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useFadeIn();

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <h2 className={styles.heading}>Get in Touch</h2>
        <p className={styles.subtitle}>
          Interested in collaboration or have questions about my research? Feel free to reach out.
        </p>

        <div className={styles.links}>
          <a href={`mailto:${profile.email}`} className={styles.primary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {profile.email}
          </a>

          <div className={styles.secondary}>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={styles.linkBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {profile.phone}
            </a>
            <a href={profile.links.googleScholar} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              Google Scholar
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              LinkedIn
            </a>
          </div>
        </div>

        <p className={styles.location}>{profile.location}</p>
      </div>
    </section>
  );
}
