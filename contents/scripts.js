const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const contentsTitle = document.getElementById('contentsTitle');
const tocContainer = document.getElementById('toc');
document.getElementById("year").textContent = new Date().getFullYear();

let currentLang = getStoredLang();
langToggle.textContent = currentLang === 'RU' ? 'EN' : 'RU';

/** @type {object | null} */
let tocDataCache = null;

async function loadTOC() {
    if (!tocDataCache) {
        const res = await fetch('contents_names.json');
        if (!res.ok) {
            console.error('Не удалось загрузить contents_names.json');
            return;
        }
        tocDataCache = await res.json();
    }
    renderTOC(tocDataCache);
}

function isPlaceholder(entry) {
    if (!entry || typeof entry !== 'object') return true;
    if (entry.placeholder === true) return true;
    return Object.keys(entry).length === 0;
}

function updateLanguageAssets() {
    if (!contentsTitle) return;

    const src = currentLang === 'RU'
        ? contentsTitle.dataset.srcRu
        : contentsTitle.dataset.srcEn;

    if (src) {
        contentsTitle.src = src;
    }
}

function renderTOC(languageData) {
    tocContainer.innerHTML = '';

    const seasonNames = Object.keys(languageData).filter((k) => !k.startsWith('$'));
    seasonNames.forEach((season, index) => {
        if (index > 0) {
            const divider = document.createElement('hr');
            divider.className = 'divider';
            tocContainer.appendChild(divider);
        }

        const seasonBlock = document.createElement('div');
        seasonBlock.className = 'season-block';

        const seasonTitle = document.createElement('h2');
        seasonTitle.textContent = getLocalized(season);
        seasonBlock.appendChild(seasonTitle);

        const arcs = languageData[season];

        if (Array.isArray(arcs)) {
            if (!arcs.length) {
                seasonBlock.appendChild(createDashEntry());
            } else {
                arcs.forEach(entry => {
                    seasonBlock.appendChild(
                        isPlaceholder(entry) ? createDashEntry() : createEntry(entry)
                    );
                });
            }
        } else {
            for (const arc in arcs) {
                const arcTitle = document.createElement('h3');
                arcTitle.textContent = getLocalized(arc);
                seasonBlock.appendChild(arcTitle);

                const entries = arcs[arc];
                if (!entries.length) {
                    seasonBlock.appendChild(createDashEntry());
                } else {
                    entries.forEach(entry => {
                        seasonBlock.appendChild(
                            isPlaceholder(entry) ? createDashEntry() : createEntry(entry)
                        );
                    });
                }
            }
        }

        tocContainer.appendChild(seasonBlock);
    });
}

/**
 * @param {object} entry
 * @returns {{ parts: (number|string)[], urls: string[] }}
 */
function getPartsAndUrls(entry) {
    const parts = currentLang === "RU" ? (entry.parts_ru || []) : (entry.parts_en || []);
    const urls = currentLang === "RU" ? (entry.urls_ru || []) : (entry.urls_en || []);
    return { parts, urls };
}

function createEntry(entry) {
    const div = document.createElement('div');
    div.className = 'entry';

    const titleText = currentLang === "RU" ? (entry.name_ru || '—') : (entry.name_en || '—');
    const { parts, urls } = getPartsAndUrls(entry);
    const firstUrl = urls[0] && String(urls[0]).trim();

    const isSingleLinked = parts.length === 1 && firstUrl;

    if (isSingleLinked) {
        const a = document.createElement('a');
        a.href = firstUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'entry-title-link';
        a.textContent = titleText;
        div.appendChild(a);
        return div;
    }

    const name = document.createElement('strong');
    name.className = 'entry-title';
    name.textContent = titleText;
    div.appendChild(name);

    if (parts.length && urls.length) {
        const list = document.createElement('ul');
        parts.forEach((part, i) => {
            const li = document.createElement('li');
            const url = urls[i] ?? "";

            if (url && String(url).trim() !== "") {
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'entry-chapter-link';
                a.textContent = part ?? `Part ${i + 1}`;
                li.appendChild(a);
            } else {
                li.textContent = part ?? `Part ${i + 1}`;
            }

            list.appendChild(li);
        });
        div.appendChild(list);
    } else {
        const dash = document.createElement('div');
        dash.className = 'dash-entry';
        dash.textContent = '–';
        div.appendChild(dash);
    }

    return div;
}

function createDashEntry() {
    const dash = document.createElement('div');
    dash.textContent = '—';
    dash.className = 'dash-entry';
    return dash;
}

function getLocalized(text) {
    if (!text.includes("/")) return text;
    const [ru, en] = text.split("/");
    return currentLang === "RU" ? ru : en;
}
langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        langToggle.textContent = 'EN';
        currentLang = 'RU';
    }
    setStoredLang(currentLang);
    updateLanguageAssets();
    loadTOC();
});

updateLanguageAssets();
loadTOC();

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});
