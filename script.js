const board = document.getElementById('game-board');
const gridSize = 8;
const candyColors = ['#ff66b2', '#66ff66', '#66ccff', '#ffcc33', '#ff6666', '#33cc33'];
let candies = [];

// Generate a random candy grid
function generateBoard() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const candy = document.createElement('div');
        candy.classList.add('candy');
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
        candy.style.backgroundColor = randomColor;
        board.appendChild(candy);
        candies.push(candy);
    }
}

// Handle candy clicks and swapping
let selectedCandy = null;

board.addEventListener('click', function(event) {
    if (event.target.classList.contains('candy')) {
        if (!selectedCandy) {
            selectedCandy = event.target;
            selectedCandy.style.outline = "2px solid #333";
        } else {
            const swappedColor = selectedCandy.style.backgroundColor;
            selectedCandy.style.backgroundColor = event.target.style.backgroundColor;
            event.target.style.backgroundColor = swappedColor;
            selectedCandy.style.outline = "";
            selectedCandy = null;
            checkMatches();
        }
    }
});

// Check for matching candies in a row or column
function checkMatches() {
    // We will check only horizontal and vertical matches of 3 or more candies
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize - 2; col++) {
            const index = row * gridSize + col;
            const color = candies[index].style.backgroundColor;
            if (candies[index + 1].style.backgroundColor === color && candies[index + 2].style.backgroundColor === color) {
                candies[index].style.backgroundColor = 'white';
                candies[index + 1].style.backgroundColor = 'white';
                candies[index + 2].style.backgroundColor = 'white';
            }
        }
    }

    for (let col = 0; col < gridSize; col++) {
        for (let row = 0; row < gridSize - 2; row++) {
            const index = row * gridSize + col;
            const color = candies[index].style.backgroundColor;
            if (candies[index + gridSize].style.backgroundColor === color && candies[index + 2 * gridSize].style.backgroundColor === color) {
                candies[index].style.backgroundColor = 'white';
                candies[index + gridSize].style.backgroundColor = 'white';
                candies[index + 2 * gridSize].style.backgroundColor = 'white';
            }
        }
    }

    // Drop candies down to fill empty spots
    setTimeout(() => {
        for (let i = 0; i < candies.length; i++) {
            if (candies[i].style.backgroundColor === 'white') {
                candies[i].style.backgroundColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            }
        }
    }, 500);
}

generateBoard();
