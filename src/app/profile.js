import React from 'react';
import Image from "next/image";
import gitHubLogo from "./data/LOGO_GitHub.png";
import linkedInLogo from "./data/LOGO_LI-In.png";
import xLogo from "./data/LOGO_x.png";
import portrait from "./data/portrait.jpg";

import profile from "./profile.module.css";

function Profile({ language }) {
    return (<>
        <section id="profile" className={profile.profileContainer}>
            <div id="profileInfo" className={profile.profileInfo}>
                {language === 'en' ? (
                    <>
                        <h2>Yuto Motohashi</h2>
                        <p>Bachelor in Applied Physics, Engineering, The University of Tokyo until March 2024</p>
                        <p>Master of Quantum Engineering, ETH Zurich from September 2024 </p>
                        <p>Funai Overseas Scholarship</p>
                        <p>I am Yuto, and am interested in trapped ion quantum computer. Enjoy working on the experimental research in it!</p>
                    </>
                ) : (
                    <>
                        <h2>本橋　悠人</h2>
                        <p>東京大学工学部物理工学科を2024年3月に卒業</p>
                        <p>ETH Zurich, Master of Quantum Engineeringに2024年9月から進学</p>
                        <p>原子を用いた量子コンピュータ（イオントラップ型）の実現を目指して、実験研究を行っています。</p>
                        <p>船井情報科学振興財団奨学生</p>
                        <p>過去に行った研究の詳細はpublicationのページをご覧ください。</p>
                    </>
                )}
                <h3>{language === 'en' ? 'Contact' : '連絡先'}</h3>
                <p>ymotohashi__at__ethz.ch</p>
                <div id="sociallinkbox" className={profile.socialLinksContainer}>
                    <div id="sociallinks" className={profile.socialLinks}>
                    <SocialLink />
                    </div>  
                </div>
            </div>
            <div className={profile.profilePhoto}>
                <Image src={portrait} alt="Yuto Motohashi" />
            </div>
        </section>
    </>)
}

function SocialLink() {
    return (
        <>
            <a href="https://github.com/YutoMotohashi" target="_blank" rel="noopener noreferrer">
                <Image className={profile.logoImage} src={gitHubLogo} alt="GitHub: Yuto Motohashi" />
            </a>
            <a href="https://www.linkedin.com/in/yuto-motohashi/" target="_blank" rel="noopener noreferrer">
                <Image className={profile.logoImage} src={linkedInLogo} alt="LinkedIn: Yuto Motohashi" />
            </a>
            <a href="https://x.com/Yuto_Motohashi" target="_blank" rel="noopener noreferrer">
                <Image className={profile.logoImage} src={xLogo} alt="X: Yuto Motohashi" />
            </a>
        </>
    )
}


export default Profile;
