const overlay = document.getElementById('overlay');
const minimizeBtn = document.getElementById('minimize');
const restoreBtn = document.getElementById('restore');
const langToggle = document.getElementById('langToggle');
const informationHeader = document.getElementById('informationHeader');
const informationWhatIsChaoticverse = document.getElementById('whatIsChaoticverse');
const informationResistance = document.getElementById('resistance');
const informationHowChaoticverseIsWorking1 = document.getElementById('howChaoticverseIsWorking1');
const informationHowChaoticverseIsWorking2 = document.getElementById('howChaoticverseIsWorking2');
const informationSearchNewPeople = document.getElementById('searchNewPeople');
const informationNewCharacters = document.getElementById('newCharacters');

const informationHeaderEN = `Information`;
const informationWhatIsChaoticverseEN = `The Chaoticverse is a massive crossover project involving multiple Undertale and Deltarune fandom projects,
            united within the context of interconnected stories. Chaoticverse has a key protagonist and antagonist,
            who are the catalysts for most of the events. However, the project is dedicated to the stories of other, equally significant
            characters who directly influence the key events. As long as the fandom lives on, chaos continues to grow in
            Chaoticverse. The only question is where this chaos will lead. To destruction or a new future?`;
const informationResistanceEN = `Resistance was a story about the sons of Mei, the guardian of the Tree of Magic: 
            Create and Chaos. It was about how their story began in Poisetale, how it was destroyed by one scientist, 
            and then turned into a large-scale struggle for the life of the multiverse. The protagonist of the story was Geno. 
            However, this project fell apart due to insufficient development and too much similarity to another project. 
            Therefore, work was done to correct the mistakes, form a new view of the fandom, study many other works, 
            and create new characters. Thus, Chaoticverse became a reboot of Resistance with new perspectives and ideas.`;
const informationHowChaoticverseIsWorking1EN = `The principle of existence of Chaoticverse lies in its arrangement 
            of timelines and distortions. The Chaoticverse is a huge time tree, where each turn is a deviation from another story.
            In other words, if Undertale has branches as
            <a href="https://loverofpiggies.tumblr.com/ATfancomic">Aftertale</a>,
            <a href="https://rahafwabas.tumblr.com">Something New</a>,
            <a href="https://horrortalecomic.tumblr.com">Horrortale</a>,
            <a href="https://www.tumblr.com/thezombiedogz">Disbelief</a>
            and others, then the Chaoticverse branches can serve as
            <a href="https://www.tumblr.com/xtaleunderverse">Underverse</a>,
            <a href="https://tatatale.tumblr.com">ALIVE</a>,
            <a href="https://www.tumblr.com/galacii-gallery">Shattered Fates</a>,
            <a href="https://www.tumblr.com/admixverse-official">Admixverse</a>, etc.<br><br>`;
const informationHowChaoticverseIsWorking2EN = `The reason for this phenomenon was the actions of Error in
            <a href="https://ut-storyshift.tumblr.com">Storyshift</a>. After he used his special attack once, the 
            entire Storyshift with its branches Storyfell, Storyswap, etc. were destroyed almost instantly. 
            This corrupted the time stream of the multiverse and created the first time distortion, 
            dividing the multiverse into two time streams for the first time: where Storyshift and its alternate versions no longer exist, 
            and where Storyshift and its alternatives survived but were restarted.
            Following this event, new time distortions began to emerge. Such changes led to the fact that 
            characters whose alternative versions should not exist gradually began to appear, and characters 
            with powers of foresight or knowledge of the future stopped seeing it clearly. Moreover, the 
            further spread of the “players” beyond their timelines and AU also contributed to this.
            So the multiverse began to descend into chaos and some had to adapt to the new conditions, 
            while others remained unaware or did not notice the problem.<br>`;
const informationSearchNewPeopleEN = `The project is extremely large and voluminous in production, so our 
            team is actively looking for volunteers and those willing to help in the development of our project. We 
            are looking for comic book writers and artists, mostly from the Russian segment. If you are there from, 
            then you can find out all the useful information in our <a href="https://vk.com/sole_production_ut ">VK group</a> 
            <a href="https://vk.com/topic-196152977_54195754 ">discussion</a>. If you are not from the ru segment, 
            but still want to help, write in our <a href="https://www.tumblr.com/sole-production-ut ">Tumblr blog</a> personal messages, 
            we are open to everyone.`;
const informationNewCharactersEN = `At the moment, the project practically does not accept applications for 
            adding new characters to the project, but in the future it is planned to organize an application form.`;

const informationHeaderRU = `Информация`;
const informationWhatIsChaoticverseRU = `Проект Chaoticverse - масштабный проект-кроссовер множества проектов фандома Undertale и Deltarune,
            объединенных в рамках взаимосвязанных историй. У Chaoticverse есть ключевой главный герой и антагонист,
            являющиеся катализаторами большинства событий. Однако проект посвящен историям и других, не менее значимых
            персонажей, прямо влияющих на события ключевых. До тех пор, пока фандом живёт, хаос продолжает расти в
            Chaoticverse. Вопрос лишь в том, к чему приведет этот хаос. К погибели или новому будущему?`;
const informationResistanceRU = `Resistance был историей о сыновьях Мей - хранителя Древа Магии: Криейта и Хаоса. О том, как их история
            зародилась в Poisetale, как разрушилась по вине одного ученого и затем перетекла в масштабную борьбу за
            жизнь мультивселенной. А протагонистом истории стал Гено. Однако данный проект развалился в силу
            слишком недостаточной проработки и слишком сильной схожести с другим проектом. Поэтому были проведены
            работы над ошибками, формирование нового взгляда на фандом, изучение множества других работ и создание
            новых персонажей. Так Chaoticverse стал перезапуском Resistance с новыми взглядами и идеями.`;
const informationHowChaoticverseIsWorking1RU = `Принцип работы Chaoticverse заключается в его устройстве временных линий и искажений.
            Chaoticverse представляет собой огромное временное древо, где каждый виток - это отклонение от другой истории.
            Иначе говоря, если у Undertale существуют ответвления вроде
            <a href="https://loverofpiggies.tumblr.com/ATfancomic">Aftertale</a>,
            <a href="https://rahafwabas.tumblr.com">Something New</a>,
            <a href="https://horrortalecomic.tumblr.com">Horrortale</a>,
            <a href="https://www.tumblr.com/thezombiedogz">Disbelief</a>
            и другие, то у Chaoticverse ответвлениями могут служить
            <a href="https://www.tumblr.com/xtaleunderverse">Underverse</a>,
            <a href="https://tatatale.tumblr.com">ALIVE</a>,
            <a href="https://www.tumblr.com/galacii-gallery">Shattered Fates</a>,
            <a href="https://www.tumblr.com/admixverse-official">Admixverse</a> и т.д.<br><br>`;
const informationHowChaoticverseIsWorking2RU = `Причиной подобного явления стали действия Эррора в
            <a href="https://ut-storyshift.tumblr.com">Storyshift</a>. После того как он использовал единожды свою
            специальную атаку, весь Storyshift с его ответвлениями Storyfell, Storyswap и др. были уничтожены практически
            моментально. Это повредило поток времени мультивселенной и создало первое временное искажение, впервые
            разделив мультивселенную на два временных потока: там, где Storyshift и его альтернативных версий больше
            не существует, и там, где Storyshift и его альтернативы сохранились, но были перезапущены.
            Вслед за этим событием начали зарождаться и новые временные искажения. Подобные изменения привели к тому,
            что персонажи, чьих альтернативных версий не должно быть существовать, начали постепенно появляться,
            а персонажи обладающие силами предвидения или знания будущего, перестали видеть его отчетливо. Более того,
            дальнейшее распространение “игроков” за пределы своих таймлайнов и AU также способствовало этому.
            Так мультивселенная начала погружаться в хаос и некоторым пришлось адаптироваться к новым условиям,
            пока другие оставались в неведении или не замечали проблемы.<br>
            С тех пор в Chaoticverse вероятность появления каких-либо неожиданных столкновений стала в разы выше, а
            встреча двух одинаковых внекодовых стало нормой. Но некоторые временные потоки точно не могут
            существовать в рамках Chaotricverse, такие, как
            <a href="https://alphatale.fandom.com/wiki/Alphaverse">Alphaverse</a>,
            <a href="https://truegodverse.fandom.com/wiki/Godverse_Wiki">GODVERSE</a> и им подобные.
            Принцип зарождения и существования данных историй сильно разнится с другими, а потому они являются
            исключениями в данном проекте.`;
const informationSearchNewPeopleRU = `Проект является крайне большим и объемным в производстве, поэтому наша команда
            активно ищет волонтеров и желающих помочь в развитие нашего проекта. Мы ищем сценаристов
            комиксов и художников, по большей части из русского сегмента. Если вы именно такой, то
            всю полезную информацию вы можете узнать в
            <a href="https://vk.com/topic-196152977_54195754">обсуждении</a> нашей
            <a href="https://vk.com/sole_production_ut">группы ВК</a>. Если же вы не из
            ру-сегмента, но все равно хотите помочь, пишите в личные сообщения нашего
            <a href="https://www.tumblr.com/sole-production-ut">Tumblr блога</a>,
            мы открыты каждому желающему.`;
const informationNewCharactersRU = `На данный момент проект практически не принимает заявки на добавление новых персонажей в проект,
            однако в дальнейшем планируется организовать форму для заявок.`;

let currentLang = 'RU';

langToggle.addEventListener('click', () => {
    if (currentLang === 'RU') {
        informationHeader.textContent = informationHeaderEN;
        informationWhatIsChaoticverse.textContent = informationWhatIsChaoticverseEN;
        informationResistance.textContent = informationResistanceEN;
        informationHowChaoticverseIsWorking1.innerHTML = informationHowChaoticverseIsWorking1EN;
        informationHowChaoticverseIsWorking2.innerHTML = informationHowChaoticverseIsWorking2EN;
        informationSearchNewPeople.innerHTML = informationSearchNewPeopleEN;
        informationNewCharacters.textContent = informationNewCharactersEN;
        langToggle.textContent = 'RU';
        currentLang = 'EN';
    } else {
        informationHeader.textContent = informationHeaderRU;
        informationHeader.textContent = informationHeaderRU;
        informationWhatIsChaoticverse.textContent = informationWhatIsChaoticverseRU;
        informationResistance.textContent = informationResistanceRU;
        informationHowChaoticverseIsWorking1.innerHTML = informationHowChaoticverseIsWorking1RU;
        informationHowChaoticverseIsWorking2.innerHTML = informationHowChaoticverseIsWorking2RU;
        informationSearchNewPeople.innerHTML = informationSearchNewPeopleRU;
        informationNewCharacters.textContent = informationNewCharactersRU;
        langToggle.textContent = 'EN';
        currentLang = 'RU';
    }
});

minimizeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restoreBtn.style.display = 'flex';
});

restoreBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    restoreBtn.style.display = 'none';
});