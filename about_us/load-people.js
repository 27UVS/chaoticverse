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
