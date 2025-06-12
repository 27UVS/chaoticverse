const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const informationHeader = document.getElementById('informationHeader');

const informationHeaderEN = `Information`;

const informationHeaderRU = `Информация`;


let currentLang = 'RU';

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        informationHeader.textContent = informationHeaderEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        informationHeader.textContent = informationHeaderRU;
        langToggle.textContent = 'EN';
        currentLang = 'RU';
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