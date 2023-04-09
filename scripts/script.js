// default values
let userChoice = "x";
let otherChoice = "o";
let boardCells = [];
let playerTurn = "x";
let isGameOver = false;
let playBoard = [];

const gameStartSectionEL = document.querySelector(".game-start-section");
const playBoardEl = document.querySelector(".play-board");
const gameResultSectionEl = document.querySelector(".game-result-section");
const gameRestartSectionEl = document.querySelector(".game-restart-section");
const playerTurnImgEl = document.querySelector(".player-turn__img");
const winnerImgEl = document.querySelector(".winner");
const playerPointEl = document.querySelector(".player-points");
const tiesPointEl = document.querySelector(".ties-points");
const cpuPointEl = document.querySelector(".cpu-points");

const getUserChoice = function (ev) {
  userChoice = ev.target.value;
  otherChoice = userChoice == "o" ? "x" : "o";
};

const init = function () {
  gameStartSectionEL.classList.add("hide");
  playBoardEl.classList.remove("hide");
  gameResultSectionEl.classList.add("hide");
  gameRestartSectionEl.classList.add("hide");
  document.querySelector(".overlay").classList.add("hide");
  playerPointEl.textContent = 0;
  tiesPointEl.textContent = 0;
  cpuPointEl.textContent = 0;

  setUpPlayBoard();
};

const startGameWithCpu = () => {
  init();
};

function playGame() {
  updateBoard();
  const gameRunningStatus = checkWinningMove(playBoard);
  console.log(playBoard);
  console.log("check for draw fn status: ", checkWinningMove(playBoard));
  // if (!checkForDraw()) {
  if (gameRunningStatus == "win") {
    isGameOver = true;
    updatePoints("win");
    // makes result section visible
    gameResultSectionEl.classList.remove("hide");
    document.querySelector(".overlay").classList.remove("hide");
    playerTurn == "x"
      ? winnerImgEl.setAttribute("src", "assets/icon-x.svg")
      : winnerImgEl.setAttribute("src", "assets/icon-o.svg");
    console.log(`${playerTurn} wins 🏆`);
  }

  // switch player turn
  playerTurn = playerTurn == "x" ? "o" : "x";

  if (!isGameOver) {
    if (playerTurn == "x") {
      // change the header icon according to player being playing
      playerTurnImgEl.setAttribute("src", "assets/icon-x-turn.svg");
      for (let i = 0; i < boardCells.length; i++) {
        let mark = boardCells[i].getAttribute("data-cell-state");
        if (mark !== "x" && mark !== "o") {
          boardCells[i].classList.remove("showY");
          boardCells[i].classList.add("showX");
        }
      }
    } else {
      playerTurnImgEl.setAttribute("src", "assets/icon-o-turn.svg");
      for (let i = 0; i < boardCells.length; i++) {
        let mark = boardCells[i].getAttribute("data-cell-state");
        if (mark !== "x" && mark !== "o") {
          boardCells[i].classList.remove("showX");
          boardCells[i].classList.add("showY");
        }
      }
    }
  }
  if (gameRunningStatus == "tie") {
    document.querySelector(".game-result").textContent = "Sorry No One Wins!";
    document.querySelector(".game-result__heading").textContent = "Draw";
    updatePoints("tie");
    gameResultSectionEl.classList.remove("hide");
  }
}

function resetGame() {
  gameStartSectionEL.classList.remove("hide");
  playBoardEl.classList.add("hide");
  gameResultSectionEl.classList.add("hide");
  gameRestartSectionEl.classList.add("hide");
  document.querySelector(".overlay").classList.add("hide");

  playerPointEl.textContent = 0;
  tiesPointEl.textContent = 0;
  cpuPointEl.textContent = 0;
  isGameOver = false;

  updateBoard();
  // resetting the last turn of the user before quitting the game
  playerTurn = "x";
}

function updatePoints(status) {
  // points section
  let playerPoint = Number(playerPointEl.textContent);
  let tiePoint = Number(tiesPointEl.textContent);
  let cpuPoint = Number(cpuPointEl.textContent);

  if (playerTurn == "x" && status == "win") {
    playerPoint += 1;
    playerPointEl.textContent = playerPoint;
  } else if (playerTurn == "o" && status == "win") {
    cpuPoint += 1;
    cpuPointEl.textContent = cpuPoint;
  } else {
    tiePoint += 1;
    tiesPointEl.textContent = tiePoint;
  }
}

function updateBoard() {
  playBoard = [
    [
      boardCells[0].getAttribute("data-cell-state"),
      boardCells[1].getAttribute("data-cell-state"),
      boardCells[2].getAttribute("data-cell-state"),
    ],
    [
      boardCells[3].getAttribute("data-cell-state"),
      boardCells[4].getAttribute("data-cell-state"),
      boardCells[5].getAttribute("data-cell-state"),
    ],
    [
      boardCells[6].getAttribute("data-cell-state"),
      boardCells[7].getAttribute("data-cell-state"),
      boardCells[8].getAttribute("data-cell-state"),
    ],
  ];
}

// adding event listener to each cell
function playMove(ev) {
  if (playerTurn == "x") {
    ev.target.classList.add("moveX");
    ev.target.classList.remove("showX");
    ev.target.setAttribute("data-cell-state", "x");
  } else {
    ev.target.classList.add("moveY");
    ev.target.classList.remove("showY");
    ev.target.setAttribute("data-cell-state", "o");
  }
}

function setUpPlayBoard() {
  // getting all the board cells
  boardCells = document.querySelectorAll(".board__cells");
  for (let i = 0; i < boardCells.length; i++) {
    boardCells[i].classList.add("showX");
  }

  boardCells.forEach((cell) => {
    // adding state to each cell ["empty", "x", "o"]
    cell.setAttribute("data-cell-state", "empty");
    cell.classList.remove("moveX");
    cell.classList.remove("moveY");
    // cell.classList.add("showX");
    cell.addEventListener("click", playMove);
    cell.addEventListener("click", playGame);
  });
}

function nextRound() {
  gameStartSectionEL.classList.add("hide");
  playBoardEl.classList.remove("hide");
  gameResultSectionEl.classList.add("hide");
  gameRestartSectionEl.classList.add("hide");
  document.querySelector(".overlay").classList.add("hide");
  playerTurnImgEl.setAttribute("src", "assets/icon-x-turn.svg");
  isGameOver = false;

  // resetting to the original state for the tie event
  document.querySelector(".game-result").textContent = "YOU WON!";
  document.querySelector(".game-result__heading").textContent =
    "TAKES THE ROUND";
  // resetting the player turn to x (x moves first)
  playerTurn = "x";

  // getting all the board cells
  boardCells = document.querySelectorAll(".board__cells");

  boardCells.forEach((cell) => {
    // adding state to each cell ["empty", "x", "o"]
    cell.setAttribute("data-cell-state", "empty");
    cell.classList.remove("moveX");
    cell.classList.remove("moveY");
    cell.classList.remove("showY");
    cell.classList.add("showX");
  });

  updateBoard();
}

function showGameRestartPopUp() {
  document.querySelector(".overlay").classList.toggle("hide");
  document.querySelector(".game-restart-section").classList.toggle("hide");
}

function checkWinningMove(pos) {
  if (
    pos[0][0] !== "empty" &&
    pos[0][0] == pos[0][1] &&
    pos[0][1] == pos[0][2]
  ) {
    return "win";
  }
  if (
    pos[1][0] !== "empty" &&
    pos[1][0] == pos[1][1] &&
    pos[1][1] == pos[1][2]
  ) {
    return "win";
  }
  if (
    pos[2][0] !== "empty" &&
    pos[2][0] == pos[2][1] &&
    pos[2][1] == pos[2][2]
  ) {
    return "win";
  }
  if (
    pos[0][0] !== "empty" &&
    pos[0][0] == pos[1][0] &&
    pos[1][0] == pos[2][0]
  ) {
    return "win";
  }
  if (
    pos[0][1] !== "empty" &&
    pos[0][1] == pos[1][1] &&
    pos[1][1] == pos[2][1]
  ) {
    return "win";
  }
  if (
    pos[0][2] !== "empty" &&
    pos[0][2] == pos[1][2] &&
    pos[1][2] == pos[2][2]
  ) {
    return "win";
  }
  if (
    pos[0][0] !== "empty" &&
    pos[0][0] == pos[1][1] &&
    pos[1][1] == pos[2][2]
  ) {
    return "win";
  }
  if (
    pos[0][2] !== "empty" &&
    pos[0][2] == pos[1][1] &&
    pos[1][1] == pos[2][0]
  ) {
    return "win";
  }

  // draw case
  if (
    playBoard[0].every((value) => value !== "empty") &&
    playBoard[1].every((value) => value !== "empty") &&
    playBoard[2].every((value) => value !== "empty")
  ) {
    isGameOver = true;
    console.log("game draw");
    return "tie";
  }

  // game draw case
  return "play";
}

document.querySelector("#x-mark").addEventListener("click", getUserChoice);
document.querySelector("#o-mark").addEventListener("click", getUserChoice);
document
  .querySelector(".btn--player")
  .addEventListener("click", startGameWithCpu);
document.querySelector(".btn--quit").addEventListener("click", resetGame);
document.querySelector(".btn--next-rd").addEventListener("click", nextRound);
document
  .querySelector(".restart-icon")
  .addEventListener("click", showGameRestartPopUp);
document
  .querySelector(".btn--cancel")
  .addEventListener("click", showGameRestartPopUp);
document.querySelector(".btn--restart").addEventListener("click", resetGame);
