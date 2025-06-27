const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const aboutUsHeader = document.getElementById('aboutUsHeader');
const textSoleProductionUT = document.getElementById('soleProductionUT');
const titleUVS27 = document.getElementById('uvs27');
const UVS27Description = document.getElementById('uvs27Description');
const titleDelta = document.getElementById('delta');
const deltaDescription = document.getElementById('deltaDescription');

let currentLang = 'RU';

const headerRU = `О нас`;
const headerEN = `About Us`;

const textSoleProductionUTRU = `Sole Production UT - независимое некоммерческое объединение творческих личностей под управлением человека, являющегося создателем данного проект.
            Объединение стремится к цели создать и продемонстрировать историю проекта. Каждый в нем действует исключительно по собственному желанию, 
            помогая в развитии. Объединение состоит из 3-х категорий участников: руководители, сценаристы, художники, а также ведёт
            партнерские отношения с некоторыми людьми и командами, для помощи популяризации и распространения в медиа проекта.`;
const textSoleProductionUTEN = `Sole Production UT is an independent non-profit group of creative individuals under the management of a person who is the creator of this project.
            The group aims to create and showcase the project's history. Everyone in it acts solely according to their own will,
            helping in development. The group consists of three categories of participants: directors, screenwriters, artists, and also leads
            partnerships with certain individuals and teams to help promote and spread the project in the media.`;

const uvs27RU = `27UVS<br><div class="titles-text">Создатель Chaoticverse,<br>лидер Sole_Production_UT,<br>сценарист, создатель сайта</div>`
const uvs27EN = `27UVS<br><div class="titles-text">Chaoticverse Creator,<br>Sole_Production_UT leader,<br>main scripter, web-site creator</div>`
const deltaRU = `Дельта<br><div class="titles-text">Соруководитель Chaoticverse<br>(на данный момент не при делах)`
const deltaEN = `Delta<br><div class="titles-text">Chaoticverse co-leader<br>(at the moment not involved)`

const UVS27DescriptionRU = `Всем привет! Это я! Прямо сейчас вы читаете обо мне
                    и читаете сайт, который я написал. Спасибо, что смотрите наш контент! Вам интересно, кто я?
                    Считайте меня вашим дружелюбным серафимом треугольником. Я главный идейщик, создатель всего,
                    что вы здесь видите и тот, кто хочет довести этот проект до любви пользователей в интернете.`
const UVS27DescriptionEN = `Hello everyone! It's me! Right now, you are reading about me and browsing the website 
                    I created. Thank you for checking out our content! Are you curious about who I am? Consider me your 
                    friendly seraphim triangle. I am the main thinker, the creator of everything you see here, and the 
                    one who wants to bring this project to the love of users on the internet.`
const deltaDescriptionRU = `Временами помогает с переводами, ведёт работу над
                    собственным проектом <a href="https://underfill.fandom.com/ru/wiki/UnderFill_Вики">UnderFill</a>. 
                    Фотомодель.`
const deltaDescriptionEN = `Sometimes helps with translations, working on his own project 
                    <a href="https://underfill.fandom.com/ru/wiki/UnderFill_Вики">UnderFill</a>. Model.`

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        aboutUsHeader.textContent = headerEN;
        textSoleProductionUT.textContent = textSoleProductionUTEN;
        titleUVS27.innerHTML = uvs27EN;
        titleDelta.innerHTML = deltaEN;
        UVS27Description.textContent = UVS27DescriptionEN;
        deltaDescription.innerHTML = deltaDescriptionEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        aboutUsHeader.textContent = headerRU;
        textSoleProductionUT.textContent = textSoleProductionUTRU;
        titleUVS27.innerHTML = uvs27RU;
        titleDelta.innerHTML = deltaRU;
        UVS27Description.textContent = UVS27DescriptionRU;
        deltaDescription.innerHTML = deltaDescriptionRU;
        langToggle.textContent = 'EN';
        currentLang = 'RU';
    }
    renderPeople();
});

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});


let peopleData = {};

const scriptersContainer = document.getElementById('scripters');
const artistsContainer = document.getElementById('artists');
const partnersContainer = document.getElementById('partners');

async function loadPeople() {
    const res = await fetch('people.json');
    peopleData = await res.json();
    renderPeople();
}

function renderPeople() {
    scriptersContainer.innerHTML = '';
    artistsContainer.innerHTML = '';
    partnersContainer.innerHTML = '';

    renderGroup(peopleData.scripters, scriptersContainer, 'scripters');
    renderGroup(peopleData.artists, artistsContainer, 'artists');
    renderGroup(peopleData.partners, partnersContainer, 'partners');
}


function renderGroup(group, container, folder) {
    group.forEach(person => {
        const card = document.createElement('div');
        card.className = 'person-group-card';

        const lang = currentLang.toLowerCase();
        const name = person[lang]?.name || person.en.name; // fallback на en

        card.innerHTML = `
            <div class="person-group-icon">
                <a href="${person.link}" target="_blank">
                    <img src="../images/people/${folder}/${person.image}" alt="${person.alt}">
                </a>
            </div>
            <div class="person-group-text">
                <div class="person-group-name"><a href=${person.link}>${name}</a></div>
            </div>
        `;
        container.appendChild(card);
    });
}

loadPeople();
