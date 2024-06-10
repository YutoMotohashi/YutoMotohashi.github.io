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
                        ETH Zurichへの交換留学　<span>-&gt;</span>
                    </h2>
                    <p>学士課程中にETH Zurich &lt; = &gt; 東京大学で一年間交換留学した時の情報はこちら</p>
                </a>
                <a
                    href="https://funaifoundation.jp/grantee.php?id=507&type=phd"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Funai Overseas Scholarship 報告書　<span>-&gt;</span>
                    </h2>
                    <p>大学院留学を支援いただいている、船井情報科学振興財団のサイトに、奨学生としての報告書を公開しています</p>
                </a>
                <a
                    href="https://xplane.jp/enroll2024-1-motohashi/"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        大学院受験記　<span>-&gt;</span>
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
                        Yanekaraでのインターン　<span>-&gt;</span>
                    </h2>
                    <p>Yanekaraでのエンジニアインターンの時のインタビューはこちら</p>
                </a>

            </div>
        </>
    );
}

export default Links;
