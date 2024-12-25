import { WebSocket } from "ws";
import { Chess } from "chess.js";
export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    private chessBoard : Chess;
    private  startTime : Date;
    private chessMoves : number;


    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.startTime =  new Date();
        this.chessBoard = new Chess();
        this.player1.send("game has started, you are black");
        this.player2.send("game has started, you are white");
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
            player.send(JSON.stringify({
                error: e
            }))
        }
        //3. If the game is over. 
        if(this.chessBoard.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: "game_over",
                payload: {
                 winner : this.chessBoard.turn() === "w" ? "black" : "white" 
                }
                    
            })
            )
            return; 
        }
        //4. notifying p2 after p1 is done making a move, and vice verca
        if(this.chessMoves % 2 === 0){
            console.log(this.chessMoves)
            this.player2.send(JSON.stringify({
                type: "move",
                payload:move
            })
        )
            this.chessMoves++;
        }
        else{
            console.log(this.chessMoves)
            this.player1.send(JSON.stringify({
                type: "move",
                payload:move
            })
        )
            this.chessMoves++;
        }
    }
    
}