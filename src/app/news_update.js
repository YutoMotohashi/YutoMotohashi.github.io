import newsItems from './data/news_db';
import styles from "./news_update.module.css"

function NewsUpdates({ language }) {
    // Convert the news items based on the language prop
    const localizedNewsItems = newsItems.map(item => ({
        date: item.date,
        link: item.link,
        title: language === 'en' ? item.title_en : item.title_ja,
        description: language === 'en' ? item.description_en : item.description_ja,
    }));


    return (
        <div className={styles.newsContainer}>
            <ul>
                {localizedNewsItems.map((item, index) => (
                    <li key={index}>
                        <time dateTime={item.date}>{item.date}</time>
                        {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkedTitle}>
                                {item.title}
                            </a>
                        ) : (
                            item.title  // Display as plain text without any additional HTML wrapper
                        )}
                        {item.description && ": " + item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsUpdates;