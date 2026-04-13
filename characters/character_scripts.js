/* ================== DOM ================== */
const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const characterHeader = document.getElementById('characterHeader');
const langToggle = document.getElementById('langToggle');

document.getElementById("year").textContent = new Date().getFullYear();

/* ================== CONSTANTS ================== */
const LABELS = {
    name: { ru: 'Имя', en: 'Name' },
    real_name: { ru: 'Реальное имя', en: 'Real Name' },
    birth: { ru: 'День рождения', en: 'Birthday' },
    sex: { ru: 'Пол', en: 'Sex' },
    age: { ru: 'Возраст', en: 'Age' },
    species: { ru: 'Раса', en: 'Species' },
    kind: { ru: 'Вид', en: 'Kind' },
    universe: { ru: 'Родная вселенная', en: 'Native universe' },
    worldview: { ru: 'Мировоззрение', en: 'Worldview' },
    cr_data: { ru: 'Дата создания', en: 'Date of creation' },
    theme: { ru: 'Музыкальная тема', en: 'Musical theme' },

    physical_power: { ru: 'Физическая сила', en: 'Physical power' },
    magical_power: { ru: 'Магическая сила', en: 'Magic power' },
    program_power: { ru: 'Программная сила', en: 'Program power' },
    physical_stamina: { ru: 'Физ. выносливость', en: 'Physical stamina' },
    mental_stamina: { ru: 'Псих. выносливость', en: 'Mental stamina' },
    speed: { ru: 'Скорость', en: 'Speed' },
    intelligence: { ru: 'Интеллект', en: 'Intelligence' },
    strategic_vision: { ru: 'Стратег. мышление', en: 'Strategic vision' },
    empathy: { ru: 'Эмпатия', en: 'Empathy' },
    mental_stability: { ru: 'Псих. устойчивость', en: 'Mental stability' }
};
const CHOOSE_TRANSLATIONS = {
    sex: {
        man: { ru: 'Мужской', en: 'Man' },
        woman: { ru: 'Женский', en: 'Woman' },
        androgyne: { ru: 'Андрогин', en: 'Androgyne' },
        asexual: { ru: 'Бесполый', en: 'Asexual' }
    },
    species: {
        human: { ru: 'Человек', en: 'Human' },
        monster: { ru: 'Монстр', en: 'Monster' },
        energy: { ru: 'Энергия', en: 'Energy' },
        program: { ru: 'Программа', en: 'Program' },
        glitch: { ru: 'Глюк', en: 'Glitch' },
        virus: { ru: 'Вирус', en: 'Virus' },
        error: { ru: 'Ошибка', en: 'Error' },
        player: { ru: 'Игрок', en: 'Player' },
        amalgamate: { ru: 'Амальгамет', en: 'Amalgamate' },
        undefined: { ru: 'Не определено', en: 'Undefined' }
    }
};
const MONTHS = {
    ru: [
        'января','февраля','марта','апреля','мая','июня',
        'июля','августа','сентября','октября','ноября','декабря'
    ],
    en: [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
    ]
};

/* ================== HELPERS ================== */
function formatDate(dateStr, lang) {
    const parts = dateStr.split('.');
    if (parts.length < 2) return dateStr;
    const monthIdx = +parts[1] - 1;
    const monthName = MONTHS[lang]?.[monthIdx];
    if (monthName == null) return dateStr;
    return `${parts[0]} ${monthName}${parts[2] ? ' ' + parts[2] : ''}`;
}

async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`JSON load failed ${res.status}: ${res.url}`);
    return res.json();
}

async function loadArticle(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Article load failed ${res.status}: ${res.url}`);
    return res.text();
}

/* ================== CHARACTER LOADING (cached) ================== */
let chrSchema = null;
let infoData = null;
let characterArticle = { ru: '', en: '' };

let loadPromise = null;

function ensureCharacterData() {
    if (!loadPromise) {
        loadPromise = (async () => {
            const [schema, info] = await Promise.all([
                loadJSON('../chr_prms.json'),
                loadJSON('./info.json')
            ]);
            chrSchema = schema;
            infoData = info;
            characterHeaderEN = info.data.en_name;
            characterHeaderRU = info.data.ru_name;

            const art = info.data.article;
            if (art?.ru) characterArticle.ru = await loadArticle(art.ru);
            if (art?.en) characterArticle.en = await loadArticle(art.en);
        })();
    }
    return loadPromise;
}

/* ================== INFOBOX THEME ================== */
const INFOBOX_THEME_PROPS = [
    '--ib-bg', '--ib-border', '--ib-section-border', '--ib-label', '--ib-text', '--ib-heading',
    '--ib-img-border', '--ib-img-bg', '--ib-link', '--ib-tooltip-bg', '--ib-tooltip-border',
    '--ib-tooltip-text', '--ib-tooltip-underline', '--ib-bar-track', '--ib-bar-grid'
];

function applyInfoboxTheme(theme) {
    const box = document.getElementById('infobox');
    if (!box) return;

    INFOBOX_THEME_PROPS.forEach((p) => box.style.removeProperty(p));
    box.classList.remove('infobox--themed');

    if (!theme || typeof theme !== 'object') return;

    const { accent, accent2, background, muted } = theme;
    if (!accent && !accent2 && !background && !muted) return;

    box.classList.add('infobox--themed');

    if (background) {
        box.style.setProperty('--ib-bg', background);
        box.style.setProperty('--ib-img-bg', `color-mix(in srgb, ${background} 72%, #000)`);
        box.style.setProperty('--ib-tooltip-bg', `color-mix(in srgb, ${background} 88%, #000)`);
        box.style.setProperty('--ib-bar-track', `color-mix(in srgb, ${background} 48%, #000)`);
    }
    if (accent) {
        box.style.setProperty('--ib-heading', accent);
        box.style.setProperty('--ib-link', accent);
    }
    if (accent2) {
        box.style.setProperty('--ib-text', accent2);
    }
    if (muted) {
        box.style.setProperty('--ib-border', muted);
        box.style.setProperty('--ib-section-border', muted);
        box.style.setProperty('--ib-label', muted);
        box.style.setProperty('--ib-img-border', muted);
        box.style.setProperty('--ib-tooltip-border', muted);
        box.style.setProperty('--ib-tooltip-underline', muted);
        box.style.setProperty('--ib-bar-grid', `color-mix(in srgb, ${muted} 42%, transparent)`);
    }
}

/* ================== COLORS ================== */
function getBarColor(val) {
    if (val === 0) return '#ffffff';
    if (val <= 3) return '#e74c3c';
    if (val <= 5) return '#e67e22';
    if (val <= 7) return '#ffff00';
    if (val <= 10) return '#2ecc71';
    return 'rainbow';
}

/* ================== RENDER ================== */
async function renderInfobox(lang = 'ru') {
    await ensureCharacterData();

    const box = document.getElementById('infobox');
    applyInfoboxTheme(infoData.data.infobox);
    box.innerHTML = '';

    const character = {
        img: infoData.data.img,
        parameters: infoData.parameters
    };

    renderCharacterImage(
        box,
        character.img,
        lang === 'ru' ? characterHeaderRU : characterHeaderEN
    );

    renderSection(box, 'Биография', chrSchema.parameters.biography, character.parameters.biography, lang);
    renderSection(box, 'Информация', chrSchema.parameters.information, character.parameters.information, lang);
    renderValues(box, chrSchema.parameters.values, character.parameters.values, lang);
}

function renderCharacterImage(parent, imgName, altText) {
    if (!imgName) return;

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'infobox-image';

    const img = document.createElement('img');
    img.src = `../../images/characters/${imgName}`;
    img.alt = altText || '';
    img.loading = 'lazy';

    imgWrapper.appendChild(img);
    parent.appendChild(imgWrapper);
}

/**
 * Изолирует float у .text-image внутри коротких блоков, чтобы следующий заголовок
 * не прилипал к чужой картинке. Обёртка с flow-root только на сегмент статьи, не на
 * весь article — текст снова может заходить под инфобокс ниже по колонке.
 */
function wrapArticleFloatSections(articleEl) {
    if (!articleEl) return;
    let img;
    while ((img = articleEl.querySelector('img.text-image:not(.article-float-wrap img)'))) {
        const wrap = document.createElement('div');
        wrap.className = 'article-float-wrap';
        img.parentNode.insertBefore(wrap, img);
        let node = img;
        while (node) {
            const cur = node;
            node = cur.nextSibling;
            wrap.appendChild(cur);
            if (!node) break;
            if (node.nodeType === Node.ELEMENT_NODE && /^H[234]$/i.test(node.tagName)) break;
        }
    }
}

async function renderArticle(lang = 'ru') {
    await ensureCharacterData();
    const article = document.getElementById('Article');
    article.innerHTML = characterArticle[lang] || '';
    wrapArticleFloatSections(article);
}

/* ================== NORMALIZATION ================== */
function normalizeValueBars(section) {
    const bars = section.querySelectorAll('.value-bar');
    let minWidth = Infinity;

    bars.forEach(bar => {
        const w = bar.getBoundingClientRect().width;
        if (w < minWidth) minWidth = w;
    });

    bars.forEach(bar => {
        bar.style.width = `${minWidth}px`;
    });
}

/* ================== SECTIONS ================== */
function renderSection(parent, title, schemaBlock, dataBlock, lang) {
    const section = document.createElement('div');
    section.className = 'infobox-section';

    const h = document.createElement('h3');
    if (title === 'Биография') h.textContent = lang === 'ru' ? 'Биография' : 'Biography';
    if (title === 'Информация') h.textContent = lang === 'ru' ? 'Информация' : 'Information';
    section.appendChild(h);

    for (const key in dataBlock) {
        const value = dataBlock[key];
        if (!value) continue;

        const schema = schemaBlock[key];
        if (!schema) continue;

        const row = document.createElement('div');
        row.className = 'infobox-row';

        const label = document.createElement('div');
        label.className = 'infobox-label';
        label.textContent = LABELS[key]?.[lang] || key;

        if (schema.tag?.[lang]) {
            label.classList.add('tooltip');
            label.dataset.tooltip = schema.tag[lang];
        }

        const val = document.createElement('div');
        val.className = 'infobox-value';

        if (schema.class === 'date') {
            val.textContent = formatDate(value, lang);
        }
        else if (schema.class === 'choose') {
            const translated = CHOOSE_TRANSLATIONS[key]?.[value]?.[lang] || value;
            const tooltip = schema.variants?.[value]?.[lang];

            if (tooltip) {
                val.innerHTML = `<span class="tooltip" data-tooltip="${tooltip}">${translated}</span>`;
            } else {
                val.textContent = translated;
            }
        }
        else if (schema.class === 'link-text') {
            const match = value.match(/^\[([^|]+)\|(.+)]$/);
            if (match) {
                const text = match[1].trim();
                const url = match[2].trim();

                const a = document.createElement('a');
                a.href = url;
                a.textContent = text;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.style.color = "var(--ib-link, #fbff00)";
                a.style.textDecoration = "underline";

                val.appendChild(a);
            } else {
                val.textContent = value;
            }
        }
        else {
            val.textContent = value?.[lang] || value;
        }

        row.append(label, val);
        section.appendChild(row);
    }

    if (section.children.length > 1) parent.appendChild(section);
}

/* ================== VALUES ================== */
function renderValues(parent, schema, data, lang) {
    const section = document.createElement('div');
    section.className = 'infobox-section';

    const header = document.createElement('h3');
    header.textContent = lang === 'ru' ? 'Параметры' : 'Parameters';
    section.appendChild(header);

    for (const key of Object.keys(data)) {
        const val = data[key];
        const meta = schema[key] || {};
        const color = getBarColor(val);

        const row = document.createElement('div');
        row.className = 'infobox-row';

        const label = document.createElement('div');
        label.className = 'infobox-label';
        label.textContent = LABELS?.[key]?.[lang] || key;

        if (meta[lang]) {
            label.classList.add('tooltip');
            label.dataset.tooltip = meta[lang];
        }

        const valueBox = document.createElement('div');
        valueBox.className = 'infobox-value';

        const bar = document.createElement('div');
        bar.className = 'value-bar tooltip';
        bar.dataset.tooltip = val > 10 ? '??? / 10' : `${val} / 10`;

        if (val === 0) {
            bar.classList.add('value-bar--zero');
        }
        if (color === 'rainbow') {
            bar.classList.add('rainbow-bar');
        }

        const fill = document.createElement('span');
        fill.style.width = `${Math.min(val, 10) * 10}%`;

        if (color === 'rainbow') {
            fill.classList.add('rainbow-fill');
        } else if (val !== 0) {
            fill.style.backgroundColor = color;
        }

        bar.appendChild(fill);
        valueBox.appendChild(bar);
        row.append(label, valueBox);
        section.appendChild(row);
    }

    parent.appendChild(section);
    requestAnimationFrame(() => normalizeValueBars(section));
}

/* ================== LANGUAGE ================== */
let characterHeaderEN = '';
let characterHeaderRU = '';

let currentLang = getStoredLang();

async function applyLanguageUI() {
    const langCode = currentLang === 'RU' ? 'ru' : 'en';
    await renderInfobox(langCode);
    await renderArticle(langCode);
}

(async function initCharacterPage() {
    try {
        await ensureCharacterData();
        characterHeader.textContent = currentLang === 'RU' ? characterHeaderRU : characterHeaderEN;
        langToggle.textContent = currentLang === 'RU' ? 'EN' : 'RU';
        await applyLanguageUI();
    } catch (err) {
        console.error('Character page load failed:', err);
    }
})();

langToggle.addEventListener('click', async () => {
    try {
        if (currentLang === 'RU') {
            characterHeader.textContent = characterHeaderEN;
            langToggle.textContent = 'RU';
            currentLang = 'EN';
        } else {
            characterHeader.textContent = characterHeaderRU;
            langToggle.textContent = 'EN';
            currentLang = 'RU';
        }
        setStoredLang(currentLang);
        await applyLanguageUI();
    } catch (err) {
        console.error('Language switch failed:', err);
    }
});

/* ================== OVERLAY ================== */
minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});
