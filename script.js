const gridContainer = document.querySelector('.grid_container')
let cellGrid = []
let cellState = []


function create_grid(){
    gridContainer.style.gridTemplateColumns = `repeat(${5}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${6}, 1fr)`;

    for (row = 0; row < 6; row++){
        const gridRow = []
        const cellRow = []

        for (col = 0; col < 5; col++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.classList.add('grid_item')
            
            gridRow.push(cell)
            cellRow.push(0)

            gridContainer.append(cell)
        }

        cellGrid.push(gridRow)
        cellState.push(cellRow)
    }
    console.log(cellGrid)
    console.log(cellState)
}

create_grid()


// Onscreen keyboard implementation
keyboard = document.querySelector('.keyboard')

keyboard.addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard_btn")) {
        return
    }

    let key = target.textContent

    if (key == "Del"){
        key = "Backspace"
    }

    document.dispatchEvent(new KeyboardEvent('keyup', {'key': key}))

})

// User input
let attempts = 0
let nextLetter = 0
let currentGuess = []

document.addEventListener('keyup', (e) => {

    if (attempts > 5){
        return
    }

    let letter = String(e.key)
    if (letter === 'Backspace' && nextLetter !== 0){
        deleteLetter()
        return
    }

    if (letter === 'Enter'){
        checkGuess()
    }

    
})

function deleteLetter(){
    pass
}

function checkGuess(){
    pass
}

// Wordlist
let wordList = []

fetch('./wordlist.txt')
.then(response => response.text())
.then(data => wordList.push(data.split(/\r\n/)))

console.log(wordList)