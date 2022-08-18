const cellElements = document.querySelectorAll("[data-cell]");
let EmptyCellElements = document.querySelectorAll(".empty");
const board = document.getElementById("board");
const WinTextElement = document.getElementById("winnerMessage");
const WinText = document.querySelector("[data-winning-message-text]");
const rstBtn = document.getElementById("rstBtn");
const human = "x";
const ai = "o";
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
let index1 = 0;
index1 = JSON.stringify(oldArray.length);
let turn;

startGame();

rstBtn.addEventListener("click", startGame);

function startGame() {
  turn = false;
  cellElements.forEach((cell) => {
    cell.classList.add("empty");
    cell.classList.remove(human);
    cell.classList.remove(ai);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  WinTextElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const mark = turn ? ai : human;
  placeMark(cell, mark);
  if (checkWin(mark)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHover();
    if (turn) 
    setTimeout(bestChoice,200);
  }
}

function bestChoice() {
  let index = randomIndex();
  cell = emptySquares()[index];
  placeMark(cell, ai);
  swapTurn();
  setBoardHover();
  if (checkWin(ai)) {
    swapTurn();
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
}

function randomIndex() {
  let n = emptySquares().length;
  let index = Math.floor(Math.random() * 10);
  if (index < n) return index;
  else {
    return 0;
  }
}

function emptySquares() {
  return (EmptyCellElements = document.querySelectorAll(".empty"));
}

function placeMark(cell, mark) {
  cell.classList.remove("empty");
  EmptyCellElements = document.querySelectorAll(".empty");
  cell.classList.add(mark);
}

function swapTurn() {
  turn = !turn;
}

function setBoardHover() {
  board.classList.remove(ai);
  board.classList.remove(human);
  if (turn) {
    board.classList.add(ai);
  } else {
    board.classList.add(human);
  }
}

function checkWin(mark) {
  return WinCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(mark);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(human) || cell.classList.contains(ai);
  });
}

function endGame(draw) {
  if (draw) {
    WinText.innerText = `Draw!!..`;
    const obj = {
      slno: index1,
      player1 : "Human",
      player2 : "Computer(AI)",
      winner: "--",
    };
    oldArray.push(obj);
    localStorage.setItem("array",JSON.stringify(oldArray));
  } else {
    const win = (turn ? "Computer(AI)" : "Human");
    WinText.innerText = `${turn ? "You Loose !!.." : "You Win!!.."}`;
    const obj = {
      slno: index1,
      player1 : "Human",
      player2 : "Computer(AI)",
      winner: win,
    };
    oldArray.push(obj);
    localStorage.setItem("array",JSON.stringify(oldArray));
  }
  WinTextElement.classList.add("show");
}
