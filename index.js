const keyPositions = document.querySelectorAll("#keys button");
let vBoard = [];
let turnPlayer = "";

function updateTurnPlayer() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function disablePosition(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick);
}

function handleWin(positions) {
  positions.forEach(function (position) {
    document
      .querySelector("[data-position='" + position + "']")
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = playerName + " venceu!!";
  keyPositions.forEach(function (element) {
    element.removeEventListener("click", handleBoardClick);
  });
}

function initializeGame(ev) {
  ev.preventDefault();
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    "Vez de: <span id='turnPlayer'></span>";
  updateTurnPlayer();
  keyPositions.forEach(function (element) {
    element.classList.remove("win");
    element.classList.add("cursor-pointer");
    element.innerText = "";
    element.addEventListener("click", handleBoardClick);
  });
}

function getWinPositions() {
  let winPositions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winPositions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winPositions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winPositions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winPositions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winPositions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winPositions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winPositions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winPositions.push("0.2", "1.1", "2.0");
  return winPositions;
}

function handleBoardClick(ev) {
  const button = ev.currentTarget;
  const position = button.dataset.position; // --> N.N
  const rowColumnPair = position.split("."); // --> ["N","N"]
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];
  if (turnPlayer === "player1") {
    button.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    button.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear();
  console.table(vBoard);
  disablePosition(button);
  const winPositions = getWinPositions();
  if (winPositions.length > 0) {
    handleWin(winPositions);
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTurnPlayer();
  } else {
    document.querySelector("h2").innerHTML = "Empate!!";
  }
}

document.getElementById("start").addEventListener("click", initializeGame);
