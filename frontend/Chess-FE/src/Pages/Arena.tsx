import { useState } from "react";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
export default function arena(){
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    return(


        <ChessBoard board = {board}/>
        

   )
}