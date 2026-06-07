import HomeClient from './HomeClient';
import { createPageMetadata } from './metadata';

export const metadata = createPageMetadata('/');

export default function Page() {
  return <HomeClient />;
}
