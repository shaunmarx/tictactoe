import * as utils from '../board';
import { flatten } from 'ramda';

describe("board generation", () => {

    it("generates 0 for all indexes", () => {
        var result = utils.generateBoard(3);
        for(var i =0; i < result.length; i++){
            expect(result[i]).toBe(0);
        }
    })

    it("given an input of 3 has the correct dimension", () => {
        expect(utils.generateBoard(3).length).toBe(9);
    });

    it("given an input of 4 has the correct dimension", () => {
        expect(utils.generateBoard(4).length).toBe(16);
    });
});

describe("board indexing", () => {
    let baseBoardSize = 3;
    let cellIndex = utils.columnCellIndex(baseBoardSize);
    let rowIndex = utils.rowIndex(baseBoardSize);
    let isDiagonalIndex = utils.isDiagonalIndex(baseBoardSize);
    let mockBoard = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];

    it("gets the correct cell index given a board dimension of 3x3", () => {
        //Size, Column, Row
        expect(cellIndex(0, 0)).toBe(0);
        expect(cellIndex(1, 0)).toBe(1);
        expect(cellIndex(2, 0)).toBe(2);
        expect(cellIndex(0, 1)).toBe(3);
        expect(cellIndex(1, 1)).toBe(4);
        expect(cellIndex(2, 1)).toBe(5);
        expect(cellIndex(0, 2)).toBe(6);
        expect(cellIndex(1, 2)).toBe(7);
        expect(cellIndex(2 ,2)).toBe(8);
    });

    it("gets the correct row index given a board dimension of 3x3", () => {
        //Column, Row
        expect(rowIndex(0)).toBe(0);
        expect(rowIndex(1)).toBe(3);
        expect(rowIndex(2)).toBe(6);
    });

     it("gets the correct column index given a board dimension of 3x3", () => {
        //Column, Row
        expect(rowIndex(0)).toBe(0);
        expect(rowIndex(1)).toBe(3);
        expect(rowIndex(2)).toBe(6);
    });

    it("determines index[0] as diagonal in a 3x3 board", () =>{
        expect(isDiagonalIndex(0)).toBe(true);
    });
    it("determines index[2] as diagonal in a 3x3 board", () =>{
        expect(isDiagonalIndex(2)).toBe(true);

    });
    it("determines index[4] as diagonal in a 3x3 board", () =>{
        expect(isDiagonalIndex(4)).toBe(true);
    });
    it("determines index[6] as diagonal in a 3x3 board", () =>{
        expect(isDiagonalIndex(6)).toBe(true);
    });
    it("determines index[8] as diagonal in a 3x3 board", () =>{
        expect(isDiagonalIndex(8)).toBe(true);
    });

    it("determines non diagonal indexes in a 3x3 board", () => {
        expect(isDiagonalIndex(1)).toBe(false);
        expect(isDiagonalIndex(3)).toBe(false);
        expect(isDiagonalIndex(5)).toBe(false);
        expect(isDiagonalIndex(7)).toBe(false);
    });

    it("can get diagonals indexes given the size of the board", () => {
        var diagonals = utils.getDiagonalIndexes(3);
        var expectedIndexes = { 0 : 0, 2: 2, 4: 4, 6: 6, 8: 8 };

        expect(diagonals.length).toBe(2);
        var indexes = flatten(diagonals);
        expect(indexes.length).toBe(6);

        for(var i =0; i < indexes.length; i++){
            expect(indexes[i] in  expectedIndexes).toBe(true);
        }
    });

    it("can generate row indexes", () => {
        var indexes = utils.getRowIndexes(3, 1);
        expect(indexes.length).toBe(3);

        var expectedIndex = { 3:3, 4:4, 5:5 };

        for(var i=0; i < indexes.length; i++){
            expect(indexes[i] in expectedIndex).toBe(true);
        }
    });

    it("can generate column indexes", () => {
        var indexes = utils.getColumnIndexes(3, 1);
        expect(indexes.length).toBe(3);

        var expectedIndex = { 1:1, 4:4, 7:7 };

        for(var i=0; i < indexes.length; i++){
            expect(indexes[i] in expectedIndex).toBe(true);
        }
    });
});


describe("game rules", () => {
    it("can determine victory for a move", () =>{
        // 0 1 2 3 4 5 6 7 8
        // 1 2 0 0 1 2 0 0 1
        var board = [1,2,0,0,1,2,0,0,1];
        var result = utils.checkMoveVictory(board, 8);
        expect(result).not.toBeNull();
        
        expect(result.counts.player1).toBe(3);
        var positions = result.positions;
        expect(positions[0]).toBe(0);
        expect(positions[1]).toBe(4);
        expect(positions[2]).toBe(8);
    });

    
});

