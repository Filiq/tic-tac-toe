const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMsg = document.getElementById("winningMessage");
const mode = document.getElementById("mode");
const restart = document.getElementById("restart");
const xClass = "x";
const oClass = "o";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();
function startGame() {
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
}

function handleClick(e) {
  cell = e.target;
  const currentClass = circleTurn ? oClass : xClass;
  //Place Mark
  placeMark(cell, currentClass);
  //Check For Win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //Check For Draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //Switch Turns
    switchTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsg.innerText = "Draw.";
  } else {
    winningMsg.innerText = `${circleTurn ? "O" : "X"} is winner.`;
  }

  restart.innerText = "Play again";
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);
  if (circleTurn) {
    board.classList.add(oClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return Array.from(cellElements).every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

mode.addEventListener("click", changeMode);

function changeMode() {
  let primary = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-color"
  );
  let secondary = getComputedStyle(document.documentElement).getPropertyValue(
    "--secondary-color"
  );

  if (primary === "#fff" && secondary === "#000") {
    document.documentElement.style.setProperty("--primary-color", "#000");
    document.documentElement.style.setProperty("--secondary-color", "#fff");
  } else {
    document.documentElement.style.setProperty("--primary-color", "#fff");
    document.documentElement.style.setProperty("--secondary-color", "#000");
  }
}

restart.addEventListener("click", restartGame);

function restartGame() {
  restart.innerText = "Restart";
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.className = "cell";
  });
  board.className = "board";
  winningMsg.innerText = "";
  startGame();
}
