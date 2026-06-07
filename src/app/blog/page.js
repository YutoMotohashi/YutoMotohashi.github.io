import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';
import { createPageMetadata } from '../metadata';

export const metadata = createPageMetadata('/blog');

export default function Blog() {
  const blogDirectory = path.join(process.cwd(), 'src/blog');
  const filenames = fs.readdirSync(blogDirectory);

  const posts = filenames.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(blogDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const match = fileContents.match(/^# (.*)/m);
    const title = match ? match[1].trim() : slug;

    return {
      slug,
      title,
    };
  });

  return (
    <div className={styles.blogContainer}>
      <h1>Blog</h1>
      <ul className={styles.blogList}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.blogListItem}>
            <Link href={`/blog/${post.slug}`} className={styles.blogLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
