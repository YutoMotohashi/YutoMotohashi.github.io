import GalleryContent from './GalleryContent';

// This remains on server component
export async function generateStaticParams() {
  return galleryContents.map((item) => ({
    slug: item.slug,
  }));
}

// This is the main server component
export default async function GalleryPage({ params }) {
  return <GalleryContent slug={params.slug} />;
}
