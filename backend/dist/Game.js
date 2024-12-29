"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = new Date();
        this.chessBoard = new chess_js_1.Chess();
        this.player1.send("game has started, you are black");
        this.player2.send("game has started, you are white");
        this.chessMoves = 0;
    }
    MovePlayer(player, move) {
        try {
            this.chessBoard.move(move);
        }
        catch (e) {
            return player.send(JSON.stringify({
                error: e
            }));
        }
        //3. If the game is over. 
        if (this.chessBoard.isGameOver()) {
            this.player1.emit(JSON.stringify({
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
                payload: this.chessBoard.ascii()
            }));
            this.player2.send(JSON.stringify({
                type: "move",
                payload: this.chessBoard.ascii()
            }));
        }
        catch (e) {
            this.player1.send(JSON.stringify({
                "msg": e
            }));
            this.player2.send(JSON.stringify({
                "msg": e
            }));
        }
    }
}
exports.Game = Game;
