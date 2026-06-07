"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";

const threeComponents = {
  TransportMeasurement: dynamic(() => import("../components/TransportMeasurement"), { ssr: false }),
  MultiZoneRamsey: dynamic(() => import("../components/MultiZoneRamsey"), { ssr: false }),
};

export default function GalleryPreview({ item }) {
  const ThreeComponent = item.type === "threejs" ? threeComponents[item.component] : null;

  return (
    <div className={styles.galleryMedia}>
      {ThreeComponent && <ThreeComponent />}
      {item.type === "image" && (
        <img src={item.src} alt={item.title} className={styles.galleryImage} />
      )}
      {item.type === "video" && (
        <video muted playsInline preload="metadata" className={styles.galleryVideo}>
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
