import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css'; // Ensure the path to your CSS file is correct
import portrait from './portrait.jpg'; 
// import newsDB from './news_db.csv'; // Ensure the path to your CSV file is correct
// import experienceDB from './experience.csv'; // Ensure the path to your CSV file is correct
import { parse } from 'papaparse';
import newsItems from './news_db';
import experienceItems from './experience';
import publicationsData from './publication';
import xLogo from './LOGO_x.png';
import linkedInLogo from './LOGO_LI-In.png';
import gitHubLogo from './LOGO_GitHub.png';

const NewsUpdates = ({ currentLanguage }) => {
  // Convert the news items based on the currentLanguage prop
  const localizedNewsItems = newsItems.map(item => ({
    date: item.date,
    link: item.link,
    title: currentLanguage === 'en' ? item.title_en : item.title_ja,
    description: currentLanguage === 'en' ? item.description_en : item.description_ja,
  }));

  return (
    <ul>
      {localizedNewsItems.map((item, index) => (
        <li key={index}>
          <time dateTime={item.date}>{item.date}</time>
          {item.link && (
            <>
              {" - "}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </>
          )}
          {!item.link && item.title && " - " + item.title}
          {item.description && ": " + item.description}
        </li>
      ))}
    </ul>
  );
};

const ExperienceContainer = ({ language }) => {
  return (
    <div className="experience-container">
      <h2>{language === 'en' ? 'Experience' : '経歴'}</h2>
      <ul id="experience-list">
        {experienceItems.map((exp, index) => (
          <li key={index}>
            <time dateTime={exp.start_date}>{exp.start_date}</time> - 
            <time dateTime={exp.end_date}>{exp.end_date ? exp.end_date : 'Present'}</time>
            <strong> {language === 'en' ? exp.title_en : exp.title_ja}</strong> <br/>at {language === 'en' ? exp.institution_en : exp.institution_ja}
            {exp[`description_${language}`] && <p>{exp[`description_${language}`]}</p>}
            {exp.link && <a href={exp.link} target="_blank" rel="noopener noreferrer">More Info</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = ({ language }) => {
  const Profile = () => (
    <section id="profile" className="profile-container">
      <div className="profile-info">
        {language === 'en' ? (
          <>
            <h2>Yuto Motohashi</h2>
            <p>Bachelor in Applied Physics, Engineering, The University of Tokyo until March 2024</p>
            <p>Master of Quantum Engineering, ETH Zurich from September 2024 </p>
            <p>I am Yuto, and am interested in trapped ion quantum computer. Enjoy working on the experimental research in it!</p>
          </>
        ) : (
          <>
            <h2>本橋　悠人</h2>
            <p>東京大学工学部物理工学科を２０２４年３月に卒業</p>
            <p>ETH Zurich, Master of Quantum Engineeringに２０２４年９月から進学</p>
            <p>原子を用いた量子コンピュータ（イオントラップ型）の実現を目指して、実験研究を行っています。過去に行った研究の詳細はpublicationのページをご覧ください。</p>
          </>
        )}
        <h2>{language === 'en' ? 'Contact' : '連絡先'}</h2>
        <p>yuto.motohas__at__gmail.com</p>
        <div className="social-links-container">
          <div className="social-links">
            <a href="https://github.com/YutoMotohashi" target="_blank" rel="noopener noreferrer">
              <img src={gitHubLogo} alt="GitHub: Yuto Motohashi" />
            </a>
            <a href="https://www.linkedin.com/in/yuto-motohashi/" target="_blank" rel="noopener noreferrer">
              <img src={linkedInLogo} alt="LinkedIn: Yuto Motohashi" />
            </a>
            <a href="https://x.com/Yuto_Motohashi" target="_blank" rel="noopener noreferrer">
              <img src={xLogo} alt="X: Yuto Motohashi" />
            </a>
          </div>
        </div>
      </div>
      <div className="profile-photo">
        <img src={portrait} alt="Yuto Motohashi" />
      </div>
    </section>
  );

  return (
    <main>
      <Profile />
      <section id="news-feed">
        <h2>{language === 'en' ? 'Latest Updates' : '最新情報'}</h2>
        <div className="news-container">
          {/* Dynamically populated news items via NewsUpdates component */}
          <NewsUpdates currentLanguage={language} />
        </div>
      </section>
      <section id="experience-feed">
        <div className="experience-container">
          {/* Dynamically populate experience items here */}
          <ExperienceContainer language={language} />
        </div>
      </section>
    </main>
  );
};

const Publications = ({ language }) => (
  <section className="content-section">
    <h2>Publications</h2>
    <ul>
      {publicationsData.map((publication, index) => (
        <li key={index} className="publication-entry">
          <p className="publication-author">{publication.author}</p>
          <p className="publication-title">{publication.title}</p>
          <p className="publication-journal">{publication.journal}</p>
          <p className="publication-date">{publication.date}</p>
          <div className="publication-links">
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
  </section>
);



const CV = ({ language }) => {
  // Assuming you have the PDF stored in your public folder or an accessible path

  const cv_pdf = "/src/CV.pdf";

  return (
    <main>
      <section className="cv-section">
        {/* Display the CV PDF within an iframe */}
        <iframe src={cv_pdf} border="0" style={{width: '100%', height: '500px'}}></iframe>
        {/* Conditional rendering based on the current language */}
        {language === 'en' ? (
          <div className="download-link">
            <a href={cv_pdf} download="CV_Yuto_Motohashi.pdf">Download the CV</a>
          </div>
        ) : (
          <div className="download-link">
            <a href={cv_pdf} download="CV_Yuto_Motohashi.pdf">CVをダウンロード</a>
          </div>
        )}
      </section>
    </main>
  );
};


const App = () => {
  const [language, setLanguage] = useState('en'); // Default language
  const [currentPage, setCurrentPage] = useState('home');

  // Extract language from URL at the start
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlLanguage = queryParams.get('language');
    if (urlLanguage && (urlLanguage === 'en' || urlLanguage === 'ja')) {
      setLanguage(urlLanguage);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home language={language} setLanguage={setLanguage} />;
      case 'publications':
        return <Publications language={language} />;
      case 'cv':
        return <CV language={language} />;
      default:
        return <Home language={language} setLanguage={setLanguage} />;
    }
  };

  return (
    <div>
      <header>
          <nav>
            <ul>
              <li>
                  <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>HOME</button>
              </li>
              <li>
                  <button className={currentPage === 'publications' ? 'active' : ''} onClick={() => setCurrentPage('publications')}>PUBLICATION</button>
              </li>
              <li>
                  <button className={currentPage === 'cv' ? 'active' : ''} onClick={() => setCurrentPage('cv')}>CV</button>
              </li>
            </ul>

            <div className="language-switch">
                <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
                <span>|</span>
                <button className={language === 'ja' ? 'active' : ''} onClick={() => setLanguage('ja')}>JA</button>
            </div>
          </nav>
      </header>


      <main>
        {renderPage()}
      </main>

      <footer>
        <p>© 2024 Yuto Motohashi. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
