// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let start_grid = [...Array(8)].map(subarr => Array(8));
    start_grid[3][4] = new Piece("black");
    start_grid[4][3] = new Piece("black");
    start_grid[3][3] = new Piece("white");
    start_grid[4][4] = new Piece("white");

    return start_grid;
}
// console.log(_makeGrid())
/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

// test = new Board()
/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0]
  let y = pos[1]
  if ((x >= 0 && x<=7) && (y >= 0 && y <= 7)){
    return true;
  } 
  return false
  
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0]
  let y = pos[1]
  if (this.isValidPos(pos)){
  return this.grid[x][y]
  }
  throw new Error('Not valid pos!')
};
// console.log(test.getPiece([3,2]))

// this.getPiece(pos) !== undefined ||
/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos) === undefined){
    return false
  } else if (this.getPiece(pos).color === color){
    return true
  }
 return false
};


/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
   if(this.getPiece(pos) === undefined) {
    return false
   }

   return true
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */                                      
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  if (piecesToFlip === undefined) {
      piecesToFlip = [];
    }
  let new_pos = [pos[0] + dir[0], pos[1] + dir[1]]; // 4,4


  if (!this.isValidPos(new_pos)) { return [] }
  if (!this.isOccupied(new_pos)) {  return []}
  if (this.isMine(new_pos, color) ) {return piecesToFlip}
// && piecesToFlip.length > 0
   piecesToFlip.push(new_pos);

    return this._positionsToFlip(new_pos, color, dir, piecesToFlip) 

};


/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {

  if (this.isOccupied(pos)) {
    return false
  }
for (i=0; i < Board.DIRS.length; i++) {
  let direction = Board.DIRS[i]
  let arr = this._positionsToFlip(pos, color, direction)
  if (arr.length > 0) {
    return true
  }
} 
  return false
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let x = pos[0]
  let y = pos[1]
  let spots = []
  if (this.validMove(pos, color)) {
    this.grid[x][y] = new Piece(color)
    for(i = 0; i < Board.DIRS.length; i++) {
        let direction = Board.DIRS[i]
        arr = this._positionsToFlip(pos, color, direction)
        for (i= 0; i < arr.length; i++) {
          pos = arr[i]
        }

    }

  }
  throw error 'Not a valid move'

};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE