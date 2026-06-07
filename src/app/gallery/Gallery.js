import Link from "next/link";
import galleryContents from "./galleryContents";
import GalleryPreview from "./GalleryPreview";
import styles from "./page.module.css";

const Gallery = () => {
  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>Gallery</h1>
      <div className={styles.galleryGrid}>
        {galleryContents.map((item) => (
          <article key={item.slug} className={styles.galleryItem}>
            <Link href={`/gallery/${item.slug}`} className={styles.galleryLink}>
              <h2>{item.title}</h2>
              <GalleryPreview item={item} />
            </Link>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
