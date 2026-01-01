/* ================== BASE ================== */

const $ = id => document.getElementById(id);
const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

const overlay = $("overlay");
const minimizeBtn = $("minimize");
const restoreBtn = $("restore");
const langToggle = $("langToggle");
const textArtworksDiv = $("textArtworks");

$("year").textContent = new Date().getFullYear();

let currentLang = "RU";
let galleryNameLinks = [];
let artworksDataCache = null;
let ytApiPromise = null;

/* ================== DATA LOAD ================== */

async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Ошибка загрузки ${path}`);
    return res.json();
}

async function getArtworksData() {
    if (!artworksDataCache) {
        artworksDataCache = await loadJSON("artworks.json");
    }
    return artworksDataCache;
}

/* ================== LANGUAGE ================== */

const titles = {
    RU: "../images/titles/Kontent.webp",
    EN: "../images/titles/Artworks.webp"
};

async function loadLanguage(lang) {
    textArtworksDiv.innerHTML = await fetch(`${lang.toLowerCase()}.html`).then(r => r.text());

    fillTitle(lang);
    fillSlot("navigation", "navigation-template");
    fillSlot("carousel-animation", "carousel-animation-template");
    fillSlot("carousel-music", "carousel-music-template");
    fillSlot("gallery-container", "gallery-container-template");

    const data = await getArtworksData();

    await initVideoCarousel("carousel-animation", data.animations || []);
    await initVideoCarousel("carousel-music", data.music || []);
    await initGalleryCarousels("gallery-container");

    initGalleryLightbox();
}

function fillSlot(slotName, templateId) {
    const slot = textArtworksDiv.querySelector(`[data-slot="${slotName}"]`);
    const tpl = $(templateId);
    if (slot && tpl) slot.replaceWith(tpl.content.cloneNode(true));
}

function fillTitle(lang) {
    const slot = document.querySelector('[data-i18n="title"]');
    if (!slot) return;

    const img = new Image();
    img.src = titles[lang];
    img.className = "image-title";
    slot.replaceWith(img);
}

/* ================== YOUTUBE ================== */

function loadYouTubeAPI() {
    if (ytApiPromise) return ytApiPromise;

    ytApiPromise = new Promise(resolve => {
        if (window.YT?.Player) return resolve();

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = resolve;
    });

    return ytApiPromise;
}

async function initVideoCarousel(containerId, videos) {
    const container = $(containerId);
    if (!container || !videos.length) return;

    container._players?.forEach(p => p.destroy());
    container._players = [];
    container.innerHTML = "";

    videos.forEach(id => {
        if (isMobile) {
            const a = document.createElement("a");
            a.href = `https://www.youtube.com/watch?v=${id}`;
            a.target = "_blank";

            const img = new Image();
            img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            img.className = "video-thumbnail";

            a.appendChild(img);
            container.appendChild(a);
        } else {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
            iframe.allowFullscreen = true;
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            container.appendChild(iframe);
        }
    });

    if (isMobile) return;

    await loadYouTubeAPI();

    const players = [];
    container._players = players;

    container.querySelectorAll("iframe").forEach((iframe, idx) => {
        players.push(
            new YT.Player(iframe, {
                events: {
                    onStateChange: e => {
                        if (e.data === YT.PlayerState.PLAYING) {
                            players.forEach((p, i) => i !== idx && p.stopVideo());
                        }
                    }
                }
            })
        );
    });
    container.addEventListener("mouseenter", () => {
        players.forEach(p => {
            if (p.getPlayerState?.() === YT.PlayerState.PLAYING) {
                p.pauseVideo();
            }
        });
    });

    initInfiniteScroll(container, {
        disableClone: true
    });
}

/* ================== GALLERY ================== */

async function initGalleryCarousels(containerId) {
    const container = $(containerId);
    container.innerHTML = "";
    galleryNameLinks = [];

    const [artworks, people] = await Promise.all([
        getArtworksData(),
        loadJSON("../about_us/people.json")
    ]);

    const peopleMap = {};
    [...people.scripters, ...people.artists, ...people.partners, ...people.exparticipants]
        .forEach(p => {
            peopleMap[p.id] = {
                link: p.link,
                ru: p.ru.name,
                en: p.en.name
            };
        });

    let images = [];
    Object.entries(artworks.gallery).forEach(([id, files]) => {
        const p = peopleMap[id] || { link: "#", ru: "Неизвестно", en: "Unknown" };
        files.forEach(f =>
            images.push({
                src: `../images/gallery/${f}`,
                ...p
            })
        );
    });

    images.sort(() => Math.random() - 0.5);

    for (let i = 0; i < images.length; i += 10) {
        const row = document.createElement("div");
        row.className = "gallery-carousel";

        images.slice(i, i + 10).forEach(imgData => {
            const card = document.createElement("div");
            card.className = "gallery-card";

            const img = new Image();
            img.src = imgData.src;
            img.className = "gallery-image";

            const a = document.createElement("a");
            a.href = imgData.link;
            a.target = "_blank";
            a.className = "gallery-name";
            a.innerHTML = currentLang === "EN" ? imgData.en : imgData.ru;

            galleryNameLinks.push({
                element: a,
                ru: imgData.ru,
                en: imgData.en
            });

            card.append(img, a);
            row.appendChild(card);
        });

        container.appendChild(row);
        initInfiniteScroll(row);
    }
}

/* ================== SCROLL ================== */

function initInfiniteScroll(container, options = {}) {
    const items = [...container.children];
    if (!items.length) return;

    const totalWidth = items.reduce((w, el) => w + el.offsetWidth + 10, 0);
    if (totalWidth <= container.clientWidth) {
        container.style.justifyContent = "center";
        return;
    }

    if (!options.disableClone) {
        items.forEach(el => container.appendChild(el.cloneNode(true)));
    }

    let rafId;
    const speed = 0.5;

    function step() {
        container.scrollLeft += speed;
        if (!options.disableClone && container.scrollLeft >= totalWidth) {
            container.scrollLeft -= totalWidth;
        }
        rafId = requestAnimationFrame(step);
    }

    container.addEventListener("mouseenter", () => cancelAnimationFrame(rafId));
    container.addEventListener("mouseleave", step);

    step();
}


/* ================== LIGHTBOX ================== */

function initGalleryLightbox() {
    if (document.getElementById("lightbox")) return;

    const box = document.createElement("div");
    box.id = "lightbox";
    box.style.cssText =
        "position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.8);z-index:9999";

    const img = document.createElement("img");
    img.style.cssText = "max-width:90%;max-height:90%;border-radius:6px";
    box.appendChild(img);
    document.body.appendChild(box);

    box.addEventListener("click", () => (box.style.display = "none"));
    img.addEventListener("click", e => e.stopPropagation());

    document.body.addEventListener("click", e => {
        if (e.target.classList.contains("gallery-image")) {
            img.src = e.target.src;
            box.style.display = "flex";
        }
    });
}

/* ================== UI ================== */

langToggle.onclick = async () => {
    currentLang = currentLang === "RU" ? "EN" : "RU";
    langToggle.textContent = currentLang === "RU" ? "EN" : "RU";
    await loadLanguage(currentLang);

    galleryNameLinks.forEach(l =>
        (l.element.textContent = currentLang === "EN" ? l.en : l.ru)
    );
};

minimizeBtn.onclick = () => {
    overlay.classList.add("hidden");
    restoreBtn.style.display = "flex";
};

restoreBtn.onclick = () => {
    overlay.classList.remove("hidden");
    restoreBtn.style.display = "none";
};

/* ================== INIT ================== */

document.addEventListener("DOMContentLoaded", () => {
    loadLanguage(currentLang);
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