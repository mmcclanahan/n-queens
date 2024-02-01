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

window.findNRooksSolution = function(n, position) {//position [0][x]
  position = position || 0;
  var solution = undefined;

  //solution = new Board({n: n})
  //for loop i = 0 while i < n
    //this.togglepiece(i, i)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  // iterate n times through findNRookSolution(n, i)
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
