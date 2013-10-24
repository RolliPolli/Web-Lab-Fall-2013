/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 - Sliding Block Puzzle
Author : Christi Hagen  
Created : September 16th 2013
Modified : September 18th 2013
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

var imageChoice;
var imageWidth =  640;
var imageHeight = 426;
var numberOfClicks = 0;
var numRows;
var numCols;
var tileWidth;
var tileHeight;
var emptyTile = {row:0, col:0};

/*
 * Summary: creates all tiles for puzzle
 */
function createTiles(){
  // assign how wide and tall each tile should be
  tileWidth = Math.floor(imageWidth/numCols);
  tileHeight= Math.floor(imageHeight/numRows);
  
  // all tiles added to page and given ids (important for shuffling)
  var count = 1;
  for (var i = 0; i < numRows; i++){
      for(var j = 0; j < numCols; j++){
          //this is to make the blank tile
          if (i === (numRows-1) && j === (numCols-1)){
              continue;
          }
          var newTile = createDiv(tileWidth, tileHeight, i, j);
          newTile.id = ""+count++;
          document.getElementById("15-puzzle").appendChild(newTile);
      }
  }
  	
  // set the empty tile location and id
  emptyTile = createDiv(tileWidth, tileHeight, numRows - 1, numCols -1);
  emptyTile.id = ""+numRows*numCols;
  
  return;
}

/*
 * Summary: returns a div with specified width and height at given row and column
 * Returns: div created
 */
function createDiv(width, height, row, col){
  // create each div and set its size & position attributes
  var newTile = document.createElement("div");
  newTile.style.left = col * width + "px";
  newTile.style.top = row * height + "px";
  newTile.style.width = width + "px";
  newTile.style.height = height + "px";
  
  // Set the div's background to the correct portion of the image
  if (imageChoice === 1){
      newTile.style.background = "url("+'img1.jpg'+")"+-1*col*width+"px"+" "+-1*row*height+"px";    
  }
  if (imageChoice === 2){
      newTile.style.background = "url("+'img2.jpg'+")"+-1*col*width+"px"+" "+-1*row*height+"px";    
  }
  if (imageChoice === 3){
      newTile.style.background = "url("+'img3.jpg'+")"+-1*col*width+"px"+" "+-1*row*height+"px";    
  }
 
  // add handler for moving tiles
  newTile.onclick = tileClicked;
  
	// return your tile
	return newTile;
}

/*
 * Summary: function called when a tile is clicked.
 */
function tileClicked(event){
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot
  
  var tile = event.target;
  var temp_left;
  var temp_top;

  // if tile is above or below blank spot, switch places with blank spot
  if (parseFloat(tile.style.top) === (parseFloat(emptyTile.style.top) - tileHeight) 
      || parseFloat(tile.style.top) === (parseFloat(emptyTile.style.top) + tileHeight)){
          if (tile.style.left === emptyTile.style.left){
              temp_left = emptyTile.style.left;
              temp_top = emptyTile.style.top;
              emptyTile.style.left = tile.style.left;
              emptyTile.style.top = tile.style.top;
              tile.style.left = temp_left;
              tile.style.top = temp_top;
              
              // update counter and display new count
              numberOfClicks++;              
              var display = document.getElementById("displayCount");
              display.innerHTML = numberOfClicks;
          }
      }
      
  // tile is left or right of blank spot, switch places with blank spot
  if (parseFloat(tile.style.left) === (parseFloat(emptyTile.style.left) - tileWidth) 
      || parseFloat(tile.style.left) === (parseFloat(emptyTile.style.left) + tileWidth)){
          if (tile.style.top === emptyTile.style.top){
              temp_left = emptyTile.style.left;
              temp_top = emptyTile.style.top;
              emptyTile.style.left = tile.style.left;
              emptyTile.style.top = tile.style.top;
              tile.style.left = temp_left;
              tile.style.top = temp_top;
              
              // update counter and display new count
              numberOfClicks++;
              var display = document.getElementById("displayCount");
              display.innerHTML = numberOfClicks;
          }
      }
}

/*
 * Summary: Shuffle up the tiles in the beginning of the game
 */
function shuffleTiles(){
    
    var gridSize = numCols*numRows;
    var index_of_blank = gridSize;
    var tempIndex;
    var tempValue;
    var tempLeft;
    var tempTop;
    var startpoint = 0;
    
    var right = 1;
    var left = 2;
    var up = 3;
    var down = 4;
    
    var gridArray = [];
    gridArray[0] = -1;
    for (var i = 1; i <= gridSize; i++){
        gridArray[i] = i;
    }
    
    // shuffle around blank/tiles *100* time
    for (var i = 0; i < 100; i++){
        var val = Math.floor((Math.random()*4)+1);
        
        // move up if possible
        if (val == up && index_of_blank > numCols)
        {
            tempIndex = index_of_blank;
            tempValue = gridArray[index_of_blank];            
            gridArray[index_of_blank] = gridArray[index_of_blank - numCols];
            gridArray[index_of_blank - numCols] = tempValue;
            index_of_blank -= numCols;
            continue;
        }
        
        // move down if possible
        if (val == down && index_of_blank <= gridSize - numCols)
        {
            tempIndex = index_of_blank;
            tempValue = gridArray[index_of_blank];
            gridArray[index_of_blank] = gridArray[index_of_blank + numCols];
            gridArray[index_of_blank + numCols] = tempValue;
            index_of_blank += numCols;
            continue;
        }
        
        // move right if possible
        if (val == right && (index_of_blank%numCols != 0))
        {
            tempIndex = index_of_blank;
            tempValue = gridArray[index_of_blank];     
            gridArray[index_of_blank] = gridArray[index_of_blank  +1];
            gridArray[index_of_blank +1] = tempValue;           
            index_of_blank += 1;
            continue;
        }
        
        // move left if possible
        if (val == left && ((index_of_blank - 1)%numCols) != 0)
        {
            tempIndex = index_of_blank;
            tempValue = gridArray[index_of_blank];           
            gridArray[index_of_blank] = gridArray[index_of_blank -1];
            gridArray[index_of_blank - 1] = tempValue;           
            index_of_blank -= 1;
            continue;
        }
    }
    
    // loop puts tiles in post-shuffled location in an orderly fashion
    for (var i = 1; i <= gridSize; i++){
            tempLeft = Math.floor(((i-1)%numCols)*tileWidth);
            tempTop = Math.floor(((i-1)/numCols))*tileHeight;
 
        // if empty tile spot
        if (gridArray[i] == gridSize){
            emptyTile.style.left = tempLeft+"px";
            emptyTile.style.top = tempTop+"px";
        }
        // if any other tile
        else{
            document.getElementById(gridArray[i].toString()).style.left = tempLeft+"px";
            document.getElementById(gridArray[i].toString()).style.top = tempTop+"px";
        }
    }
}

/*
 * Summary: Generates a randomly sized puzzle and picks a random image for the puzzle
 */ 
function generateRandomPuzzle(){
    numRows = Math.floor((Math.random()*5)+2);
    numCols = Math.floor((Math.random()*4)+2);
    imageChoice = Math.floor((Math.random()*3)+1);
}

/*
 * When the page loads, create our puzzle!
 */
window.onload = function () {
  // generate the random puzzle and image
  // create the tiles
  // shuffle the tiles
    generateRandomPuzzle();
    createTiles();
    shuffleTiles();			
}
