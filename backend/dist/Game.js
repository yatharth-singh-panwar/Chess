"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    //@audit-issue - //FIXED A single player is able to move for both players, implement counts to alternate between both players.
    //@audit-issue - //Add the numberings and alphabets next to the blocks
    //@audit-issue - Issue in game logic blocks
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = new Date();
        this.chessBoard = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: "INIT_GAME",
            status: "game has started, you are white"
        }));
        this.player2.send(JSON.stringify({
            type: "INIT_GAME",
            status: "game has started, you are black"
        }));
        this.chessMoves = 0;
        this.chancePlayer1 = true;
        this.chancePlayer2 = false;
    }
    MovePlayer(player, move) {
        if (this.player1 == null) {
            this.player2.send(JSON.stringify({
                msg: "YOU HAVE WON THE OTHER PLATER QUIT!! "
            }));
        }
        if (this.player2 == null) {
            this.player1.send(JSON.stringify({
                msg: "YOU HAVE WON THE OTHER PLATER QUIT!! "
            }));
        }
        if (this.player1 == null) {
        }
        try {
            if (this.chancePlayer1) {
                if (player != this.player1) {
                    return;
                }
            }
            else {
                if (player != this.player2) {
                    return;
                }
            }
            this.chessBoard.move(move);
        }
        catch (e) {
            return player.send(JSON.stringify({
                error: e
            }));
        }
        if (this.chancePlayer1) {
            this.chancePlayer1 = false;
            this.chancePlayer2 = true;
        }
        else {
            this.chancePlayer2 = false;
            this.chancePlayer1 = true;
        }
        //3. If the game is over. 
        if (this.chessBoard.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.chessBoard.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.chessBoard.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        //Send the updated board to both the players after one is done making a move.
        try {
            this.player1.send(JSON.stringify({
                type: "move",
                payload: this.chessBoard.board()
            }));
            this.player2.send(JSON.stringify({
                type: "move",
                payload: this.chessBoard.board()
            }));
        }
        catch (e) {
            console.log("2nd try catch error");
            this.player1.send(JSON.stringify({
                "msg": e
            }));
            this.player2.send(JSON.stringify({
                "msg": e
            }));
        }
        console.log("Event occured successfully");
    }
}
exports.Game = Game;
