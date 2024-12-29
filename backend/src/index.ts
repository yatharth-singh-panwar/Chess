import { WebSocketServer } from "ws"
import { GameLogicManager } from "./GameManager";

const wss = new WebSocketServer({port : 8080});
const gameManager = new GameLogicManager();

wss.on("connection",function connection(ws){
    ws.on('error', (error)=>{
        console.log(error)
    })
    ws.on('message', (message:string) => {
        const data = JSON.parse(message); 
        //Send a init_game hadler
        if(data.type == "INIT_GAME"){
            gameManager.addUser(ws);
        }
        if(data.type == 'MOVE'){
            const move  = data.move;
            gameManager.HandleMovePlayer(ws, move);
        }
    })  
    ws.send('Connection eshtabilished');
})
