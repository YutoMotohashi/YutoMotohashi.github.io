import React from 'react';
import ComingSoon from '@/comingsoon';

function CV({ language }) {
    const cv_pdf = "https://drive.google.com/file/d/171B8DPBi9K2v1HIKnJlxDC0ZLOP0w4Dp/view";
    return (
        <>
            // <ComingSoon />
            {language === 'en' ? (
                <div className="download-link">
                    <a href={cv_pdf} download="CV_Yuto_Motohashi.pdf">Download my CV from google drive</a>
                </div>
            ) : (
                <div className="download-link">
                    <a href={cv_pdf} download="CV_Yuto_Motohashi.pdf">CVをgoogle driveからダウンロード</a>
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
