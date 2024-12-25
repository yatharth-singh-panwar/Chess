"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameLogicManager();
wss.on("connection", function connection(ws) {
    ws.on('error', (error) => {
        console.log(error);
    });
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        //Send a init_game hadler
        if (data.type == "INIT_GAME") {
            gameManager.addUser(ws);
        }
        if (data.type == 'MOVE') {
            const move = data.move;
            gameManager.HandleMovePlayer(ws, move);
        }
    });
    ws.send('Connection eshtabilished');
});
