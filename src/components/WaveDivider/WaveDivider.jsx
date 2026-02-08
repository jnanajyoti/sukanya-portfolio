import styles from './WaveDivider.module.css';

export default function WaveDivider({ flip = false }) {
  return (
    <div className={`${styles.wrapper} ${flip ? styles.flip : ''}`} aria-hidden="true">
      <svg className={styles.wave} viewBox="0 0 2400 60" preserveAspectRatio="none">
        <path
          d="M0,30 C150,10 350,50 600,30 C850,10 1050,50 1200,30 C1350,10 1550,50 1800,30 C2050,10 2250,50 2400,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
