const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startGame");
const restartButton = document.getElementById("restartGame");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("bestScore");
let score = 0;
let cardsChosen = [];
let cardsMatched = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameContainer.innerHTML = '';
    const colors = ["red", "blue", "green", "orange", "purple", "red", "blue", "green", "orange", "purple"];
    const shuffledColors = shuffle(colors);
    shuffledColors.forEach((color, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute('data-color', color);
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (cardsChosen.length < 2 && !this.classList.contains('flipped')) {
        const color = this.getAttribute('data-color');
        this.style.backgroundColor = color;
        this.classList.add('flipped');
        cardsChosen.push(this);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const [cardOne, cardTwo] = cardsChosen;

    if (cardOne.getAttribute('data-color') === cardTwo.getAttribute('data-color')) {
        cardsMatched.push(cardOne, cardTwo);
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
    } else {
        cardOne.style.backgroundColor = '';
        cardTwo.style.backgroundColor = '';
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
    }

    cardsChosen = [];
    score++;
    scoreDisplay.textContent = score;

    if (cardsMatched.length === 10) {
        restartButton.disabled = false;
        const bestScore = localStorage.getItem('bestScore');
        if (!bestScore || score < bestScore) {
            localStorage.setItem('bestScore', score);
            bestScoreDisplay.textContent = score;
        }
    }
}

function startGame() {
    cardsChosen = [];
    cardsMatched = [];
    score = 0;
    scoreDisplay.textContent = score;
    bestScoreDisplay.textContent = localStorage.getItem('bestScore') || '-';
    createBoard();
    restartButton.disabled = true;
}

function restartGame() {
    startGame();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);


