const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const homeText = document.getElementById('mainText');
const disclaimerText = document.getElementById('disclaimerText');

const textRU = `
  Бесконечные миры, бесконечные сражения и бесконечные возможности.<br>
  Встречайте мультивселенную, где не существует ограничений.<br>
  Погрузитесь в хаос вместе с
`;

const textEN = `
  Endless worlds, endless battles and endless possibilities.<br>
  Meet a multiverse where there are no limits.<br>
  Plunge into the chaos with
`;

const disclaimerRU = `
  Данный фан-проект является кроссовером множества сторонних проектов фандома Undertale и Deltarune.<br>
  Данный фан-проект не поддерживается Toby Fox или другими коммерческими организациями.
`;

const disclaimerEN = `
  This fan-project is a crossover of many third-party projects of the Undertale and Deltarune fandom.<br>
  This fan-project is not supported by Toby Fox or other commercial organizations.
`;


let currentLang = 'RU';

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        homeText.innerHTML = textEN;
        disclaimerText.innerHTML = disclaimerEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        homeText.innerHTML = textRU;
        disclaimerText.innerHTML = disclaimerRU;
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