import processing.core.*;


public class Cell {
   
  
  int xPos, yPos, size;
  int h, s, b;
  color cellColor;
  boolean isClicked;
  
  
  public Cell (int xPos, int yPos, int size, int h, int s, int b) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.h = h;
    this.s = s;
    this.b = b;
    this.cellColor = color(h, s, b);
    this.isClicked = false;
  }
  
  
  public void drawCell () {
    fill(cellColor);
    stroke(#000000);
    renderRect();
  }
  
  
  public void updateColor (int newBrightness) {
    this.b = newBrightness;
    this.cellColor = color(h, s, b);
    fill(color(h, s, b));
    stroke(#000000);
    renderRect();
  }
  
  
  public boolean getIsClicked () {
    return this.isClicked; 
  }
  
  
  public void setIsClicked (boolean isClicked) {
    this.isClicked = isClicked; 
  }
  
  
  public int getBrightness () {
    return this.b; 
  }
  
  
  private void renderRect () {
    rect(xPos, yPos, size, size);
  }
  
  
  
  
}