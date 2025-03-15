import React from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import styles from './BlogPost.module.css';

// Define the directory containing markdown files
const blogDirectory = path.join(process.cwd(), 'src/blog');

// Generate the static paths
export async function generateStaticParams() {
  const filenames = fs.readdirSync(blogDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export default function BlogPost({ params }) {
  const { slug } = params;
  const filePath = path.join(blogDirectory, `${slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <div className={styles.blogPostContainer}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
