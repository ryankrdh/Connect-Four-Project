/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array\
  // NOTE: We want the arrays to be made (HEIGHT) amount of times.
  // NOTE: (Length determines the length of the array) We want each array to be (WIDTH) long.
  // let count = 0;
  for (let x = 0; x < HEIGHT; x++) {
    // if (count <= WIDTH) {
    //   board.push(Array.from({ length: WIDTH})); //REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    //   count += 1;
    // }
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  // TODO: add comment for this code
  const top = document.createElement('tr'); // creates an element on the document and appends it to the variable "top"
  top.setAttribute('id', 'column-top'); // Setting the variable "top" with an ID of "column-top"
  top.addEventListener('click', handleClick); // adds a click ability to the variable "top" element.

  for (let x = 0; x < WIDTH; x++) {
    // for loop for creating the number of spaces per row depending on the WIDTH for the TOP ROW.
    const headCell = document.createElement('td'); // Adds an element to the variable headCell
    headCell.setAttribute('id', x); // sets the ID of the headCell to x.
    // **** How does this ID "x" get used ? ****
    top.append(headCell); // attaching headCell to top creating (WIDTH) amount of "top" elements.
  }
  htmlBoard.append(top); // appending the row of "top" elements to the html.

  // TODO: add comment for this code
  // The following block creates number of rows depending on WIDTH and columns depending on HEIGHT beneath the TOP row that is clickable.
  for (let y = 0; y < HEIGHT; y++) {
    // Creates a column depending on HEIGHT.
    const row = document.createElement('tr'); // attaches a variable row with the element 'tr' to every row for the first column.
    for (let x = 0; x < WIDTH; x++) {
      // creates the rows for each section of the column depending on WIDTH
      const cell = document.createElement('td'); // attaches the element 'td' to variable cell for each section of the row.
      cell.setAttribute('id', `${y}-${x}`); // Gives each section a unique name depending on the x and y axis.
      row.append(cell); // appends each named cell with the length of row depending on WIDTH to each section of the column (varialbe name row)
    }
    htmlBoard.append(row); // appends the created table WIDTH X HEIGHT to the html.
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

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
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
