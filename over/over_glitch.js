/**
 * Случайные глитчи на странице over: белые прямоугольники и кратковременные помехи.
 * Каждый глитч занимает не больше 25% ширины и 25% высоты окна.
 * Интервал между событиями: 10–40 с.
 */
(function () {
    const MIN_INTERVAL_MS = 10_000;
    const MAX_INTERVAL_MS = 40_000;
    const MAX_SIZE_RATIO = 0.25;

    const layer = document.getElementById('overGlitchLayer');
    const body = document.body;
    if (!layer || !body.classList.contains('over-page')) return;

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    function getMaxGlitchSize() {
        return {
            w: window.innerWidth * MAX_SIZE_RATIO,
            h: window.innerHeight * MAX_SIZE_RATIO
        };
    }

    function spawnRects() {
        const { w: maxW, h: maxH } = getMaxGlitchSize();
        const count = 1 + Math.floor(Math.random() * 4);

        for (let i = 0; i < count; i++) {
            const rect = document.createElement('div');
            rect.className = 'over-glitch-rect';

            const w = randomBetween(24, maxW);
            const h = randomBetween(12, Math.min(maxH, Math.max(16, w * 0.85)));
            const left = randomBetween(0, Math.max(0, window.innerWidth - w));
            const top = randomBetween(0, Math.max(0, window.innerHeight - h));

            rect.style.width = `${w}px`;
            rect.style.height = `${h}px`;
            rect.style.left = `${left}px`;
            rect.style.top = `${top}px`;

            layer.appendChild(rect);
            const lifetime = randomBetween(80, 280);
            setTimeout(() => rect.remove(), lifetime);
        }
    }

    function triggerStatic() {
        const { w: maxW, h: maxH } = getMaxGlitchSize();
        const patch = document.createElement('div');
        patch.className = 'over-glitch-static';

        const w = randomBetween(maxW * 0.4, maxW);
        const h = randomBetween(maxH * 0.4, maxH);
        const left = randomBetween(0, Math.max(0, window.innerWidth - w));
        const top = randomBetween(0, Math.max(0, window.innerHeight - h));

        patch.style.width = `${w}px`;
        patch.style.height = `${h}px`;
        patch.style.left = `${left}px`;
        patch.style.top = `${top}px`;

        layer.appendChild(patch);
        const duration = randomBetween(90, 220);
        setTimeout(() => patch.remove(), duration);
    }

    function runGlitchEvent() {
        const roll = Math.random();
        if (roll < 0.55) {
            spawnRects();
        } else if (roll < 0.85) {
            triggerStatic();
        } else {
            spawnRects();
            triggerStatic();
        }
    }

    function scheduleNext() {
        const delay = randomBetween(MIN_INTERVAL_MS, MAX_INTERVAL_MS);
        setTimeout(() => {
            runGlitchEvent();
            scheduleNext();
        }, delay);
    }

    scheduleNext();
})();
