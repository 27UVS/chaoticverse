(function () {
    const CORNERS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    document.addEventListener('DOMContentLoaded', async () => {
        const btn = document.getElementById('starWayButton');
        if (!btn) return;

        try {
            const res = await fetch('star_way_button.json');
            if (!res.ok) return;

            const config = await res.json();
            const chance = Number(config.spawnChance);
            if (!Number.isFinite(chance) || chance <= 0) return;
            if (Math.random() * 100 >= chance) return;

            const corner = CORNERS[Math.floor(Math.random() * CORNERS.length)];
            btn.classList.add(`star-way-corner-button--${corner}`, 'is-visible');

            btn.addEventListener('click', () => {
                // over/ в корне проекта, не в characters/
                window.location.href = new URL('../over/', window.location.href).href;
            });
        } catch (err) {
            console.error('Star Way button init failed:', err);
        }
    });
})();
