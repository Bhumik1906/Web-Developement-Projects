console.log("Tic Tac Toe");

let turn = "O";
let gameOver = false;

const info = document.querySelector(".info");
const boxes = Array.from(document.getElementsByClassName("box"));
const boxText = document.getElementsByClassName("boxText");

const changeTurn = () => {
    if (turn === "X") {
        return "O";
    } else {
        return "X";
    }
};

const checkWin = () => {
    let wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    wins.forEach(e => {
        if (
            boxText[e[0]].innerText !== "" &&
            boxText[e[0]].innerText === boxText[e[1]].innerText &&
            boxText[e[1]].innerText === boxText[e[2]].innerText
        ) {
            gameOver = true;
            let winner = boxText[e[0]].innerText;
            info.innerText = winner + " Won!";
            info.classList.remove("win-x", "win-o");

            if (winner === "X") {
                info.classList.add("win-x");
            } else {
                info.classList.add("win-o");
            }

            disableBoxes();
        }
    });
};

const checkDraw = () => {
    let filled = Array.from(boxText).every(e => e.innerText !== "");
    if (filled && !gameOver) {
        info.innerText = "It's a Draw!";
        gameOver = true;
        disableBoxes();
    }
};

const disableBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = "none");
};

const enableBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = "auto");
};

boxes.forEach((element, index) => {
    let text = element.querySelector(".boxText");
    element.addEventListener("click", () => {
        if (text.innerText === "" && !gameOver) {
            text.innerText = turn;
            checkWin();
            checkDraw();
            if (!gameOver) {
                turn = changeTurn();
                info.innerText = turn + "'s Turn!";
            }
        }
    });
});

/* RESET */
document.getElementById("reset").addEventListener("click", () => {
    Array.from(boxText).forEach(e => e.innerText = "");
    turn = "O";
    gameOver = false;
    info.innerText = "O's Turn!";
    info.classList.remove("win-x", "win-o");
    enableBoxes();
});
