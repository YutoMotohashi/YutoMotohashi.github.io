// Global variable for current language
let currentLanguage = 'en'; // 'en' for English or 'jp' for Japanese

// Function to parse CSV data
function parseCSV(text) {
    // Normalize line breaks and split the input text into rows
    const rows = text.trim().split(/\r?\n/);
    return rows.map(row => {
        // Account for commas in quotes
        const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        return values.map(value => value.trim().replace(/^"|"$/g, ''));
    });
}

// Function to load and display news updates from the CSV file

// Function to load and display news updates from the CSV file
function loadNewsUpdates() {
    fetch('news_db.csv') // Make sure this is the correct path
        .then(response => response.text())
        .then(parseCSV)
        .then((rows) => {
            const listElement = document.getElementById('news-list');
            listElement.innerHTML = ''; // Clear existing news items

            // Skip the header row and process data rows
            rows.slice(1).forEach(row => {
                const [date, link, title_en, description_en, title_jp, description_ja] = row;
                const title = currentLanguage === 'en' ? title_en : title_jp;
                const description = currentLanguage === 'en' ? description_en : description_ja;

                // Proceed only if the title and description for the current language are present
                if (title && description) {
                    const listItem = document.createElement('li');
                    const content = link ? 
                        `<time datetime="${date}">${date}</time> - <a href="${link}" target="_blank">${title}</a> : ${description}` :
                        `<time datetime="${date}">${date}</time> - ${title} : ${description}`;
                    listItem.innerHTML = content;
                    listElement.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error loading news updates:', error));
}



// Function to load and display experience entries from the CSV file
function loadExperience() {
    fetch('experience.csv') // Make sure this is the correct path
        .then(response => response.text())
        .then(parseCSV)
        .then((rows) => {
            const listElement = document.getElementById('experience-list');
            listElement.innerHTML = ''; // Clear existing items

            // Skip the header row and process data rows
            rows.slice(1).forEach(row => {
                const [index, start_date, end_date, institution, title, description, link] = row;

                // Create list item for each experience entry
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <time datetime="${start_date}">${start_date}</time> - 
                    <time datetime="${end_date}">${end_date}</time>
                    <strong>${title}</strong> \<br>at ${institution}
                    <p>${description}</p>
                    ${link ? `<a href="${link}" target="_blank">More Info</a>` : ''}
                `;
                listElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading experience entries:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    const enBtn = document.getElementById('en-btn');
    const jpBtn = document.getElementById('jp-btn');
    const enContent = document.getElementById('en-content');
    const jpContent = document.getElementById('jp-content');

    // Function to update active language and button styles
    function updateActiveLanguage(lang) {
        currentLanguage = lang;
        if (lang === 'en') {
            enContent.style.display = 'block';
            jpContent.style.display = 'none';
            enBtn.classList.add('active');
            jpBtn.classList.remove('active');
        } else {
            enContent.style.display = 'none';
            jpContent.style.display = 'block';
            enBtn.classList.remove('active');
            jpBtn.classList.add('active');
        }
        loadNewsUpdates(); // Reload news updates after language switch

    }

    // Event listeners for the language buttons
    enBtn.addEventListener('click', () => updateActiveLanguage('en'));
    jpBtn.addEventListener('click', () => updateActiveLanguage('jp'));

    // Set the initial language
    updateActiveLanguage(currentLanguage);
    loadExperience();
});
