let solvedArr =  [[]];

let exampleBoard = [
    null, null,null,6,null,null,1,null,7,
    6,8,null,9,5,1,3,null,null,
    null,null,3,null,null,2,5,6,8,
    null,4,null,8,1,null,null,2,null,
    null,null,null,null,null,null,8,5,null,
    null,9,null,null,6,5,null,7,3,
    4,null,9,null,null,3,null,8,5,
    1,6,2,null,null,9,null,3,null,
    5,null,null,7,null,6,null,null,null
];

const buttons = document.querySelectorAll('button');

buttons.forEach(btn => btn.addEventListener("mouseout", removeHoverInfo));

buttons[0].addEventListener("mouseover", displayHoverBtn1);
buttons[1].addEventListener("mouseover", displayHoverBtn2);
buttons[2].addEventListener("mouseover", displayHoverBtn3);

const cells = document.querySelectorAll('input');

cells.forEach(cell => cell.addEventListener('keydown', (e) => {
    var regex = new RegExp('[0-9]');

    if (e.ctrlKey || e.altKey || typeof e.key !== 'string' || e.key.length !== 1) return;

    if (!regex.test(e.key)) {
        e.preventDefault();
    }
}));

function removeHoverInfo() {
    let text = document.querySelector(".hoverInfo")

    text.innerHTML = "";
}

function displayHoverBtn1() {
    let text = document.querySelector(".hoverInfo")

    text.innerHTML = "Attempts to generate a solution to the given puzzle";
}

function displayHoverBtn2() {
    let text = document.querySelector(".hoverInfo")

    text.innerHTML = "Clears the board of all values";
}

function displayHoverBtn3() {
    let text = document.querySelector(".hoverInfo")

    text.innerHTML = "Generates an example sudoku board for the user to test out the functionality";
}

function fillBoard() {
    let sudokuBoard = document.querySelectorAll('input');

    for (let i = 0; i < sudokuBoard.length; i++) {
        sudokuBoard[i].value = exampleBoard[i];
    }
}

function validate() {
    const sudokuBoard = document.querySelectorAll('input');
    const values = Array.from(sudokuBoard).map(elem => elem.value);
    const nonNullVals = values.filter(elem => elem > 0);

    let twoDimVals = [[]];
    let placeholder = [];

    for (let i = 1; i <= values.length; i++) {
        placeholder.push(values[i-1]);
        if (i % 9 === 0 && i !== 0) {
            twoDimVals.push(placeholder);
            placeholder = [];
        }
    }

    twoDimVals = twoDimVals.slice(1);

    solvedArr = twoDimVals;

    if (nonNullVals.length < 16) alert("Please enter at least 16 inputs.");

    else if (!solve(twoDimVals)) alert("No solution.");

    else {
        solvedArr = solvedArr.flat();

        for (let i = 0; i < sudokuBoard.length; i++) {
            let temp = sudokuBoard[i];

            if (temp.value > 0) {
                temp.value = solvedArr[i];
            }
            else {
                temp.value = solvedArr[i];
                temp.setAttribute("style", "color: red");
            }
        }
    }
}

function clearBoard() {
    const sudokuBoard = document.querySelectorAll('input');
    sudokuBoard.forEach(elem => elem.value = null);
    sudokuBoard.forEach(elem => elem.setAttribute("style", "color: white"));
}

// ALOGIRTHM SOURCE (slightly modified):  Geeks4geeks https://www.geeksforgeeks.org/sudoku-backtracking-7/
function solve(board) {
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
            if (board[i][j] == 0) {
                row = i;
                col = j;

                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }
 
    if (isEmpty) {
        return true;
    }
 
    for(let num = 1; num <= board.length; num++) {
        if (check(board, row, col, num)) {
            board[row][col] = num;

            solvedArr[row][col] = num;

            if (solve(board)) {
                return true;
            }
            else {
                board[row][col] = 0;

                solvedArr[row][col] = 0;
            }
        }
    }
    return false;
}

function check(board, row, col, n) {
    for(let d = 0; d < board.length; d++) {
        if (board[row][d] == n) {
            return false;
        }
    }
 
    for(let r = 0; r < board.length; r++) {
        if (board[r][col] == n) {
            return false;
        }
    }
 
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart; r < boxRowStart + sqrt; r++) {
        for(let d = boxColStart; d < boxColStart + sqrt; d++) {
            if (board[r][d] == n) {
                return false;
            }
        }
    }

    return true;
}
