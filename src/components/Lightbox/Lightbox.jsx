import { useEffect, useCallback } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];
  const isVideo = photo?.type === 'video' || photo?.src?.endsWith('.mp4');
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button className={styles.close} onClick={onClose} aria-label="Close">
        &times;
      </button>

      {hasPrev && (
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            className={styles.media}
            src={photo.src}
            controls
            autoPlay
            playsInline
            aria-label={photo.alt}
          />
        ) : (
          <img
            className={styles.media}
            src={photo.src}
            alt={photo.alt}
            loading="eager"
          />
        )}
        <div className={styles.caption}>
          <p className={styles.captionText}>{photo.caption}</p>
          <span className={styles.counter}>
            {index + 1} / {photos.length}
          </span>
        </div>
      </div>

      {hasNext && (
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
