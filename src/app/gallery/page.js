'use client';

import React, { Suspense } from 'react';
import Gallery from './Gallery';

function GalleryContent() {
  return <Gallery />;
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div>Loading gallery...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
