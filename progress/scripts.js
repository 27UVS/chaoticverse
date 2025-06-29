const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const progressHeader = document.getElementById('progressHeader');

let currentLang = 'RU';

const headerRU = `Прогресс`;
const headerEN = `Progress`;

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        progressHeader.textContent = headerEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        progressHeader.textContent = headerRU;
        langToggle.textContent = 'EN';
        currentLang = 'RU';
    }
    loadProgress();
});

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});

const progressContainer = document.getElementById('progressContainer');

const sectionTitles = {
    pr: { RU: "Пролог", EN: "Prologue" },
    fr: { RU: "Сезон 1", EN: "Season 1" },
    sc: { RU: "Сезон 2", EN: "Season 2" },
    tr: { RU: "Сезон 3", EN: "Season 3" },
    fh: { RU: "Сезон 4", EN: "Season 4" }
};

const barTitles = {
    pl: { RU: "Сюжет", EN: "Plot" },
    scp: { RU: "Сценарии", EN: "Scripts" },
    cmc: { RU: "Комиксы", EN: "Comics" },
    tx: { RU: "Текст", EN: "Text" }
};

async function loadProgress() {
    const res = await fetch('progress.json');
    const data = await res.json();
    renderProgress(data);
}

function renderProgress(data) {
    progressContainer.innerHTML = '';

    let firstSection = true;
    for (const sectionKey in data) {
        if (!firstSection) {
            const divider = document.createElement('hr');
            divider.className = 'divider';
            progressContainer.appendChild(divider);
        } else {
            firstSection = false;
        }

        const sectionData = data[sectionKey];
        const sectionTitle = sectionTitles[sectionKey][currentLang];

        const sectionBlock = document.createElement('div');
        sectionBlock.className = 'progress-section';

        const sectionHeader = document.createElement('h2');
        sectionHeader.textContent = sectionTitle;
        sectionBlock.appendChild(sectionHeader);

        for (const barKey in sectionData) {
            const value = sectionData[barKey];
            const barTitle = barTitles[barKey][currentLang];

            let percent;
            if (Array.isArray(value)) {
                percent = Math.round((value[0] / value[1]) * 100);
            } else {
                percent = value;
            }

            const barContainer = document.createElement('div');
            barContainer.className = 'progress-bar-container';

            const barLabel = document.createElement('div');
            barLabel.className = 'progress-bar-label';
            barLabel.textContent = `${barTitle}: ${percent}%`;

            const bar = document.createElement('div');
            bar.className = 'progress-bar';
            if (barKey === 'pl') {
                bar.classList.add('plot');
            } else if (barKey === 'scp') {
                bar.classList.add('scripts');
            } else if (barKey === 'cmc') {
                bar.classList.add('comics');
            } else if (barKey === 'tx') {
                bar.classList.add('text');
            }
            bar.style.width = `${percent}%`;

            barContainer.appendChild(barLabel);
            barContainer.appendChild(bar);
            sectionBlock.appendChild(barContainer);
        }

        progressContainer.appendChild(sectionBlock);
    }
}

loadProgress();
