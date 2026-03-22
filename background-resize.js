/**
 * Единая логика подгонки #backgroundHeight под фон CHAOTICVERSE_1.webp.
 * Подключать с data-bg — путь к webp относительно страницы, например:
 * data-bg="images/CHAOTICVERSE_1.webp" или data-bg="../images/CHAOTICVERSE_1.webp"
 */
(function () {
    const script = document.currentScript;
    const bgSrc = script && script.dataset.bg;
    if (!bgSrc) return;

    document.addEventListener("DOMContentLoaded", () => {
        const resizableDiv = document.querySelector("#backgroundHeight");
        if (!resizableDiv) return;

        const bgImage = new Image();
        bgImage.src = bgSrc;

        bgImage.onload = () => {
            const aspectRatio = bgImage.height / bgImage.width;
            const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

            function resizeDiv() {
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
                resizableDiv.style.backgroundSize = backgroundSize;
                resizableDiv.style.width = `${newWidth}px`;
                resizableDiv.style.height = `${newHeight}px`;
            }

            let resizeScheduled = false;
            function onResize() {
                if (resizeScheduled) return;
                resizeScheduled = true;
                requestAnimationFrame(() => {
                    resizeScheduled = false;
                    resizeDiv();
                });
            }

            resizeDiv();
            window.addEventListener("resize", onResize, { passive: true });
        };
    });
})();
