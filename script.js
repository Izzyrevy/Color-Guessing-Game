const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let score = 0;
let targetColor;

const colorBox = document.querySelector('[data-testid="colorBox"]');
const gameInstructions = document.querySelector('[data-testid="gameInstructions"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const colorOptionsContainer = document.getElementById('colorOptions');
const wrongIcon = document.getElementById('wrong')
const rightIcon = document.getElementById('right')




function startNewGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    gameStatus.textContent = '';
    scoreDisplay.textContent = `Score: ${score}`;
    scoreDisplay.style.fontWeight = 'bold';
    scoreDisplay.style.color = '#fff';
    scoreDisplay.style.fontSize = '20px';
    colorOptionsContainer.innerHTML = '';
    generateColorOptions();
}

function generateColorOptions() {
    const shuffledColors = colors.sort(() => 0.5 - Math.random()).slice(0, 6);
    shuffledColors.forEach(color => {
        const button = document.createElement('div');
        button.classList.add('color-option');
        button.style.backgroundColor = color;
        button.addEventListener('click', () => checkGuess(color));
        colorOptionsContainer.appendChild(button);
    });
}

function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        score++;
        gameStatus.classList.add('correct');
        gameInstructions.textContent = 'Correct!';
        rightIcon.style.display = 'inline'

        setTimeout(() => {
            gameStatus.classList.remove('correct');
            gameInstructions.textContent = '';
            rightIcon.style.display = 'none'
            startNewGame();
        }, 1000); 
    } else {
        gameStatus.classList.add('wrong');
        gameInstructions.textContent = "Wrong! Try again.";
        wrongIcon.style.display = 'inline'
        score = 0;
        setTimeout(() => {
            gameStatus.classList.remove('wrong');
            gameInstructions.textContent = 'Guess the correct color!';
            wrongIcon.style.display = 'none'
        }, 1000);
    }
    scoreDisplay.textContent = `Score: ${score}`;
}


newGameButton.addEventListener('click', () => {
    gameInstructions.textContent = 'Guess the correct color!';
    score = 0;
    startNewGame();
});

startNewGame();