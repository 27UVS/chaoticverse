(function () {
    var KEY = 'chaoticverse_lang';

    function getStoredLang() {
        try {
            var v = localStorage.getItem(KEY);
            return v === 'EN' ? 'EN' : 'RU';
        } catch (e) {
            return 'RU';
        }
    }

    function setStoredLang(lang) {
        try {
            if (lang === 'EN' || lang === 'RU') {
                localStorage.setItem(KEY, lang);
            }
        } catch (e) {
            /* private mode / quota */
        }
    }

    window.getStoredLang = getStoredLang;
    window.setStoredLang = setStoredLang;
})();
