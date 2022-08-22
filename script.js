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

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

// User input
let attempts = 0;
let numOfLetters = 0;
let currentGuess = [];
let correctGuess = wordList[Math.floor(Math.random() * wordList.length)];

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

  let matchedLetter = letter.match(/[a-z]/gi);
  if (!matchedLetter || matchedLetter.length > 1) {
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

// WIP
function checkGuess() {
  let currentAttempt = cellGrid[attempts];
  let guess = "";    
  let correctGuessCopy = Array.from(correctGuess)


  for (letter of currentGuess) {
    guess += letter;
  }

  if (guess.length != 5) {
    alert("Not enough letters!");
  }

  if (!wordList.includes(guess)) {
    alert("Word isn't in list");
    console.log(guess);
  }

  for (i = 0; i < 5; i++) {
    let cellColor = "";
    let currentCell = currentAttempt[i];
    // let currentLetter = currentGuess[i];

    let letterIndex = correctGuessCopy.indexOf(currentGuess[i]);

    if (letterIndex === -1) {
      cellColor = "grey";
      } else {
      if (currentGuess[i] === correctGuessCopy[i]) {
        cellColor = "green";
      } else {
        cellColor = "yellow";
      }

      correctGuessCopy[letterIndex] = "-";
    }

    console.log(currentCell)
    setTimeout(() => {
      currentCell.style.backgroundColor = cellColor
    }, 200)
  }

  if (guess === correctGuess){
    attempts = 5;
    alert("CORRECT!");
    return
  } else {
    attempts += 1;
    currentGuess = [];
    numOfLetters = 0;

    if (attempts > 5){
      alert(`The word was ${correctGuess}!`)
    }
  }
  
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
