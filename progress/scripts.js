const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const progressTitle = document.getElementById('progressTitle');
const langToggle = document.getElementById('langToggle');

document.getElementById("year").textContent = new Date().getFullYear();

let currentLang = 'RU';

async function loadProgress() {
    const res = await fetch('progress.json');
    const data = await res.json();
    renderProgress(data);
}

function updateLanguageAssets() {
    if (!progressTitle) return;

    const src = currentLang === 'RU'
        ? progressTitle.dataset.srcRu
        : progressTitle.dataset.srcEn;

    if (src) {
        progressTitle.src = src;
    }
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

updateLanguageAssets()
loadProgress();

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        langToggle.textContent = 'EN';
        currentLang = 'RU';
    }
    updateLanguageAssets()
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

document.addEventListener("DOMContentLoaded", () => {
    const bgImage = new Image();
    bgImage.src = "../images/CHAOTICVERSE_1.webp";

    bgImage.onload = () => {
        const aspectRatio = bgImage.height / bgImage.width; // высота / ширина картинки
        const resizableDiv = document.querySelector("#backgroundHeight");

        function resizeDiv() {
            const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
            let newWidth, newHeight, backgroundSize;

            if (isMobile) {
                backgroundSize = "auto 100%";
                newHeight = window.innerHeight;
                newWidth = newHeight / aspectRatio;
            } else {
                backgroundSize = "100% auto";
                newWidth = window.innerWidth;
                newHeight = newWidth * aspectRatio;
            }
            resizableDiv.style.backgroundSize = backgroundSize
            resizableDiv.style.width = `${newWidth}px`;
            resizableDiv.style.height = `${newHeight}px`;
        }

        resizeDiv();
        window.addEventListener("resize", resizeDiv);
    };
});