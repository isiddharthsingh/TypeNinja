const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "Cozy lummox gives smart squid who asks for job pen.",
    "A wizard's job is to vex chumps quickly in fog.",
    "Watch Jeopardy!, Alex Trebek's fun TV quiz game.",
    "Jack quickly amazed the professor with five dozen liquor jugs.",
    "The five boxing wizards jump quickly.",
    "Bright vixens jump; dozy fowl quack.",
    "Quick wafting zephyrs vex bold Jim.",
    "Jinxed wizards pluck ivy from the big quilt.",
    "The job requires extra pluck and zeal from every young wage earner.",
    "Amazingly few discotheques provide jukeboxes.",
    "Grumpy wizards make toxic brew for the evil queen and jack.",
    "Glib jocks quiz nymph to vex dwarf.",
    "Sphinx of black quartz, judge my vow.",
    "How quickly daft jumping zebras vex.",
    "Two driven jocks help fax my big quiz.",
    "The lazy dog jumped over the quick brown fox.",
    "Heavy boxes perform quick waltzes and jigs."
];

const quoteElement = document.getElementById('quote');
const inputElement = document.getElementById('input');
const timeElement = document.getElementById('time');
const accuracyElement = document.getElementById('accuracy');
const wpmElement = document.getElementById('wpm');
const restartButton = document.getElementById('restart');

let startTime;
let timer;
let typedCharacters = 0;
let correctCharacters = 0;

function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

function displayNewQuote() {
    const newQuote = getRandomSentence();
    quoteElement.innerText = newQuote;
}

inputElement.addEventListener('input', () => {
    if (!startTime) {
        startTime = new Date().getTime();
        timer = setInterval(updateStats, 100);
    }

    const quoteText = quoteElement.innerText;
    const typedText = inputElement.value;
    typedCharacters = typedText.length;

    let correctCount = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === quoteText[i]) {
            correctCount++;
        }
    }
    correctCharacters = correctCount;

    if (typedCharacters >= quoteText.length) {
        stopGame();
    }
});

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        event.preventDefault();
    }
});

restartButton.addEventListener('click', () => {
    resetGame();
});

function updateStats() {
    const currentTime = new Date().getTime();
    const timeElapsed = (currentTime - startTime) / 1000;
    timeElement.innerText = timeElapsed.toFixed(1);

    const accuracy = (correctCharacters / typedCharacters) * 100 || 0;
    accuracyElement.innerText = accuracy.toFixed(1);

    const wordsPerMinute = (typedCharacters / 5) / (timeElapsed / 60) || 0;
    wpmElement.innerText = wordsPerMinute.toFixed(1);
}

function stopGame() {
    clearInterval(timer);
    inputElement.disabled = true;
    alert("Game over! You've finished typing the quote.");
}

function resetGame() {
    clearInterval(timer);
    startTime = null;
    timer = null;
    typedCharacters = 0;
    correctCharacters = 0;
    inputElement.value = '';
    inputElement.disabled = false;
    timeElement.innerText = '0';
    accuracyElement.innerText = '0';
    wpmElement.innerText = '0';
    displayNewQuote();
}

// Initialize the game with a random quote
displayNewQuote();
