import Gallery from './Gallery';
import { createPageMetadata } from '../metadata';

export const metadata = createPageMetadata('/gallery');

export default function GalleryPage() {
  return <Gallery />;
}
