
const ComingSoon = () => {
    return (
        <main className="container">
            <section className="coming-soon">
                <h1>Coming Soon</h1>
                <p>Our new feature is on the way! Stay tuned.</p>
            </section>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 70vh;
                }
                .coming-soon {
                    text-align: center;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                h1 {
                    margin: 0 0 20px 0;
                }
                p {
                    font-size: 16px;
                }
            `}</style>
        </main>
    )
}

export default ComingSoon;