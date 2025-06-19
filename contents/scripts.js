const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const tocContainer = document.getElementById('toc');

let currentLang = 'RU';

async function loadTOC() {
    const res = await fetch('contents_names.json');
    const data = await res.json();
    renderTOC(data[currentLang.toLowerCase()]);
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

        const seasonTitle = document.createElement('h2');
        seasonTitle.textContent = season;
        seasonBlock.appendChild(seasonTitle);

        const arcs = languageData[season];
        if (Array.isArray(arcs)) {
            arcs.forEach(entry => {
                seasonBlock.appendChild(
                    Object.keys(entry).length ? createEntry(entry) : createDashEntry()
                );
            });
        } else {
            for (const arc in arcs) {
                const arcTitle = document.createElement('h3');
                arcTitle.textContent = arc;
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

    const name = document.createElement('strong');
    name.innerHTML = entry.name || '—';
    div.appendChild(name);

    const parts = entry.parts || entry.chapters || [];
    const urls = entry.urls || [];

    if (parts.length && urls.length) {
        const list = document.createElement('ul');
        urls.forEach((url, i) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.textContent = parts[i] ?? `Part ${i + 1}`;
            li.appendChild(a);
            list.appendChild(li);
        });
        div.appendChild(list);
    } else {
        // если есть имя, но parts/chapter пустой — вставляем прочерк
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

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        langToggle.textContent = 'RU';
        currentLang = 'EN';
        loadTOC();
    } else {
        langToggle.textContent = 'EN';
        currentLang = 'RU';
        loadTOC();
    }
});

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});

loadTOC();