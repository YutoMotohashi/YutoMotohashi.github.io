import Image from 'next/image';
import Link from 'next/link';
import gitHubLogo from '../../data/LOGO_GitHub.png';
import linkedInLogo from '../../data/LOGO_LI-In.png';
import xLogo from '../../data/LOGO_x.png';
import orcidLogo from '../../data/ORCID-iD_icon_32x32.png';
import portrait from '../../data/portrait.jpg';
import styles from './profile.module.css';

const socialLinks = [
  { href: 'https://orcid.org/0009-0008-9148-5088', image: orcidLogo, label: 'ORCID' },
  { href: 'https://github.com/YutoMotohashi', image: gitHubLogo, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yuto-motohashi/', image: linkedInLogo, label: 'LinkedIn' },
  { href: 'https://x.com/Yuto_Motohashi', image: xLogo, label: 'X' },
];

export default function Profile({ language }) {
  return (
    <section id="profile" className={styles.profileContainer} aria-labelledby="profile-heading">
      <div className={styles.profileInfo}>
        <h1 id="profile-heading">{language === 'en' ? 'Yuto Motohashi' : '本橋 悠人'}</h1>
        <p className={styles.role}>
          {language === 'en'
            ? 'MSc student in Quantum Engineering at ETH Zurich, since September 2024.'
            : 'ETH Zurich 量子工学修士課程（2024年9月入学）'}
        </p>
        <p className={styles.interest}>
          {language === 'en'
            ? 'Interested in trapped-ion quantum computing and working on experimental research.'
            : 'イオントラップ型量子コンピュータの実現を目指して、実験研究を行っています。'}
        </p>
        <div className={styles.background}>
          <p>{language === 'en'
            ? 'Master’s thesis research at Stanford University, started January 2026.'
            : 'スタンフォード大学での修士論文研究（2026年1月開始）'}</p>
          <p>{language === 'en'
            ? 'Bachelor of Engineering in Applied Physics, The University of Tokyo.'
            : '東京大学工学部物理工学科卒業'}</p>
          <p>{language === 'en' ? 'Funai Overseas Scholarship recipient.' : '船井情報科学振興財団奨学生'}</p>
          {language === 'ja' ? (
            <p>過去の研究の詳細は<Link href="/publication?language=ja" className={styles.profileLink}>Publications</Link>のページをご覧ください。</p>
          ) : null}
        </div>
        <div className={styles.contact}>
          <h2>{language === 'en' ? 'Contact' : '連絡先'}</h2>
          <div className={styles.contactLinks}>
            <a className={styles.email} href="mailto:ymotohashi@ethz.ch">ymotohashi@ethz.ch</a>
            <ul className={styles.socialLinks} aria-label={language === 'en' ? 'Social profiles' : 'プロフィールリンク'}>
              {socialLinks.map(({ href, image, label }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Image src={image} alt="" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.profilePhoto}>
        <Image
          src={portrait}
          alt={language === 'en' ? 'Portrait of Yuto Motohashi' : '本橋悠人の写真'}
          priority
          sizes="(max-width: 600px) 176px, (max-width: 900px) 240px, 288px"
        />
      </div>
    </section>
  );
}
