const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const WinTextElement = document.getElementById("winnerMessage");
const WinText = document.querySelector("[data-winning-message-text]");
const rstBtn = document.getElementById("rstBtn");
const x_mark = "x";
const o_mark = "o";
let choice;
const WinCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let oldArray = JSON.parse(localStorage.getItem("array"));
let index = 0;
index = JSON.stringify(oldArray.length);
let turn;

startGame();

rstBtn.addEventListener("click", startGame);

function startGame() {
  turn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_mark);
    cell.classList.remove(o_mark);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  WinTextElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const mark = turn ? o_mark : x_mark;
  placeMark(cell, mark);
  if (checkWin(mark)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHover();
  }
}

function placeMark(cell, mark) {
  cell.classList.add(mark);
}

function swapTurn() {
  turn = !turn;
}

function setBoardHover() {
  board.classList.remove(o_mark);
  board.classList.remove(x_mark);
  if (turn) {
    board.classList.add(o_mark);
  } else {
    board.classList.add(x_mark);
  }
}

function checkWin(mark) {
  return WinCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(mark);
    });
  });
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_mark) || cell.classList.contains(o_mark) 
    })
}

function endGame(draw) {
  if (draw) {
    WinText.innerText = `Draw!!..`;
    const obj = {
      slno: index,
      player1 : "X",
      player2 : "O",
      winner: "--",
    };
    oldArray.push(obj);
    localStorage.setItem("array",JSON.stringify(oldArray));
  } else {
    const win = (turn ? "O" : "X");
    WinText.innerText = `${win} Wins!!..`;
    const obj = {
      slno: index,
      player1 : "X",
      player2 : "O",
      winner: win,
    };
    oldArray.push(obj);
    localStorage.setItem("array",JSON.stringify(oldArray));
  }
  WinTextElement.classList.add("show");
}


