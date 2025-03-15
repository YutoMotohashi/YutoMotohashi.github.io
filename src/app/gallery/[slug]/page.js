'use client';

import React, { Suspense } from "react";
import styles from "./page.module.css";
import galleryContents from "../galleryContents";

// Separate out the dynamic content that requires client-side features
function GalleryContent({ params }) {
  const { slug } = params;
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

// Function to generate static params
export async function generateStaticParams() {
  return galleryContents.map((item) => ({
    slug: item.slug,
  }));
}

export default function GalleryItemPage(props) {
  return (
    <Suspense fallback={<div>Loading gallery item...</div>}>
      <GalleryContent {...props} />
    </Suspense>
  );
}
