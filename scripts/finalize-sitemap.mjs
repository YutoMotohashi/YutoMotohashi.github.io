import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const generatedSitemap = join(distDir, 'sitemap-0.xml');
const rootSitemap = join(distDir, 'sitemap.xml');

if (!existsSync(generatedSitemap)) {
  throw new Error(`Expected generated sitemap at ${generatedSitemap}`);
}

copyFileSync(generatedSitemap, rootSitemap);