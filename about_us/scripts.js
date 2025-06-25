const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const aboutUsHeader = document.getElementById('aboutUsHeader');
const textSoleProductionUT = document.getElementById('soleProductionUT');


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

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        aboutUsHeader.textContent = headerEN;
        textSoleProductionUT.textContent = textSoleProductionUTEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        aboutUsHeader.textContent = headerRU;
        textSoleProductionUT.textContent = textSoleProductionUTRU;
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