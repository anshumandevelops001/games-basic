
let turn = document.querySelector("#turn");
let boxes = document.querySelectorAll(".box");
let turnO = true;
let count = 0;
turn.innerText = "O's Turn";
let msgContainer = document.querySelector(".msgContainer");
let winner = document.querySelector('#winner');
let newGame = document.querySelector('#newBtn');
let resetBtn = document.querySelector("#resetBtn");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            turn.innerText = "X's Turn";
            box.style.backgroundColor = "yellow";
        }
        else {
            box.innerText = "X";
            turnO = true;
            turn.innerText = "O's Turn";
            box.style.backgroundColor = "pink";
        }
        box.disabled = true;
        count++;
        let isWinnerFound = checkWinner();
        if (count == 9 && !isWinnerFound) {
            gameDraw();
        }
    })
});

const gameDraw = () => {
    winner.innerText = 'Game was a Draw.';
    msgContainer.classList.remove('hide');
    disableBoxes();
}

function checkWinner() {
    winPatterns.forEach((arr) => {
        let pos1 = boxes[arr[0]].innerText;
        let pos2 = boxes[arr[1]].innerText;
        let pos3 = boxes[arr[2]].innerText;
        console.log(arr, pos1, pos2, pos3);
        if (pos1 != '' && pos2 != '' && pos3 != '') {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
                return true;
            }
        }
    });
};

function showWinner(whoWon) {
    winner.innerText = `Congratulations, Winner is ${whoWon}`;
    turn.innerText = "";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    };
};

const resetGame = () => {
    turnO = true;
    turn.innerText = "O's Turn";
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "white";
    };
};

newGame.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);