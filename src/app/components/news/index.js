import React from 'react';
import newsItems from '../../data/news_db';
import styles from './news_update.module.css';

const NEWS_PREVIEW_COUNT = 3;

function NewsItem({ item, language }) {
    const title = language === 'en' ? item.title_en : item.title_ja;
    const description = language === 'en' ? item.description_en : item.description_ja;

    return (
        <li className={styles.newsItem}>
            <time className={styles.date} dateTime={item.date}>
                {item.date}
            </time>
            <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>
                    {item.link ? (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkedTitle}
                        >
                            {title}
                        </a>
                    ) : (
                        title
                    )}
                </h3>
                {description ? <p className={styles.description}>{description}</p> : null}
            </div>
        </li>
    );
}

function NewsUpdates({ language }) {
    const previewItems = newsItems.slice(0, NEWS_PREVIEW_COUNT);
    const olderItems = newsItems.slice(NEWS_PREVIEW_COUNT);

    return (
        <div className={styles.newsContainer}>
            <ul className={styles.newsList}>
                {previewItems.map((item) => (
                    <NewsItem key={item.date} item={item} language={language} />
                ))}
            </ul>

            {olderItems.length > 0 ? (
                <details className={styles.olderUpdates}>
                    <summary className={styles.disclosure}>
                        <span className={styles.showLabel}>
                            {language === 'en' ? 'Show older updates' : '過去の更新を表示'}
                        </span>
                        <span className={styles.hideLabel}>
                            {language === 'en' ? 'Hide older updates' : '過去の更新を隠す'}
                        </span>
                    </summary>
                    <ul className={styles.newsList}>
                        {olderItems.map((item) => (
                            <NewsItem key={item.date} item={item} language={language} />
                        ))}
                    </ul>
                </details>
            ) : null}
        </div>
    );
}

export default NewsUpdates;
