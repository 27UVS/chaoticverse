const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const charactersHeader = document.getElementById('charactersHeader');
const langToggle = document.getElementById('langToggle');
const characterNelson = document.getElementById('nelson');
const characterGaster = document.getElementById('gaster');
const characterHollowSans = document.getElementById('hollowSans');
const characterLoadGlitch = document.getElementById('loadGlitch');
const characterStarSans = document.getElementById('starSans');
const characterStarChara = document.getElementById('starChara');
const characterHighest = document.getElementById('highest');
const characterDream = document.getElementById('dream');
const characterNightmare = document.getElementById('nightmare');
const characterShatteredDream = document.getElementById('shatteredDream');

const characterNelsonDescription = document.getElementById('nelsonDescription');
const characterGasterDescription = document.getElementById('gasterDescription');
const characterHollowSansDescription = document.getElementById('hollowDescription');
const characterLoadGlitchDescription = document.getElementById('loadDescription');
const characterStarSansDescription = document.getElementById('sansDescription');
const characterStarCharaDescription = document.getElementById('charaDescription');
const characterHighestDescription = document.getElementById('highestDescription');
const characterDreamDescription = document.getElementById('dreamDescription');
const characterNightmareDescription = document.getElementById('nightmareDescription');
const characterShatteredDreamDescription = document.getElementById('shatteredDreamDescription');

document.getElementById("year").textContent = new Date().getFullYear();

const charactersHeaderEN = `Chaoticverse Characters`;
const characterNelsonEN = `Nelson`;
const characterNelsonDescriptionEN = `One of the central figures in Chaoticverse. 
                    Worldview: Chaotic Neutral. He is a representative of the real world, the world of creators, 
                    who found himself in the world of the game Undertale. Initially, he lacked qualities such as compassion and kindness, 
                    but he acquired them after experiencing the consequences of his own actions. He lived through his story in 
                    Cowardtale and is now looking for a new path for himself.`;
const characterGasterEN = `Gaster`;
const characterGasterDescriptionEN = `His motives are unknown and mysterious. He is constantly by Nelson's side, 
                    acting as both his shadow and his part. Worldview: ??? He wants something from Nelson, and that is all that is clear.`;
const characterHollowSansEN = `Hollow Sans`;
const characterHollowSansDescriptionEN = `The one whose soul is forever empty. Worldview: Unaligned. 
                    He is not moved by moral codes, ethical norms, or established laws. He lives by one principle: to consume. 
                    Every soul he consumes keeps him from going crazy. He desperately needs to be with someone, but 
                    this need is his eternal curse, for everyone he needs will sooner or later be consumed by him.`;
const characterLoadGlitchEN = `Load Glitch`;
const characterLoadGlitchDescriptionEN = `The terrifying force in the multiverse. Worldview: Сhaotic Evil. 
                    He is the embodiment of human error. He is the one who should not have survived, but rebelled against 
                    everything and is now moved by only one goal: to enslave every world of the creators. He desires to become 
                    the ruler of the multiverse. Nothing and no one will dare to stop his reckless desire. `;
const characterStarSansEN = `Star Sans`;
const characterStarSansDescriptionEN = `His soul is covered with scars that have long since healed. 
                    Worldview: Chaotic Good. He accepted his loss long ago. Of course, it is hard, but he knows that he cannot 
                    bring back what he has lost, so he moves on, finding new things and fighting for the good of others. 
                    However, his journey is not over until the enemy of the past becomes a page in history.`;
const characterStarCharaEN = `Star Chara`;
const characterStarCharaDescriptionEN = `His soul is bleeding from scars that cannot heal. 
                    Worldview: Chaotic Neutral. He lost what he had been striving for so long. He lost his hope and will not rest 
                    until he takes the life of the one who destroyed his life. His revenge must be carried out. `;
const characterHighestEN = `Highest`;
const characterHighestDescriptionEN = `Who wants to achieve perfection in everything. 
                    Worldview: Chaotic Neutral. He considers himself above everyone else in the multiverse, which is why 
                    he chose this nickname. In his opinion, almost every story in the multiverse is boring and primitive, 
                    and therefore requires serious changes and additions. He is a hacker-player, but prefers to call himself an 
                    ‘architect’ who helps bring worlds to their ‘ideal’ versions.`;
const characterDreamEN = 'Dream<br><div class="link-text">orig by <a href="https://www.tumblr.com/jokublog">@jokublog</a></div>';
const characterDreamDescriptionEN = 'Despite everything he has been through, his soul shines brightly and ' +
                    'guides others. Worldview: Chaotic Good. He has become more mature and responsible. He no longer ' +
                    'tries to act alone, and is willing to rely on others. Could it be that he changed so much after ' +
                    'the merger of his two selves, or has he always been this way and just hidden it?';
const characterNightmareEN = 'Nightmare<br><div class="link-text">orig by <a href="https://www.tumblr.com/jokublog">@jokublog</a></div>';
const characterNightmareDescriptionEN = 'No, this is not the Nightmare you know. He is still himself, ' +
                    'but his trust in others has been shattered. Worldview: Lawful Evil. Nightmare is still cruel, ' +
                    'calculating, and cold. In his eyes, everyone is selfish, worthless, and hypocritical, ' +
                    'deserving only one thing: pain. Nevertheless, his soul is not completely shrouded in darkness.';
const characterShatteredDreamEN = 'Shattered<br>Dream<br><div class="link-text">orig by <a href="https://www.tumblr.com/galacii-gallery">@galacii-gallery</a></div>';
const characterShatteredDreamDescriptionEN = 'Yes, there may be more than one Dream in the multiverse, but not ' +
                    'all Dreams are the same as the original. Worldview: Lawful Evil. He has no moral principles or ' +
                    'ideas about honour and nobility. He can lie whenever he wants. He is a true demon who gets ' +
                    'everything he wants. He liked his brother, but now he wants to repay him for all the pain he caused.';

const charactersHeaderRU = `Персонажи Chaoticverse`;
const characterNelsonRU = `Нельсон`;
const characterNelsonDescriptionRU = `Одна из центральных фигур Chaoticverse.
                    Мировоззрение: хаотично-нейтральное. Он представитель реального мира, мира создателей,
                    который оказался в мире игры Undertale. Изначально тот, в ком не было таких качеств, как
                    сострадание и добродушие, но обретший их, испытав на себе свои же поступки.
                    Он пережил свою историю в Cowardtale и ищет новый для себя путь.`;
const characterGasterRU = `Гастер`;
const characterGasterDescriptionRU = `Его мотивы неизвестны и загадочны.
                    Он постоянно рядом с Нельсоном, являясь и его тенью и его частью. Мировоззрение: ???
                    Ему что-то нужно от Нельсона и это всё, что ясно.`;
const characterHollowSansRU = `Холлоу Санс`;
const characterHollowSansDescriptionRU = `Тот, чья душа навечно пуста. Мировоззрение: вне данного понятия.
                    Им не движут моральные кодексы, нормы этики и установленные законы. Он живет с одним принципом -
                    поглощать. Каждая съеденная им душа не даёт ему сойти с ума. Он отчаянно нуждается быть с кем-то
                    рядом, но эта нужда его извечное проклятие, ведь каждый, в ком он нуждается, рано или поздно,
                    будет им поглощен.`;
const characterLoadGlitchRU = `Лоуд Глитч`;
const characterLoadGlitchDescriptionRU = `Ужасающая сила в мультивселенной.
                    Мировоззрение: хаотично-злое. Он настоящее воплощение человеческой ошибки. Он тот, кто не
                    должен был выжить, но восстал против всего и теперь им движет лишь одно - поработить
                    каждый мир создателей. Он желает стать правителем мультивселенной. Ничто и никто не посмеет
                    остановить его бездумное желание.`;
const characterStarSansRU = `Стар Санс`;
const characterStarSansDescriptionRU = `Его душа покрыта шрамами, что давно успели зажить.
                    Мировоззрение: хаотично-доброе. Он уже давно принял свою потерю. Конечно ему больно, но он знает,
                    что не вернет потерянное, а потому живет дальше, обретая новое и сражаясь на благо других.
                    Однако его путь не завершен, до тех пор, пока враг прошлого не станет страницей истории.`;
const characterStarCharaRU = `Стар Чара`;
const characterStarCharaDescriptionRU = `Его душа истекает от шрамов, что никак не могут зажить в нем.
                    Мировоззрение: хаотично-нейтральное. Он потерял то, к чему так долго стремился.
                    Он потерял свою надежду и он не успокоится, пока не заберет жизнь того, кто разрушил его жизнь.
                    Его месть обязана свершиться.`;
const characterHighestRU = `Высший`;
const characterHighestDescriptionRU = `Желающий достичь совершенства во всём. Мировоззрение:
                    хаотично-нейтральное. Он считает себя выше всех в мультивселенной, от того и взял себе это прозвище.
                    Почти каждая история в мультивселенной на его взгляд просто скучна и примитивна, а потому
                    требует серьезных изменений и расширений. Он игрок-хакер, но предпочитает себя называть
                    “архитектором”, помогающий довести миры до их “идеальных” версий.`;
const characterDreamRU = `Дрим<br><div class="link-text">ориг. от <a href="https://www.tumblr.com/jokublog">@jokublog</a></div>`;
const characterDreamDescriptionRU = `Не смотря на все, что он пережил, его душа
                    сияет и направляет других. Мировоззрение: хаотично-доброе. Он стал более зрелым и ответственным.
                    Больше он не пытается действовать в одиночку, а готов положиться на других. Может ли быть, что он
                    так изменился после слияния двух себя, или же он всегда таким был и просто скрывал это?`;
const characterNightmareRU = `Найтмер<br><div class="link-text">ориг. от <a href="https://www.tumblr.com/jokublog">@jokublog</a></div>`;
const characterNightmareDescriptionRU = `Нет, это не тот Найтмер, которого вы знаете.
                    Он все еще остался собой, но его доверие к окружающим разрушено. Мировоззрение: законопослушно-злое. Найтмер
                    все также жесток, расчетлив и холоден. Все в его глазах настоящие эгоисты, ничтожества и лицемеры,
                    заслуживающие ли одного - страдания. Тем не менее его душа не полностью окутана тьмой.`;
const characterShatteredDreamRU = `Шаттерд<br>Дрим<br><div class="link-text">ориг. от <a href="https://www.tumblr.com/galacii-gallery">@galacii-gallery</a></div>`;
const characterShatteredDreamDescriptionRU = `Да, в мультивселенной может быть
                    больше одного Дрима, но не все Дримы такие же, как и оригинал. Мировоззрение: законопослушно-злое.
                    В нем нет моральных принципов, или идеи о чести и благородстве. Он может врать когда угодно. Он
                    самый настоящий демон, который получает всё, что он захочет. Он любил своего брата, но теперь он желает
                    отплатить ему за всю ту боль, что он причинил.`;


let currentLang = 'RU';

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        charactersHeader.textContent = charactersHeaderEN;
        langToggle.textContent = 'RU';
        characterNelson.textContent = characterNelsonEN;
        characterGaster.textContent = characterGasterEN;
        characterHollowSans.textContent = characterHollowSansEN;
        characterLoadGlitch.textContent = characterLoadGlitchEN;
        characterStarSans.textContent = characterStarSansEN;
        characterStarChara.textContent = characterStarCharaEN;
        characterHighest.textContent = characterHighestEN;
        characterDream.innerHTML = characterDreamEN;
        characterNightmare.innerHTML = characterNightmareEN;
        characterShatteredDream.innerHTML = characterShatteredDreamEN;

        characterNelsonDescription.textContent = characterNelsonDescriptionEN;
        characterGasterDescription.textContent = characterGasterDescriptionEN;
        characterHollowSansDescription.textContent = characterHollowSansDescriptionEN;
        characterLoadGlitchDescription.textContent = characterLoadGlitchDescriptionEN;
        characterStarSansDescription.textContent = characterStarSansDescriptionEN;
        characterStarCharaDescription.textContent = characterStarCharaDescriptionEN;
        characterHighestDescription.textContent = characterHighestDescriptionEN;
        characterDreamDescription.textContent = characterDreamDescriptionEN;
        characterNightmareDescription.textContent = characterNightmareDescriptionEN;
        characterShatteredDreamDescription.textContent = characterShatteredDreamDescriptionEN;
        currentLang = 'EN';
    } else {
        charactersHeader.textContent = charactersHeaderRU;
        langToggle.textContent = 'EN';
        characterNelson.textContent = characterNelsonRU;
        characterGaster.textContent = characterGasterRU;
        characterHollowSans.textContent = characterHollowSansRU;
        characterLoadGlitch.textContent = characterLoadGlitchRU;
        characterStarSans.textContent = characterStarSansRU;
        characterStarChara.textContent = characterStarCharaRU;
        characterHighest.textContent = characterHighestRU;
        characterDream.innerHTML = characterDreamRU;
        characterNightmare.innerHTML = characterNightmareRU;
        characterShatteredDream.innerHTML = characterShatteredDreamRU;

        characterNelsonDescription.textContent = characterNelsonDescriptionRU;
        characterGasterDescription.textContent = characterGasterDescriptionRU;
        characterHollowSansDescription.textContent = characterHollowSansDescriptionRU;
        characterLoadGlitchDescription.textContent = characterLoadGlitchDescriptionRU;
        characterStarSansDescription.textContent = characterStarSansDescriptionRU;
        characterStarCharaDescription.textContent = characterStarCharaDescriptionRU;
        characterHighestDescription.textContent = characterHighestDescriptionRU;
        characterDreamDescription.textContent = characterDreamDescriptionRU;
        characterNightmareDescription.textContent = characterNightmareDescriptionRU;
        characterShatteredDreamDescription.textContent = characterShatteredDreamDescriptionRU;

        currentLang = 'RU';
    }
    renderCharacters();
});
minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});


let secondCharacters = [];
const container = document.getElementById('secondCharacters');
const byTranslation = {
    en: "by ",
    ru: "от "
};

async function loadSecondCharacters() {
    const res = await fetch('second_characters.json');
    secondCharacters = await res.json();
    renderCharacters();
}

function renderCharacters() {
    container.innerHTML = '';
    secondCharacters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'second-character-card';

        const lang = currentLang.toLowerCase();
        const byText = byTranslation[lang];

        card.innerHTML = `
          <div class="second-character-icon">
            <img src="../images/characters/second_characters/${char.image}" alt="${char.alt}">
          </div>
          <div class="second-character-text">
            <div class="char-name" id="${char.id}">${char[currentLang.toLowerCase()].name}</div>
            <div class="char-author" id="${char.id}Author">${byText}${char.author}</div>
          </div>
    `;
        container.appendChild(card);
    });
}

loadSecondCharacters();


