import React from 'react';
import publicationsData from '../../data/publication';
import styles from './publication.module.css';

function Publications({ language = 'en' }) {
  console.log('Publication component language:', language);
  
  return (
    <section id="publications">
      <h2>{language === 'ja' ? '発表論文' : 'Publications'}</h2>
      <div className={styles.publicationContainer}>
        <ul>
          {publicationsData.map((publication, index) => {
            // Split authors on commas, bold "Y. Motohashi"
            const authorList = publication.authors.split(',').map((author, i, arr) => {
              const trimmed = author.trim();
              const bolded = trimmed === "Y. Motohashi";
              return (
                <React.Fragment key={i}>
                  {bolded ? <strong>{trimmed}</strong> : trimmed}
                  {i < arr.length - 1 && ', '}
                </React.Fragment>
              );
            });
            return (
              <li key={publication.id ?? index} className={styles.publicationEntry}>
                {/* Title */}
                <p className={styles.publicationTitle}>
                {authorList}, "{publication.title}"{`, `} 
                {/* Journal, volume, issue, date */}
                  <em>{publication.journal}</em>
                  {publication.volume && `, ${publication.volume}`}
                  {publication.issue && `, ${publication.issue}`}
                  {publication.date && ` (${publication.date})`}
                </p>
                {/* Links */}
                <div className={styles.publicationLinks}>
                  {publication.urls.map((linkObj, linkIndex) =>
                    Object.entries(linkObj).map(([key, url]) => (
                      <a
                        key={key + linkIndex}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <em>{key}</em>
                      </a>
                    ))
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
export default Publications;
