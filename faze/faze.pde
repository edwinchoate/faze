
/**
 * Faze Game
 * LMC 2700 Final Project 
 * 
 * Created by Edwin Choate, Aaron Lack & Kyle O'Neil
 * 
 */
 
 
 int n, m;
 int topMargin, leftMargin, cellSize;
 Cell[][] grid;
 color primaryColor, secondaryColor, bgColor, borderColor;
 boolean setupGame;
 
 void setup() {
   
   size(displayWidth, displayHeight);
   if (surface != null) {
     surface.setResizable(true); 
   }
   
   colorMode(HSB);
   
   bgColor = color(0, 0, 100);
   background(bgColor);
   
   setupGame = true;
   
   n = 20;
   m = 10;
   grid = new Cell[n][m];
   topMargin = displayHeight / 8;
   leftMargin = displayWidth / 8;
   cellSize = (displayWidth - 2 * leftMargin) / n;
   
 }
 
 
 void draw() {
   
   if (setupGame) {
     initGrid();  
   }
   
   updateGrid();
   
 }
 
 
 void initGrid () {
   
   for (int i = 0; i < n; i++) {
     for (int j = 0; j < m; j++) {
       grid[i][j] = new Cell(leftMargin + cellSize * i, topMargin + cellSize * j, cellSize, 0, 0, 222);
     }
   }
   
   setupGame = false;
   
   
 }
 
 
 void updateGrid () {
    
   for (int i = 0; i < n; i++) {
     for (int j = 0; j < m; j++) {
       grid[i][j].drawCell();
     }
   }
   
   
 }
 
 
 void mousePressed () {
   if (isInGrid()) {
     int row, col;
     row = (mouseY - topMargin) / cellSize;
     col = (mouseX - leftMargin) / cellSize;
     println("clicked row " + row + " col: " + col);
     Cell cell = grid[col][row];
     cell.updateColor(cell.getBrightness() - 20);
   }
 }
 
 
 boolean isInGrid () {
   return mouseX > leftMargin && mouseX < displayWidth - leftMargin && mouseY > topMargin && mouseY < displayHeight - topMargin; 
 }