import React from 'react';
import styles from './experience.module.css';

function getDateTimeValue(value) {
    if (typeof value !== 'string') return undefined;

    const match = value.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
    if (!match) return undefined;

    const [, year, month, day] = match;
    if (!/^(0[1-9]|1[0-2])$/.test(month)) return undefined;
    if (day && !/^(0[1-9]|[12]\d|3[01])$/.test(day)) return undefined;

    return day ? `${year}-${month}-${day}` : `${year}-${month}`;
}

function ExperienceItem({ language, experience }) {
    const title = language === 'en' ? experience.title_en : experience.title_ja;
    const institution = language === 'en' ? experience.institution_en : experience.institution_ja;
    const description = language === 'en' ? experience.description_en : experience.description_ja;
    const endDate = experience.end_date || 'Present';

    let href = '';
    if (typeof experience.link === 'string') {
        href = experience.link;
    } else if (experience.link && typeof experience.link === 'object') {
        href = experience.link.href || experience.link.url || '';
    }

    const linkDescription = experience[`link_description_${language}`]
        || experience.link_description_en
        || experience.link_description_ja
        || '';
    const linkLabel = language === 'en' ? 'More info' : '詳細情報';
    const linkAriaLabel = linkDescription ? `${linkLabel} — ${linkDescription}` : linkLabel;

    return (
        <li className={styles.experienceItem}>
            <div className={styles.dateRange}>
                <time dateTime={getDateTimeValue(experience.start_date)}>
                    {experience.start_date}
                </time>
                <span aria-hidden="true"> – </span>
                <time dateTime={getDateTimeValue(endDate)}>{endDate}</time>
            </div>
            <div className={styles.experienceContent}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.institution}>{institution}</p>
                {description ? <p className={styles.description}>{description}</p> : null}
                {href ? (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={linkDescription || undefined}
                        aria-label={linkAriaLabel}
                        className={styles.experienceLink}
                    >
                        {linkLabel}
                    </a>
                ) : null}
            </div>
        </li>
    );
}

function ExperienceContainer({ language, experienceItems }) {
    return (
        <div className={styles.experienceContainer}>
            <ul className={styles.experienceList}>
                {experienceItems.map((experience) => (
                    <ExperienceItem
                        key={`${experience.start_date}-${experience.title_en}`}
                        language={language}
                        experience={experience}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ExperienceContainer;
