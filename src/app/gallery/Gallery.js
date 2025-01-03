"use client";

import Link from "next/link";
import galleryContents from "./galleryContents";
import styles from "./page.module.css";

const Gallery = () => {
  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>Gallery</h1>
      <div className={styles.galleryGrid}>
        {galleryContents.map((item, index) => (
          <div key={index} className={styles.galleryItem}>
            <h2>{item.title}</h2>
            <Link href={`/gallery/${item.slug}`}>
              <div className={styles.galleryMedia} role="button" tabIndex={0}>
                {item.type === "threejs" && item.component && <item.component />}
                {item.type === "image" && (
                  <img
                    src={item.src}
                    alt={item.title}
                    className={styles.galleryImage}
                  />
                )}
                {item.type === "video" && (
                  <video controls className={styles.galleryVideo}>
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </Link>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
