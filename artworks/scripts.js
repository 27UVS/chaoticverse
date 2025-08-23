const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const artworksHeader = document.getElementById('artworksHeader');
const artworksAnimation = document.getElementById('artworksAnimation');
const artworksMusic = document.getElementById('artworksMusic');
const artworksArts= document.getElementById('artworksArts');
document.getElementById("year").textContent = new Date().getFullYear();

let currentLang = 'RU';

const headerRU = `Контент`;
const headerEN = `Artworks`;
const animationRU = `Анимации`;
const animationEN = `Animations`;
const musicRU = `Музыка`;
const musicEN = `Music`;
const artsRU = `Арты`;
const artsEN = `Arts`;

async function initVideoCarousel(containerId, videos) {
    const container = document.getElementById(containerId);

    if (!container || videos.length === 0) return;

    // Проверка на мобильное устройство
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    // iframe - для компьютеров, a - для телефонов
    videos.forEach(id => {
        if (isMobile) {
            const link = document.createElement("a");
            link.href = `https://www.youtube.com/watch?v=${id}`;
            link.target = "_blank"; // открывается в приложении YouTube/новой вкладке
            link.style.display = "inline-block";

            const thumbnail = document.createElement("img");
            thumbnail.classList.add("video-thumbnail");
            thumbnail.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

            thumbnail.style.display = "block";

            link.appendChild(thumbnail);
            container.appendChild(link);
        } else {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            container.appendChild(iframe);
        }
    });
    // === YouTube API ===
    function loadYouTubeAPI() {
        return new Promise(resolve => {
            if (window.YT && window.YT.Player) {
                resolve();
            } else {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                document.body.appendChild(tag);

                window.onYouTubeIframeAPIReady = () => resolve();
            }
        });
    }

    await loadYouTubeAPI();

    // Проверка на проигрывание только одного плеера
    const iframes = container.querySelectorAll("iframe");
    const players = [];

    iframes.forEach((iframe, idx) => {
        const player = new YT.Player(iframe, {
            events: {
                'onStateChange': function (event) {
                    if (event.data === YT.PlayerState.PLAYING) {
                        players.forEach((p, i) => {
                            if (i !== idx) p.stopVideo();
                        });
                    }
                }
            }
        });
        players.push(player);
    });

    // При малом количество - центрирование
    if (container.scrollWidth <= container.clientWidth) {
        container.classList.add("centered");
        return; // авто-скролл не нужен
    }

    // Клонирование для бесконечного скролла
    const items = Array.from(container.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });

    let scrollSpeed = 0.5;
    let autoScroll;

    function startAutoScroll() {
        stopAutoScroll();
        autoScroll = setInterval(() => {
            container.scrollLeft += scrollSpeed;

            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }
        }, 20);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // Остановка скролла при наведении
    container.addEventListener("mouseenter", stopAutoScroll);
    // Возобновить скролл при выходе + остановка видео
    container.addEventListener("mouseleave", () => {
        // Сброс видео
        const iframes = container.querySelectorAll("iframe");
        iframes.forEach(iframe => {
            iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        });
        startAutoScroll();
    });

    startAutoScroll();
}

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("artworks.json");
    const data = await response.json();

    await initVideoCarousel("carousel-animation", data.animation);
    await initVideoCarousel("carousel-music", data.music);

});

let galleryNameLinks = [];

async function initGalleryCarousels(containerId) {
    const container = document.getElementById(containerId);

    // Загружаем данные
    const [artworksRes, peopleRes] = await Promise.all([
        fetch("artworks.json"),
        fetch("../about_us/people.json")
    ]);

    const artworksData = await artworksRes.json();
    const peopleData = await peopleRes.json();

    const peopleMap = {};
    [...peopleData.scripters, ...peopleData.artists,
        ...peopleData.partners, ...peopleData.exparticipants].forEach(person => {
        peopleMap[person.id] = {
            link: person.link,
            name_ru: person.ru.name,
            name_en: person.en.name
        };
    });

    let images = [];
    for (const [authorId, files] of Object.entries(artworksData.gallery)) {
        const person = peopleMap[authorId] || { link: "#", name_ru: "Неизвестно", name_en: "Unknown" };

        files.forEach(file => {
            images.push({
                src: `../images/gallery/${file}`,
                link: person.link,
                name_ru: person.name_ru,
                name_en: person.name_en
            });
        });
    }

    galleryNameLinks = [];

    // При каждой загрузке страницы, картинки размещаются рандомно
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    // На одно поле скролла - 10 картинок
    const chunks = [];
    for (let i = 0; i < images.length; i += 10) {
        chunks.push(images.slice(i, i + 10));
    }

    // Создание скроллов
    chunks.forEach((chunk) => {
        const row = document.createElement("div");
        row.className = "gallery-carousel";
        container.appendChild(row);

        // Добавляем картинки
        chunk.forEach(imgData => {
            const card = document.createElement("div");
            card.className = "gallery-card";

            const img = document.createElement("img");
            img.src = imgData.src;
            img.className = "gallery-image";

            const nameLink = document.createElement("a");
            nameLink.href = imgData.link;
            nameLink.target = "_blank";
            nameLink.className = "gallery-name";
            nameLink.textContent = currentLang === "EN" ? imgData.name_en : imgData.name_ru;

            card.appendChild(img);
            card.appendChild(nameLink);
            row.appendChild(card);

            galleryNameLinks.push({
                element: nameLink,
                name_ru: imgData.name_ru,
                name_en: imgData.name_en
            });
        });

        initAutoScroll(row);
    });
}

function initAutoScroll(row) {
    const scrollSpeed = 0.5;
    let autoScroll;

    const items = Array.from(row.children);
    if (items.length === 0) return;

    // Общая ширина всех карточек + margin
    const totalWidth = items.reduce((sum, el) => sum + el.offsetWidth + 10, 0); // 10 — margin-right

    // Если картинок меньше ширины контейнера — картинки центрируются, а иначе классический скролл
    if (totalWidth <= row.clientWidth) {
        row.style.justifyContent = "center";
        return;
    } else {
        row.style.justifyContent = "flex-start";
    }

    // Клонирование для бесконечного скролла
    items.forEach(item => row.appendChild(item.cloneNode(true)));

    function startAutoScroll() {
        stopAutoScroll();
        autoScroll = setInterval(() => {
            row.scrollLeft += scrollSpeed;

            // когда дошли до конца первого блока — плавно сбрасываем
            if (row.scrollLeft >= totalWidth) {
                row.scrollLeft -= totalWidth;
            }
        }, 20);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    row.addEventListener("mouseenter", stopAutoScroll);
    row.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll();
}

function initGalleryLightbox() {
    // Отвечает за полноэкранный показ картинок
    const lightbox = document.createElement("div");
    lightbox.style.position = "fixed";
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = "100%";
    lightbox.style.height = "100%";
    lightbox.style.background = "rgba(0,0,0,0.8)";
    lightbox.style.display = "none";
    lightbox.style.alignItems = "center";
    lightbox.style.justifyContent = "center";
    lightbox.style.zIndex = 9999;
    lightbox.style.cursor = "pointer";

    const img = document.createElement("img");
    img.style.maxWidth = "90%";   // ограничение, чтобы не выходила за экран
    img.style.maxHeight = "90%";
    img.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
    img.style.borderRadius = "5px";
    img.style.cursor = "default";

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    // Клик по фону = закрыть
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Клик по самой картинке не закрывает ее
    img.addEventListener("click", e => e.stopPropagation());

    document.querySelectorAll(".gallery-image").forEach(galleryImg => {
        galleryImg.addEventListener("click", () => {
            img.src = galleryImg.src;

            // Оригинальный размер картинки
            const naturalWidth = galleryImg.naturalWidth;
            const naturalHeight = galleryImg.naturalHeight;

            // Ограничение по экрану
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.9;
            let width = naturalWidth;
            let height = naturalHeight;

            // Масштабируем, если картинка слишком большая
            if (width > maxWidth) {
                const ratio = maxWidth / width;
                width = maxWidth;
                height = height * ratio;
            }
            if (height > maxHeight) {
                const ratio = maxHeight / height;
                height = maxHeight;
                width = width * ratio;
            }

            img.style.width = width + "px";
            img.style.height = height + "px";

            lightbox.style.display = "flex";
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await initGalleryCarousels("gallery-container");
    initGalleryLightbox();
});

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        artworksHeader.textContent = headerEN;
        artworksAnimation.textContent = animationEN;
        artworksMusic.textContent = musicEN;
        artworksArts.textContent = artsEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        artworksHeader.textContent = headerRU;
        artworksAnimation.textContent = animationRU;
        artworksMusic.textContent = musicRU;
        artworksArts.textContent = artsRU;
        langToggle.textContent = 'EN';
        currentLang = 'RU';
    }

    // Обновление никнеймов авторов при смене языка
    galleryNameLinks.forEach(linkData => {
        linkData.element.textContent = currentLang === "EN" ? linkData.name_en : linkData.name_ru;
    });
});

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});