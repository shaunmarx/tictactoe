import { curry, compose, indexBy, identity } from 'ramda';
import { Maybe } from 'ramda-fantasy';
var { Just, Nothing }  = Maybe;

export const generateBoard = (size) => Array.apply(null, Array(size * size)).map(x => 0);
export const getBaseSize = (board) => Math.floor(Math.sqrt(board.length));

export const rowIndex = curry((size, rowIndex) => size * rowIndex);

export const columnIndex = curry((size, columnIndex) => columnIndex);

export const columnCellIndex = curry((size, columnIndex, rowIndex) => (size * rowIndex) + columnIndex);
export const rowCellIndex = curry((size, rowIndex, columnIndex) => columnCellIndex(size, columnIndex, rowIndex));
export const rightDiagonalIndex = curry((size, index) => (size - 1) * (index + 1));
export const leftDiagonalIndex = curry((size, index) => (size + 1) * index);

export const getRowStartFromIndex = curry((size, index) => index - (index % size));
export const getColumnStartFromIndex = curry((size, index) => index % size);

export const isDiagonalIndex = curry((size, index) => {
    for(var i =0; i < size; i ++){
        var leftDiag = leftDiagonalIndex(size, i);
        var rightDiag = rightDiagonalIndex(size,i);

        if(leftDiag === index || rightDiag === index)
            return true;
    }

    return false;
});

const getIndexes = curry((calculation, size) => {
    var result = [];
    for(var i =0; i < size; i ++){
        result.push( calculation(i));
    }
    return result;
});

export const getLeftDiagonalIndexes = (size) => getIndexes(leftDiagonalIndex(size), size);
export const getRightDiagonalIndexes = (size) => getIndexes(rightDiagonalIndex(size), size);
export const getDiagonalIndexes = (size) => ([getLeftDiagonalIndexes(size), getRightDiagonalIndexes(size)]);
export const getRowIndexes = (size, rowIndex) => getIndexes(rowCellIndex(size, rowIndex), size);
export const getColumnIndexes = (size, columnIndex) => getIndexes(columnCellIndex(size, columnIndex), size);


function addToHash(hash, index, values){
    if(!(index in hash)){
        hash[index] = [values];
    }else{
        hash[index].push(values);
    }
}

export const generateWinningChecks = (size) => {
    //Generate the checks that need to be made for a given board size to determine a winner
    //This should work for any given board size and allows moves to be checked against a hash
    //as opposed to calculating the potential moves each and every time.
    let result = {};
   
    var leftDiagonals = getLeftDiagonalIndexes(size);
    var rightDiagonals = getRightDiagonalIndexes(size);

    for(var i =0; i <  size; i++){
        let rows = getRowIndexes(size, i);
        let columns = getColumnIndexes(size, i);

        for(var j=0; j < size; j++){
            var rowIndex = rows[j];
            var columnIndex = columns[j];
            
            addToHash(result, rowIndex, rows);
            addToHash(result, columnIndex, columns);
        }

        var leftDiagonalIndex = leftDiagonals[i];
        var rightDiagonalIndex = rightDiagonals[i];

        addToHash(result, leftDiagonalIndex, leftDiagonals);
        addToHash(result, rightDiagonalIndex, rightDiagonals);
    }

    return result;
}

const sizeWinMatrix = {
    3 : generateWinningChecks(3),
    4 : generateWinningChecks(4)
};

export const checkMoveVictory = (board, index) =>
{
    var size = getBaseSize(board);
    var matrix = sizeWinMatrix[size];
    var checks = matrix[index];

    for(var i =0; i < checks.length; i++){
        var indexes = checks[i];
        
        var counts = {
            empty: 0,
            player1: 0,
            player2: 0
        }

        for(var j=0; j < indexes.length; j++){
            var boardIndex = indexes[j];
            var value = board[boardIndex];
        
            if(counts.empty > 0)
                break;
            
            if(counts.player1 === 1 && counts.player2 === 1)
                break;
            
            switch(value){
                case 0: counts.empty++;
                break;
                case 1: counts.player1++;
                break;
                case 2: counts.player2++;
            }

            if(counts.player1 === 3 || counts.player2 === 3)
                return  { counts : counts, positions: indexes }
        }
    }

    return null;
}

