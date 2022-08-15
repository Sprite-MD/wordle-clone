// Wordlist
let wordList = [];

fetch("./wordlist.txt")
  .then((response) => response.text())
  .then((data) => wordList.push(...data.split(/\r\n/)));

const gridContainer = document.querySelector(".grid_container");
let cellGrid = [];
let cellState = [];

function create_grid() {
  gridContainer.style.gridTemplateColumns = `repeat(${5}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${6}, 1fr)`;

  for (row = 0; row < 6; row++) {
    const gridRow = [];
    const cellRow = [];

    for (col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("grid_item");

      gridRow.push(cell);
      cellRow.push(0);

      gridContainer.append(cell);
    }

    cellGrid.push(gridRow);
    cellState.push(cellRow);
  }
  console.log(cellGrid);
  console.log(cellState);
}

create_grid();

// Onscreen keyboard implementation
keyboard = document.querySelector(".keyboard");

keyboard.addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard_btn")) {
    return;
  }

  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }
  console.log(key, key === "Del");

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

// User input
let attempts = 0;
let numOfLetters = 0;
let currentGuess = [];
let solution = wordList[Math.floor(Math.random() * wordList.length)];

document.addEventListener("keyup", (e) => {
  if (attempts > 5) {
    return;
  }

  let letter = String(e.key);
  if (letter === "Backspace" && numOfLetters !== 0) {
    deleteLetter();
    return;
  }

  if (letter === "Enter") {
    checkGuess();
  }

  let found = letter.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(letter);
  }
});

function deleteLetter() {
  let currentCell = cellGrid[attempts][numOfLetters - 1];
  currentCell.textContent = "";
  currentGuess.pop();
  numOfLetters -= 1;
}

function checkGuess() {
  let currentAttempt = cellGrid[attempts];
  let guess = "";

  for (letter in currentGuess) {
    guess += letter;
  }

  if (guess.length != 5) {
    alert("Not enough letters!");
  }

  if (!wordList.includes(guess)) {
    alert("Word isn't in list");
  }

  console.log(guess);
}

function insertLetter(letter) {
  if (numOfLetters === 5) {
    return;
  }

  let currentCell = cellGrid[attempts][numOfLetters];
  currentCell.textContent = letter;
  currentGuess.push(letter);
  numOfLetters += 1;
}
