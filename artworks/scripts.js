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
    teardownCarousels();

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

    container._players?.forEach(p => p.destroy?.());
    container._players = [];
    container.innerHTML = "";

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)
        || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);

    videos.forEach(id => {
        if (isMobile) {
            const a = document.createElement("a");
            a.href = `https://www.youtube.com/watch?v=${id}`;
            a.target = "_blank";
            a.rel = "noopener noreferrer";

            const img = new Image();
            img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            img.className = "video-thumbnail";
            img.loading = "eager";
            img.decoding = "async";

            a.appendChild(img);
            container.appendChild(a);
        } else {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
            iframe.loading = "lazy";
            iframe.allowFullscreen = true;
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            container.appendChild(iframe);
        }
    });

    if (isMobile) {
        container.style.display = "flex";
        container.style.overflowX = "auto";
        container.style.scrollSnapType = "x mandatory";
        container.querySelectorAll("a").forEach(a => {
            a.style.flex = "0 0 auto";
            a.style.scrollSnapAlign = "start";
        });
        return;
    }

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

    initInfiniteScroll(container, { disableClone: true });
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

    galleryHydrateIo = new IntersectionObserver(
        entries => {
            for (const e of entries) {
                if (e.isIntersecting) hydrateGalleryRow(/** @type {HTMLElement} */(e.target));
            }
        },
        { root: null, rootMargin: "280px 0px", threshold: 0 }
    );

    for (let i = 0; i < images.length; i += 10) {
        const row = document.createElement("div");
        row.className = "gallery-carousel";

        images.slice(i, i + 10).forEach(imgData => {
            const card = document.createElement("div");
            card.className = "gallery-card";

            const img = new Image();
            img.dataset.src = imgData.src;
            img.className = "gallery-image";
            img.decoding = "async";
            img.setAttribute("width", "400");
            img.setAttribute("height", "225");

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
        if (i < 20) {
            hydrateGalleryRow(row);
        }
        galleryHydrateIo.observe(row);
        initInfiniteScroll(row);
    }
}

/* ================== SCROLL (один RAF на все карусели + пауза вне экрана) ================== */

/** @type {IntersectionObserver | null} */
let galleryHydrateIo = null;

/** @type {Array<{ el: HTMLElement, totalWidth: number, speed: number, disableClone: boolean, inView: boolean, hoverPaused: boolean, io?: IntersectionObserver }>} */
let carouselRegistry = [];
let carouselRafId = null;

function carouselTick() {
    carouselRafId = null;
    if (!carouselRegistry.length) return;

    for (const entry of carouselRegistry) {
        if (!entry.inView || entry.hoverPaused) continue;
        const c = entry.el;
        c.scrollLeft += entry.speed;
        if (!entry.disableClone && c.scrollLeft >= entry.totalWidth) {
            c.scrollLeft -= entry.totalWidth;
        }
    }

    carouselRafId = requestAnimationFrame(carouselTick);
}

function scheduleCarouselTick() {
    if (carouselRafId == null && carouselRegistry.length) {
        carouselRafId = requestAnimationFrame(carouselTick);
    }
}

function teardownCarousels() {
    galleryHydrateIo?.disconnect();
    galleryHydrateIo = null;
    for (const e of carouselRegistry) {
        e.io?.disconnect();
    }
    carouselRegistry = [];
    if (carouselRafId != null) {
        cancelAnimationFrame(carouselRafId);
        carouselRafId = null;
    }
}

function initInfiniteScroll(container, options = {}) {
    const speed = options.speed ?? 0.5;
    const disableClone = options.disableClone ?? false;

    const items = [...container.children];
    if (!items.length) return;

    const totalWidth = items.reduce((w, el) => w + el.offsetWidth + 10, 0);
    if (totalWidth <= container.clientWidth) {
        container.style.justifyContent = "center";
        return;
    }

    if (!disableClone) {
        items.forEach(el => container.appendChild(el.cloneNode(true)));
    }

    const entry = {
        el: container,
        totalWidth,
        speed,
        disableClone,
        inView: true,
        hoverPaused: false
    };

    const io = new IntersectionObserver(
        records => {
            for (const rec of records) {
                entry.inView = rec.isIntersecting;
            }
        },
        { root: null, rootMargin: "100px 0px", threshold: 0 }
    );
    io.observe(container);
    entry.io = io;

    container.addEventListener("mouseenter", () => {
        entry.hoverPaused = true;
    });
    container.addEventListener("mouseleave", () => {
        entry.hoverPaused = false;
    });

    carouselRegistry.push(entry);
    scheduleCarouselTick();
}

/** Подставить реальный URL только когда строка галереи близко к viewport (уменьшает одновременные загрузки). */
function hydrateGalleryRow(row) {
    if (row.dataset.galleryHydrated === "1") return;
    row.dataset.galleryHydrated = "1";
    row.querySelectorAll("img.gallery-image[data-src]").forEach(img => {
        const url = img.dataset.src;
        if (!url) return;
        img.src = url;
        img.removeAttribute("data-src");
        if ("fetchPriority" in img) img.fetchPriority = "low";
    });
}


/* ================== LIGHTBOX ================== */

function initGalleryLightbox() {
    if (document.getElementById("lightbox")) return;

    const box = document.createElement("div");
    box.id = "lightbox";
    box.className = "gallery-lightbox-backdrop";

    const img = document.createElement("img");
    img.className = "gallery-lightbox-image";
    img.alt = "";
    box.appendChild(img);
    document.body.appendChild(box);

    box.addEventListener("click", () => {
        box.style.display = "none";
        img.removeAttribute("src");
    });
    img.addEventListener("click", e => e.stopPropagation());

    document.body.addEventListener("click", e => {
        if (e.target.classList.contains("gallery-image")) {
            img.src = e.target.currentSrc || e.target.src;
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
});