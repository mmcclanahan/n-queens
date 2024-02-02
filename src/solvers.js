/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


//returning an array of arrays (the board)

//the files call new Board(findNRooksSolution(n)) // places all n rooks where they dont conflict explicitly with 1
// create a board in findNRooksSolution and findNQueensSolution

// STRATEGY
  // make board
  // increment to n pieces
    // toggle
    // if there are row and column conflicts at that coordinate,
      // untoggle


// give findNRooksSolution coordinate parameter, add a line that defaults it to the first position (0, 0)

window.findNRooksSolution = function(n) {//position [0][x]
  //position = position || 0;
  var solution = new Board({n: n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  //solution = new Board({n: n})
  //for loop i = 0 while i < n
  //this.togglepiece(i, i)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  //create a rows container that is flexible based on n value
  var rows = [];
  for (var i = 0; i < n; i++) {
    var currentRow = new Array(n).fill(0);
    currentRow[i] = 1;
    rows.push(currentRow);
  }
  // algorithm to make all possible compinations even conflicting
  var possibleBoards = [];
  var buildBoard = function(boardSoFar) {
    var boardSoFar = boardSoFar || [];
    if (boardSoFar.length === n) {
      var finishedBoard = boardSoFar.toSpliced();
      possibleBoards.push(finishedBoard);
      boardSoFar.pop();
      return;
    }
    rows.forEach(function (currentRow) {
      boardSoFar.push(currentRow);
      buildBoard(boardSoFar);
    });
    boardSoFar.pop();
  };
  buildBoard();
  //algorithm check all possibleBoards combinations for conflicts
  var unconflictedBoards = _.filter(possibleBoards, function(matrix) {
    var board = new Board(matrix);
    return !board.hasAnyRooksConflicts();
  });
  var uniqueBoards = _.uniq(unconflictedBoards, function(matrix) {
    var board = new Board(matrix);
    console.log(JSON.stringify(board.rows()));
    return JSON.stringify(board.rows());
  });
  //uniqueBoard is an array of arrays
  //for var i = 0; i < uniqueBoard.length; i++
    //kingBoard = uniqueBoard[i];
    //var first = kingBoard[0];
    //var last = kingBoard[kingBoard.length-1]
    //kingBoard[kingBoard.length -1] = first;
    //kingBoard[0] = last;
    //for var j = 1; j < uniqueBoard.length; j++
    //if kingBoard === uniqueBoard[j]
      //uniqueBoard = uniqueBoard.slice(0, j).concat(uniqueBoard(j + 1))
//var solutionCount = uniqueBoard.length;

  //we have unique boards just need to check for flipping the board
  //have an array of all our boards
  //first board ex: [[100][010][001]]
  //swap the first and last indexs ex: [[001][010][100]]
  //iterate through the array of all our boards
    //if current board matches swapped board slice it from array of all boards


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
