import React from 'react';
import styles from "./experience.module.css";

function ExperienceContainer({ language, experienceItems }) {
    return (
        <div className={styles.experienceContainer}>
            <ul id="experience-list">
                {experienceItems.map((exp, index) => (
                    <li key={index}>
                        <time dateTime={exp.start_date}>{exp.start_date}</time> - 
                        <time dateTime={exp.end_date}>{exp.end_date ? exp.end_date : 'Present'}</time>
                        <strong> {language === 'en' ? exp.title_en : exp.title_ja}</strong> <br />{language === 'en' ? exp.institution_en : exp.institution_ja}
                        <pre>{exp[`description_${language}`] && <p>{exp[`description_${language}`]}</p>}</pre>
                        {(() => {
                            if (!exp.link) return null;

                            // Support both string URL and object
                            let href = '';
                            if (typeof exp.link === 'string') {
                                href = exp.link;
                            } else if (typeof exp.link === 'object') {
                                href = exp.link.href || exp.link.url || '';
                            }

                            if (!href) return null;

                            const linkDescription = exp[`link_description_${language}`]
                                || exp.link_description_en
                                || exp.link_description_ja
                                || '';

                            const label = 'More Info';
                            const aria = linkDescription ? `${label} — ${linkDescription}` : label;

                            return (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={linkDescription || undefined}
                                    aria-label={aria}
                                >
                                    {label}
                                </a>
                            );
                        })()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceContainer;
