import { WebSocket } from "ws";
import { Chess } from "chess.js";
export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    private chessBoard : Chess;
    private  startTime : Date;
    private chessMoves : number;

//@audit-issue - A single player is able to move for both players, implement counts to alternate between both players.

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.startTime =  new Date();
        this.chessBoard = new Chess();
        this.player1.send(JSON.stringify({
            type:"INIT_GAME",
            status:"game has started, you are white"
        }))
        this.player2.send(JSON.stringify({
            type:"INIT_GAME",
            status:"game has started, you are black"
        }))
        this.chessMoves =0 ;
    }

    MovePlayer(player:WebSocket, move:{
        from: string;
        to: string;
    }){
        try{
            this.chessBoard.move(move);
        }
        catch(e){
            console.log("first try catch exit")
            return player.send(JSON.stringify({
                error: e
            }))
        }
    
        //3. If the game is over. 
        if(this.chessBoard.isGameOver()){
            this.player1.send(JSON.stringify({
                type: "game_over",
                payload: {
                 winner : this.chessBoard.turn() === "w" ? "black" : "white" 
                }
                    
            })
            )
            return; 
        }

        //Send the updated board to both the players after one is done making a move.
        try{
            this.player1.send(JSON.stringify({
                type: "move",
                payload:this.chessBoard.board()
            }))
            this.player2.send(
                JSON.stringify({
                    type:"move",
                    payload:this.chessBoard.board()
                })
            )
        }
        catch(e){
            console.log("2nd try catch error")
            this.player1.send(JSON.stringify({
                "msg" : e
            }))
            this.player2.send(JSON.stringify({
                "msg" : e
            }))
        }
        console.log("Event occured successfully")
    }
}