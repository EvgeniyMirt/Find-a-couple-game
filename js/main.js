const NEW_GAME = 'Новая игра';
const STOP_GAME = 'Завершить';
const $start = document.getElementById('start');
const $imageIcons = document.getElementsByTagName('svg');
const $questionIcons = document.getElementsByTagName('span');
const timer = document.getElementsByTagName('svg');
const $tiles = document.querySelectorAll('.tile');
const $playingField = document.querySelector('.playingField');
const $selectDifficulty = document.querySelector('select');
let difficulty = 8_000;

let map = new Map();
let clas =  0;

function selectDifficulty(e) {
    difficulty = +e.target.value;
};

function compareImages(e) {

    if (e.target.nodeName === 'DIV') {
        e.target.firstElementChild.classList.add('hide');
        e.target.lastElementChild.classList.remove('hide');
    } else {
        e.target.parentNode.firstElementChild.classList.add('hide');
        e.target.parentNode.lastElementChild.classList.remove('hide');
    };

    if (e.target.nodeName != 'DIV') {
        if (map.size === 1) {
            map.set(1, e.target.parentNode);
        };
        
        if (map.size === 0) {
            map.set(0, e.target.parentNode);
        };
    } else {
        if (map.size === 1) {
            map.set(1, e.target);
        };
        
        if (map.size === 0) {
            map.set(0, e.target);
        };
    };

    console.log();

    if (map.size === 2) {
        if (map.get(0).dataset.tile != map.get(1).dataset.tile) {
            let $first = map.get(0);
            let $second = map.get(1);
            setTimeout(() => {
                $first.firstElementChild.classList.remove('hide');
                $first.lastElementChild.classList.add('hide');
                $second.firstElementChild.classList.remove('hide');
                $second.lastElementChild.classList.add('hide');
            }, 1000);
            map.clear();
        }else {
            map.clear();  
        };
    };
};


function startStopGame(e) {
    showHide($imageIcons, $questionIcons);
    sort($playingField);


    if ($start.innerText === NEW_GAME) {
        $start.innerText = STOP_GAME;
    } else {
        $start.innerText = NEW_GAME;
    }; 
};

function sort(tilesColl) {
    tilesColl.innerHTMl = '';
[...tilesColl.children]
.sort(() => Math.random() - 0.5)
  .forEach(v => tilesColl.append(v));
};

function showHide(imageIconsColl, questionIconsColl) {
    for (let index = 0; index < imageIconsColl.length; index++) {
        const image = imageIconsColl[index];
        const question = questionIconsColl[index];
        image.classList.remove('hide');
        question.classList.add('hide');
    };
    setTimeout(() => {
        for (let index = 0; index < imageIconsColl.length; index++) {
            const image = imageIconsColl[index];
            const question = questionIconsColl[index];
            image.classList.add('hide');
            question.classList.remove('hide');
        };
    }, difficulty);  
};

$start.addEventListener('click', startStopGame);
$selectDifficulty.addEventListener('change', selectDifficulty);

$tiles.forEach(tile => {
    tile.addEventListener('click', compareImages)
});