'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';

function BlogContent({ posts }) {
  return (
    <div className={styles.blogContainer}>
      <h1>Blog</h1>
      <ul className={styles.blogList}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.blogListItem}>
            - <Link href={`/blog/${post.slug}`} className={styles.blogLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Blog({ posts = [] }) {
  return (
    <Suspense fallback={<div>Loading blog posts...</div>}>
      <BlogContent posts={posts} />
    </Suspense>
  );
}
