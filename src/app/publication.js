import React from 'react';
import publicationsData from './data/publication';
import styles from './publication.module.css';

function Publications({ language }) {
    return (
        <section id="publications">
            <h2>Publications</h2>
            <div className={styles.publicationContainer}>
                <ul>
                    {publicationsData.map((publication, index) => (
                        <li key={index} className={styles.publicationEntry}>
                            <p className={styles.publicationAuthor}>{publication.author}</p>
                            <p className={styles.publicationTitle}>{publication.title}</p>
                            <div className={styles.publicationLinks}>
                                {publication.urls.map((link, linkIndex) => (
                                    Object.entries(link).map(([key, url]) => (
                                        <a key={linkIndex} href={url} target="_blank" rel="noopener noreferrer">
                                            View Paper in {key.toUpperCase()}
                                        </a>
                                    ))
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Publications;
