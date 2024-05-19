import React from 'react';
import styles from "./page.module.css";

function Links({ language }) {
    return (
        <>

            <div className={styles.grid}>
                <a
                    href="https://github.com/YutoMotohashi/study_abroad_memory"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        スイス交換留学の記録 <span>-&gt;</span>
                    </h2>
                    <p>ETH Zurichに一年間交換留学した時に関連する情報はこちら</p>
                </a>
                <a
                    href="https://xplane.jp/enroll2024-1-motohashi/"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        大学院受験記 <span>-&gt;</span>
                    </h2>
                    <p>XPLANEに寄稿した海外大学院受験記はこちら</p>
                </a>
                <a
                    href="https://www.utokyo-ipc.co.jp/ja/story/internship-yanekara-motohashi/"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Yanekaraでのインターン <span>-&gt;</span>
                    </h2>
                    <p>Yanekaraでのエンジニアインターンの時のインタビューはこちら</p>
                </a>

            </div>
        </>
    );
}

export default Links;
