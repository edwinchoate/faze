
// the game board DOM element. All of the buttons (cells) lie inside this div
var $gameBoard = $("#game-board");


// loads buttons (cells of game board) into game-board on page
// param boardSize how many buttons to add to the game-board
function loadCells(boardSize) {
    for (var i = 0; i < boardSize; i++) {
        var newCell = "<a><button class=\"cell\"></button></a>";
        $gameBoard.append(newCell);
    }
}


// lighten a given hex color by a certain percentage
// param color The original color
// param amount The percentage change in color
function lightenColor(color, amount) {
    var diff = Math.floor(amount.slice(0, -1) / 100 * 255);
    var usePound = false;
    
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    
    var colorValue = parseInt(color, 16);
    
    // adjust red value
    var r = ((colorValue >> 16) & 0x0000FF) + diff;
    if (r > 255) {
        r = 255;
    } else if  (r < 0) {
        r = 0;
    }
    
    // adjust green value
    var g = ((colorValue >> 8) & 0x0000FF) + diff;
    if (g > 255) {
        g = 255;
    } else if  (g < 0) {
        g = 0;
    }
    
    // adjust blue value
    var b = (colorValue & 0x0000FF) + diff;
    if (b > 255) {
        b = 255;
    } else if  (b < 0) {
        b = 0;
    }
    
    // return hex-formatting color string
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


// darken a given hex color by a certain percentage
// param color The original color
// param amount The percentage change in color
function darkenColor(color, amount) {
    var diff = Math.floor(amount.slice(0, -1) / 100 * 255);
    var usePound = false;
    
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    
    var colorValue = parseInt(color, 16);
    
    // adjust red value
    var r = ((colorValue >> 16) & 0x0000FF) - diff;
    if (r > 255) {
        r = 255;
    } else if  (r < 0) {
        r = 0;
    }
    
    // adjust green value
    var g = ((colorValue >> 8) & 0x0000FF) - diff;
    if (g > 255) {
        g = 255;
    } else if  (g < 0) {
        g = 0;
    }
    
    // adjust blue value
    var b = (colorValue & 0x0000FF) - diff;
    if (b > 255) {
        b = 255;
    } else if  (b < 0) {
        b = 0;
    }
    
    // return hex-formatting color string
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


// converts rgb component to hex 
// param c The component
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


// converts rgb notation to hex notation
// param r Red value (0 - 255)
// param g Green value (0 - 255)
// param b Blue value (0 - 255)
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


// darkens a game-board cell when user clicks
function darkenCell() {
    // the individual cell that was clicked 
    var $cell = $(this);
    var $oldColor = $cell.css("background-color");
    
    // parses the css rgb() string to change color of cell
    var colors = $oldColor.substring($oldColor.indexOf('(') +1, $oldColor.lastIndexOf(')')).split(/,\s*/);
    
    // coverts color String to hex value
    $oldColor = rgbToHex(parseInt(colors[0]), parseInt(colors[1]), parseInt(colors[2]));

    // darkens the original color by X percent
    var newColor = darkenColor($oldColor, "10%");
    
    // resets the css for the appropriate button (cell)
    $cell.css("background-color", newColor);
}


// each turn, the whole board fades
// param amount The percentage each cell's color lightens
function fadeGameBoard(amount) {
    // todo
}


// faze game -- IIFE main
(function main() {
    
    var gameBoardColsDefault = 48;
    var gameBoardRatioX = 2;
    var gameBoardRatioY = 1 ;
    var gameBoardRowsDefault = Math.floor(gameBoardColsDefault * gameBoardRatioY / gameBoardRatioX);
    var gameBoardSize = gameBoardColsDefault * gameBoardRowsDefault;
    console.log("game board is", gameBoardColsDefault, "by", gameBoardRowsDefault, gameBoardSize);
    
    // populate the game-board with cells
    loadCells(gameBoardSize);
    var $cells = $(".cell");
    
    // click handler for drawing on a cell
    $cells.on("click", darkenCell);
    
})();