const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const textContentDiv = document.getElementById('textContent');
document.getElementById("year").textContent = new Date().getFullYear();

let currentLang = 'RU';

async function loadLanguage(lang) {
    const fileName = lang.toLowerCase() + '.html'; // ru.html или en.html
    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            console.error('Не удалось загрузить файл ' + fileName);
            return;
        }
        // Вставляем текст прямо, без лишней переменной
        textContentDiv.innerHTML = await response.text();
    } catch (err) {
        console.error('Ошибка при загрузке языка:', err);
    }
}

loadLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'RU' ? 'EN' : 'RU';
    langToggle.textContent = currentLang === 'RU' ? 'EN' : 'RU';
    loadLanguage(currentLang);
});

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
    bgImage.src = "images/CHAOTICVERSE_1.webp";

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
