import React from "react";
import styles from "./page.module.css";
import galleryContents from "../galleryContents";

// Function to generate static params for all gallery items
export async function generateStaticParams() {
  return galleryContents.map((item) => ({
    slug: item.slug, // Use the slug defined in galleryContents.js
  }));
}

export default function GalleryItemPage({ params }) {
  const { slug } = params;

  // Find the corresponding gallery item by slug
  const item = galleryContents.find((content) => content.slug === slug);

  if (!item) {
    return <p>404: Item Not Found</p>;
  }

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>{item.title}</h1>
      <p className={styles.galleryDescription}>{item.description}</p>
      <div className={styles.galleryMedia}>
        {item.type === "threejs" && item.component && <item.component />}
        {item.type === "image" && (
          <img src={item.src} alt={item.title} className={styles.galleryImage} />
        )}
        {item.type === "video" && (
          <video controls className={styles.galleryVideo}>
            <source src={item.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
