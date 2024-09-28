import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css'; // Import the CSS module

export default function BlogPost({ params }) {
  const { slug } = params;

  const blogDirectory = path.join(process.cwd(), 'src/blog');
  const filePath = path.join(blogDirectory, `${slug}.md`);

  const fileContents = fs.readFileSync(filePath, 'utf8');

  return (
    <div className={styles.blogPostContainer}>
      <ReactMarkdown>{fileContents}</ReactMarkdown>
    </div>
  );
}
