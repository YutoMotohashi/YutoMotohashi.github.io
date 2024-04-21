import styles from "./experience.module.css"

function ExperienceContainer({ language, experienceItems}) {
    return (
        <div className={styles.experienceContainer}>
            <ul id="experience-list">
                {experienceItems.map((exp, index) => (
                    <li key={index}>
                        <time dateTime={exp.start_date}>{exp.start_date}</time> - 
                        <time dateTime={exp.end_date}>{exp.end_date ? exp.end_date : 'Present'}</time>
                        <strong> {language === 'en' ? exp.title_en : exp.title_ja}</strong> <br />{language === 'en' ? exp.institution_en : exp.institution_ja}
                        <pre>{exp[`description_${language}`] && <p>{exp[`description_${language}`]}</p>}</pre>
                        {exp.link && <a href={exp.link} target="_blank" rel="noopener noreferrer">More Info</a>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceContainer;