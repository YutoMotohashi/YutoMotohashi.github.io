import CVClient from './CVClient';
import { createPageMetadata } from '../metadata';

export const metadata = createPageMetadata('/cv');

export default function CVPage() {
  return <CVClient />;
}
