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
    return `${parts[0]} ${MONTHS[lang][+parts[1] - 1]}${parts[2] ? ' ' + parts[2] : ''}`;
}

/// Загрузка json файла ///
async function loadJSON(path) {
    const res = await fetch(path);
    return await res.json();
}

async function loadArticle(path) {
    const res = await fetch(path);
    return await res.text();
}

/* ================== CHARACTER LOADING ================== */
async function loadInfoboxCharacter() {
    const info = await loadJSON('./info.json');

    characterHeaderEN = info.data.en_name;
    characterHeaderRU = info.data.ru_name;

    return {
        img: `../../images/characters/${info.data.img}`,
        parameters: info.parameters
    };
}

let characterArticle = { ru: '', en: '' };

async function loadArticleCharacter() {
    const info = await loadJSON('./info.json');

    if (info.data.article) {
        if (info.data.article.ru)
            characterArticle.ru = await loadArticle(info.data.article.ru);
        if (info.data.article.en)
            characterArticle.en = await loadArticle(info.data.article.en);
    }

    return info.parameters;
}

/* ================== COLORS ================== */
/// Функция подгона цветов для шкал при разных значениях ///
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
    const schema = await loadJSON('../chr_prms.json');
    const character = await loadInfoboxCharacter();

    const box = document.getElementById('infobox');
    box.innerHTML = '';

    renderCharacterImage(
        box,
        character.img,
        lang === 'ru' ? characterHeaderRU : characterHeaderEN
    );

    renderSection(box, 'Биография', schema.parameters.biography, character.parameters.biography, lang);
    renderSection(box, 'Информация', schema.parameters.information, character.parameters.information, lang);
    renderValues(box, schema.parameters.values, character.parameters.values, lang);
}

function renderCharacterImage(parent, imgName, altText) {
    if (!imgName) return;

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'infobox-image';

    const img = document.createElement('img');
    img.src = `/images/characters/${imgName}`;
    img.alt = altText || '';
    img.loading = 'lazy';

    imgWrapper.appendChild(img);
    parent.appendChild(imgWrapper);
}

async function renderArticle(lang = 'ru') {
    const article = document.getElementById('Article')
    await loadArticleCharacter()
    article.innerHTML = characterArticle[lang] || '';
    console.log(article)
    console.log(characterArticle['ru'])
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
            // value в формате "[Текст|URL]"
            const match = value.match(/\[([^|]+)\|([^]]+)]/);
            if (match) {
                const text = match[1];
                const url = match[2];

                const a = document.createElement('a');
                a.href = url;
                a.textContent = text;
                a.target = "_blank"; // открывать в новой вкладке
                a.rel = "noopener noreferrer";
                a.style.color = "#fbff00";
                a.style.textDecoration = "underline";

                val.appendChild(a);
            } else {
                val.textContent = value; // fallback, если формат не тот
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
        bar.dataset.tooltip = `${val} / 10`;

        // Радужный эффект при значениях > 10
        if (color === 'rainbow') {
            bar.classList.add('rainbow-bar');
        }

        const fill = document.createElement('span');
        fill.style.width = `${Math.min(val, 10) * 10}%`;

        if (color === 'rainbow') {
            fill.classList.add('rainbow-fill');
        } else {
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

let currentLang = 'RU';
renderInfobox(currentLang === 'RU' ? 'ru' : 'en');
renderArticle(currentLang === 'RU' ? 'ru' : 'en');

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        characterHeader.textContent = characterHeaderEN;
        langToggle.textContent = 'RU';

        currentLang = 'EN';
        renderInfobox(currentLang === 'RU' ? 'ru' : 'en');
        renderArticle(currentLang === 'RU' ? 'ru' : 'en');
    } else {
        characterHeader.textContent = characterHeaderRU;
        langToggle.textContent = 'EN';

        currentLang = 'RU';
        renderInfobox(currentLang === 'RU' ? 'ru' : 'en');
        renderArticle(currentLang === 'RU' ? 'ru' : 'en');
    }
    renderCharacters();
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

/* ================== BACKGROUND ================== */
document.addEventListener("DOMContentLoaded", () => {
    const bgImage = new Image();
    bgImage.src = "../../images/CHAOTICVERSE_1.webp";

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