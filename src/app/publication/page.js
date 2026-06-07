import PublicationClient from './PublicationClient';
import { createPageMetadata } from '../metadata';

export const metadata = createPageMetadata('/publication');

export default function PublicationPage() {
  return <PublicationClient />;
}
