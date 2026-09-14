import ExperienceContainer from '../experience';
import NewsUpdates from '../news';
import Profile from '../profile';
import styles from './home.module.css';
import {
  educationExperienceItems,
  scientificExperienceItems,
  industrialExperienceItems,
} from '../../data/experience';

export default function Home({ language }) {
  return (
    <div className={styles.home}>
      <Profile language={language} />
      <section id="news-feed" className={styles.section} aria-labelledby="news-heading">
        <h2 id="news-heading">{language === 'en' ? 'Latest Updates' : '最新情報'}</h2>
        <NewsUpdates language={language} />
      </section>
      <section id="education-experience-feed" className={styles.section} aria-labelledby="education-heading">
        <h2 id="education-heading">{language === 'en' ? 'Education' : '学歴'}</h2>
        <ExperienceContainer language={language} experienceItems={educationExperienceItems} />
      </section>
      <section id="scientific-experience-feed" className={styles.section} aria-labelledby="research-heading">
        <h2 id="research-heading">{language === 'en' ? 'Research Experience' : '研究経験'}</h2>
        <ExperienceContainer language={language} experienceItems={scientificExperienceItems} />
      </section>
      <section id="industrial-experience-feed" className={styles.section} aria-labelledby="industry-heading">
        <h2 id="industry-heading">{language === 'en' ? 'Industrial Experience' : '実務経験'}</h2>
        <ExperienceContainer language={language} experienceItems={industrialExperienceItems} />
      </section>
    </div>
  );
}
