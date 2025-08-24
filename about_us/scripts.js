const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const aboutUsHeader = document.getElementById('aboutUsHeader');
const scriptersHeader = document.getElementById('scriptersHeader');
const artistsHeader = document.getElementById('artistsHeader');
const partnersHeader = document.getElementById('partnersHeader');
const exParticipantsHeader = document.getElementById('ex-participantsHeader');
const textSoleProductionUT = document.getElementById('soleProductionUT');
const titleUVS27 = document.getElementById('uvs27');
const UVS27Description = document.getElementById('uvs27Description');
const titleDelta = document.getElementById('delta');
const deltaDescription = document.getElementById('deltaDescription');
const titleRaf = document.getElementById('raf');
const rafDescription = document.getElementById('rafDescription');
document.getElementById("year").textContent = new Date().getFullYear();

let currentLang = 'RU';

const headerRU = `О нас`;
const headerEN = `About Us`;
const scriptersEN = `Scripters`;
const scriptersRU = `Сценаристы`;
const artistsEN = `Artists`;
const artistsRU = `Художники`;
const partnersEN = `Partners`;
const partnersRU = `Партнеры`;
const exParticipantsRU = `Бывшие участники`;
const exParticipantsEN = `Ex-participants`;

const textSoleProductionUTRU = `Sole Production UT - независимое некоммерческое объединение творческих личностей под управлением человека, являющегося создателем данного проекта.
            Объединение стремится к цели создать и продемонстрировать невероятно масштабную историю. Каждый в нем действует исключительно по собственному желанию, 
            помогая в развитии. Объединение состоит из 3-х категорий участников: руководители, сценаристы, художники, а также ведёт
            партнерские отношения с некоторыми людьми и командами, для помощи популяризации и распространения в медиа проекта.`;
const textSoleProductionUTEN = `Sole Production UT is an independent non-commercial group of creative individuals under the management of a person who is the creator of this project.
            The group aims to create and showcase the incredibly huge story. Everyone in it acts solely according to their own will,
            helping in development. The group consists of three categories of participants: directors, screenwriters, artists, and also leads
            partnerships with certain individuals and teams to help promote and spread the project in the media.`;

const uvs27RU = `27UVS<br><div class="titles-text">Создатель Chaoticverse<br>Лидер Sole Production UT<br>Сценарист<br>Создатель сайта</div>`
const uvs27EN = `27UVS<br><div class="titles-text">Chaoticverse creator,<br>Sole Production UT leader,<br>Main scripter<br>Web-site creator</div>`
const deltaRU = `Дельта | WDeltaG<br><div class="titles-text">Соруководитель<br>Sole Production UT<br>Создатель <a href="https://underfill.fandom.com/ru/wiki/UnderFill_Вики">UnderFill</a><br>Переводчик</div>`
const deltaEN = `Delta | WDeltaG<br><div class="titles-text">Sole Production UT's<br>co-leader<br>Creator of <a href="https://underfill.fandom.com/ru/wiki/UnderFill_Вики">UnderFill</a><br>Translator</div>`
const rafRU = `Рафели<br><div class="titles-text">Руководитель <a href="https://sole-production-ut.tumblr.com">Tumblr</a> и 
            <a href="https://x.com/SPUT_27">X</a><br>каналов Sole Production UT</div>`
const rafEN = `Rafeli<br><div class="titles-text">Manager of <a href="https://sole-production-ut.tumblr.com">Tumblr</a> and 
            <a href="https://x.com/SPUT_27">X</a><br> Sole Production UT's channels</div>`

const UVS27DescriptionRU = `Всем привет! Это я! Прямо сейчас вы читаете обо мне
                    и читаете сайт, который я написал. Спасибо, что смотрите наш контент! Вам интересно, кто я?
                    Считайте меня вашим дружелюбным серафимом треугольником. Я главный идейщик, создатель всего,
                    что вы здесь видите и тот, кто хочет довести этот проект до любви пользователей в интернете.`
const UVS27DescriptionEN = `Hello everyone! It's me! Right now, you are reading about me and browsing the website 
                    I created. Thank you for checking out our content! Are you curious about who I am? Consider me your 
                    friendly seraphim triangle. I am the main thinker, the creator of everything you see here, and the 
                    one who wants to bring this project to the love of users on the internet.`
const deltaDescriptionRU = `Приветствую. Я Дельта. Соавтор и соруководитель проектов Sole Production UT, переводчик, 
                    а также создатель собственной мультивселенной - UnderFill и просто друг 27UVS.
                    Если вам нужно дополнить лор, исправить дыру в сюжете или ввести в историю нового персонажа - я в деле.`
const deltaDescriptionEN = `Greetings. I'm Delta. Sole Production UT's projects' co-author and co-director, translator, and 
                    creator of the UnderFill multiverse. Also 27UVS' friend. If you ever need to expand your lore, 
                    fix the plot holes in your story, or add a new character - I'm in.`
const rafDescriptionRU = `Всем приветик! Меня зовут Рафели~ (ударение на "а"),
                    рада с Вами познакомиться! Я являюсь помощником/руководителем нашего главного крылатого иллюмината, ахах))<br>
                    Иногда творю хаос, но в пределах разумного. Так же помогаю вести соц.сети.`
const rafDescriptionEN = `Hello, everyone! My name is Rafeli~ (emphasis on the ‘a’), nice to meet you! 
                    I am the co-leader/manager of our main winged illuminati, ahaha))<br>Sometimes I create chaos, 
                    but within reason. I also help manage social media.`

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        aboutUsHeader.textContent = headerEN;
        scriptersHeader.textContent = scriptersEN;
        artistsHeader.textContent = artistsEN;
        partnersHeader.textContent = partnersEN;
        exParticipantsHeader.textContent = exParticipantsEN;
        textSoleProductionUT.textContent = textSoleProductionUTEN;
        titleUVS27.innerHTML = uvs27EN;
        titleDelta.innerHTML = deltaEN;
        titleRaf.innerHTML = rafEN;
        UVS27Description.textContent = UVS27DescriptionEN;
        deltaDescription.innerHTML = deltaDescriptionEN;
        rafDescription.innerHTML = rafDescriptionEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        aboutUsHeader.textContent = headerRU;
        scriptersHeader.textContent = scriptersRU;
        artistsHeader.textContent = artistsRU;
        partnersHeader.textContent = partnersRU;
        exParticipantsHeader.textContent = exParticipantsRU;
        textSoleProductionUT.textContent = textSoleProductionUTRU;
        titleUVS27.innerHTML = uvs27RU;
        titleDelta.innerHTML = deltaRU;
        titleRaf.innerHTML = rafRU;
        UVS27Description.textContent = UVS27DescriptionRU;
        deltaDescription.innerHTML = deltaDescriptionRU;
        rafDescription.innerHTML = rafDescriptionRU;
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
const exParticipantsContainer = document.getElementById('ex-participants');

async function loadPeople() {
    const res = await fetch('people.json');
    peopleData = await res.json();
    renderPeople();
}

function renderPeople() {
    scriptersContainer.innerHTML = '';
    artistsContainer.innerHTML = '';
    partnersContainer.innerHTML = '';
    exParticipantsContainer.innerHTML = '';

    renderGroup(peopleData.scripters, scriptersContainer, 'scripters');
    renderGroup(peopleData.artists, artistsContainer, 'artists');
    renderGroup(peopleData.partners, partnersContainer, 'partners');
    renderGroup(peopleData.exparticipants, exParticipantsContainer, 'ex-participants');
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
                <div class="person-group-name"><a href="${person.link}">${name}</a></div>
            </div>
        `;
        container.appendChild(card);
    });
}

loadPeople();

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