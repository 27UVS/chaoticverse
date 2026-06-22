/**
 * Loads split people JSON under about_us/people/ and returns the same shape as the former people.json.
 * @param {string} basePath Path prefix ending with / (e.g. '' from about_us, '../about_us/' from artworks).
 * @returns {Promise<{ scripters: object[], editors: object[], artists: object[], partners: object[], exparticipants: object[] }>}
 */
async function loadPeopleData(basePath) {
    const keys = ['scripters', 'editors', 'artists', 'partners', 'exparticipants'];
    const parts = await Promise.all(
        keys.map((k) =>
            fetch(`${basePath}people/${k}.json`).then((r) => {
                if (!r.ok) {
                    throw new Error(`Failed to load ${basePath}people/${k}.json: ${r.status}`);
                }
                return r.json();
            })
        )
    );
    return Object.fromEntries(keys.map((k, i) => [k, parts[i].people]));
}

/**
 * @param {{ link?: string, en?: { link?: string }, ru?: { link?: string } }} person
 * @param {string} lang "en", "ru", "EN", or "RU"
 * @returns {string}
 */
function resolvePersonLink(person, lang) {
    if (!person) return "#";
    const l = String(lang).toLowerCase();
    const locale = l.startsWith("ru") ? "ru" : "en";
    return person[locale]?.link || person.link || "#";
}
