import React from 'react';
import ExperienceContainer from "./experience";
import NewsUpdates from "./news_update";
import Profile from "./profile";
import styles from "./page.module.css";

import { educationExperienceItems, scientificExperienceItems, industrialExperienceItems } from './data/experience';

function Home({ language }) {
    return (
        <>
            <section id="profiles">
                <h2>{language === 'en' ? 'Profile' : 'プロフィール'}</h2>
                <Profile language={language} />
            </section>
            <section id="news-feed">
                <h2>{language === 'en' ? 'Latest Updates' : '最新情報'}</h2>
                <div className="news-container">
                    <NewsUpdates language={language} />
                </div>
            </section>
            <section id="education-experience-feed">
                <h2>{language === 'en' ? 'Education' : '学歴'}</h2>
                <div className="experience-container">
                    <ExperienceContainer language={language} experienceItems={educationExperienceItems} />
                </div>
            </section>
            <section id="scientific-experience-feed">
                <h2>{language === 'en' ? 'Scientific Experience' : '研究経験'}</h2>
                <div className="experience-container">
                    <ExperienceContainer language={language} experienceItems={scientificExperienceItems} />
                </div>
            </section>
            <section id="industrial-experience-feed">
                <h2>{language === 'en' ? 'Industrial Experience' : '実務経験'}</h2>
                <div className="experience-container">
                    <ExperienceContainer language={language} experienceItems={industrialExperienceItems} />
                </div>
            </section>
        </>
    );
};

export default Home;
