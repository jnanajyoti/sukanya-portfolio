import { researchProjects } from '../../data/research';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Research.module.css';

function ResearchCard({ project }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <span className={styles.dateRange}>{project.dateRange}</span>
      </div>
      <p className={styles.affiliation}>
        {project.lab}, {project.affiliation}
      </p>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.techniques}>
        {project.techniques.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Research() {
  const ref = useFadeIn();

  return (
    <section id="research" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Research" />
        <div className={styles.cards}>
          {researchProjects.map((project) => (
            <ResearchCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
