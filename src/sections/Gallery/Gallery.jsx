import { useState } from 'react';
import { academicPhotos, travelGroups } from '../../data/gallery';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Lightbox from '../../components/Lightbox/Lightbox';
import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './Gallery.module.css';

function AcademicGrid({ onPhotoClick }) {
  return (
    <div className={styles.photoGrid}>
      {academicPhotos.map((photo, i) => (
        <button
          key={i}
          className={styles.photoCard}
          onClick={() => onPhotoClick(academicPhotos, i)}
          aria-label={`View: ${photo.caption}`}
        >
          <img
            className={styles.thumb}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
          />
          <span className={styles.photoCaption}>{photo.caption}</span>
        </button>
      ))}
    </div>
  );
}

function DestinationCard({ group, isExpanded, onToggle, onPhotoClick }) {
  return (
    <div className={styles.destinationWrapper}>
      <button
        className={`${styles.destinationCard} ${isExpanded ? styles.destinationCardActive : ''}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <img
          className={styles.destinationCover}
          src={group.cover}
          alt={`${group.destination}, ${group.location}`}
          loading="lazy"
        />
        <div className={styles.destinationOverlay}>
          <h3 className={styles.destinationName}>{group.destination}</h3>
          <span className={styles.destinationMeta}>
            {group.location} &middot; {group.photos.length} {group.photos.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className={styles.expandedGrid}>
          {group.photos.map((photo, i) => {
            const isVideo = photo.type === 'video' || photo.src.endsWith('.mp4');
            return (
              <button
                key={i}
                className={styles.photoCard}
                onClick={() => onPhotoClick(group.photos, i)}
                aria-label={`View: ${photo.caption}`}
              >
                {isVideo ? (
                  <div className={styles.videoThumb}>
                    <video src={photo.src} className={styles.thumb} muted preload="metadata" />
                    <div className={styles.playIcon} aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img
                    className={styles.thumb}
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                  />
                )}
                <span className={styles.photoCaption}>{photo.caption}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TravelGrid({ onPhotoClick }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div className={styles.destinationGrid}>
      {travelGroups.map((group, i) => (
        <DestinationCard
          key={i}
          group={group}
          isExpanded={expandedIdx === i}
          onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </div>
  );
}

export default function Gallery() {
  const ref = useFadeIn();
  const [tab, setTab] = useState('academic');
  const [lightbox, setLightbox] = useState(null); // { photos, index }

  const openLightbox = (photos, index) => setLightbox({ photos, index });
  const closeLightbox = () => setLightbox(null);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container} ref={ref}>
        <SectionHeading title="Gallery" />

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'academic' ? styles.tabActive : ''}`}
            onClick={() => setTab('academic')}
          >
            Academic
          </button>
          <button
            className={`${styles.tab} ${tab === 'travel' ? styles.tabActive : ''}`}
            onClick={() => setTab('travel')}
          >
            Travel
          </button>
        </div>

        {tab === 'academic' ? (
          <AcademicGrid onPhotoClick={openLightbox} />
        ) : (
          <TravelGrid onPhotoClick={openLightbox} />
        )}
      </div>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={() =>
            setLightbox((prev) => ({
              ...prev,
              index: Math.max(0, prev.index - 1),
            }))
          }
          onNext={() =>
            setLightbox((prev) => ({
              ...prev,
              index: Math.min(prev.photos.length - 1, prev.index + 1),
            }))
          }
        />
      )}
    </section>
  );
}
