'use client';

import React, { Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import styles from './BlogPost.module.css';

function BlogPostContent({ content }) {
  return (
    <div className={styles.blogPostContainer}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

// Generate the static paths
export async function generateStaticParams() {
  const blogDirectory = path.join(process.cwd(), 'src/blog');
  const filenames = fs.readdirSync(blogDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export default function BlogPost({ content = '' }) {
  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogPostContent content={content} />
    </Suspense>
  );
}
