const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const homeText = document.getElementById('mainText');
const anniversaryText = document.getElementById('anniversaryText');
const disclaimerText = document.getElementById('disclaimerText');
document.getElementById("year").textContent = new Date().getFullYear();

const textRU = `
  Бесконечные миры, бесконечные сражения и бесконечные возможности!<br>
  Встречайте мультивселенную, где не существует ограничений!<br>
  Погрузитесь в хаос вместе с
`;

const textEN = `
  Endless worlds, endless battles and endless possibilities!<br>
  Behold a multiverse where there are no limits!<br>
  Plunge into the chaos with
`;

const anniversaryEN = `
  We are immensely grateful for your support and love for our project!<br>
  We're happy to know you like what we do and<br>
  are interested in following our stories!
  <br>Thank you!
`;

const anniversaryRU = `
  Безмерно благодарим вас за поддержку и любовь к нашему проекту!<br>
  Мы счастливы знать, что вам нравится то, что мы делаем и<br>вам интересно следить за нашими историями!
  <br>Спасибо вам!
`;

const disclaimerRU = `
  Данный фан-проект является кроссовером множества сторонних проектов фандома Undertale и Deltarune.<br>
  Данный фан-проект не поддерживается Toby Fox или другими коммерческими организациями.
`;

const disclaimerEN = `
  CHAOTICVERSE is a crossover of many third-party projects of the Undertale and Deltarune fandom.<br>
  CHAOTICVERSE is not supported by Toby Fox or other commercial organizations.
`;


let currentLang = 'RU';

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        homeText.innerHTML = textEN;
        anniversaryText.innerHTML = anniversaryEN;
        disclaimerText.innerHTML = disclaimerEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        homeText.innerHTML = textRU;
        anniversaryText.innerHTML = anniversaryRU;
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
