import { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import useSocket from "../hooks/useSocket";

export default function arena(){
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const socket = useSocket();
    //connect to the socket and process all the messages that are coming from the frontend.

    useEffect(()=>{
        if(!socket){
            return
        }
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message){
                case "INIT_GAME":
                    alert(message.status);
                    break;

                case "move":
                    ()=>{
                        setBoard(message.payload);
                    }
                    break;
            }
            
        }

    },[socket])
    return(
        <div className="h-screen w-screen bg-[#393646] flex items-center justify-center gap-20">
            <div>
                <ChessBoard board = {board} websocket = {socket}/>
            </div> 
            {/* Send the init messagae to the server */}
            <div className="flex h-full justify-start items-center">
                <button onClick={()=>{socket?.send(JSON.stringify({
                        type : "INIT_GAME"
                    })
                )}} className="bg-green-500 text-white p-5 font-bold rounded-2xl"> PLAY GAME </button>
            </div>
        </div>
   )
}