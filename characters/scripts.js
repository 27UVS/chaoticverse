const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const charactersHeader = document.getElementById('charactersHeader');
const langToggle = document.getElementById('langToggle');

const characterHeaderEN = `
Chaoticverse Characters
`;

const characterHeaderRU = `
Персонажи Chaoticverse
`;

let currentLang = 'RU';

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        charactersHeader.textContent = characterHeaderEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        charactersHeader.textContent = characterHeaderRU;
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