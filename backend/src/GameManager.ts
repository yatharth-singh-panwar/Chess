import { WebSocket } from "ws";
import { Game } from "./Game";
import { Chess } from "chess.js";
import { getConfigFileParsingDiagnostics } from "typescript";

export class GameLogicManager{
    private globalId:number = 0;
    private waitingPlayer : WebSocket | null = null;
    private games : Game[];
    constructor(){
        this.games =  [];

        this.globalId =0;
    }

    // When the init game msg comes, then add the user to a game
    addUser(player1: WebSocket){
        
        // 1. Check if the waiting player is null 
        if(this.waitingPlayer == null){
            //2. If the waiting player is null, assign the waiting player to this websocket
            this.waitingPlayer = player1; 
        }
        // 3. If the waiting player is not null, make a new game, with player1 as the waiting player and the player 2 as
        else{
            const id:number = this.globalId + 1;
            const newGame = new Game( player1, this.waitingPlayer);
            this.waitingPlayer = null;
            this.games.push(newGame);
            console.log(newGame);
        }

        // The player who has sent the request to init-game.

    }  

    HandleMovePlayer(player:WebSocket, move :{
        from: string,
        to: string
    }){
        const findGame = this.games.find((game)=> game.player1 === player || game.player2 === player);
        if(!findGame){
            return;
        }
        findGame.MovePlayer(player, move);
    }
}