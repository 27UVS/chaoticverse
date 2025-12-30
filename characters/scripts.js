const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const textCharactersDiv = document.getElementById('textCharacters');
document.getElementById("year").innerText = new Date().getFullYear();

let currentLang = 'RU';

async function loadLanguage(lang) {
    const fileName = lang.toLowerCase() + '.html';
    try {
        const response = await fetch(fileName);

        if (!response.ok) {
            console.error('Не удалось загрузить файл ' + fileName);
            return;
        }
        textCharactersDiv.innerHTML = await response.text();

        fillSlot("main-poster", "main-poster-template");
        fillSlot("navigation", "navigation-template");
        fillSlot("nelson-pic", "nelson-pic-template");
        fillSlot("gaster-pic", "gaster-pic-template");
        fillSlot("hollow-pic", "hollow-pic-template");
        fillSlot("load-pic", "load-pic-template");
        fillSlot("stars-pic", "stars-pic-template");
        fillSlot("starc-pic", "starc-pic-template");
        fillSlot("highest-pic", "highest-pic-template");
        fillSlot("dream-pic", "dream-pic-template");
        fillSlot("nightmare-pic", "nightmare-pic-template");
        fillSlot("shattered-pic", "shattered-pic-template");
    } catch (err) {
        console.error('Ошибка при загрузке языка:', err);
    }
}

function fillSlot(slotName, templateId) {
    const slot = textCharactersDiv.querySelector(`[data-slot="${slotName}"]`);
    const tpl = document.getElementById(templateId);
    if (slot && tpl) {
        slot.replaceWith(tpl.content.cloneNode(true));
    }
}

loadLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'RU' ? 'EN' : 'RU';
    langToggle.textContent = currentLang === 'RU' ? 'EN' : 'RU';
    loadLanguage(currentLang);
    renderCharacters();
});
minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});


let secondCharacters = [];
const container = document.getElementById('secondCharacters');
const byTranslation = {
    en: "by ",
    ru: "от "
};

async function loadSecondCharacters() {
    const res = await fetch('second_characters.json');
    secondCharacters = await res.json();
    renderCharacters();
}

function renderCharacters() {
    container.innerHTML = '';
    secondCharacters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'second-character-card';

        const lang = currentLang.toLowerCase();
        const byText = byTranslation[lang];

        card.innerHTML = `
          <div class="second-character-icon">
            <img src="../images/characters/second_characters/${char.image}" alt="${char.alt}">
          </div>
          <div class="second-character-text">
            <div class="char-name" id="${char.id}">${char[currentLang.toLowerCase()].name}</div>
            <div class="char-author" id="${char.id}Author">${byText}${char.author}</div>
          </div>
    `;
        container.appendChild(card);
    });
}

loadSecondCharacters();

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