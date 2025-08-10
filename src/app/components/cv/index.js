import React from 'react';
import ComingSoon from '@/comingsoon';

function CV({ language }) {
    const cv_pdf = "https://drive.google.com/file/d/171B8DPBi9K2v1HIKnJlxDC0ZLOP0w4Dp/view";
    return (
        <>
            {language === 'en' ? (
                <div className="download-link">
                    <a href={cv_pdf} download="CV_Yuto_Motohashi.pdf">Download my CV from google drive from here (last update: 2025 Aug)</a>
                </div>
            ) : (
                <div className="download-link">
                    <a href={cv_pdf} download="CV_Yuto_Motohashi.pdf">CVをgoogle driveをこちらからダウンロード（最終更新: 2025年08月）</a>
                </div>
            )}
            <style jsx>{`
                .download-link {
                    text-align: center;
                    margin: auto';
                }
            `}</style>
        </>
    )
};

export default CV;
