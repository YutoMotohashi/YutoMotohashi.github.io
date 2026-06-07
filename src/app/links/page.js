import LinksClient from './LinksClient';
import { createPageMetadata } from '../metadata';

export const metadata = createPageMetadata('/links');

export default function LinksPage() {
  return <LinksClient />;
}
