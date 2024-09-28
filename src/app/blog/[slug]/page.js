import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import styles from './BlogPost.module.css';

// Define the directory containing markdown files
const blogDirectory = path.join(process.cwd(), 'src/blog');

// Function to generate static params for all blog posts
export async function generateStaticParams() {
  // Get the list of all markdown filenames
  const filenames = fs.readdirSync(blogDirectory);

  // Generate a list of params with each slug derived from filename
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''), // Strip ".md" extension for slugs
  }));
}

export default function BlogPost({ params }) {
  const { slug } = params;

  const filePath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return (
    <div className={styles.blogPostContainer}>
      <ReactMarkdown>{fileContents}</ReactMarkdown>
    </div>
  );
}
