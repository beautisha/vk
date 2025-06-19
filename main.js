const $arenaEl = document.querySelector('.arenas');
const $form = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    ],
    draw: 'Ничья - это тоже победа!'
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    id: 1,
    name: 'Scorpion',
    hp: 100,
    img: './assets/players/fightingStance/scorpion.gif',
    weapon: ['gun', 'kunai'],
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    id: 2,
    name: 'Subzero',
    hp: 100,
    img: './assets/players/fightingStance/subzero.gif',
    weapon: ['gun', 'kunai'],
    changeHP,
    elHP,
    renderHP,
};

function createPlayer(playerObj) {
    const $rootEl = document.createElement('div');
    const $progressEl = document.createElement('div');
    const $charEl = document.createElement('div');

    $rootEl.classList.add('player'+playerObj.id);
    $progressEl.classList.add('progressbar');
    $charEl.classList.add('character');

    $rootEl.appendChild($progressEl);
    $rootEl.appendChild($charEl);

    const $lifeEl = document.createElement('div');
    $lifeEl.style.width = playerObj.hp + '%';
    const $nameEl = document.createElement('div');
    $nameEl.innerText = playerObj.name;

    $lifeEl.classList.add('life');
    $nameEl.classList.add('name');

    $progressEl.appendChild($lifeEl);
    $progressEl.appendChild($nameEl);

    $imgEl = document.createElement('img');
    $imgEl.src = playerObj.img;

    $charEl.appendChild($imgEl);

    $arenaEl.appendChild($rootEl);
}

function changeHP(numb) {
    this.hp -= numb;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player'+ this.id + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function showResult(name) {
    const $resultTitle = document.createElement('div');
    $resultTitle.classList.add('loseTitle');
    if (name) {
        $resultTitle.innerText = name + ' wins';
    } else {
        $resultTitle.innerText = 'draw';
    }
    return $resultTitle;
}

function rand(num) {
    return(Math.ceil(Math.random() * num +0.00001));
}

function createReloadButton() {
    const $reloadWrap = document.createElement('div');
    $reloadWrap.classList.add('reloadWrap');
    const $reloadButton = document.createElement('button');
    $reloadButton.classList.add('button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $arenaEl.appendChild($reloadWrap);

    $reloadButton.addEventListener('click', function() {
        window.location.reload()
    })
}

const ans = {};

function enemyAttack() {
    const hit = ATTACK[rand(3)-1];
    const defence = ATTACK[rand(3)-1];

    return {
        value: rand(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};
    for (let item of $form) {
        if (item.checked && item.name === 'hit') {
            attack.value = rand(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

function generateLogs(type, player1, player2, damage) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    let text = LOGS[type][rand(LOGS[type].length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    
    switch (type) {
        case 'start':
            text = LOGS['start'].replace('[time]',`${date.getHours()}:${minutes}`).replace('[player1]',player1.name).replace('[player2]', player2.name);
            break;
        case 'hit':
            text = LOGS['hit'][rand(LOGS['hit'].length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name) + ' ' + damage + ' урона. ' + player2.hp + '/100.';
            break;
        case 'defence':
            text = LOGS['defence'][rand(LOGS['defence'].length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name) + ' Урон не нанесен. ' + player2.hp + '/100.';
            break;
        case 'end':
            text = LOGS['end'][rand(LOGS['end'].length-1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        default:
            break;
    }

    const el = `<p>${hours}:${minutes}. ${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

$form.addEventListener('submit', function(event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const attack = playerAttack();
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, attack.value);
    } else {
        generateLogs('defence', player1, player2);
    }
    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }
    
    if (player1.hp === 0 || player2.hp === 0) {
        $form.style.display = 'none';
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        generateLogs('end', player2, player1);
        $arenaEl.appendChild(showResult(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        generateLogs('end', player1, player2);
        $arenaEl.appendChild(showResult(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        generateLogs('draw');
        $arenaEl.appendChild(showResult());
    }
})

createPlayer(player1);
createPlayer(player2);
generateLogs('start', player1, player2);