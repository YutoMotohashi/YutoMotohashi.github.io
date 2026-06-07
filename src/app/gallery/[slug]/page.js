import React from "react";
import styles from "./page.module.css";
import galleryContents from "../galleryContents";
import GalleryMedia from "./GalleryMedia";

// Function to generate static params for all gallery items
export async function generateStaticParams() {
  return galleryContents.map((item) => ({
    slug: item.slug, // Use the slug defined in galleryContents.js
  }));
}

export default async function GalleryItemPage({ params }) {
  const { slug } = await params;

  // Find the corresponding gallery item by slug
  const item = galleryContents.find((content) => content.slug === slug);

  if (!item) {
    return <p>404: Item Not Found</p>;
  }

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>{item.title}</h1>
      <p className={styles.galleryDescription}>{item.description}</p>
      <GalleryMedia item={item} />
    </div>
  );
}
