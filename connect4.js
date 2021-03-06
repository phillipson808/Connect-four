/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
window.onload = function(){


let WIDTH = 7;
let HEIGHT = 6;
let board = [];
let currPlayer = 1; // active player: 1 or 2
//let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

 function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    // board = new Array(HEIGHT).fill(null);
   
    // board.forEach((val, i) => {
    //   let row = new Array(WIDTH).fill(null);
    //   board[i] = row;
    // });
    //   return board;
    board = [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ]
  return board;
}

makeBoard();
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" letiable from the item in HTML w/ID of "board"
  let board = document.getElementById("board");

  //Creates rows...
  let top = document.createElement("tr"); //creates top tr with id of "column-top"
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick); //Adds event listener to wait for click, then runs handleClick

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); //Finishes creating rows and columns.
    headCell.setAttribute("id", x); //Sets id of headCell
    top.append(headCell); //Adds head cells to row.
  }
  board.append(top); 



  // Complete rows...
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell); //appends cells into row.
    } 
    board.append(row); //appends completed row to board.
  }
}
makeHtmlBoard();

/** findSpotForCol: given column x, return top empty y (null if filled) */
/* given a column, return the first empty cell*/

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //Loop 
  //Bring in the board
  //x is column top
  
  let y = 5
  while (y < board.length){
    console.log(board.length);
    if (board[y][x] === null){
      return y;
    } else {
      y--;
    }
  }
  //6 is x, 5 is y;
}


/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell.
  let piece = document.createElement("div");
  piece.setAttribute("class","piece");
  if (currPlayer === 1){
    piece.classList.add("player-1");
    currPlayer++;
  } else {
    piece.classList.add("player-2");
    currPlayer--;
  }

  let targetCell = document.getElementById(`${y}-${x}`);
  targetCell.append(piece);

}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(function(){
    alert(msg)
  },400);
  let disable = document.getElementById("column-top");
  disable.removeEventListener('click',handleClick);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id; //Grabs onto id of clicked element.


  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  } 



  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  

  placeInTable(y, x);
  if(placeInTable){
    board[y][x] = currPlayer
    console.log(currPlayer);
  }


  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // check for win

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
        ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}



}