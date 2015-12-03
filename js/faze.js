
// the game board DOM element. All of the buttons (cells) lie inside this div
var $gameBoard = $("#game-board");
var $helpPanel = $("#help-panel");
var $statsBar = $("#stats-bar");
var $notificationPanel = $("#notification-panel");
var $startButton = $("#start-btn");
var $playerValue = $(".player-value");
var $clicksValue = $(".clicks-value");
var $roundValue = $(".round-value");
var stillPlaying = true;


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
    var r = (colorValue >> 16) + diff;
    if (r > 255) {
        r = 255;
    } else if  (r < 0) {
        r = 0;
    }
    
    // adjust green value
    var g = ((colorValue >> 8) & 0x00FF) + diff;
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
    return (usePound?"#":"") + (b | (g << 8) | (r << 16)).toString(16);
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
    var r = (colorValue >> 16) - diff;
    if (r > 255) {
        r = 255;
    } else if  (r < 0) {
        r = 0;
    }
    
    // adjust green value
    var g = ((colorValue >> 8) & 0x00FF) - diff;
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
    return (usePound?"#":"") + (b | (g << 8) | (r << 16)).toString(16);
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


// gives all cells a random color (at start of game)
function randomizeCells () {
    $(".cell").each(function () {
        var $cell = $(this);
        var $oldColor = $cell.css("background-color");

        // parses the css rgb() string to change color of cell
        var colors = $oldColor.substring($oldColor.indexOf('(') +1, $oldColor.lastIndexOf(')')).split(/,\s*/);

        // coverts color String to hex value
        $oldColor = rgbToHex(parseInt(colors[0]), parseInt(colors[1]), parseInt(colors[2]));
        
        // how much each cell is randomly changed
        var range = 10;
        var base = 30;
        var percentage = Math.floor((Math.random() * range) + base);
        var newColor = darkenColor($oldColor, percentage + "%");
        
        // resets the css for the appropriate button (cell)
        $cell.css("background-color", newColor);
    });
}


// each turn, the whole board fades
// param amount The percentage each cell's color lightens
function fadeGameBoard() {
    $(".cell").each(function () {
        var $cell = $(this);
        var $oldColor = $cell.css("background-color");

        // parses the css rgb() string to change color of cell
        var colors = $oldColor.substring($oldColor.indexOf('(') +1, $oldColor.lastIndexOf(')')).split(/,\s*/);

        // coverts color String to hex value
        $oldColor = rgbToHex(parseInt(colors[0]), parseInt(colors[1]), parseInt(colors[2]));
        
        var newColor = lightenColor($oldColor, "12%");
        
        // resets the css for the appropriate button (cell)
        $cell.css("background-color", newColor);
    });
}


// faze game -- IIFE main
(function main() {
    
    // hide gameboard at start of program
    var objectsToHide = [$gameBoard, $helpPanel, $statsBar, $notificationPanel, $startButton];
    for (var i = 0; i < objectsToHide.length; i++) {
        objectsToHide[i].hide();
    }
    
    // load the color-approprite logo on page
    $bgColor = $("html").css("background-color");
    console.log($bgColor);
    $logoImg = $("#faze-logo");
    var imgPath = "../img/logo-";
    switch($bgColor) {
        case "rgb(230, 242, 255)": 
            $logoImg.attr("src", imgPath + "blue.png");
            break;
        case "rgb(255, 179, 179)":
            $logoImg.attr("src", imgPath + "red.png");
            break;
        case "rgb(231, 196, 100)":
            $logoImg.attr("src", imgPath + "gold.png");
            break;
        case "rgb(242, 230, 255)":
            $logoImg.attr("src", imgPath + "purple.png");
            break;
        case "rgb(210, 240, 210)":
            $logoImg.attr("src", imgPath + "green.png");
            break;
        default: // defaults to gray logo
            $logoImg.attr("src", imgPath + "gray.png");
            break;
    }
    
    // player 1 takes the first turn
    var currentPlayer = 1;
    var clickMaxSm, clickMaxMd, clickMaxLg, clickCount, clickMax, roundMax, roundCount;
    // number of clicks a player is allowed each turn
    clickMaxSm = 64;
    clickMaxMd = 36;
    clickMaxLg = 16;
    clickMax = clickMaxMd // game defaults to medium
    clickCount = clickMax; 
    // number of rounds in the game
    // a round is defined as one turn taken by each player
    roundMax = 5;
    roundCount = 1;
    $(".round-max").text(roundMax);
    
    // game board can take on three sizes (number of columns)
    // 32 cols (lg cells), 48 cols (md cells, default), 64 (sm cells)
    var $gameBoardSize = 48; // default size = medium
    var selectedSize = "";

    // click handler to set game size
    $gridSelector = $(".grid-selector");
    $gridSelector.on("click", function() {
        $this = $(this);
        
        if ($this.hasClass("grid-selector-sm")) {
            selectedSize = "sm";
            $gameBoardSize = 64;
        } else if ($this.hasClass("grid-selector-lg")) {
            selectedSize = "lg";
            $gameBoardSize = 32;
        } else { // otherwise medium is already the default set size
            selectedSize = "md";
            $gameBoardSize = 48;
        }
        
        
        
        // animate the button that was clicked
        $this.addClass("animated flip");
        $this.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $this.removeClass("animated flip");
            // highlight the selected size mode 
            $gridSelector.each(function () {
                $(this).css("border-bottom", "none"); 
            });
            var $tickColor = $(".intro-prompt").css("color");
            // parses the css rgb() string to change color of cell
            var colors = $tickColor.substring($tickColor.indexOf('(') +1, $tickColor.lastIndexOf(')')).split(/,\s*/);
            $tickColor = rgbToHex(parseInt(colors[0]), parseInt(colors[1]), parseInt(colors[2]));
            
            $this.css("border-bottom", "8px solid " + $tickColor);
        });
        
        // enable the start button
        $startButton.removeAttr("disabled").slideDown(600, function () {});
        
        // build the game board
        $("#start-btn").on("click", function() {
            $("#intro-panel").hide();
            buildGame();
        });
        
    });
    
    // click hanlder for the help panel 
    $(".help-link, .cancel-x").on("click", function () {
        $helpPanel.fadeToggle();
    });
    
    // click handler for the notification panel
    $notificationPanel.on("click", "#start-turn-btn", function () {
        $notificationPanel.hide();
        $gameBoard.show();
        $statsBar.show();
    });
    
    // calculate game board size and populate with cells
    function buildGame() {
        // game board has gameBoardRatioX by gameBoardRatioY aspect ratio
        var gameBoardRatioX = 2;
        var gameBoardRatioY = 1 ;
        // total number of cells rows on $gameBoard
        var gameBoardRows = Math.floor($gameBoardSize * gameBoardRatioY / gameBoardRatioX);
        var cellTotal = $gameBoardSize * gameBoardRows;
        
        $gameBoard.empty();
        // add cell elements to game board elements
        for (var i = 0; i < cellTotal; i++) {
            if (selectedSize === "sm") {
                var newCell = "<a><button class=\"cell cell-sm\"></button></a>";
            } else if (selectedSize === "lg") {
                var newCell = "<a><button class=\"cell cell-lg\"></button></a>";
            } else { // game board defaults to md size
                var newCell = "<a><button class=\"cell cell-md  \"></button></a>";
            }
            
            $gameBoard.append(newCell);
        }
        
        if (selectedSize === "sm") {
            clickMax = clickMaxSm;
            clickCount = clickMax;
        } else if (selectedSize === "lg") {
            clickMax = clickMaxLg;
            clickCount = clickMax;
        } else { // default to md size
            clickMax = clickMaxMd;
            clickCount = clickMax;
        }
        
        // randomize the color of each cell
        randomizeCells();
        updateStatDisplay();
        
        
        // click handler for drawing on a cell
        $(".cell").on("click", darkenCell);
        $(".cell").on("click", clickCell);
        
        $($gameBoard).show();
        $($statsBar).show();
    }

    
     // updates text display below game board (current player and clicks left)
    function updateStatDisplay () {
        $playerValue.text(currentPlayer);
        $clicksValue.text(clickCount);
        $roundValue.text(roundCount);
    }
    
    // game logic for when player clicks a cell
    function clickCell () {
        if (stillPlaying) {
            clickCount--;
            var inFinalTurn = roundCount >= roundMax && currentPlayer == 2;

            // end of each turn
            if (clickCount <= 0) {

                if (inFinalTurn) {
                    $statsBar.empty();
                    // rewrite the stats bar
                    $statsBar.append(
                        "<span class=\"stat col-xs-12\">" +
                            "<h3 class=\"text-center\">Game Completed! <a href=\"index.html\">Play again?</a></h3>" +
                        "</span>"
                    );
                    stillPlaying = false;
                    $(".cell").off("click", darkenCell);
                }

                // switch players
                if (currentPlayer === 1) {
                    currentPlayer = 2;
                } else {
                    currentPlayer = 1;
                    // next round
                    roundCount++;
                    fadeGameBoard();
                }


                // reset click counter
                clickCount = clickMax;

                // display next player's turn on screen
                if (!inFinalTurn) {
                    $gameBoard.hide();
                    $statsBar.hide();
                    $notificationPanel.show();
                }
                
            }

            updateStatDisplay();
        }
    }
    
    
    
})(); // end of main function










