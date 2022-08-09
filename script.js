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
