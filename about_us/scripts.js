const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const textAboutUsDiv = document.getElementById('textAboutUs');
document.getElementById("year").innerText = new Date().getFullYear();

let currentLang = 'RU';
let peopleData = {};

async function loadLanguage(lang) {
    const fileName = lang.toLowerCase() + '.html';
    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            console.error('Не удалось загрузить файл ' + fileName);
            return;
        }
        textAboutUsDiv.innerHTML = await response.text();

        const res = await fetch('people.json');
        peopleData = await res.json();

        const scriptersContainer = document.getElementById('scripters');
        const editorsContainer = document.getElementById('editors');
        const artistsContainer = document.getElementById('artists');
        const partnersContainer = document.getElementById('partners');
        const exParticipantsContainer = document.getElementById('ex-participants');

        renderPeople(scriptersContainer, editorsContainer, artistsContainer, partnersContainer, exParticipantsContainer)

    } catch (err) {
        console.error('Ошибка при загрузке языка:', err);
    }
}

loadLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'RU' ? 'EN' : 'RU';
    langToggle.textContent = currentLang === 'RU' ? 'EN' : 'RU';
    loadLanguage(currentLang)
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

function renderPeople(scriptersContainer, editorsContainer, artistsContainer, partnersContainer, exParticipantsContainer) {
    scriptersContainer.innerHTML = '';
    editorsContainer.innerHTML = '';
    artistsContainer.innerHTML = '';
    partnersContainer.innerHTML = '';
    exParticipantsContainer.innerHTML = '';

    renderGroup(peopleData.scripters, scriptersContainer, 'scripters');
    renderGroup(peopleData.editors, editorsContainer, 'editors');
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

        let extraTitle = "";
        if (person.id === "unknown_team") {
            extraTitle = (lang === "ru")
                ? "Отвечает за дизайн интерфейса сайта"
                : "Responsible for website interface design";
        }

        card.innerHTML = `
            <div class="person-group-icon">
                <a href="${person.link}" target="_blank">
                    <img src="../images/people/${folder}/${person.image}" 
                         alt="${person.alt}"
                         ${extraTitle ? `title="${extraTitle}"` : ""}>
                </a>
            </div>
            <div class="person-group-text">
                <div class="person-group-name"><a href="${person.link}">${name}</a></div>
            </div>
        `;
        container.appendChild(card);
    });
}

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