import { skillCategories } from '../../data/skills';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Skills.module.css';

function SkillCategory({ category }) {
  return (
    <div className={styles.category}>
      <h3 className={styles.categoryTitle}>{category.category}</h3>
      <div className={styles.tags}>
        {category.items.map((item) => (
          <span key={item} className={styles.tag}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useFadeIn();

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Skills & Instrumentation" />
        <div className={styles.grid}>
          {skillCategories.map((cat) => (
            <SkillCategory key={cat.category} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
