const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const contentsHeader = document.getElementById('contentsHeader');
const tocContainer = document.getElementById('toc');
document.getElementById("year").textContent = new Date().getFullYear();

let currentLang = 'RU';

const headerRU = `Оглавление`;
const headerEN = `Contents`;

async function loadTOC() {
    const res = await fetch('contents_names.json');
    const data = await res.json();
    renderTOC(data);
}

function renderTOC(languageData) {
    tocContainer.innerHTML = '';

    const seasonNames = Object.keys(languageData);
    seasonNames.forEach((season, index) => {
        if (index > 0) {
            const divider = document.createElement('hr');
            divider.className = 'divider';
            tocContainer.appendChild(divider);
        }

        const seasonBlock = document.createElement('div');
        seasonBlock.className = 'season-block';

        // Заголовок сезона (до / — русский, после / — английский)
        const seasonTitle = document.createElement('h2');
        seasonTitle.textContent = getLocalized(season);
        seasonBlock.appendChild(seasonTitle);

        const arcs = languageData[season];

        if (Array.isArray(arcs)) {
            // Если это массив историй
            if (!arcs.length) {
                seasonBlock.appendChild(createDashEntry());
            } else {
                arcs.forEach(entry => {
                    seasonBlock.appendChild(
                        Object.keys(entry).length ? createEntry(entry) : createDashEntry()
                    );
                });
            }
        } else {
            // Если это объект арок
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
                            Object.keys(entry).length ? createEntry(entry) : createDashEntry()
                        );
                    });
                }
            }
        }

        tocContainer.appendChild(seasonBlock);
    });
}

function createEntry(entry) {
    const div = document.createElement('div');
    div.className = 'entry';

    // Заголовок истории
    const name = document.createElement('strong');
    name.textContent = currentLang === "RU" ? (entry.name_ru || '—') : (entry.name_en || '—');
    div.appendChild(name);

    // Определяем список частей и ссылок
    let parts, urls;

    if ("parts_ru" in entry || "parts_en" in entry) {
        parts = currentLang === "RU" ? (entry.parts_ru || []) : (entry.parts_en || []);
    } else {
        parts = entry.parts || entry.chapters || [];
    }

    urls = currentLang === "RU" ? (entry.urls_ru || []) : (entry.urls_en || []);

    if (parts.length && urls.length) {
        const list = document.createElement('ul');
        parts.forEach((part, i) => {
            const li = document.createElement('li');
            const url = urls[i] ?? "";

            if (url && url.trim() !== "") {
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.textContent = part ?? `Part ${i + 1}`;
                li.appendChild(a);
            } else {
                // Если ссылка пустая, показываем просто текст
                li.textContent = part ?? `Part ${i + 1}`;
            }

            list.appendChild(li);
        });
        div.appendChild(list);
    } else {
        // если нет частей или ссылок — прочерк
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
        contentsHeader.textContent = headerEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
        loadTOC();
    } else {
        contentsHeader.textContent = headerRU;
        langToggle.textContent = 'EN';
        currentLang = 'RU';
        loadTOC();
    }
});

loadTOC();

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});

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