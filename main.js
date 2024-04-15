const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const waysToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let spacesOpen = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let gameRunning = false;

startGame()

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = ("It is " + currentPlayer + "'s Turn!");
    gameRunning = true;
}

function cellClicked() {
    const cellNum = this.getAttribute("cellNum");
    if(spacesOpen[cellNum] != "" || gameRunning == false) {
        return;
    }

    updateCell(this, cellNum);
    checkWinner();
}

function updateCell(cell, index) {
    spacesOpen[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    if(currentPlayer == "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    };
    statusText.textContent = ("It is " + currentPlayer + "'s Turn!");
}

function checkWinner() {
    let roundWon = false;
    
    for(let i = 0; i < waysToWin.length; i++) {
        const condition = waysToWin[i];
        const cellA = spacesOpen[condition[0]];
        const cellB = spacesOpen[condition[1]];
        const cellC = spacesOpen[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if(roundWon == true) {
        const win = new Audio('win.mp3');
        Audio.volume = 1;
        win.play();
        statusText.textContent = (currentPlayer + " wins!");
        gameRunning = false;
    } else if(!spacesOpen.includes("")) {
        const draw = new Audio('draw.mp3');
        draw.play();
        statusText.textContent = ("It's a Draw!");
        gameRunning = false;
    } else {
        if(currentPlayer == "X") {
            const pop = new Audio('pop-1.mp3');
            pop.play();
        } else {
            const pop = new Audio('pop-2.mp3');
            pop.play();
        }
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    spacesOpen = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = ("It is " + currentPlayer + "'s Turn!");
    cells.forEach(cell => cell.textContent = "");
    gameRunning = true;
}