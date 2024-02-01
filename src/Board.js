// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var counter = 0;
      row.forEach(function(position) {
        if (position === 1) {
          counter++;
        }
      });
      return counter > 1;
      // //declare var row
      // var row = this.get(rowIndex); // array at rowindex
      // return _.contains(row, 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowIndex = this.get('n') - 1;
      while (rowIndex > 0) {
        if (this.hasRowConflictAt(rowIndex)) {
          return true;
        }
        rowIndex--;
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
      // declare counter at 0
      // iterate through this.rows()
        // store position this.get()[colIndex]
        // if position === 1
          // increment the counter
      // return counter > 0
    hasColConflictAt: function(colIndex) {
      var counter = 0;

      this.rows().forEach(function(row) {
        var position = row[colIndex];
        if (position === 1) {
          counter++;
        }
      });
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
      // iterate through this.get('n');
        // if hasColConflictsAt at n is true
          // return true
        // decrement n
      // return false

    hasAnyColConflicts: function() {
      for (var i = this.get('n') - 1; i >= 0; i--) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //_isInBounds: function(rowIndex, colIndex)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) { //can be neg or pos
      // this.rows()
      var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      this.rows().forEach((row, i) => {
        if (this._isInBounds(i, columnIndex)) {
          if (row[columnIndex] === 1) {
            counter++;
          }
        }
        columnIndex++;
      });
      return counter > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var columnIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(this.get('n'), 0);
      while (columnIndex < this.get('n')) {
        if (this.hasMajorDiagonalConflictAt(columnIndex)) {
          return true;
        }
        columnIndex++;
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    //_isInBounds: function(rowIndex, colIndex)
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) { //0 - 8 for a 4 square board
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      this.rows().forEach((row, i) => {
        if (this._isInBounds(i, columnIndex)) {
          if (row[columnIndex] === 1) {
            counter++;
          }
        }
        columnIndex--;
      });
      return counter > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      var columnIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(n, n);
      while (columnIndex >= 0) {
        if (this.hasMinorDiagonalConflictAt(columnIndex)) {
          return true;
        }
        columnIndex--;
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
